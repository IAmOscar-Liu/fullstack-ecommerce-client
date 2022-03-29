import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  GetNumOfUserProductOrderBlogDocument,
  MeDocument,
  MeQuery,
  useLoginMutation,
  useProviderLoginMutation,
  useRegisterMutation,
} from "../../../generated/graphql";
import { SignInForm, SignUpForm } from "../../../types";
import { isServer } from "../../../utils/isServer";
import { useRedirect } from "../../../utils/useRedirect";
import styles from "./Login.module.css";

interface Props {}

const Login: React.FC<Props> = () => {
  const [isSigningUp, toggleIsSigningUp] = useState<boolean>(false);
  const [signUpForm, setSignUpForm] = useState<SignUpForm>(null);
  const [signInForm, setSignInForm] = useState<SignInForm>(null);
  const [isLoading, toggleIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [login] = useLoginMutation();
  const [providerLogin] = useProviderLoginMutation();
  const [register] = useRegisterMutation();

  // console.log(router);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    if (isSigningUp) {
      const { username, email, password } = signUpForm;
      if (!username || !email || !password)
        return window.alert("Please fill out the entire form");
      toggleIsLoading(true);

      await register({
        variables: {
          userRegister: {
            name: username,
            email,
            password,
          },
        },
        refetchQueries: [{ query: GetNumOfUserProductOrderBlogDocument }],
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.register,
            },
          });
          localStorage.setItem(
            "ecommerce_access_token",
            data.register.access_token
          );
        },
        onError: (err) => {
          if (err.message.startsWith("Duplicate entry")) {
            window.alert("Username has been taken. Please try another one!");
          } else {
            console.error("An unexpected error happened: ", err.message);
            window.alert("Something went wrong. Please try again.");
          }
        },
      });

      toggleIsLoading(false);
      // modifyLayout("unset");
      // router.push("/main/personal/profile");
    } else {
      const { username, password } = signInForm;
      if (!username || !password)
        return window.alert("Please fill out the entire form");
      toggleIsLoading(true);

      await login({
        variables: {
          userInput: {
            name: username,
            password,
          },
        },
        update: (cache, { data }) => {
          if (!data?.login.account) {
            return window.alert(
              "Unable to login. Please check your your username and password."
            );
          }
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.login,
            },
          });
          localStorage.setItem(
            "ecommerce_access_token",
            data.login.access_token
          );
        },
        onError: (err) => {
          console.error("An unexpected error happened: ", err.message);
          window.alert("Something went wrong. Please try again.");
        },
      });

      toggleIsLoading(false);
      // modifyLayout("unset");
      // router.push("/main/personal/profile");
    }
  };

  const modifyLayout = useCallback((type: "set" | "unset") => {
    if (type === "set") {
      document.body.classList.add("login");
      const targetEl = document.querySelector("footer div:nth-of-type(1)");
      if (targetEl) (targetEl as HTMLDivElement).style.display = "none";
    } else {
      document.body.classList.remove("login");
      const targetEl = document.querySelector("footer div:nth-of-type(1)");
      if (targetEl) (targetEl as HTMLDivElement).style.display = "flex";
    }
  }, []);

  useEffect(() => {
    const handleProviderLogin = async () => {
      if (router.query.failure)
        return window.alert(
          "Unable to login. Please check your your username and password."
        );
      if (router.query.provider && router.query.provider_id) {
        toggleIsLoading(true);

        await providerLogin({
          variables: {
            providerInput: {
              provider: router.query.provider as string,
              provider_id: router.query.provider_id as string,
            },
          },
          update: (cache, { data }) => {
            if (!data?.providerLogin.account) {
              return window.alert(
                "Unable to login. Please check your your username and password."
              );
            }
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data?.providerLogin,
              },
            });
            localStorage.setItem(
              "ecommerce_access_token",
              data.providerLogin.access_token
            );
          },
          onError: (err) => {
            console.error("An unexpected error happened: ", err.message);
            window.alert("Something went wrong. Please try again.");
          },
        });

        toggleIsLoading(false);
      }
    };

    handleProviderLogin();
  }, [router]);

  useEffect(() => {
    modifyLayout("set");
    return () => modifyLayout("unset");
  }, []);

  const handleGoogleLogin = () =>
    (window.location.href = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL);

  useRedirect("/main/personal/profile", () => {
    if (!isServer()) modifyLayout("unset");
  });

  return (
    <section className={styles.login} id="login">
      <h1 className={styles["login-h1"]}>User Sign up/in</h1>
      <button onClick={() => router.back()}>
        <i className="fas fa-arrow-left"></i>Go back
      </button>

      <div className={styles["login-container"]}>
        <div className={styles["card"]}>
          <div className={styles["signin-card"]}>
            <h2>Already have an account?</h2>
            <button onClick={() => toggleIsSigningUp(false)}>Sign in</button>
          </div>
          <div className={styles["signup-card"]}>
            <h2>Don't have an account?</h2>
            <button onClick={() => toggleIsSigningUp(true)}>Sign up</button>
          </div>
        </div>
        <div
          className={`${styles["input-section"]} ${
            isSigningUp ? styles["user-signup"] : ""
          }`}
        >
          <div className={styles["section-container"]}>
            <article>
              <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                <p>
                  <input
                    id="signin-name"
                    type="text"
                    value={signInForm?.username ?? ""}
                    onChange={(e) =>
                      setSignInForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    required
                  />
                  <label htmlFor="signin-name">Username</label>
                </p>
                <p>
                  <input
                    id="signin-password"
                    type="password"
                    value={signInForm?.password ?? ""}
                    onChange={(e) =>
                      setSignInForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                  <label htmlFor="signin-password">Password</label>
                </p>
                <input type="submit" value="Sign in" />
                <button onClick={handleGoogleLogin}>
                  <i className="fab fa-google"></i>Sign in with Google
                </button>
              </form>
            </article>
            <article>
              <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <p>
                  <input
                    id="signup-name"
                    type="text"
                    value={signUpForm?.username ?? ""}
                    onChange={(e) =>
                      setSignUpForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    required
                  />
                  <label htmlFor="signup-name">Username</label>
                </p>
                <p>
                  <input
                    id="signup-password"
                    type="password"
                    value={signUpForm?.password ?? ""}
                    onChange={(e) =>
                      setSignUpForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                  <label htmlFor="signup-password">Password</label>
                </p>
                <p>
                  <input
                    id="signup-email"
                    type="text"
                    value={signUpForm?.email ?? ""}
                    onChange={(e) =>
                      setSignUpForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                  <label htmlFor="signup-email">Email</label>
                </p>
                <input type="submit" value="Sign up" />
                <button onClick={handleGoogleLogin}>
                  <i className="fab fa-google"></i>Sign up with Google
                </button>
              </form>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

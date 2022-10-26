import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMeQuery } from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import styles from "./Header.module.css";

interface Props {}

const navs = ["home", "about", "products", "members", "contact"];

const Header: React.FC<Props> = () => {
  const [navIdx, setNavIdx] = useState<number>(0);
  const [isNavAutoScrolling, toggleIsNavAutoScrolling] =
    useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const navsCheckboxRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data } = useMeQuery({ skip: isServer() });

  const handleScroll = useCallback(() => {
    if (headerRef?.current) {
      headerRef.current.classList.toggle("sticky", window.scrollY > 0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isNavAutoScrolling) return;

    const targets = document.querySelectorAll(".app main section");

    const targetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, entryIdx) => {
          if (entry.isIntersecting) {
            const targetID = entry.target.id;
            // console.log("now intersecting", entryIdx, t);
            setNavIdx(navs.indexOf(targetID));
            // observer.disconnect();
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: [0.3],
      }
    );

    targets.forEach((target) => targetObserver.observe(target));

    return () => targets.forEach((target) => targetObserver.unobserve(target));
  }, [isNavAutoScrolling, router.pathname]);

  useEffect(() => {
    // console.log(`pathname change`);
    // console.log(router)
    if (router.query.contact_us || router.query.homepage) {
      let targetElement: HTMLElement;

      if (router.query.contact_us) {
        targetElement = document.getElementById("contact");
      } else {
        targetElement = document.getElementById(
          router.query.homepage as string
        );
      }

      const bodyTop = document.body.getBoundingClientRect().top;
      const targetElementTop = targetElement.getBoundingClientRect().top;

      window.scrollTo({
        top: targetElementTop - bodyTop - 72,
        behavior: "auto",
      });
    }
  }, [router.pathname]);

  const handleNavClick = (
    i: number,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (i === navIdx) return;

    setNavIdx(i);
    // document.getElementById("navs-checkbox").checked = false;
    navsCheckboxRef.current.checked = false;
    const targetId = (e.target as HTMLAnchorElement).hash.slice(1);

    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      document.body.classList.remove("login");
      (
        document.querySelector("footer div:nth-of-type(1)") as HTMLDivElement
      ).style.display = "flex";
      router.push({
        pathname: "/",
        query: { homepage: targetId },
      });
      return;
    }

    const bodyTop = document.body.getBoundingClientRect().top;
    const targetElementTop = targetElement.getBoundingClientRect().top;

    toggleIsNavAutoScrolling(true);
    setTimeout(() => toggleIsNavAutoScrolling(false), 1500);

    window.scrollTo({
      top: targetElementTop - bodyTop - 72,
      behavior: "smooth",
    });
  };

  return (
    <header className={styles.header} ref={headerRef}>
      <h1>
        <Link href={"/#home"}>
          <a onClick={(e) => handleNavClick(0, e)}>
            <i className="fas fa-pepper-hot"></i>
            Banana
          </a>
        </Link>
      </h1>
      <div className="spacer-1"></div>
      <nav className={styles.nav}>
        <input ref={navsCheckboxRef} id="navs-checkbox" type="checkbox" />
        <i className={`${styles["fas"]} ${styles["fa-bars"]} fas fa-bars`}></i>
        <i
          className={`${styles["fas"]} ${styles["fa-times"]} fas fa-times`}
        ></i>

        <ul>
          {navs.map((nav, i) => (
            <li style={{ "--i": i } as HTMLAttributes<HTMLLIElement>} key={nav}>
              <Link href={"/#" + nav}>
                <a
                  className={navIdx === i ? styles.active : ""}
                  onClick={(e) => handleNavClick(i, e)}
                >
                  {nav}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <label
          htmlFor="navs-checkbox"
          className={styles["menu-header-cover"]}
        ></label>

        <button
          onClick={() =>
            router.push(data?.me.account ? "/main/personal/profile" : "/login")
          }
        >
          <img
            src={
              data?.me.account?.img_url
                ? data.me.account.img_url
                : "/images/default_user.png"
            }
            alt=""
          />
          <span>{data?.me.account?.name ? data.me.account.name : "Login"}</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;

/*
        <li style="--i: 0;"><a href="#home" className="active">Home</a></li>
        <li style="--i: 1;"><a href="#about">About</a></li>
        <li style="--i: 2;"><a href="#products">Products</a></li>
        <li style="--i: 3;"><a href="#members">Members</a></li>
        <li style="--i: 4;"><a href="#contact">Contact</a></li>
*/

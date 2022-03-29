import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  BlogInput,
  GetAllBlogsDocument,
  GetMostCommentsBlogDocument,
  GetMostLikeBlogDocument,
  GetNumOfBlogsDocument,
  GetNumOfPostAndBlogDocument,
  GetNumOfUserProductOrderBlogDocument,
  MeDocument,
  MeQuery,
  useCreateBlogMutation,
} from "../../../../generated/graphql";
import { BlogSortType } from "../../../../types";
import { Loading } from "../../../personalPage";
import styles from "./Forum.module.css";
import ForumBlogs from "./ForumBlogs";

interface Props {}

interface AddBlogValue {
  content: string;
  image: File;
  img_src: string;
}

const Forum: React.FC<Props> = () => {
  const [blogSortType, setBlogSortType] = useState<string>(BlogSortType[0]);
  const [showAddBlog, toggleShowAddBlog] = useState<boolean>(false);
  const [addBlogValue, setAddBlogValue] = useState<AddBlogValue>(null);
  const [isUploading, toggleIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const typeSelectMenu = useRef<HTMLLabelElement>(null);
  const commentTypeSelectMenu = useRef<(HTMLLabelElement | undefined)[]>([]);
  const client = useApolloClient();
  const meQuery = client.readQuery<MeQuery>({ query: MeDocument });
  const [createBlog] = useCreateBlogMutation();

  useEffect(() => {
    // console.log("image change");
    if (!addBlogValue?.image) return;

    const reader = new FileReader();

    reader.onloadend = (e) => {
      setAddBlogValue((prev) => ({
        ...prev,
        img_src: e.target.result as string,
      }));
    };

    reader.onerror = () => {
      window.alert("Sorry! Your image cannot be accepted.");
      setAddBlogValue((prev) => ({ ...prev, img_src: "", image: null }));
    };

    reader.readAsDataURL(addBlogValue.image);
  }, [addBlogValue?.image]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const elTarget = e.target as HTMLElement;

      // console.log(e.target);
      // console.log(
      //   "(typeSelectMenu.current).contains(elTarget))",
      //   typeSelectMenu.current.contains(elTarget)
      // );

      // console.log(typeSelectMenu.current);
      // console.log(commentTypeSelectMenu.current);

      if (
        !typeSelectMenu?.current ||
        !commentTypeSelectMenu?.current ||
        typeSelectMenu.current.contains(elTarget) ||
        commentTypeSelectMenu.current.some((c) => c && c.contains(elTarget)) ||
        elTarget.id === "blog-sort-type-checkbox" ||
        /comments-[0-9]+-sort-type-checkbox/.test(elTarget.id)
      ) {
        // console.log(commentTypeSelectMenu?.current);
        // console.log("return here");
        return;
      }
      // console.log("set checkbox false");
      (
        document.getElementById("blog-sort-type-checkbox") as HTMLInputElement
      ).checked = false;
      (
        document.querySelectorAll(
          "input[type='checkbox'].comments-sort-type-checkbox"
        ) as NodeListOf<HTMLInputElement>
      ).forEach((el) => (el.checked = false));
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSortTypeClick = (type: string) => {
    setBlogSortType(type);
    // (document.getElementById("blog-sort-type-checkbox") as HTMLInputElement).checked = false;
  };

  const clearMeQuery = () => {
    const cache = client.cache;
    // cache.evict({ id: cache.identify(meQuery.me) });

    cache.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        __typename: "Query",
        me: {},
      },
    });
  };

  const handleBlogSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUploading) return;

    const account_id = meQuery?.me.account?.id;
    if (!account_id) {
      if (window.confirm("You are not logging in. \nLogin in now?")) {
        return router.push("/login");
      }
      return;
    }

    if (!addBlogValue?.content) {
      return window.alert("Your blog content can't be empty!");
    }

    const blogInput: BlogInput = { account_id, content: addBlogValue.content };
    console.log("blogInput: ", blogInput);

    toggleIsUploading(true);

    await createBlog({
      variables: {
        blogInput,
        user_img: addBlogValue.image || null,
      },
      refetchQueries: [
        { query: GetNumOfBlogsDocument },
        { query: GetAllBlogsDocument },
        { query: GetMostLikeBlogDocument },
        { query: GetMostCommentsBlogDocument },
        {
          query: GetNumOfPostAndBlogDocument,
          variables: { account_id: meQuery?.me.account?.id ?? "0" },
        },
        { query: GetNumOfUserProductOrderBlogDocument },
      ],
      update: () => {
        window.alert("Your blog is created successfully!");
        toggleShowAddBlog(false);
        setAddBlogValue(null);
      },
      onError: (err) => {
        console.log("Fail to create blog - ", err.message);
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            clearMeQuery();
            router.push("/login");
          }
        } else window.alert("Something went wrong. Please try again!");
      },
    });
    toggleIsUploading(false);
  };

  return (
    <section className={styles.forum}>
      <h1 className={styles["forum-list-h1"]}>Forum</h1>

      <div className={styles["forum-container"]}>
        <div className={styles["select-and-add"]}>
          <div className={styles["select-menu"]}>
            <input type="checkbox" id="blog-sort-type-checkbox" />
            <label ref={typeSelectMenu} htmlFor="blog-sort-type-checkbox">
              <span>{blogSortType}</span>
              <b></b>
            </label>

            <ul>
              {BlogSortType.map((b) => (
                <li key={b} onClick={() => handleSortTypeClick(b)}>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {!showAddBlog && (
            <button onClick={() => toggleShowAddBlog(true)}>
              <i className="fas fa-plus"></i>Add blog
            </button>
          )}
        </div>

        {showAddBlog && (
          <form
            onSubmit={(e) => handleBlogSubmit(e)}
            className={styles["add-zone"]}
          >
            {isUploading && <Loading />}
            <div className={styles["add-zone-header"]}>
              <div className={styles["imgBx"]}>
                <img
                  src={
                    meQuery?.me.account?.img_url || "/images/default_user.png"
                  }
                  alt=""
                />
              </div>
              <p>{meQuery?.me.account?.name || "Loading..."}</p>
            </div>

            <div className={styles["add-zone-content"]}>
              <textarea
                required
                placeholder="Create a post..."
                rows={4}
                onChange={(e) =>
                  setAddBlogValue((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
              ></textarea>
            </div>

            {addBlogValue?.img_src && (
              <div className={styles["add-zone-image"]}>
                <img src={addBlogValue.img_src} alt="" />
              </div>
            )}

            <input
              id="add-zone-select-image"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/tiff"
              onChange={(e) =>
                setAddBlogValue((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
            />

            <div className={styles["add-zone-btns"]}>
              <label
                className={styles["add-img"]}
                htmlFor="add-zone-select-image"
              >
                <i className="fas fa-plus"></i>Add blog image
              </label>
              <label className={styles["submit"]}>
                <input type="submit" value="Submit" />
                <i className="fas fa-check"></i>
                Submit
              </label>
              <button onClick={() => toggleShowAddBlog(false)}>
                <i className="fas fa-times"></i>Cancel
              </button>
            </div>
          </form>
        )}

        <ForumBlogs
          clearMeQuery={clearMeQuery}
          account_id={meQuery?.me.account?.id}
          account_img_url={
            meQuery?.me.account?.img_url || "/images/default_user.png"
          }
          blogSortType={blogSortType}
          commentTypeSelectMenu={commentTypeSelectMenu}
        />
      </div>
    </section>
  );
};

export default Forum;

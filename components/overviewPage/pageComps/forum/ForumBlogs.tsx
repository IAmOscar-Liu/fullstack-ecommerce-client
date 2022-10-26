/* eslint-disable react-hooks/rules-of-hooks */
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  BlogCommentDetailSnippetFragmentDoc,
  BlogData,
  BlogDetailSnippetFragmentDoc,
  useCreateBlogCommentLikeMutation,
  useCreateBlogCommentMutation,
  useCreateBlogLikeMutation,
  useGetAllBlogsQuery,
  useGetMostCommentsBlogQuery,
  useGetMostLikeBlogQuery,
} from "../../../../generated/graphql";
import { BlogSortType, CommentSortType } from "../../../../types";
import { getDate } from "../../../../utils/getDate";
import { useDebounce } from "../../../../utils/useDebounce";
import styles from "./Forum.module.css";

interface Props {
  account_id: string;
  account_img_url: string;
  blogSortType: string;
  commentTypeSelectMenu: MutableRefObject<HTMLLabelElement[]>;
  clearMeQuery: () => void;
}

const ForumBlogs: React.FC<Props> = ({
  account_id,
  account_img_url,
  blogSortType,
  commentTypeSelectMenu,
  clearMeQuery,
}) => {
  const router = useRouter();
  const blogSortTypeRef = useRef<string>(blogSortType);
  const [showComments, setShowComments] = useState<Array<boolean>>([]);
  const [commentsSortType, setCommentsSortType] = useState<Array<string>>([]);
  const [blogCommentValue, setBlogCommentValue] = useState<Array<string>>([]);
  // "Latest", "Most likes", "Most comments"
  const allQuery = useGetAllBlogsQuery({
    skip: blogSortType !== BlogSortType[0],
  });
  const mostLikeQuery = useGetMostLikeBlogQuery({
    skip: blogSortType !== BlogSortType[1],
  });
  const mostCommentsQuery = useGetMostCommentsBlogQuery({
    skip: blogSortType !== BlogSortType[2],
  });
  const [createBlogLike] = useCreateBlogLikeMutation();
  const [createBlogComment] = useCreateBlogCommentMutation();
  const [createBlogCommentLike] = useCreateBlogCommentLikeMutation();

  const [blogData, setBlogData] = useState<BlogData>(
    (allQuery.data?.getAllBlogs as BlogData) ||
      (mostLikeQuery.data?.getMostLikeBlog as BlogData) ||
      (mostCommentsQuery.data?.getMostCommentsBlog as BlogData)
  );
  const [isLoading, toggleIsLoading] = useState<boolean>(
    !(allQuery.data || mostLikeQuery.data || mostCommentsQuery.data)
  );
  const [error, setError] = useState<string>("");
  const [hasBlogBeenUpdated, toggleHasBlogBeenUpdated] =
    useState<boolean>(false);

  //  setShowComments(Array(forum_list.length).fill(false));
  //  setCommentsSortType(Array(forum_list.length).fill(CommentSortType[0]));

  useEffect(() => {
    const handleQuery = (
      data: BlogData,
      loading: boolean,
      error: ApolloError
    ) => {
      if (loading) {
        toggleIsLoading(true);
        setBlogData(null);
        setError("");
      } else if (!loading && error) {
        toggleIsLoading(false);
        setBlogData(null);
        setError(error.message);
      } else {
        toggleIsLoading(false);
        setBlogData(data);
        setError("");
      }
    };

    if (hasBlogBeenUpdated) {
      allQuery.refetch();
      mostCommentsQuery.refetch();
      mostLikeQuery.refetch();
      toggleHasBlogBeenUpdated(false);
    }

    if (blogSortType === BlogSortType[0]) {
      const { data, loading, error } = allQuery;
      handleQuery(data?.getAllBlogs as BlogData, loading, error);
    } else if (blogSortType === BlogSortType[1]) {
      const { data, loading, error } = mostLikeQuery;
      handleQuery(data?.getMostLikeBlog as BlogData, loading, error);
    } else {
      const { data, loading, error } = mostCommentsQuery;
      handleQuery(data?.getMostCommentsBlog as BlogData, loading, error);
    }

    return () => {
      toggleIsLoading(true);
      setError("");
      setBlogData(null);
    };
  }, [blogSortType, allQuery, mostLikeQuery, mostCommentsQuery]);

  useEffect(() => {
    if (blogData?.blogs) {
      const blogLength = blogData.blogs.length;
      console.log("length: ", blogLength);
      if (blogSortTypeRef.current === blogSortType) {
        setShowComments((prev) =>
          Array(blogLength)
            .fill(false)
            .map((m, i) => (prev[i] === undefined ? m : prev[i]))
        );
        setCommentsSortType((prev) =>
          Array(blogLength)
            .fill(CommentSortType[0])
            .map((m, i) => (prev[i] === undefined ? m : prev[i]))
        );
        setBlogCommentValue((prev) =>
          Array(blogLength)
            .fill("")
            .map((m, i) => (prev[i] === undefined ? m : prev[i]))
        );
      } else {
        console.log("reset showComments and setCommentsSortType");
        setShowComments(Array(blogLength).fill(false));
        setCommentsSortType(Array(blogLength).fill(CommentSortType[0]));
        setBlogCommentValue(Array(blogLength).fill(""));
        blogSortTypeRef.current = blogSortType;
      }
    }
  }, [blogData, blogSortType]);

  useEffect(() => {
    const handleReachBottom = useDebounce(() => {
      // console.log("Scrolling");
      // console.log("blogs length: ", blogData?.blogs.length);
      // console.log("has more blogs ? ", blogData?.hasMore);
      // console.log("document.body.offsetHeight = ", document.body.offsetHeight);
      if (
        blogData?.hasMore &&
        blogData?.blogs &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      ) {
        console.log("You have reached the bottom of the page");
        console.log("Fetch more from offset: ", blogData.blogs.length);
        // "Latest", "Most likes", "Most comments"
        switch (blogSortType) {
          case "Latest":
            allQuery.fetchMore({
              variables: { offset: blogData.blogs.length },
              updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                return {
                  ...fetchMoreResult,
                  getAllBlogs: {
                    ...fetchMoreResult.getAllBlogs,
                    blogs: [
                      ...previousQueryResult.getAllBlogs.blogs,
                      ...fetchMoreResult.getAllBlogs.blogs,
                    ],
                  },
                };
              },
            });
            break;
          case "Most likes":
            mostLikeQuery.fetchMore({
              variables: { offset: blogData.blogs.length },
              updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                return {
                  ...fetchMoreResult,
                  getMostLikeBlog: {
                    ...fetchMoreResult.getMostLikeBlog,
                    blogs: [
                      ...previousQueryResult.getMostLikeBlog.blogs,
                      ...fetchMoreResult.getMostLikeBlog.blogs,
                    ],
                  },
                };
              },
            });
            break;
          default:
            mostCommentsQuery.fetchMore({
              variables: { offset: blogData.blogs.length },
              updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                return {
                  ...fetchMoreResult,
                  getMostCommentsBlog: {
                    ...fetchMoreResult.getMostCommentsBlog,
                    blogs: [
                      ...previousQueryResult.getMostCommentsBlog.blogs,
                      ...fetchMoreResult.getMostCommentsBlog.blogs,
                    ],
                  },
                };
              },
            });
            break;
        }
      }
    });

    window.addEventListener("scroll", handleReachBottom);
    return () => window.removeEventListener("scroll", handleReachBottom);
  }, [blogData]);

  const handleCommentSortTypeClick = (i: number, type: string) => {
    setCommentsSortType((prev) => prev.map((p, _i) => (_i === i ? type : p)));
    // (document.getElementById("blog-sort-type-checkbox") as HTMLInputElement).checked = false;
  };

  const goToUser = (user_id: string) => {
    if (!user_id || !account_id) return;

    if (account_id === user_id) {
      router.push(`/main/personal/profile`);
    } else {
      router.push(`/main/personal/profile?account_id=${user_id}`);
    }
  };

  if (isLoading)
    return (
      <div className={styles["content"]}>
        <div>Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className={styles["content"]}>
        <div>Something went wrong: {error}</div>
      </div>
    );

  return (
    <div className={styles["content"]}>
      {blogData?.blogs &&
        blogData.blogs.map((blog, i) => (
          <article key={i} className={styles["forum-article"]}>
            <div className={styles["article-header"]}>
              <div className={styles["imgBx"]}>
                <img
                  src={blog.account_img_url}
                  alt=""
                  className="go-to-user"
                  onClick={() => goToUser(blog.account_id)}
                />
              </div>
              <div className={styles["info"]}>
                <p
                  className="go-to-user"
                  onClick={() => goToUser(blog.account_id)}
                >
                  {blog.account_name}
                </p>
                <span>{getDate(parseInt(blog.createdAt), true)}</span>
              </div>
            </div>

            <div className={styles["article-content"]}>
              <p>{blog.content}</p>
              {blog.img_url && (
                <div className={styles["imgBx"]}>
                  <img src={blog.img_url} alt="" />
                </div>
              )}
            </div>

            <div className={styles["likes-and-comments"]}>
              <p>
                <i
                  className="fas fa-thumbs-up"
                  onClick={() => {
                    // console.log("account_id", account_id);
                    if (!account_id) {
                      if (
                        window.confirm(
                          "You are not logging in. \nLogin in now?"
                        )
                      ) {
                        return router.push("/login");
                      }
                      return;
                    }
                    createBlogLike({
                      variables: {
                        blogLikeInput: {
                          blog_id: blog.id,
                          account_id,
                        },
                      },
                      update: (cache, { data }) => {
                        cache.writeFragment({
                          id: cache.identify(blog),
                          fragmentName: "BlogDetailSnippet",
                          fragment: BlogDetailSnippetFragmentDoc,
                          data: {
                            ...blog,
                            blogLikeCount: data.createBlogLike.blogLike,
                          },
                        });
                        toggleHasBlogBeenUpdated(true);
                      },
                      onError: (err) => {
                        console.log("Fail to like this blog - ", err.message);
                        if (err.message.startsWith("Access denied")) {
                          if (
                            window.confirm(
                              "You have been logged out. Please log in again."
                            )
                          ) {
                            clearMeQuery();
                            router.push("/login");
                          }
                        } else if (err.message.startsWith("Duplicate entry")) {
                          window.alert("You have already liked this blog.");
                        } else {
                          window.alert(
                            "Something went wrong. Please try again."
                          );
                        }
                      },
                    });
                  }}
                ></i>
                <span>{blog.blogLikeCount ?? 0}</span>
                <i
                  className="fas fa-comments"
                  onClick={() =>
                    setShowComments((prev) =>
                      prev.map((p, _i) => (_i === i ? !p : p))
                    )
                  }
                ></i>
                <span>{blog.blogCommentCount ?? 0}</span>
              </p>
              {(blog.blogCommentCount ?? 0) > 0 && !showComments[i] && (
                <button
                  onClick={() =>
                    setShowComments((prev) =>
                      prev.map((p, _i) => (_i === i ? !p : p))
                    )
                  }
                >
                  Show comments
                </button>
              )}
              {(blog.blogCommentCount ?? 0) > 0 && showComments[i] && (
                <div className={styles["comment-type-menu"]}>
                  <input
                    type="checkbox"
                    className="comments-sort-type-checkbox"
                    id={`comments-${i + 1}-sort-type-checkbox`}
                  />
                  <label
                    ref={(e) => (commentTypeSelectMenu.current[i] = e)}
                    htmlFor={`comments-${i + 1}-sort-type-checkbox`}
                  >
                    <span>{commentsSortType[i]}</span>
                    <b></b>
                  </label>

                  <ul>
                    {CommentSortType.map((b) => (
                      <li
                        key={b}
                        onClick={() => handleCommentSortTypeClick(i, b)}
                      >
                        {b}
                      </li>
                    ))}
                    <li
                      style={{ background: "#f33e3e", color: "#eee" }}
                      onClick={() =>
                        setShowComments((prev) =>
                          prev.map((p, _i) => (_i === i ? !p : p))
                        )
                      }
                    >
                      Close comments
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className={styles["comments"]}>
              <div className={styles["add-comment"]}>
                <div className={styles["imgBx"]}>
                  <img src={account_img_url} alt="" />
                </div>
                <div className={styles["input-comment"]}>
                  <textarea
                    placeholder="Leave a comment..."
                    rows={2}
                    value={blogCommentValue[i] || ""}
                    onChange={(e) =>
                      setBlogCommentValue((prev) =>
                        prev.map((p, _i) => (i === _i ? e.target.value : p))
                      )
                    }
                  ></textarea>
                </div>
                <i
                  className="fas fa-plus"
                  onClick={() => {
                    if (!blogCommentValue[i]) return;
                    if (!account_id) {
                      if (
                        window.confirm(
                          "You are not logging in. \nLogin in now?"
                        )
                      ) {
                        return router.push("/login");
                      }
                      return;
                    }
                    createBlogComment({
                      variables: {
                        blogCommentInput: {
                          account_id,
                          blog_id: blog.id,
                          content: blogCommentValue[i],
                        },
                      },
                      update: (cache, { data }) => {
                        const newComment = data.createBlogComment.blogComment;

                        // console.log("modify id ", cache.identify(blog));
                        // console.log("newComment ", newComment);

                        cache.modify({
                          id: cache.identify(blog),
                          fields: {
                            blogComments(existingCommentRef = []) {
                              const newCommentRef = cache.writeFragment({
                                fragment: BlogCommentDetailSnippetFragmentDoc,
                                data: newComment,
                              });
                              return [newCommentRef, ...existingCommentRef];
                            },
                          },
                        });

                        setBlogCommentValue((prev) =>
                          prev.map((p, _i) => (i === _i ? "" : p))
                        );
                        toggleHasBlogBeenUpdated(true);
                      },
                      onError: (err) => {
                        console.log(
                          `Fail to create blog comment - ${err.message}`
                        );
                        if (err.message.startsWith("Access denied")) {
                          if (
                            window.confirm(
                              "You have been logged out. Please log in again."
                            )
                          ) {
                            clearMeQuery();
                            router.push("/login");
                          }
                        } else
                          window.alert(
                            "Something went wrong. Please try again."
                          );
                      },
                    });
                  }}
                ></i>
              </div>

              <div
                className={`${styles["comments-content"]} ${
                  showComments[i] ? styles["show"] : ""
                }`}
              >
                {(commentsSortType[i] === "Most likes"
                  ? [...blog.blogComments].sort(
                      (a, b) => b.blogCommentLikeCount - a.blogCommentLikeCount
                    )
                  : blog.blogComments
                ).map((blogComment, cI) => (
                  <article key={cI}>
                    <div className={styles["imgBx"]}>
                      <img
                        src={blogComment.account_img_url}
                        alt=""
                        className="go-to-user"
                        onClick={() => goToUser(blogComment.account_id)}
                      />
                    </div>
                    <div className={styles["comment-info"]}>
                      <h3>
                        <span
                          className="go-to-user"
                          onClick={() => goToUser(blogComment.account_id)}
                        >
                          {blogComment.account_name}
                        </span>
                        <b>{getDate(parseInt(blogComment.createdAt), true)}</b>
                      </h3>
                      <p>
                        {blogComment.content}

                        <span
                          onClick={() => {
                            if (!account_id) {
                              if (
                                window.confirm(
                                  "You are not logging in. \nLogin in now?"
                                )
                              ) {
                                return router.push("/login");
                              }
                              return;
                            }
                            createBlogCommentLike({
                              variables: {
                                blogCommentLikeInput: {
                                  account_id,
                                  blog_comment_id: blogComment.id,
                                },
                              },
                              update: (cache, { data }) => {
                                const newBlogCommentLikeCount =
                                  data.createBlogCommentLike.blogCommentLike;
                                cache.writeFragment({
                                  id: cache.identify(blogComment),
                                  fragment: BlogCommentDetailSnippetFragmentDoc,
                                  data: {
                                    ...blogComment,
                                    blogCommentLikeCount:
                                      newBlogCommentLikeCount,
                                  },
                                });
                                toggleHasBlogBeenUpdated(true);
                              },
                              onError: (err) => {
                                console.log(
                                  `Fail to create blog comment like - ${err.message}`
                                );
                                if (err.message.startsWith("Access denied")) {
                                  if (
                                    window.confirm(
                                      "You have been logged out. Please log in again."
                                    )
                                  ) {
                                    clearMeQuery();
                                    router.push("/login");
                                  }
                                } else if (
                                  err.message.startsWith("Duplicate entry")
                                ) {
                                  window.alert(
                                    "You have already liked this comment."
                                  );
                                } else {
                                  window.alert(
                                    "Something went wrong. Please try again."
                                  );
                                }
                              },
                            });
                          }}
                        >
                          <i className="fas fa-thumbs-up"></i>
                          <b>{blogComment.blogCommentLikeCount}</b>
                        </span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </article>
        ))}
    </div>
  );
};

export default ForumBlogs;

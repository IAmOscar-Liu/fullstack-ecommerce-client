import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  CommentDetailSnippetFragmentDoc,
  PostData,
  PostDetailSnippetFragmentDoc,
  useCreateCommentLikeMutation,
  useCreateCommentMutation,
  useCreatePostLikeMutation,
  useGetMostCommentsPostsByProductIdQuery,
  useGetMostLikePostsByProductIdQuery,
  useGetPostsByProductIdQuery,
} from "../../../generated/graphql";
import { CommentSortType, PostSortType } from "../../../types";
import { getDate } from "../../../utils/getDate";
import { useDebounce } from "../../../utils/useDebounce";
import styles from "./SingleProduct.module.css";

interface Props {
  product_id: number;
  account_id: string;
  account_img_url: string;
  showPosts: boolean;
  postSortType: string;
  commentTypeSelectMenu: MutableRefObject<HTMLLabelElement[]>;
  clearMeQuery: () => void;
  goToUser: (user_id: string) => void;
}

// PostSortType = ["Latest", "Most likes", "Most replies"];
// CommentSortType = ["Latest", "Most likes"];

const SingleProductPost: React.FC<Props> = ({
  product_id,
  account_id,
  account_img_url,
  showPosts,
  postSortType,
  commentTypeSelectMenu,
  clearMeQuery,
  goToUser,
}) => {
  const router = useRouter();
  const postSortTypeRef = useRef<string>(postSortType);
  const [showComments, setShowComments] = useState<Array<boolean>>([]);
  const [commentsSortType, setCommentsSortType] = useState<Array<string>>([]);
  const [commentValue, setCommentValue] = useState<Array<string>>([]);
  const allQuery = useGetPostsByProductIdQuery({
    skip: postSortType !== PostSortType[0],
    variables: { product_id },
  });
  const mostLikeQuery = useGetMostLikePostsByProductIdQuery({
    skip: postSortType !== PostSortType[1],
    variables: { product_id },
  });
  const mostCommentsQuery = useGetMostCommentsPostsByProductIdQuery({
    skip: postSortType !== PostSortType[2],
    variables: { product_id },
  });

  const [postData, setPostData] = useState<PostData>(
    (allQuery.data?.getPostsByProductID as PostData) ||
      (mostLikeQuery.data?.getMostLikePostsByProductID as PostData) ||
      (mostCommentsQuery.data?.getMostCommentsPostsByProductID as PostData)
  );
  const [isLoading, toggleIsLoading] = useState<boolean>(
    !(allQuery.data || mostLikeQuery.data || mostCommentsQuery.data)
  );
  const [error, setError] = useState<string>("");
  const [hasPostBeenUpdated, toggleHasPostBeenUpdated] =
    useState<boolean>(false);
  const [createComment] = useCreateCommentMutation();
  const [createPostLike] = useCreatePostLikeMutation();
  const [createCommentLike] = useCreateCommentLikeMutation();

  useEffect(() => {
    const handleQuery = (
      data: PostData,
      loading: boolean,
      error: ApolloError
    ) => {
      if (loading) {
        toggleIsLoading(true);
        setPostData(null);
        setError("");
      } else if (!loading && error) {
        toggleIsLoading(false);
        setPostData(null);
        setError(error.message);
      } else {
        toggleIsLoading(false);
        setPostData(data);
        setError("");
      }
    };

    if (hasPostBeenUpdated) {
      allQuery.refetch();
      mostLikeQuery.refetch();
      mostCommentsQuery.refetch();
      toggleHasPostBeenUpdated(false);
    }

    if (postSortType === PostSortType[0]) {
      const { data, loading, error } = allQuery;
      handleQuery(data?.getPostsByProductID as PostData, loading, error);
    } else if (postSortType === PostSortType[1]) {
      const { data, loading, error } = mostLikeQuery;
      handleQuery(
        data?.getMostLikePostsByProductID as PostData,
        loading,
        error
      );
    } else {
      const { data, loading, error } = mostCommentsQuery;
      handleQuery(
        data?.getMostCommentsPostsByProductID as PostData,
        loading,
        error
      );
    }

    return () => {
      toggleIsLoading(true);
      setError("");
      setPostData(null);
    };
  }, [postSortType, allQuery, mostLikeQuery, mostCommentsQuery]);

  useEffect(() => {
    if (postData?.posts) {
      const postLength = postData.posts.length;
      console.log("post length: ", postLength);
      if (postSortTypeRef.current === postSortType) {
        setShowComments((prev) =>
          Array(postLength)
            .fill(false)
            .map((m, i) => (prev[i] === undefined ? m : prev[i]))
        );
        setCommentsSortType((prev) =>
          Array(postLength)
            .fill(CommentSortType[0])
            .map((m, i) => (prev[i] === undefined ? m : prev[i]))
        );
        setCommentValue((prev) =>
          Array(postLength)
            .fill("")
            .map((m, i) => (prev[i] === undefined ? m : prev[i]))
        );
      } else {
        console.log("reset showComments and setCommentsSortType");
        setShowComments(Array(postLength).fill(false));
        setCommentsSortType(Array(postLength).fill(CommentSortType[0]));
        setCommentValue(Array(postLength).fill(""));
        postSortTypeRef.current = postSortType;
      }
    }
  }, [postData, postSortType]);

  useEffect(() => {
    const handleReachBottom = useDebounce(() => {
      // console.log("posts length: ", postData?.posts.length);
      // console.log("has more posts ? ", postData?.hasMore);
      // console.log("showPosts: ", showPosts);
      // console.log(
      //   "window.innerHeight + window.scrollY = ",
      //   window.innerHeight + window.scrollY
      // );
      // console.log("document.body.offsetHeight = ", document.body.offsetHeight);
      if (
        showPosts &&
        postData?.hasMore &&
        postData?.posts &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        console.log("You have reached the bottom of the page");
        console.log("Fetch more from offset: ", postData.posts.length);
        // "Latest", "Most likes", "Most replies"
        switch (postSortType) {
          case "Latest":
            allQuery.fetchMore({
              variables: { offset: postData.posts.length },
              updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                return {
                  ...fetchMoreResult,
                  getPostsByProductID: {
                    ...fetchMoreResult.getPostsByProductID,
                    posts: [
                      ...previousQueryResult.getPostsByProductID.posts,
                      ...fetchMoreResult.getPostsByProductID.posts,
                    ],
                  },
                };
              },
            });
            break;
          case "Most likes":
            mostLikeQuery.fetchMore({
              variables: { offset: postData.posts.length },
              updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                return {
                  ...fetchMoreResult,
                  getMostLikePostsByProductID: {
                    ...fetchMoreResult.getMostLikePostsByProductID,
                    posts: [
                      ...previousQueryResult.getMostLikePostsByProductID.posts,
                      ...fetchMoreResult.getMostLikePostsByProductID.posts,
                    ],
                  },
                };
              },
            });
            break;
          default:
            mostCommentsQuery.fetchMore({
              variables: { offset: postData.posts.length },
              updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                return {
                  ...fetchMoreResult,
                  getMostCommentsPostsByProductID: {
                    ...fetchMoreResult.getMostCommentsPostsByProductID,
                    posts: [
                      ...previousQueryResult.getMostCommentsPostsByProductID
                        .posts,
                      ...fetchMoreResult.getMostCommentsPostsByProductID.posts,
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
  }, [postData, showPosts]);

  const handleCommentSortTypeClick = (i: number, type: string) => {
    setCommentsSortType((prev) => prev.map((p, _i) => (_i === i ? type : p)));
    // (document.getElementById("blog-sort-type-checkbox") as HTMLInputElement).checked = false;
  };

  if (isLoading) return <div>Loading posts...</div>;

  if (error) return <div>Fail to load posts: {error}</div>;

  return (
    <div
      className={`${styles["post-lists"]} ${showPosts ? styles["show"] : ""}`}
    >
      {postData?.posts &&
        postData.posts.map((post, i) => (
          <article key={i} className={styles["post-article"]}>
            <div className={styles["post-header"]}>
              <div className={styles["imgBx"]}>
                <img
                  src={post.account_img_url}
                  alt=""
                  className="go-to-user"
                  onClick={() => goToUser(post.account_id)}
                />
              </div>
              <div className={styles["info"]}>
                <p
                  className="go-to-user"
                  onClick={() => goToUser(post.account_id)}
                >
                  {post.account_name}
                </p>
                <span>{getDate(parseInt(post.createdAt), true)}</span>
              </div>
            </div>
            <div className={styles["post-content"]}>
              <p>{post.content}</p>
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
                    createPostLike({
                      variables: {
                        postLikeInput: {
                          post_id: post.id,
                          account_id,
                        },
                      },
                      update: (cache, { data }) => {
                        cache.writeFragment({
                          id: cache.identify(post),
                          fragmentName: "PostDetailSnippet",
                          fragment: PostDetailSnippetFragmentDoc,
                          data: {
                            ...post,
                            likeCount: data.createPostLike.postLike,
                          },
                        });
                        toggleHasPostBeenUpdated(true);
                      },
                      onError: (err) => {
                        console.log("Fail to like this post - ", err.message);
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
                          window.alert("You have already liked this post.");
                        } else {
                          window.alert(
                            "Something went wrong. Please try again."
                          );
                        }
                      },
                    });
                  }}
                ></i>
                <span>{post.likeCount ?? 0}</span>
                <i
                  className="fas fa-comments"
                  onClick={() =>
                    setShowComments((prev) =>
                      prev.map((p, _i) => (_i === i ? !p : p))
                    )
                  }
                ></i>
                <span>{post.comments.length}</span>
              </p>
              {post.comments.length > 0 && !showComments[i] && (
                <button
                  onClick={() =>
                    setShowComments((prev) =>
                      prev.map((p, _i) => (_i === i ? !p : p))
                    )
                  }
                >
                  Show replies
                </button>
              )}
              {post.comments.length > 0 && showComments[i] && (
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
                      Close replies
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
                    placeholder="Add a reply..."
                    rows={2}
                    value={commentValue[i]}
                    onChange={(e) =>
                      setCommentValue((prev) =>
                        prev.map((p, _i) => (i === _i ? e.target.value : p))
                      )
                    }
                  ></textarea>
                </div>
                <i
                  className="fas fa-plus"
                  onClick={() => {
                    if (!commentValue[i]) return;
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
                    createComment({
                      variables: {
                        commentInput: {
                          account_id,
                          post_id: post.id,
                          content: commentValue[i],
                        },
                      },
                      update: (cache, { data }) => {
                        const newComment = data.createComment.comment;

                        // console.log("modify id ", cache.identify(blog));
                        // console.log("newComment ", newComment);

                        cache.modify({
                          id: cache.identify(post),
                          fields: {
                            comments(existingCommentRef = []) {
                              const newCommentRef = cache.writeFragment({
                                fragment: CommentDetailSnippetFragmentDoc,
                                data: newComment,
                              });
                              return [newCommentRef, ...existingCommentRef];
                            },
                          },
                        });

                        setCommentValue((prev) =>
                          prev.map((p, _i) => (i === _i ? "" : p))
                        );
                        toggleHasPostBeenUpdated(true);
                      },
                      onError: (err) => {
                        console.log(`Fail to create comment - ${err.message}`);
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
                  ? [...post.comments].sort(
                      (a, b) => b.commentLikeCount - a.commentLikeCount
                    )
                  : post.comments
                ).map((comment, cI) => (
                  <article key={cI}>
                    <div className={styles["imgBx"]}>
                      <img
                        src={comment.account_img_url}
                        alt=""
                        className="go-to-user"
                        onClick={() => goToUser(comment.account_id)}
                      />
                    </div>
                    <div className={styles["comment-info"]}>
                      <h3>
                        <span
                          className="go-to-user"
                          onClick={() => goToUser(comment.account_id)}
                        >
                          {comment.account_name}
                        </span>
                        <b>{getDate(parseInt(comment.createdAt), true)}</b>
                      </h3>
                      <p>
                        {comment.content}
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
                            createCommentLike({
                              variables: {
                                commentLikeInput: {
                                  account_id,
                                  comment_id: comment.id,
                                },
                              },
                              update: (cache, { data }) => {
                                const newCommentLikeCount =
                                  data.createCommentLike.commentLike;
                                cache.writeFragment({
                                  id: cache.identify(comment),
                                  fragment: CommentDetailSnippetFragmentDoc,
                                  data: {
                                    ...comment,
                                    commentLikeCount: newCommentLikeCount,
                                  },
                                });
                                toggleHasPostBeenUpdated(true);
                              },
                              onError: (err) => {
                                console.log(
                                  `Fail to create comment like - ${err.message}`
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
                          {comment.commentLikeCount}
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

export default SingleProductPost;

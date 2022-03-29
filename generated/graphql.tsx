import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Account = {
  __typename?: 'Account';
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  img_url: Scalars['String'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_id?: Maybe<Scalars['String']>;
  updateAt: Scalars['String'];
};

export type AccountBrief = {
  __typename?: 'AccountBrief';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  img_url: Scalars['String'];
  name: Scalars['String'];
  updateAt: Scalars['String'];
};

export type AccountData = {
  __typename?: 'AccountData';
  accounts: Array<AccountBrief>;
  hasMore: Scalars['Boolean'];
};

export type AccountDetail = {
  __typename?: 'AccountDetail';
  access_token?: Maybe<Scalars['String']>;
  account?: Maybe<Account>;
};

export type BlogCommentDetail = {
  __typename?: 'BlogCommentDetail';
  account_id: Scalars['ID'];
  account_img_url: Scalars['String'];
  account_name: Scalars['String'];
  blogCommentLikeCount: Scalars['Float'];
  blog_id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
};

export type BlogCommentInput = {
  account_id: Scalars['ID'];
  blog_id: Scalars['ID'];
  content: Scalars['String'];
};

export type BlogCommentLikeInput = {
  account_id: Scalars['ID'];
  blog_comment_id: Scalars['ID'];
};

export type BlogData = {
  __typename?: 'BlogData';
  blogs?: Maybe<Array<BlogDetail>>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type BlogDetail = {
  __typename?: 'BlogDetail';
  account_id: Scalars['ID'];
  account_img_url: Scalars['String'];
  account_name: Scalars['String'];
  blogCommentCount?: Maybe<Scalars['Float']>;
  blogComments: Array<BlogCommentDetail>;
  blogLikeCount?: Maybe<Scalars['Float']>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  img_url?: Maybe<Scalars['String']>;
};

export type BlogInput = {
  account_id: Scalars['ID'];
  content: Scalars['String'];
};

export type BlogLikeInput = {
  account_id: Scalars['ID'];
  blog_id: Scalars['ID'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  img_url: Scalars['String'];
  name: Scalars['String'];
};

export type CategoryData = {
  __typename?: 'CategoryData';
  categories: Array<CategoryDetail>;
};

export type CategoryDetail = {
  __typename?: 'CategoryDetail';
  id: Scalars['ID'];
  img_url: Scalars['String'];
  name: Scalars['String'];
  number_of_product: Scalars['Float'];
};

export type CommentDetail = {
  __typename?: 'CommentDetail';
  account_id: Scalars['ID'];
  account_img_url: Scalars['String'];
  account_name: Scalars['String'];
  commentLikeCount: Scalars['Float'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  post_id: Scalars['ID'];
};

export type CommentInput = {
  account_id: Scalars['ID'];
  content: Scalars['String'];
  post_id: Scalars['ID'];
};

export type CommentLikeInput = {
  account_id: Scalars['ID'];
  comment_id: Scalars['ID'];
};

export type FavoriteData = {
  __typename?: 'FavoriteData';
  favorites?: Maybe<Array<FavoriteDetail>>;
};

export type FavoriteDetail = {
  __typename?: 'FavoriteDetail';
  account_id: Scalars['ID'];
  addedAt: Scalars['String'];
  id: Scalars['ID'];
  product_avg_rating?: Maybe<Scalars['Float']>;
  product_id: Scalars['ID'];
  product_img_url: Scalars['String'];
  product_isOnSale: Scalars['Boolean'];
  product_is_available: Scalars['Boolean'];
  product_name: Scalars['String'];
  product_price: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelOrder: Scalars['Boolean'];
  confirmOrder?: Maybe<OrderResult>;
  createBlog?: Maybe<NewBlogData>;
  createBlogComment: NewBlogCommentData;
  createBlogCommentLike: NewBlogCommentLikeData;
  createBlogLike: NewBlogLikeData;
  createComment: NewCommentData;
  createCommentLike: NewCommentLikeData;
  createFavoriteProduct: Scalars['Boolean'];
  createOrder?: Maybe<OrderResult>;
  createPost: NewPostData;
  createPostLike: NewPostLikeData;
  createProduct?: Maybe<Product>;
  deleteFavoriteProduct: Scalars['Boolean'];
  freezeOrUnFreezeProduct?: Maybe<Product>;
  login: AccountDetail;
  logout: Scalars['Boolean'];
  providerLogin: AccountDetail;
  rateProduct: RateProduct;
  register: AccountDetail;
  updateProduct?: Maybe<Product>;
  updateUser: AccountDetail;
};


export type MutationCancelOrderArgs = {
  account_id: Scalars['ID'];
  payment?: InputMaybe<Scalars['String']>;
  session_id: Scalars['String'];
};


export type MutationConfirmOrderArgs = {
  account_id: Scalars['ID'];
  session_id: Scalars['String'];
};


export type MutationCreateBlogArgs = {
  blogInput: BlogInput;
  user_img?: InputMaybe<Scalars['Upload']>;
};


export type MutationCreateBlogCommentArgs = {
  blogCommentInput: BlogCommentInput;
};


export type MutationCreateBlogCommentLikeArgs = {
  blogCommentLikeInput: BlogCommentLikeInput;
};


export type MutationCreateBlogLikeArgs = {
  blogLikeInput: BlogLikeInput;
};


export type MutationCreateCommentArgs = {
  commentInput: CommentInput;
};


export type MutationCreateCommentLikeArgs = {
  commentLikeInput: CommentLikeInput;
};


export type MutationCreateFavoriteProductArgs = {
  account_id: Scalars['Float'];
  product_id: Scalars['Float'];
};


export type MutationCreateOrderArgs = {
  orderInput: OrderInput;
};


export type MutationCreatePostArgs = {
  postInput: PostInput;
};


export type MutationCreatePostLikeArgs = {
  postLikeInput: PostLikeInput;
};


export type MutationCreateProductArgs = {
  file_1: Scalars['Upload'];
  file_2?: InputMaybe<Scalars['Upload']>;
  file_3?: InputMaybe<Scalars['Upload']>;
  file_4?: InputMaybe<Scalars['Upload']>;
  file_5?: InputMaybe<Scalars['Upload']>;
  productInput: ProductInput;
};


export type MutationDeleteFavoriteProductArgs = {
  account_id: Scalars['Float'];
  product_id: Scalars['Float'];
};


export type MutationFreezeOrUnFreezeProductArgs = {
  account_id: Scalars['ID'];
  isAvailable: Scalars['Boolean'];
  product_id: Scalars['ID'];
};


export type MutationLoginArgs = {
  userInput?: InputMaybe<UserInput>;
};


export type MutationProviderLoginArgs = {
  providerInput: ProviderInput;
};


export type MutationRateProductArgs = {
  rateInput: RateInput;
};


export type MutationRegisterArgs = {
  userRegister: UserRegisterInput;
};


export type MutationUpdateProductArgs = {
  account_id: Scalars['ID'];
  file_1?: InputMaybe<Scalars['Upload']>;
  file_2?: InputMaybe<Scalars['Upload']>;
  file_3?: InputMaybe<Scalars['Upload']>;
  file_4?: InputMaybe<Scalars['Upload']>;
  file_5?: InputMaybe<Scalars['Upload']>;
  productUpdateInput: ProductUpdateInput;
  product_id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  account_id: Scalars['ID'];
  userUpdateData: UserUpdateData;
  user_img?: InputMaybe<Scalars['Upload']>;
};

export type NewBlogCommentData = {
  __typename?: 'NewBlogCommentData';
  blogComment: BlogCommentDetail;
};

export type NewBlogCommentLikeData = {
  __typename?: 'NewBlogCommentLikeData';
  blogCommentLike: Scalars['Float'];
};

export type NewBlogData = {
  __typename?: 'NewBlogData';
  blog: BlogDetail;
};

export type NewBlogLikeData = {
  __typename?: 'NewBlogLikeData';
  blogLike: Scalars['Float'];
};

export type NewCommentData = {
  __typename?: 'NewCommentData';
  comment: CommentDetail;
};

export type NewCommentLikeData = {
  __typename?: 'NewCommentLikeData';
  commentLike: Scalars['Float'];
};

export type NewPostData = {
  __typename?: 'NewPostData';
  post: PostDetail;
};

export type NewPostLikeData = {
  __typename?: 'NewPostLikeData';
  postLike: Scalars['Float'];
};

export type NumOfPostAndBlog = {
  __typename?: 'NumOfPostAndBlog';
  total_blog: Scalars['Float'];
  total_post: Scalars['Float'];
};

export type NumOfUserProductOrderBlog = {
  __typename?: 'NumOfUserProductOrderBlog';
  total_blog: Scalars['Float'];
  total_order: Scalars['Float'];
  total_product: Scalars['Float'];
  total_user: Scalars['Float'];
};

export type NumberOfProductAllTypes = {
  __typename?: 'NumberOfProductAllTypes';
  all: Scalars['Float'];
  onSale: Scalars['Float'];
  popular: Scalars['Float'];
  topRated: Scalars['Float'];
};

export type OrderData = {
  __typename?: 'OrderData';
  hasMore?: Maybe<Scalars['Boolean']>;
  orders?: Maybe<Array<OrderDetail>>;
  total?: Maybe<Scalars['Float']>;
};

export type OrderDetail = {
  __typename?: 'OrderDetail';
  account_id: Scalars['ID'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  products?: Maybe<Array<OrderProductDetail>>;
  session_id: Scalars['String'];
  updateAt: Scalars['String'];
};

export type OrderInput = {
  account_id: Scalars['ID'];
  products: Array<OrderProductInput>;
};

export type OrderProductDetail = {
  __typename?: 'OrderProductDetail';
  id: Scalars['ID'];
  order_id: Scalars['ID'];
  orderedAt: Scalars['String'];
  payment: Scalars['String'];
  product_id: Scalars['ID'];
  product_img_url: Scalars['String'];
  product_name: Scalars['String'];
  product_price: Scalars['Float'];
  quantity: Scalars['Float'];
  status: Scalars['String'];
  updateAt: Scalars['String'];
};

export type OrderProductInput = {
  product_id: Scalars['ID'];
  quantity: Scalars['Float'];
};

export type OrderResult = {
  __typename?: 'OrderResult';
  amount_total?: Maybe<Scalars['Float']>;
  order?: Maybe<OrderDetail>;
  session_id?: Maybe<Scalars['String']>;
};

export type PostData = {
  __typename?: 'PostData';
  hasMore?: Maybe<Scalars['Boolean']>;
  posts?: Maybe<Array<PostDetail>>;
};

export type PostDetail = {
  __typename?: 'PostDetail';
  account_id: Scalars['ID'];
  account_img_url: Scalars['String'];
  account_name: Scalars['String'];
  commentCount?: Maybe<Scalars['Float']>;
  comments: Array<CommentDetail>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  likeCount?: Maybe<Scalars['Float']>;
  product_id: Scalars['ID'];
};

export type PostInput = {
  account_id: Scalars['ID'];
  content: Scalars['String'];
  product_id: Scalars['ID'];
};

export type PostLikeInput = {
  account_id: Scalars['ID'];
  post_id: Scalars['ID'];
};

export type Product = {
  __typename?: 'Product';
  addedAt: Scalars['String'];
  avg_rating?: Maybe<Scalars['Float']>;
  createdBy: Scalars['ID'];
  description: Scalars['String'];
  id: Scalars['ID'];
  img_url: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  isOnSale: Scalars['Boolean'];
  name: Scalars['String'];
  price: Scalars['Float'];
  rating_times?: Maybe<Scalars['Float']>;
  total_order_count?: Maybe<Scalars['Float']>;
  updateAt: Scalars['String'];
};

export type ProductBrief = {
  __typename?: 'ProductBrief';
  avg_rating?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  img_url: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  isOnSale: Scalars['Boolean'];
  name: Scalars['String'];
  price: Scalars['Float'];
  rating_times?: Maybe<Scalars['Float']>;
  total_order_count?: Maybe<Scalars['Float']>;
};

export type ProductData = {
  __typename?: 'ProductData';
  hasMore?: Maybe<Scalars['Boolean']>;
  products?: Maybe<Array<ProductBrief>>;
  total?: Maybe<Scalars['Float']>;
};

export type ProductDetail = {
  __typename?: 'ProductDetail';
  account_id: Scalars['ID'];
  account_img_url: Scalars['String'];
  account_name: Scalars['String'];
  addedAt: Scalars['String'];
  avg_rating?: Maybe<Scalars['Float']>;
  categories?: Maybe<Array<Category>>;
  createdBy: Scalars['ID'];
  description: Scalars['String'];
  id: Scalars['ID'];
  img_url: Scalars['String'];
  isAvailable: Scalars['Boolean'];
  isOnSale: Scalars['Boolean'];
  name: Scalars['String'];
  price: Scalars['Float'];
  rating_times?: Maybe<Scalars['Float']>;
  simularProducts?: Maybe<Array<ProductBrief>>;
  total_order_count?: Maybe<Scalars['Float']>;
  updateAt: Scalars['String'];
};

export type ProductInput = {
  categories: Array<Scalars['ID']>;
  createdBy: Scalars['ID'];
  descriptions: Array<Scalars['String']>;
  isOnSale: Scalars['Boolean'];
  price: Scalars['Float'];
  title: Scalars['String'];
};

export type ProductUpdateInput = {
  categories?: InputMaybe<Array<Scalars['ID']>>;
  descriptions?: InputMaybe<Array<Scalars['String']>>;
  imgs_url?: InputMaybe<Array<Scalars['String']>>;
  isOnSale?: InputMaybe<Scalars['Boolean']>;
};

export type ProviderInput = {
  provider: Scalars['String'];
  provider_id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllBlogs: BlogData;
  getAllCategory: CategoryData;
  getAllProducts: ProductData;
  getFavoriteByAccountID?: Maybe<FavoriteData>;
  getMostCommentsBlog: BlogData;
  getMostCommentsPostsByProductID: PostData;
  getMostLikeBlog: BlogData;
  getMostLikePostsByProductID: PostData;
  getNumOfBlogs: Scalars['Int'];
  getNumOfPostAndBlog: NumOfPostAndBlog;
  getNumOfPostsByProductID: Scalars['Int'];
  getNumOfUserProductOrderBlog: NumOfUserProductOrderBlog;
  getNumberOfFavoriteByAccountID?: Maybe<Scalars['Int']>;
  getNumberOfProductAllTypes: NumberOfProductAllTypes;
  getOnSaleProducts: ProductData;
  getOrdersByAccountID: OrderData;
  getPopularProducts: ProductData;
  getPostsByProductID: PostData;
  getProductByCategoryID: ProductData;
  getProductByCreatedBy: ProductData;
  getProductDetail?: Maybe<ProductDetail>;
  getProductsByIDs: ProductData;
  getRecentAccount: AccountData;
  getRecentOrderProducts: RecentOrderData;
  getTopRatedProducts: ProductData;
  me: AccountDetail;
  otherUser: AccountDetail;
};


export type QueryGetAllBlogsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetAllProductsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetFavoriteByAccountIdArgs = {
  account_id: Scalars['Float'];
};


export type QueryGetMostCommentsBlogArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetMostCommentsPostsByProductIdArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  product_id: Scalars['Float'];
};


export type QueryGetMostLikeBlogArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetMostLikePostsByProductIdArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  product_id: Scalars['Float'];
};


export type QueryGetNumOfPostAndBlogArgs = {
  account_id: Scalars['ID'];
};


export type QueryGetNumOfPostsByProductIdArgs = {
  product_id: Scalars['Float'];
};


export type QueryGetNumberOfFavoriteByAccountIdArgs = {
  account_id: Scalars['Float'];
};


export type QueryGetOnSaleProductsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetOrdersByAccountIdArgs = {
  account_id: Scalars['Float'];
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetPopularProductsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
};


export type QueryGetPostsByProductIdArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  product_id: Scalars['Float'];
};


export type QueryGetProductByCategoryIdArgs = {
  category_id: Scalars['Float'];
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetProductByCreatedByArgs = {
  createdBy: Scalars['Float'];
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetProductDetailArgs = {
  product_id: Scalars['Float'];
};


export type QueryGetProductsByIDsArgs = {
  product_ids: Array<Scalars['ID']>;
};


export type QueryGetRecentAccountArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetRecentOrderProductsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};


export type QueryGetTopRatedProductsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
};


export type QueryOtherUserArgs = {
  account_id: Scalars['ID'];
};

export type RateInput = {
  account_id: Scalars['ID'];
  product_id: Scalars['ID'];
  score: Scalars['Int'];
};

export type RateProduct = {
  __typename?: 'RateProduct';
  avg_rating: Scalars['Float'];
  rating_times: Scalars['Float'];
};

export type RecentOrder = {
  __typename?: 'RecentOrder';
  id: Scalars['ID'];
  payment: Scalars['String'];
  product_id: Scalars['ID'];
  product_img_url: Scalars['String'];
  product_name: Scalars['String'];
  product_price: Scalars['Float'];
  status: Scalars['String'];
};

export type RecentOrderData = {
  __typename?: 'RecentOrderData';
  hasMore: Scalars['Boolean'];
  recentOrder: Array<RecentOrder>;
};

export type UserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserUpdateData = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  img_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type AccountSnippetFragment = { __typename?: 'Account', id: string, name: string, img_url: string, email: string, phone?: string | null, address?: string | null, description?: string | null, createdAt: string, updateAt: string, provider: string, provider_id?: string | null };

export type BlogCommentDetailSnippetFragment = { __typename?: 'BlogCommentDetail', id: string, content: string, createdAt: string, blogCommentLikeCount: number, account_id: string, account_name: string, account_img_url: string };

export type BlogDetailSnippetFragment = { __typename?: 'BlogDetail', id: string, content: string, img_url?: string | null, createdAt: string, blogLikeCount?: number | null, blogCommentCount?: number | null, account_id: string, account_name: string, account_img_url: string, blogComments: Array<{ __typename?: 'BlogCommentDetail', id: string, content: string, createdAt: string, blogCommentLikeCount: number, account_id: string, account_name: string, account_img_url: string }> };

export type CategorySnippetFragment = { __typename?: 'Category', id: string, name: string, img_url: string };

export type OrderProductDetailSnippetFragment = { __typename?: 'OrderProductDetail', id: string, quantity: number, payment: string, status: string, order_id: string, product_id: string, orderedAt: string, updateAt: string, product_name: string, product_price: number, product_img_url: string };

export type OrderDetailSnippetFragment = { __typename?: 'OrderDetail', id: string, createdAt: string, updateAt: string, session_id: string, account_id: string, products?: Array<{ __typename?: 'OrderProductDetail', id: string, quantity: number, payment: string, status: string, order_id: string, product_id: string, orderedAt: string, updateAt: string, product_name: string, product_price: number, product_img_url: string }> | null };

export type CommentDetailSnippetFragment = { __typename?: 'CommentDetail', id: string, content: string, createdAt: string, post_id: string, account_id: string, account_name: string, account_img_url: string, commentLikeCount: number };

export type PostDetailSnippetFragment = { __typename?: 'PostDetail', id: string, content: string, createdAt: string, product_id: string, account_id: string, account_name: string, account_img_url: string, likeCount?: number | null, commentCount?: number | null, comments: Array<{ __typename?: 'CommentDetail', id: string, content: string, createdAt: string, post_id: string, account_id: string, account_name: string, account_img_url: string, commentLikeCount: number }> };

export type ProductBriefSnippetFragment = { __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean };

export type UpdateUserMutationVariables = Exact<{
  account_id: Scalars['ID'];
  userUpdateData: UserUpdateData;
  user_img?: InputMaybe<Scalars['Upload']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'AccountDetail', access_token?: string | null, account?: { __typename?: 'Account', id: string, name: string, img_url: string, email: string, phone?: string | null, address?: string | null, description?: string | null, createdAt: string, updateAt: string, provider: string, provider_id?: string | null } | null } };

export type CreateBlogMutationVariables = Exact<{
  blogInput: BlogInput;
  user_img?: InputMaybe<Scalars['Upload']>;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog?: { __typename?: 'NewBlogData', blog: { __typename?: 'BlogDetail', id: string, content: string, img_url?: string | null, createdAt: string, blogLikeCount?: number | null, blogCommentCount?: number | null, account_id: string, account_name: string, account_img_url: string, blogComments: Array<{ __typename?: 'BlogCommentDetail', id: string, content: string, createdAt: string, blogCommentLikeCount: number, account_id: string, account_name: string, account_img_url: string }> } } | null };

export type CreateBlogCommentMutationVariables = Exact<{
  blogCommentInput: BlogCommentInput;
}>;


export type CreateBlogCommentMutation = { __typename?: 'Mutation', createBlogComment: { __typename?: 'NewBlogCommentData', blogComment: { __typename?: 'BlogCommentDetail', id: string, content: string, createdAt: string, blogCommentLikeCount: number, account_id: string, account_name: string, account_img_url: string } } };

export type CreateBlogCommentLikeMutationVariables = Exact<{
  blogCommentLikeInput: BlogCommentLikeInput;
}>;


export type CreateBlogCommentLikeMutation = { __typename?: 'Mutation', createBlogCommentLike: { __typename?: 'NewBlogCommentLikeData', blogCommentLike: number } };

export type CreateBlogLikeMutationVariables = Exact<{
  blogLikeInput: BlogLikeInput;
}>;


export type CreateBlogLikeMutation = { __typename?: 'Mutation', createBlogLike: { __typename?: 'NewBlogLikeData', blogLike: number } };

export type CreateCommentMutationVariables = Exact<{
  commentInput: CommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'NewCommentData', comment: { __typename?: 'CommentDetail', id: string, content: string, createdAt: string, post_id: string, account_id: string, account_name: string, account_img_url: string, commentLikeCount: number } } };

export type CreateCommentLikeMutationVariables = Exact<{
  commentLikeInput: CommentLikeInput;
}>;


export type CreateCommentLikeMutation = { __typename?: 'Mutation', createCommentLike: { __typename?: 'NewCommentLikeData', commentLike: number } };

export type CreateFavoriteProductMutationVariables = Exact<{
  account_id: Scalars['Float'];
  product_id: Scalars['Float'];
}>;


export type CreateFavoriteProductMutation = { __typename?: 'Mutation', createFavoriteProduct: boolean };

export type CreateOrderMutationVariables = Exact<{
  orderInput: OrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'OrderResult', session_id?: string | null } | null };

export type ConfirmOrderMutationVariables = Exact<{
  session_id: Scalars['String'];
  account_id: Scalars['ID'];
}>;


export type ConfirmOrderMutation = { __typename?: 'Mutation', confirmOrder?: { __typename?: 'OrderResult', session_id?: string | null, amount_total?: number | null } | null };

export type CancelOrderMutationVariables = Exact<{
  session_id: Scalars['String'];
  account_id: Scalars['ID'];
  payment?: InputMaybe<Scalars['String']>;
}>;


export type CancelOrderMutation = { __typename?: 'Mutation', cancelOrder: boolean };

export type CreatePostMutationVariables = Exact<{
  postInput: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'NewPostData', post: { __typename?: 'PostDetail', id: string, content: string, createdAt: string, product_id: string, account_id: string, account_name: string, account_img_url: string, likeCount?: number | null, commentCount?: number | null, comments: Array<{ __typename?: 'CommentDetail', id: string, content: string, createdAt: string, post_id: string, account_id: string, account_name: string, account_img_url: string, commentLikeCount: number }> } } };

export type CreatePostLikeMutationVariables = Exact<{
  postLikeInput: PostLikeInput;
}>;


export type CreatePostLikeMutation = { __typename?: 'Mutation', createPostLike: { __typename?: 'NewPostLikeData', postLike: number } };

export type CreateProductMutationVariables = Exact<{
  file_5?: InputMaybe<Scalars['Upload']>;
  file_4?: InputMaybe<Scalars['Upload']>;
  file_3?: InputMaybe<Scalars['Upload']>;
  file_2?: InputMaybe<Scalars['Upload']>;
  file_1: Scalars['Upload'];
  productInput: ProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'Product', id: string, name: string, img_url: string, price: number, isOnSale: boolean, isAvailable: boolean, description: string, addedAt: string, updateAt: string, createdBy: string } | null };

export type UpdateProductMutationVariables = Exact<{
  file_5?: InputMaybe<Scalars['Upload']>;
  file_4?: InputMaybe<Scalars['Upload']>;
  file_3?: InputMaybe<Scalars['Upload']>;
  file_2?: InputMaybe<Scalars['Upload']>;
  file_1?: InputMaybe<Scalars['Upload']>;
  productUpdateInput: ProductUpdateInput;
  product_id: Scalars['ID'];
  account_id: Scalars['ID'];
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', id: string, name: string, img_url: string, price: number, isOnSale: boolean, isAvailable: boolean, description: string, addedAt: string, updateAt: string, createdBy: string } | null };

export type FreezeOrUnFreezeProductMutationVariables = Exact<{
  isAvailable: Scalars['Boolean'];
  product_id: Scalars['ID'];
  account_id: Scalars['ID'];
}>;


export type FreezeOrUnFreezeProductMutation = { __typename?: 'Mutation', freezeOrUnFreezeProduct?: { __typename?: 'Product', id: string, name: string, img_url: string, price: number, isOnSale: boolean, isAvailable: boolean, description: string, addedAt: string, updateAt: string, createdBy: string } | null };

export type DeleteFavoriteProductMutationVariables = Exact<{
  account_id: Scalars['Float'];
  product_id: Scalars['Float'];
}>;


export type DeleteFavoriteProductMutation = { __typename?: 'Mutation', deleteFavoriteProduct: boolean };

export type LoginMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccountDetail', access_token?: string | null, account?: { __typename?: 'Account', id: string, name: string, img_url: string, email: string, phone?: string | null, address?: string | null, description?: string | null, createdAt: string, updateAt: string, provider: string, provider_id?: string | null } | null } };

export type ProviderLoginMutationVariables = Exact<{
  providerInput: ProviderInput;
}>;


export type ProviderLoginMutation = { __typename?: 'Mutation', providerLogin: { __typename?: 'AccountDetail', access_token?: string | null, account?: { __typename?: 'Account', id: string, name: string, img_url: string, email: string, phone?: string | null, address?: string | null, description?: string | null, createdAt: string, updateAt: string, provider: string, provider_id?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RateProductMutationVariables = Exact<{
  rateInput: RateInput;
}>;


export type RateProductMutation = { __typename?: 'Mutation', rateProduct: { __typename?: 'RateProduct', avg_rating: number, rating_times: number } };

export type RegisterMutationVariables = Exact<{
  userRegister: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AccountDetail', access_token?: string | null, account?: { __typename?: 'Account', id: string, name: string, img_url: string, email: string, phone?: string | null, address?: string | null, description?: string | null, createdAt: string, updateAt: string, provider: string, provider_id?: string | null } | null } };

export type GetAllBlogsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}>;


export type GetAllBlogsQuery = { __typename?: 'Query', getAllBlogs: { __typename?: 'BlogData', hasMore?: boolean | null, blogs?: Array<{ __typename?: 'BlogDetail', id: string, content: string, img_url?: string | null, createdAt: string, blogLikeCount?: number | null, blogCommentCount?: number | null, account_id: string, account_name: string, account_img_url: string, blogComments: Array<{ __typename?: 'BlogCommentDetail', id: string, content: string, createdAt: string, blogCommentLikeCount: number, account_id: string, account_name: string, account_img_url: string }> }> | null } };

export type GetNumOfBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNumOfBlogsQuery = { __typename?: 'Query', getNumOfBlogs: number };

export type GetAllCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoryQuery = { __typename?: 'Query', getAllCategory: { __typename?: 'CategoryData', categories: Array<{ __typename?: 'CategoryDetail', id: string, name: string, img_url: string, number_of_product: number }> } };

export type GetAllProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}>;


export type GetAllProductsQuery = { __typename?: 'Query', getAllProducts: { __typename?: 'ProductData', products?: Array<{ __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean }> | null } };

export type GetProductsByIDsQueryVariables = Exact<{
  product_ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetProductsByIDsQuery = { __typename?: 'Query', getProductsByIDs: { __typename?: 'ProductData', products?: Array<{ __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean }> | null } };

export type GetFavoriteByAccountIdQueryVariables = Exact<{
  account_id: Scalars['Float'];
}>;


export type GetFavoriteByAccountIdQuery = { __typename?: 'Query', getFavoriteByAccountID?: { __typename?: 'FavoriteData', favorites?: Array<{ __typename?: 'FavoriteDetail', id: string, addedAt: string, product_id: string, product_img_url: string, product_avg_rating?: number | null, product_name: string, product_price: number, product_isOnSale: boolean, product_is_available: boolean }> | null } | null };

export type GetMostCommentsBlogQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}>;


export type GetMostCommentsBlogQuery = { __typename?: 'Query', getMostCommentsBlog: { __typename?: 'BlogData', hasMore?: boolean | null, blogs?: Array<{ __typename?: 'BlogDetail', id: string, content: string, img_url?: string | null, createdAt: string, blogLikeCount?: number | null, blogCommentCount?: number | null, account_id: string, account_name: string, account_img_url: string, blogComments: Array<{ __typename?: 'BlogCommentDetail', id: string, content: string, createdAt: string, blogCommentLikeCount: number, account_id: string, account_name: string, account_img_url: string }> }> | null } };

export type GetMostLikeBlogQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}>;


export type GetMostLikeBlogQuery = { __typename?: 'Query', getMostLikeBlog: { __typename?: 'BlogData', hasMore?: boolean | null, blogs?: Array<{ __typename?: 'BlogDetail', id: string, content: string, img_url?: string | null, createdAt: string, blogLikeCount?: number | null, blogCommentCount?: number | null, account_id: string, account_name: string, account_img_url: string, blogComments: Array<{ __typename?: 'BlogCommentDetail', id: string, content: string, createdAt: string, blogCommentLikeCount: number, account_id: string, account_name: string, account_img_url: string }> }> | null } };

export type GetNumberOfFavoriteByAccountIdQueryVariables = Exact<{
  account_id: Scalars['Float'];
}>;


export type GetNumberOfFavoriteByAccountIdQuery = { __typename?: 'Query', getNumberOfFavoriteByAccountID?: number | null };

export type GetNumberOfProductAllTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNumberOfProductAllTypesQuery = { __typename?: 'Query', getNumberOfProductAllTypes: { __typename?: 'NumberOfProductAllTypes', all: number, onSale: number, popular: number, topRated: number } };

export type GetOnSaleProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}>;


export type GetOnSaleProductsQuery = { __typename?: 'Query', getOnSaleProducts: { __typename?: 'ProductData', products?: Array<{ __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean }> | null } };

export type GetOrdersByAccountIdQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
  account_id: Scalars['Float'];
}>;


export type GetOrdersByAccountIdQuery = { __typename?: 'Query', getOrdersByAccountID: { __typename?: 'OrderData', hasMore?: boolean | null, total?: number | null, orders?: Array<{ __typename?: 'OrderDetail', id: string, createdAt: string, updateAt: string, session_id: string, account_id: string, products?: Array<{ __typename?: 'OrderProductDetail', id: string, quantity: number, payment: string, status: string, order_id: string, product_id: string, orderedAt: string, updateAt: string, product_name: string, product_price: number, product_img_url: string }> | null }> | null } };

export type GetRecentOrderProductsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetRecentOrderProductsQuery = { __typename?: 'Query', getRecentOrderProducts: { __typename?: 'RecentOrderData', hasMore: boolean, recentOrder: Array<{ __typename?: 'RecentOrder', id: string, product_id: string, product_name: string, product_price: number, product_img_url: string, payment: string, status: string }> } };

export type GetNumOfUserProductOrderBlogQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNumOfUserProductOrderBlogQuery = { __typename?: 'Query', getNumOfUserProductOrderBlog: { __typename?: 'NumOfUserProductOrderBlog', total_user: number, total_product: number, total_order: number, total_blog: number } };

export type GetPopularProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
}>;


export type GetPopularProductsQuery = { __typename?: 'Query', getPopularProducts: { __typename?: 'ProductData', products?: Array<{ __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean }> | null } };

export type GetPostsByProductIdQueryVariables = Exact<{
  product_id: Scalars['Float'];
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetPostsByProductIdQuery = { __typename?: 'Query', getPostsByProductID: { __typename?: 'PostData', hasMore?: boolean | null, posts?: Array<{ __typename?: 'PostDetail', id: string, content: string, createdAt: string, product_id: string, account_id: string, account_name: string, account_img_url: string, likeCount?: number | null, commentCount?: number | null, comments: Array<{ __typename?: 'CommentDetail', id: string, content: string, createdAt: string, post_id: string, account_id: string, account_name: string, account_img_url: string, commentLikeCount: number }> }> | null } };

export type GetMostCommentsPostsByProductIdQueryVariables = Exact<{
  product_id: Scalars['Float'];
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetMostCommentsPostsByProductIdQuery = { __typename?: 'Query', getMostCommentsPostsByProductID: { __typename?: 'PostData', hasMore?: boolean | null, posts?: Array<{ __typename?: 'PostDetail', id: string, content: string, createdAt: string, product_id: string, account_id: string, account_name: string, account_img_url: string, likeCount?: number | null, commentCount?: number | null, comments: Array<{ __typename?: 'CommentDetail', id: string, content: string, createdAt: string, post_id: string, account_id: string, account_name: string, account_img_url: string, commentLikeCount: number }> }> | null } };

export type GetMostLikePostsByProductIdQueryVariables = Exact<{
  product_id: Scalars['Float'];
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetMostLikePostsByProductIdQuery = { __typename?: 'Query', getMostLikePostsByProductID: { __typename?: 'PostData', hasMore?: boolean | null, posts?: Array<{ __typename?: 'PostDetail', id: string, content: string, createdAt: string, product_id: string, account_id: string, account_name: string, account_img_url: string, likeCount?: number | null, commentCount?: number | null, comments: Array<{ __typename?: 'CommentDetail', id: string, content: string, createdAt: string, post_id: string, account_id: string, account_name: string, account_img_url: string, commentLikeCount: number }> }> | null } };

export type GetNumOfPostsByProductIdQueryVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type GetNumOfPostsByProductIdQuery = { __typename?: 'Query', getNumOfPostsByProductID: number };

export type GetProductDetailQueryVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type GetProductDetailQuery = { __typename?: 'Query', getProductDetail?: { __typename?: 'ProductDetail', id: string, name: string, img_url: string, price: number, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, description: string, addedAt: string, updateAt: string, createdBy: string, isAvailable: boolean, account_id: string, account_name: string, account_img_url: string, categories?: Array<{ __typename?: 'Category', id: string, name: string, img_url: string }> | null, simularProducts?: Array<{ __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean }> | null } | null };

export type GetProductByCategoryIdQueryVariables = Exact<{
  category_id: Scalars['Float'];
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}>;


export type GetProductByCategoryIdQuery = { __typename?: 'Query', getProductByCategoryID: { __typename?: 'ProductData', products?: Array<{ __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean }> | null } };

export type GetProductByCreatedByQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
  createdBy: Scalars['Float'];
}>;


export type GetProductByCreatedByQuery = { __typename?: 'Query', getProductByCreatedBy: { __typename?: 'ProductData', hasMore?: boolean | null, total?: number | null, products?: Array<{ __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean }> | null } };

export type GetTopRatedProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopRatedProductsQuery = { __typename?: 'Query', getTopRatedProducts: { __typename?: 'ProductData', products?: Array<{ __typename?: 'ProductBrief', id: string, name: string, price: number, img_url: string, isOnSale: boolean, avg_rating?: number | null, rating_times?: number | null, total_order_count?: number | null, isAvailable: boolean }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'AccountDetail', access_token?: string | null, account?: { __typename?: 'Account', id: string, name: string, img_url: string, email: string, phone?: string | null, address?: string | null, description?: string | null, createdAt: string, updateAt: string, provider: string, provider_id?: string | null } | null } };

export type OtherUserQueryVariables = Exact<{
  account_id: Scalars['ID'];
}>;


export type OtherUserQuery = { __typename?: 'Query', otherUser: { __typename?: 'AccountDetail', account?: { __typename?: 'Account', id: string, name: string, img_url: string, email: string, phone?: string | null, address?: string | null, description?: string | null, createdAt: string, updateAt: string, provider: string, provider_id?: string | null } | null } };

export type GetNumOfPostAndBlogQueryVariables = Exact<{
  account_id: Scalars['ID'];
}>;


export type GetNumOfPostAndBlogQuery = { __typename?: 'Query', getNumOfPostAndBlog: { __typename?: 'NumOfPostAndBlog', total_post: number, total_blog: number } };

export type GetRecentAccountQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetRecentAccountQuery = { __typename?: 'Query', getRecentAccount: { __typename?: 'AccountData', hasMore: boolean, accounts: Array<{ __typename?: 'AccountBrief', id: string, name: string, img_url: string, createdAt: string, updateAt: string }> } };

export const AccountSnippetFragmentDoc = gql`
    fragment AccountSnippet on Account {
  id
  name
  img_url
  email
  phone
  address
  description
  createdAt
  updateAt
  provider
  provider_id
}
    `;
export const BlogCommentDetailSnippetFragmentDoc = gql`
    fragment BlogCommentDetailSnippet on BlogCommentDetail {
  id
  content
  createdAt
  blogCommentLikeCount
  account_id
  account_name
  account_img_url
}
    `;
export const BlogDetailSnippetFragmentDoc = gql`
    fragment BlogDetailSnippet on BlogDetail {
  id
  content
  img_url
  createdAt
  blogLikeCount
  blogCommentCount
  account_id
  account_name
  account_img_url
  blogComments {
    ...BlogCommentDetailSnippet
  }
}
    ${BlogCommentDetailSnippetFragmentDoc}`;
export const CategorySnippetFragmentDoc = gql`
    fragment CategorySnippet on Category {
  id
  name
  img_url
}
    `;
export const OrderProductDetailSnippetFragmentDoc = gql`
    fragment OrderProductDetailSnippet on OrderProductDetail {
  id
  quantity
  payment
  status
  order_id
  product_id
  orderedAt
  updateAt
  product_name
  product_price
  product_img_url
}
    `;
export const OrderDetailSnippetFragmentDoc = gql`
    fragment OrderDetailSnippet on OrderDetail {
  id
  createdAt
  updateAt
  session_id
  account_id
  products {
    ...OrderProductDetailSnippet
  }
}
    ${OrderProductDetailSnippetFragmentDoc}`;
export const CommentDetailSnippetFragmentDoc = gql`
    fragment CommentDetailSnippet on CommentDetail {
  id
  content
  createdAt
  post_id
  account_id
  account_name
  account_img_url
  commentLikeCount
}
    `;
export const PostDetailSnippetFragmentDoc = gql`
    fragment PostDetailSnippet on PostDetail {
  id
  content
  createdAt
  product_id
  account_id
  account_name
  account_img_url
  likeCount
  commentCount
  comments {
    ...CommentDetailSnippet
  }
}
    ${CommentDetailSnippetFragmentDoc}`;
export const ProductBriefSnippetFragmentDoc = gql`
    fragment ProductBriefSnippet on ProductBrief {
  id
  name
  price
  img_url
  isOnSale
  avg_rating
  rating_times
  total_order_count
  isAvailable
}
    `;
export const UpdateUserDocument = gql`
    mutation UpdateUser($account_id: ID!, $userUpdateData: UserUpdateData!, $user_img: Upload) {
  updateUser(
    account_id: $account_id
    userUpdateData: $userUpdateData
    user_img: $user_img
  ) {
    account {
      ...AccountSnippet
    }
    access_token
  }
}
    ${AccountSnippetFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      account_id: // value for 'account_id'
 *      userUpdateData: // value for 'userUpdateData'
 *      user_img: // value for 'user_img'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateBlogDocument = gql`
    mutation createBlog($blogInput: BlogInput!, $user_img: Upload) {
  createBlog(blogInput: $blogInput, user_img: $user_img) {
    blog {
      ...BlogDetailSnippet
    }
  }
}
    ${BlogDetailSnippetFragmentDoc}`;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      blogInput: // value for 'blogInput'
 *      user_img: // value for 'user_img'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, options);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const CreateBlogCommentDocument = gql`
    mutation CreateBlogComment($blogCommentInput: BlogCommentInput!) {
  createBlogComment(blogCommentInput: $blogCommentInput) {
    blogComment {
      ...BlogCommentDetailSnippet
    }
  }
}
    ${BlogCommentDetailSnippetFragmentDoc}`;
export type CreateBlogCommentMutationFn = Apollo.MutationFunction<CreateBlogCommentMutation, CreateBlogCommentMutationVariables>;

/**
 * __useCreateBlogCommentMutation__
 *
 * To run a mutation, you first call `useCreateBlogCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogCommentMutation, { data, loading, error }] = useCreateBlogCommentMutation({
 *   variables: {
 *      blogCommentInput: // value for 'blogCommentInput'
 *   },
 * });
 */
export function useCreateBlogCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogCommentMutation, CreateBlogCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogCommentMutation, CreateBlogCommentMutationVariables>(CreateBlogCommentDocument, options);
      }
export type CreateBlogCommentMutationHookResult = ReturnType<typeof useCreateBlogCommentMutation>;
export type CreateBlogCommentMutationResult = Apollo.MutationResult<CreateBlogCommentMutation>;
export type CreateBlogCommentMutationOptions = Apollo.BaseMutationOptions<CreateBlogCommentMutation, CreateBlogCommentMutationVariables>;
export const CreateBlogCommentLikeDocument = gql`
    mutation CreateBlogCommentLike($blogCommentLikeInput: BlogCommentLikeInput!) {
  createBlogCommentLike(blogCommentLikeInput: $blogCommentLikeInput) {
    blogCommentLike
  }
}
    `;
export type CreateBlogCommentLikeMutationFn = Apollo.MutationFunction<CreateBlogCommentLikeMutation, CreateBlogCommentLikeMutationVariables>;

/**
 * __useCreateBlogCommentLikeMutation__
 *
 * To run a mutation, you first call `useCreateBlogCommentLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogCommentLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogCommentLikeMutation, { data, loading, error }] = useCreateBlogCommentLikeMutation({
 *   variables: {
 *      blogCommentLikeInput: // value for 'blogCommentLikeInput'
 *   },
 * });
 */
export function useCreateBlogCommentLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogCommentLikeMutation, CreateBlogCommentLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogCommentLikeMutation, CreateBlogCommentLikeMutationVariables>(CreateBlogCommentLikeDocument, options);
      }
export type CreateBlogCommentLikeMutationHookResult = ReturnType<typeof useCreateBlogCommentLikeMutation>;
export type CreateBlogCommentLikeMutationResult = Apollo.MutationResult<CreateBlogCommentLikeMutation>;
export type CreateBlogCommentLikeMutationOptions = Apollo.BaseMutationOptions<CreateBlogCommentLikeMutation, CreateBlogCommentLikeMutationVariables>;
export const CreateBlogLikeDocument = gql`
    mutation CreateBlogLike($blogLikeInput: BlogLikeInput!) {
  createBlogLike(blogLikeInput: $blogLikeInput) {
    blogLike
  }
}
    `;
export type CreateBlogLikeMutationFn = Apollo.MutationFunction<CreateBlogLikeMutation, CreateBlogLikeMutationVariables>;

/**
 * __useCreateBlogLikeMutation__
 *
 * To run a mutation, you first call `useCreateBlogLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogLikeMutation, { data, loading, error }] = useCreateBlogLikeMutation({
 *   variables: {
 *      blogLikeInput: // value for 'blogLikeInput'
 *   },
 * });
 */
export function useCreateBlogLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogLikeMutation, CreateBlogLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogLikeMutation, CreateBlogLikeMutationVariables>(CreateBlogLikeDocument, options);
      }
export type CreateBlogLikeMutationHookResult = ReturnType<typeof useCreateBlogLikeMutation>;
export type CreateBlogLikeMutationResult = Apollo.MutationResult<CreateBlogLikeMutation>;
export type CreateBlogLikeMutationOptions = Apollo.BaseMutationOptions<CreateBlogLikeMutation, CreateBlogLikeMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($commentInput: CommentInput!) {
  createComment(commentInput: $commentInput) {
    comment {
      ...CommentDetailSnippet
    }
  }
}
    ${CommentDetailSnippetFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      commentInput: // value for 'commentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateCommentLikeDocument = gql`
    mutation CreateCommentLike($commentLikeInput: CommentLikeInput!) {
  createCommentLike(commentLikeInput: $commentLikeInput) {
    commentLike
  }
}
    `;
export type CreateCommentLikeMutationFn = Apollo.MutationFunction<CreateCommentLikeMutation, CreateCommentLikeMutationVariables>;

/**
 * __useCreateCommentLikeMutation__
 *
 * To run a mutation, you first call `useCreateCommentLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentLikeMutation, { data, loading, error }] = useCreateCommentLikeMutation({
 *   variables: {
 *      commentLikeInput: // value for 'commentLikeInput'
 *   },
 * });
 */
export function useCreateCommentLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentLikeMutation, CreateCommentLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentLikeMutation, CreateCommentLikeMutationVariables>(CreateCommentLikeDocument, options);
      }
export type CreateCommentLikeMutationHookResult = ReturnType<typeof useCreateCommentLikeMutation>;
export type CreateCommentLikeMutationResult = Apollo.MutationResult<CreateCommentLikeMutation>;
export type CreateCommentLikeMutationOptions = Apollo.BaseMutationOptions<CreateCommentLikeMutation, CreateCommentLikeMutationVariables>;
export const CreateFavoriteProductDocument = gql`
    mutation CreateFavoriteProduct($account_id: Float!, $product_id: Float!) {
  createFavoriteProduct(account_id: $account_id, product_id: $product_id)
}
    `;
export type CreateFavoriteProductMutationFn = Apollo.MutationFunction<CreateFavoriteProductMutation, CreateFavoriteProductMutationVariables>;

/**
 * __useCreateFavoriteProductMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteProductMutation, { data, loading, error }] = useCreateFavoriteProductMutation({
 *   variables: {
 *      account_id: // value for 'account_id'
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useCreateFavoriteProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteProductMutation, CreateFavoriteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteProductMutation, CreateFavoriteProductMutationVariables>(CreateFavoriteProductDocument, options);
      }
export type CreateFavoriteProductMutationHookResult = ReturnType<typeof useCreateFavoriteProductMutation>;
export type CreateFavoriteProductMutationResult = Apollo.MutationResult<CreateFavoriteProductMutation>;
export type CreateFavoriteProductMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteProductMutation, CreateFavoriteProductMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($orderInput: OrderInput!) {
  createOrder(orderInput: $orderInput) {
    session_id
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      orderInput: // value for 'orderInput'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const ConfirmOrderDocument = gql`
    mutation ConfirmOrder($session_id: String!, $account_id: ID!) {
  confirmOrder(session_id: $session_id, account_id: $account_id) {
    session_id
    amount_total
  }
}
    `;
export type ConfirmOrderMutationFn = Apollo.MutationFunction<ConfirmOrderMutation, ConfirmOrderMutationVariables>;

/**
 * __useConfirmOrderMutation__
 *
 * To run a mutation, you first call `useConfirmOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmOrderMutation, { data, loading, error }] = useConfirmOrderMutation({
 *   variables: {
 *      session_id: // value for 'session_id'
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useConfirmOrderMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmOrderMutation, ConfirmOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmOrderMutation, ConfirmOrderMutationVariables>(ConfirmOrderDocument, options);
      }
export type ConfirmOrderMutationHookResult = ReturnType<typeof useConfirmOrderMutation>;
export type ConfirmOrderMutationResult = Apollo.MutationResult<ConfirmOrderMutation>;
export type ConfirmOrderMutationOptions = Apollo.BaseMutationOptions<ConfirmOrderMutation, ConfirmOrderMutationVariables>;
export const CancelOrderDocument = gql`
    mutation CancelOrder($session_id: String!, $account_id: ID!, $payment: String = "Incomplete") {
  cancelOrder(session_id: $session_id, account_id: $account_id, payment: $payment)
}
    `;
export type CancelOrderMutationFn = Apollo.MutationFunction<CancelOrderMutation, CancelOrderMutationVariables>;

/**
 * __useCancelOrderMutation__
 *
 * To run a mutation, you first call `useCancelOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderMutation, { data, loading, error }] = useCancelOrderMutation({
 *   variables: {
 *      session_id: // value for 'session_id'
 *      account_id: // value for 'account_id'
 *      payment: // value for 'payment'
 *   },
 * });
 */
export function useCancelOrderMutation(baseOptions?: Apollo.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOrderMutation, CancelOrderMutationVariables>(CancelOrderDocument, options);
      }
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutation>;
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<CancelOrderMutation, CancelOrderMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($postInput: PostInput!) {
  createPost(postInput: $postInput) {
    post {
      ...PostDetailSnippet
    }
  }
}
    ${PostDetailSnippetFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      postInput: // value for 'postInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreatePostLikeDocument = gql`
    mutation CreatePostLike($postLikeInput: PostLikeInput!) {
  createPostLike(postLikeInput: $postLikeInput) {
    postLike
  }
}
    `;
export type CreatePostLikeMutationFn = Apollo.MutationFunction<CreatePostLikeMutation, CreatePostLikeMutationVariables>;

/**
 * __useCreatePostLikeMutation__
 *
 * To run a mutation, you first call `useCreatePostLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostLikeMutation, { data, loading, error }] = useCreatePostLikeMutation({
 *   variables: {
 *      postLikeInput: // value for 'postLikeInput'
 *   },
 * });
 */
export function useCreatePostLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostLikeMutation, CreatePostLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostLikeMutation, CreatePostLikeMutationVariables>(CreatePostLikeDocument, options);
      }
export type CreatePostLikeMutationHookResult = ReturnType<typeof useCreatePostLikeMutation>;
export type CreatePostLikeMutationResult = Apollo.MutationResult<CreatePostLikeMutation>;
export type CreatePostLikeMutationOptions = Apollo.BaseMutationOptions<CreatePostLikeMutation, CreatePostLikeMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($file_5: Upload, $file_4: Upload, $file_3: Upload, $file_2: Upload, $file_1: Upload!, $productInput: ProductInput!) {
  createProduct(
    file_5: $file_5
    file_4: $file_4
    file_3: $file_3
    file_2: $file_2
    file_1: $file_1
    productInput: $productInput
  ) {
    id
    name
    img_url
    price
    isOnSale
    isAvailable
    description
    addedAt
    updateAt
    createdBy
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      file_5: // value for 'file_5'
 *      file_4: // value for 'file_4'
 *      file_3: // value for 'file_3'
 *      file_2: // value for 'file_2'
 *      file_1: // value for 'file_1'
 *      productInput: // value for 'productInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($file_5: Upload, $file_4: Upload, $file_3: Upload, $file_2: Upload, $file_1: Upload, $productUpdateInput: ProductUpdateInput!, $product_id: ID!, $account_id: ID!) {
  updateProduct(
    file_5: $file_5
    file_4: $file_4
    file_3: $file_3
    file_2: $file_2
    file_1: $file_1
    productUpdateInput: $productUpdateInput
    product_id: $product_id
    account_id: $account_id
  ) {
    id
    name
    img_url
    price
    isOnSale
    isAvailable
    description
    addedAt
    updateAt
    createdBy
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      file_5: // value for 'file_5'
 *      file_4: // value for 'file_4'
 *      file_3: // value for 'file_3'
 *      file_2: // value for 'file_2'
 *      file_1: // value for 'file_1'
 *      productUpdateInput: // value for 'productUpdateInput'
 *      product_id: // value for 'product_id'
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const FreezeOrUnFreezeProductDocument = gql`
    mutation FreezeOrUnFreezeProduct($isAvailable: Boolean!, $product_id: ID!, $account_id: ID!) {
  freezeOrUnFreezeProduct(
    isAvailable: $isAvailable
    product_id: $product_id
    account_id: $account_id
  ) {
    id
    name
    img_url
    price
    isOnSale
    isAvailable
    description
    addedAt
    updateAt
    createdBy
  }
}
    `;
export type FreezeOrUnFreezeProductMutationFn = Apollo.MutationFunction<FreezeOrUnFreezeProductMutation, FreezeOrUnFreezeProductMutationVariables>;

/**
 * __useFreezeOrUnFreezeProductMutation__
 *
 * To run a mutation, you first call `useFreezeOrUnFreezeProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFreezeOrUnFreezeProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [freezeOrUnFreezeProductMutation, { data, loading, error }] = useFreezeOrUnFreezeProductMutation({
 *   variables: {
 *      isAvailable: // value for 'isAvailable'
 *      product_id: // value for 'product_id'
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useFreezeOrUnFreezeProductMutation(baseOptions?: Apollo.MutationHookOptions<FreezeOrUnFreezeProductMutation, FreezeOrUnFreezeProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FreezeOrUnFreezeProductMutation, FreezeOrUnFreezeProductMutationVariables>(FreezeOrUnFreezeProductDocument, options);
      }
export type FreezeOrUnFreezeProductMutationHookResult = ReturnType<typeof useFreezeOrUnFreezeProductMutation>;
export type FreezeOrUnFreezeProductMutationResult = Apollo.MutationResult<FreezeOrUnFreezeProductMutation>;
export type FreezeOrUnFreezeProductMutationOptions = Apollo.BaseMutationOptions<FreezeOrUnFreezeProductMutation, FreezeOrUnFreezeProductMutationVariables>;
export const DeleteFavoriteProductDocument = gql`
    mutation DeleteFavoriteProduct($account_id: Float!, $product_id: Float!) {
  deleteFavoriteProduct(account_id: $account_id, product_id: $product_id)
}
    `;
export type DeleteFavoriteProductMutationFn = Apollo.MutationFunction<DeleteFavoriteProductMutation, DeleteFavoriteProductMutationVariables>;

/**
 * __useDeleteFavoriteProductMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteProductMutation, { data, loading, error }] = useDeleteFavoriteProductMutation({
 *   variables: {
 *      account_id: // value for 'account_id'
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useDeleteFavoriteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoriteProductMutation, DeleteFavoriteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFavoriteProductMutation, DeleteFavoriteProductMutationVariables>(DeleteFavoriteProductDocument, options);
      }
export type DeleteFavoriteProductMutationHookResult = ReturnType<typeof useDeleteFavoriteProductMutation>;
export type DeleteFavoriteProductMutationResult = Apollo.MutationResult<DeleteFavoriteProductMutation>;
export type DeleteFavoriteProductMutationOptions = Apollo.BaseMutationOptions<DeleteFavoriteProductMutation, DeleteFavoriteProductMutationVariables>;
export const LoginDocument = gql`
    mutation Login($userInput: UserInput!) {
  login(userInput: $userInput) {
    account {
      ...AccountSnippet
    }
    access_token
  }
}
    ${AccountSnippetFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ProviderLoginDocument = gql`
    mutation ProviderLogin($providerInput: ProviderInput!) {
  providerLogin(providerInput: $providerInput) {
    account {
      ...AccountSnippet
    }
    access_token
  }
}
    ${AccountSnippetFragmentDoc}`;
export type ProviderLoginMutationFn = Apollo.MutationFunction<ProviderLoginMutation, ProviderLoginMutationVariables>;

/**
 * __useProviderLoginMutation__
 *
 * To run a mutation, you first call `useProviderLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProviderLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [providerLoginMutation, { data, loading, error }] = useProviderLoginMutation({
 *   variables: {
 *      providerInput: // value for 'providerInput'
 *   },
 * });
 */
export function useProviderLoginMutation(baseOptions?: Apollo.MutationHookOptions<ProviderLoginMutation, ProviderLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProviderLoginMutation, ProviderLoginMutationVariables>(ProviderLoginDocument, options);
      }
export type ProviderLoginMutationHookResult = ReturnType<typeof useProviderLoginMutation>;
export type ProviderLoginMutationResult = Apollo.MutationResult<ProviderLoginMutation>;
export type ProviderLoginMutationOptions = Apollo.BaseMutationOptions<ProviderLoginMutation, ProviderLoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RateProductDocument = gql`
    mutation RateProduct($rateInput: RateInput!) {
  rateProduct(rateInput: $rateInput) {
    avg_rating
    rating_times
  }
}
    `;
export type RateProductMutationFn = Apollo.MutationFunction<RateProductMutation, RateProductMutationVariables>;

/**
 * __useRateProductMutation__
 *
 * To run a mutation, you first call `useRateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateProductMutation, { data, loading, error }] = useRateProductMutation({
 *   variables: {
 *      rateInput: // value for 'rateInput'
 *   },
 * });
 */
export function useRateProductMutation(baseOptions?: Apollo.MutationHookOptions<RateProductMutation, RateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RateProductMutation, RateProductMutationVariables>(RateProductDocument, options);
      }
export type RateProductMutationHookResult = ReturnType<typeof useRateProductMutation>;
export type RateProductMutationResult = Apollo.MutationResult<RateProductMutation>;
export type RateProductMutationOptions = Apollo.BaseMutationOptions<RateProductMutation, RateProductMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($userRegister: UserRegisterInput!) {
  register(userRegister: $userRegister) {
    account {
      ...AccountSnippet
    }
    access_token
  }
}
    ${AccountSnippetFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      userRegister: // value for 'userRegister'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetAllBlogsDocument = gql`
    query GetAllBlogs($limit: Float, $offset: Float) {
  getAllBlogs(limit: $limit, offset: $offset) {
    blogs {
      ...BlogDetailSnippet
    }
    hasMore
  }
}
    ${BlogDetailSnippetFragmentDoc}`;

/**
 * __useGetAllBlogsQuery__
 *
 * To run a query within a React component, call `useGetAllBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBlogsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetAllBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllBlogsQuery, GetAllBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllBlogsQuery, GetAllBlogsQueryVariables>(GetAllBlogsDocument, options);
      }
export function useGetAllBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllBlogsQuery, GetAllBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllBlogsQuery, GetAllBlogsQueryVariables>(GetAllBlogsDocument, options);
        }
export type GetAllBlogsQueryHookResult = ReturnType<typeof useGetAllBlogsQuery>;
export type GetAllBlogsLazyQueryHookResult = ReturnType<typeof useGetAllBlogsLazyQuery>;
export type GetAllBlogsQueryResult = Apollo.QueryResult<GetAllBlogsQuery, GetAllBlogsQueryVariables>;
export const GetNumOfBlogsDocument = gql`
    query GetNumOfBlogs {
  getNumOfBlogs
}
    `;

/**
 * __useGetNumOfBlogsQuery__
 *
 * To run a query within a React component, call `useGetNumOfBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumOfBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumOfBlogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNumOfBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetNumOfBlogsQuery, GetNumOfBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumOfBlogsQuery, GetNumOfBlogsQueryVariables>(GetNumOfBlogsDocument, options);
      }
export function useGetNumOfBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNumOfBlogsQuery, GetNumOfBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumOfBlogsQuery, GetNumOfBlogsQueryVariables>(GetNumOfBlogsDocument, options);
        }
export type GetNumOfBlogsQueryHookResult = ReturnType<typeof useGetNumOfBlogsQuery>;
export type GetNumOfBlogsLazyQueryHookResult = ReturnType<typeof useGetNumOfBlogsLazyQuery>;
export type GetNumOfBlogsQueryResult = Apollo.QueryResult<GetNumOfBlogsQuery, GetNumOfBlogsQueryVariables>;
export const GetAllCategoryDocument = gql`
    query GetAllCategory {
  getAllCategory {
    categories {
      id
      name
      img_url
      number_of_product
    }
  }
}
    `;

/**
 * __useGetAllCategoryQuery__
 *
 * To run a query within a React component, call `useGetAllCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoryQuery, GetAllCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoryQuery, GetAllCategoryQueryVariables>(GetAllCategoryDocument, options);
      }
export function useGetAllCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoryQuery, GetAllCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoryQuery, GetAllCategoryQueryVariables>(GetAllCategoryDocument, options);
        }
export type GetAllCategoryQueryHookResult = ReturnType<typeof useGetAllCategoryQuery>;
export type GetAllCategoryLazyQueryHookResult = ReturnType<typeof useGetAllCategoryLazyQuery>;
export type GetAllCategoryQueryResult = Apollo.QueryResult<GetAllCategoryQuery, GetAllCategoryQueryVariables>;
export const GetAllProductsDocument = gql`
    query GetAllProducts($limit: Float, $offset: Float) {
  getAllProducts(limit: $limit, offset: $offset) {
    products {
      ...ProductBriefSnippet
    }
  }
}
    ${ProductBriefSnippetFragmentDoc}`;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetProductsByIDsDocument = gql`
    query GetProductsByIDs($product_ids: [ID!]!) {
  getProductsByIDs(product_ids: $product_ids) {
    products {
      ...ProductBriefSnippet
    }
  }
}
    ${ProductBriefSnippetFragmentDoc}`;

/**
 * __useGetProductsByIDsQuery__
 *
 * To run a query within a React component, call `useGetProductsByIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsByIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsByIDsQuery({
 *   variables: {
 *      product_ids: // value for 'product_ids'
 *   },
 * });
 */
export function useGetProductsByIDsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsByIDsQuery, GetProductsByIDsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsByIDsQuery, GetProductsByIDsQueryVariables>(GetProductsByIDsDocument, options);
      }
export function useGetProductsByIDsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsByIDsQuery, GetProductsByIDsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsByIDsQuery, GetProductsByIDsQueryVariables>(GetProductsByIDsDocument, options);
        }
export type GetProductsByIDsQueryHookResult = ReturnType<typeof useGetProductsByIDsQuery>;
export type GetProductsByIDsLazyQueryHookResult = ReturnType<typeof useGetProductsByIDsLazyQuery>;
export type GetProductsByIDsQueryResult = Apollo.QueryResult<GetProductsByIDsQuery, GetProductsByIDsQueryVariables>;
export const GetFavoriteByAccountIdDocument = gql`
    query GetFavoriteByAccountID($account_id: Float!) {
  getFavoriteByAccountID(account_id: $account_id) {
    favorites {
      id
      addedAt
      product_id
      product_img_url
      product_avg_rating
      product_name
      product_price
      product_isOnSale
      product_is_available
    }
  }
}
    `;

/**
 * __useGetFavoriteByAccountIdQuery__
 *
 * To run a query within a React component, call `useGetFavoriteByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoriteByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoriteByAccountIdQuery({
 *   variables: {
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useGetFavoriteByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<GetFavoriteByAccountIdQuery, GetFavoriteByAccountIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFavoriteByAccountIdQuery, GetFavoriteByAccountIdQueryVariables>(GetFavoriteByAccountIdDocument, options);
      }
export function useGetFavoriteByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavoriteByAccountIdQuery, GetFavoriteByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFavoriteByAccountIdQuery, GetFavoriteByAccountIdQueryVariables>(GetFavoriteByAccountIdDocument, options);
        }
export type GetFavoriteByAccountIdQueryHookResult = ReturnType<typeof useGetFavoriteByAccountIdQuery>;
export type GetFavoriteByAccountIdLazyQueryHookResult = ReturnType<typeof useGetFavoriteByAccountIdLazyQuery>;
export type GetFavoriteByAccountIdQueryResult = Apollo.QueryResult<GetFavoriteByAccountIdQuery, GetFavoriteByAccountIdQueryVariables>;
export const GetMostCommentsBlogDocument = gql`
    query GetMostCommentsBlog($limit: Float, $offset: Float) {
  getMostCommentsBlog(limit: $limit, offset: $offset) {
    blogs {
      ...BlogDetailSnippet
    }
    hasMore
  }
}
    ${BlogDetailSnippetFragmentDoc}`;

/**
 * __useGetMostCommentsBlogQuery__
 *
 * To run a query within a React component, call `useGetMostCommentsBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMostCommentsBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMostCommentsBlogQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMostCommentsBlogQuery(baseOptions?: Apollo.QueryHookOptions<GetMostCommentsBlogQuery, GetMostCommentsBlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMostCommentsBlogQuery, GetMostCommentsBlogQueryVariables>(GetMostCommentsBlogDocument, options);
      }
export function useGetMostCommentsBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMostCommentsBlogQuery, GetMostCommentsBlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMostCommentsBlogQuery, GetMostCommentsBlogQueryVariables>(GetMostCommentsBlogDocument, options);
        }
export type GetMostCommentsBlogQueryHookResult = ReturnType<typeof useGetMostCommentsBlogQuery>;
export type GetMostCommentsBlogLazyQueryHookResult = ReturnType<typeof useGetMostCommentsBlogLazyQuery>;
export type GetMostCommentsBlogQueryResult = Apollo.QueryResult<GetMostCommentsBlogQuery, GetMostCommentsBlogQueryVariables>;
export const GetMostLikeBlogDocument = gql`
    query GetMostLikeBlog($limit: Float, $offset: Float) {
  getMostLikeBlog(limit: $limit, offset: $offset) {
    blogs {
      ...BlogDetailSnippet
    }
    hasMore
  }
}
    ${BlogDetailSnippetFragmentDoc}`;

/**
 * __useGetMostLikeBlogQuery__
 *
 * To run a query within a React component, call `useGetMostLikeBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMostLikeBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMostLikeBlogQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMostLikeBlogQuery(baseOptions?: Apollo.QueryHookOptions<GetMostLikeBlogQuery, GetMostLikeBlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMostLikeBlogQuery, GetMostLikeBlogQueryVariables>(GetMostLikeBlogDocument, options);
      }
export function useGetMostLikeBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMostLikeBlogQuery, GetMostLikeBlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMostLikeBlogQuery, GetMostLikeBlogQueryVariables>(GetMostLikeBlogDocument, options);
        }
export type GetMostLikeBlogQueryHookResult = ReturnType<typeof useGetMostLikeBlogQuery>;
export type GetMostLikeBlogLazyQueryHookResult = ReturnType<typeof useGetMostLikeBlogLazyQuery>;
export type GetMostLikeBlogQueryResult = Apollo.QueryResult<GetMostLikeBlogQuery, GetMostLikeBlogQueryVariables>;
export const GetNumberOfFavoriteByAccountIdDocument = gql`
    query GetNumberOfFavoriteByAccountID($account_id: Float!) {
  getNumberOfFavoriteByAccountID(account_id: $account_id)
}
    `;

/**
 * __useGetNumberOfFavoriteByAccountIdQuery__
 *
 * To run a query within a React component, call `useGetNumberOfFavoriteByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumberOfFavoriteByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumberOfFavoriteByAccountIdQuery({
 *   variables: {
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useGetNumberOfFavoriteByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<GetNumberOfFavoriteByAccountIdQuery, GetNumberOfFavoriteByAccountIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumberOfFavoriteByAccountIdQuery, GetNumberOfFavoriteByAccountIdQueryVariables>(GetNumberOfFavoriteByAccountIdDocument, options);
      }
export function useGetNumberOfFavoriteByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNumberOfFavoriteByAccountIdQuery, GetNumberOfFavoriteByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumberOfFavoriteByAccountIdQuery, GetNumberOfFavoriteByAccountIdQueryVariables>(GetNumberOfFavoriteByAccountIdDocument, options);
        }
export type GetNumberOfFavoriteByAccountIdQueryHookResult = ReturnType<typeof useGetNumberOfFavoriteByAccountIdQuery>;
export type GetNumberOfFavoriteByAccountIdLazyQueryHookResult = ReturnType<typeof useGetNumberOfFavoriteByAccountIdLazyQuery>;
export type GetNumberOfFavoriteByAccountIdQueryResult = Apollo.QueryResult<GetNumberOfFavoriteByAccountIdQuery, GetNumberOfFavoriteByAccountIdQueryVariables>;
export const GetNumberOfProductAllTypesDocument = gql`
    query GetNumberOfProductAllTypes {
  getNumberOfProductAllTypes {
    all
    onSale
    popular
    topRated
  }
}
    `;

/**
 * __useGetNumberOfProductAllTypesQuery__
 *
 * To run a query within a React component, call `useGetNumberOfProductAllTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumberOfProductAllTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumberOfProductAllTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNumberOfProductAllTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetNumberOfProductAllTypesQuery, GetNumberOfProductAllTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumberOfProductAllTypesQuery, GetNumberOfProductAllTypesQueryVariables>(GetNumberOfProductAllTypesDocument, options);
      }
export function useGetNumberOfProductAllTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNumberOfProductAllTypesQuery, GetNumberOfProductAllTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumberOfProductAllTypesQuery, GetNumberOfProductAllTypesQueryVariables>(GetNumberOfProductAllTypesDocument, options);
        }
export type GetNumberOfProductAllTypesQueryHookResult = ReturnType<typeof useGetNumberOfProductAllTypesQuery>;
export type GetNumberOfProductAllTypesLazyQueryHookResult = ReturnType<typeof useGetNumberOfProductAllTypesLazyQuery>;
export type GetNumberOfProductAllTypesQueryResult = Apollo.QueryResult<GetNumberOfProductAllTypesQuery, GetNumberOfProductAllTypesQueryVariables>;
export const GetOnSaleProductsDocument = gql`
    query GetOnSaleProducts($limit: Float, $offset: Float) {
  getOnSaleProducts(limit: $limit, offset: $offset) {
    products {
      ...ProductBriefSnippet
    }
  }
}
    ${ProductBriefSnippetFragmentDoc}`;

/**
 * __useGetOnSaleProductsQuery__
 *
 * To run a query within a React component, call `useGetOnSaleProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnSaleProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnSaleProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetOnSaleProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetOnSaleProductsQuery, GetOnSaleProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnSaleProductsQuery, GetOnSaleProductsQueryVariables>(GetOnSaleProductsDocument, options);
      }
export function useGetOnSaleProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnSaleProductsQuery, GetOnSaleProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnSaleProductsQuery, GetOnSaleProductsQueryVariables>(GetOnSaleProductsDocument, options);
        }
export type GetOnSaleProductsQueryHookResult = ReturnType<typeof useGetOnSaleProductsQuery>;
export type GetOnSaleProductsLazyQueryHookResult = ReturnType<typeof useGetOnSaleProductsLazyQuery>;
export type GetOnSaleProductsQueryResult = Apollo.QueryResult<GetOnSaleProductsQuery, GetOnSaleProductsQueryVariables>;
export const GetOrdersByAccountIdDocument = gql`
    query GetOrdersByAccountID($offset: Float, $limit: Float, $account_id: Float!) {
  getOrdersByAccountID(offset: $offset, limit: $limit, account_id: $account_id) {
    hasMore
    total
    orders {
      ...OrderDetailSnippet
    }
  }
}
    ${OrderDetailSnippetFragmentDoc}`;

/**
 * __useGetOrdersByAccountIdQuery__
 *
 * To run a query within a React component, call `useGetOrdersByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersByAccountIdQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useGetOrdersByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrdersByAccountIdQuery, GetOrdersByAccountIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersByAccountIdQuery, GetOrdersByAccountIdQueryVariables>(GetOrdersByAccountIdDocument, options);
      }
export function useGetOrdersByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersByAccountIdQuery, GetOrdersByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersByAccountIdQuery, GetOrdersByAccountIdQueryVariables>(GetOrdersByAccountIdDocument, options);
        }
export type GetOrdersByAccountIdQueryHookResult = ReturnType<typeof useGetOrdersByAccountIdQuery>;
export type GetOrdersByAccountIdLazyQueryHookResult = ReturnType<typeof useGetOrdersByAccountIdLazyQuery>;
export type GetOrdersByAccountIdQueryResult = Apollo.QueryResult<GetOrdersByAccountIdQuery, GetOrdersByAccountIdQueryVariables>;
export const GetRecentOrderProductsDocument = gql`
    query GetRecentOrderProducts($offset: Float, $limit: Float) {
  getRecentOrderProducts(offset: $offset, limit: $limit) {
    recentOrder {
      id
      product_id
      product_name
      product_price
      product_img_url
      payment
      status
    }
    hasMore
  }
}
    `;

/**
 * __useGetRecentOrderProductsQuery__
 *
 * To run a query within a React component, call `useGetRecentOrderProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentOrderProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentOrderProductsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetRecentOrderProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentOrderProductsQuery, GetRecentOrderProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentOrderProductsQuery, GetRecentOrderProductsQueryVariables>(GetRecentOrderProductsDocument, options);
      }
export function useGetRecentOrderProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentOrderProductsQuery, GetRecentOrderProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentOrderProductsQuery, GetRecentOrderProductsQueryVariables>(GetRecentOrderProductsDocument, options);
        }
export type GetRecentOrderProductsQueryHookResult = ReturnType<typeof useGetRecentOrderProductsQuery>;
export type GetRecentOrderProductsLazyQueryHookResult = ReturnType<typeof useGetRecentOrderProductsLazyQuery>;
export type GetRecentOrderProductsQueryResult = Apollo.QueryResult<GetRecentOrderProductsQuery, GetRecentOrderProductsQueryVariables>;
export const GetNumOfUserProductOrderBlogDocument = gql`
    query GetNumOfUserProductOrderBlog {
  getNumOfUserProductOrderBlog {
    total_user
    total_product
    total_order
    total_blog
  }
}
    `;

/**
 * __useGetNumOfUserProductOrderBlogQuery__
 *
 * To run a query within a React component, call `useGetNumOfUserProductOrderBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumOfUserProductOrderBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumOfUserProductOrderBlogQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNumOfUserProductOrderBlogQuery(baseOptions?: Apollo.QueryHookOptions<GetNumOfUserProductOrderBlogQuery, GetNumOfUserProductOrderBlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumOfUserProductOrderBlogQuery, GetNumOfUserProductOrderBlogQueryVariables>(GetNumOfUserProductOrderBlogDocument, options);
      }
export function useGetNumOfUserProductOrderBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNumOfUserProductOrderBlogQuery, GetNumOfUserProductOrderBlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumOfUserProductOrderBlogQuery, GetNumOfUserProductOrderBlogQueryVariables>(GetNumOfUserProductOrderBlogDocument, options);
        }
export type GetNumOfUserProductOrderBlogQueryHookResult = ReturnType<typeof useGetNumOfUserProductOrderBlogQuery>;
export type GetNumOfUserProductOrderBlogLazyQueryHookResult = ReturnType<typeof useGetNumOfUserProductOrderBlogLazyQuery>;
export type GetNumOfUserProductOrderBlogQueryResult = Apollo.QueryResult<GetNumOfUserProductOrderBlogQuery, GetNumOfUserProductOrderBlogQueryVariables>;
export const GetPopularProductsDocument = gql`
    query GetPopularProducts($limit: Float, $offset: Float, $total: Float) {
  getPopularProducts(limit: $limit, offset: $offset, total: $total) {
    products {
      ...ProductBriefSnippet
    }
  }
}
    ${ProductBriefSnippetFragmentDoc}`;

/**
 * __useGetPopularProductsQuery__
 *
 * To run a query within a React component, call `useGetPopularProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPopularProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPopularProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      total: // value for 'total'
 *   },
 * });
 */
export function useGetPopularProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetPopularProductsQuery, GetPopularProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPopularProductsQuery, GetPopularProductsQueryVariables>(GetPopularProductsDocument, options);
      }
export function useGetPopularProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPopularProductsQuery, GetPopularProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPopularProductsQuery, GetPopularProductsQueryVariables>(GetPopularProductsDocument, options);
        }
export type GetPopularProductsQueryHookResult = ReturnType<typeof useGetPopularProductsQuery>;
export type GetPopularProductsLazyQueryHookResult = ReturnType<typeof useGetPopularProductsLazyQuery>;
export type GetPopularProductsQueryResult = Apollo.QueryResult<GetPopularProductsQuery, GetPopularProductsQueryVariables>;
export const GetPostsByProductIdDocument = gql`
    query GetPostsByProductID($product_id: Float!, $offset: Float, $limit: Float) {
  getPostsByProductID(product_id: $product_id, offset: $offset, limit: $limit) {
    posts {
      ...PostDetailSnippet
    }
    hasMore
  }
}
    ${PostDetailSnippetFragmentDoc}`;

/**
 * __useGetPostsByProductIdQuery__
 *
 * To run a query within a React component, call `useGetPostsByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByProductIdQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPostsByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostsByProductIdQuery, GetPostsByProductIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsByProductIdQuery, GetPostsByProductIdQueryVariables>(GetPostsByProductIdDocument, options);
      }
export function useGetPostsByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByProductIdQuery, GetPostsByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsByProductIdQuery, GetPostsByProductIdQueryVariables>(GetPostsByProductIdDocument, options);
        }
export type GetPostsByProductIdQueryHookResult = ReturnType<typeof useGetPostsByProductIdQuery>;
export type GetPostsByProductIdLazyQueryHookResult = ReturnType<typeof useGetPostsByProductIdLazyQuery>;
export type GetPostsByProductIdQueryResult = Apollo.QueryResult<GetPostsByProductIdQuery, GetPostsByProductIdQueryVariables>;
export const GetMostCommentsPostsByProductIdDocument = gql`
    query GetMostCommentsPostsByProductID($product_id: Float!, $offset: Float, $limit: Float) {
  getMostCommentsPostsByProductID(
    product_id: $product_id
    offset: $offset
    limit: $limit
  ) {
    posts {
      ...PostDetailSnippet
    }
    hasMore
  }
}
    ${PostDetailSnippetFragmentDoc}`;

/**
 * __useGetMostCommentsPostsByProductIdQuery__
 *
 * To run a query within a React component, call `useGetMostCommentsPostsByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMostCommentsPostsByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMostCommentsPostsByProductIdQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMostCommentsPostsByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetMostCommentsPostsByProductIdQuery, GetMostCommentsPostsByProductIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMostCommentsPostsByProductIdQuery, GetMostCommentsPostsByProductIdQueryVariables>(GetMostCommentsPostsByProductIdDocument, options);
      }
export function useGetMostCommentsPostsByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMostCommentsPostsByProductIdQuery, GetMostCommentsPostsByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMostCommentsPostsByProductIdQuery, GetMostCommentsPostsByProductIdQueryVariables>(GetMostCommentsPostsByProductIdDocument, options);
        }
export type GetMostCommentsPostsByProductIdQueryHookResult = ReturnType<typeof useGetMostCommentsPostsByProductIdQuery>;
export type GetMostCommentsPostsByProductIdLazyQueryHookResult = ReturnType<typeof useGetMostCommentsPostsByProductIdLazyQuery>;
export type GetMostCommentsPostsByProductIdQueryResult = Apollo.QueryResult<GetMostCommentsPostsByProductIdQuery, GetMostCommentsPostsByProductIdQueryVariables>;
export const GetMostLikePostsByProductIdDocument = gql`
    query GetMostLikePostsByProductID($product_id: Float!, $offset: Float, $limit: Float) {
  getMostLikePostsByProductID(
    product_id: $product_id
    offset: $offset
    limit: $limit
  ) {
    posts {
      ...PostDetailSnippet
    }
    hasMore
  }
}
    ${PostDetailSnippetFragmentDoc}`;

/**
 * __useGetMostLikePostsByProductIdQuery__
 *
 * To run a query within a React component, call `useGetMostLikePostsByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMostLikePostsByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMostLikePostsByProductIdQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMostLikePostsByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetMostLikePostsByProductIdQuery, GetMostLikePostsByProductIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMostLikePostsByProductIdQuery, GetMostLikePostsByProductIdQueryVariables>(GetMostLikePostsByProductIdDocument, options);
      }
export function useGetMostLikePostsByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMostLikePostsByProductIdQuery, GetMostLikePostsByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMostLikePostsByProductIdQuery, GetMostLikePostsByProductIdQueryVariables>(GetMostLikePostsByProductIdDocument, options);
        }
export type GetMostLikePostsByProductIdQueryHookResult = ReturnType<typeof useGetMostLikePostsByProductIdQuery>;
export type GetMostLikePostsByProductIdLazyQueryHookResult = ReturnType<typeof useGetMostLikePostsByProductIdLazyQuery>;
export type GetMostLikePostsByProductIdQueryResult = Apollo.QueryResult<GetMostLikePostsByProductIdQuery, GetMostLikePostsByProductIdQueryVariables>;
export const GetNumOfPostsByProductIdDocument = gql`
    query GetNumOfPostsByProductID($product_id: Float!) {
  getNumOfPostsByProductID(product_id: $product_id)
}
    `;

/**
 * __useGetNumOfPostsByProductIdQuery__
 *
 * To run a query within a React component, call `useGetNumOfPostsByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumOfPostsByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumOfPostsByProductIdQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useGetNumOfPostsByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetNumOfPostsByProductIdQuery, GetNumOfPostsByProductIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumOfPostsByProductIdQuery, GetNumOfPostsByProductIdQueryVariables>(GetNumOfPostsByProductIdDocument, options);
      }
export function useGetNumOfPostsByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNumOfPostsByProductIdQuery, GetNumOfPostsByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumOfPostsByProductIdQuery, GetNumOfPostsByProductIdQueryVariables>(GetNumOfPostsByProductIdDocument, options);
        }
export type GetNumOfPostsByProductIdQueryHookResult = ReturnType<typeof useGetNumOfPostsByProductIdQuery>;
export type GetNumOfPostsByProductIdLazyQueryHookResult = ReturnType<typeof useGetNumOfPostsByProductIdLazyQuery>;
export type GetNumOfPostsByProductIdQueryResult = Apollo.QueryResult<GetNumOfPostsByProductIdQuery, GetNumOfPostsByProductIdQueryVariables>;
export const GetProductDetailDocument = gql`
    query getProductDetail($product_id: Float!) {
  getProductDetail(product_id: $product_id) {
    id
    name
    img_url
    price
    isOnSale
    avg_rating
    rating_times
    total_order_count
    description
    addedAt
    updateAt
    createdBy
    isAvailable
    account_id
    account_name
    account_img_url
    categories {
      ...CategorySnippet
    }
    simularProducts {
      ...ProductBriefSnippet
    }
  }
}
    ${CategorySnippetFragmentDoc}
${ProductBriefSnippetFragmentDoc}`;

/**
 * __useGetProductDetailQuery__
 *
 * To run a query within a React component, call `useGetProductDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductDetailQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useGetProductDetailQuery(baseOptions: Apollo.QueryHookOptions<GetProductDetailQuery, GetProductDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductDetailQuery, GetProductDetailQueryVariables>(GetProductDetailDocument, options);
      }
export function useGetProductDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductDetailQuery, GetProductDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductDetailQuery, GetProductDetailQueryVariables>(GetProductDetailDocument, options);
        }
export type GetProductDetailQueryHookResult = ReturnType<typeof useGetProductDetailQuery>;
export type GetProductDetailLazyQueryHookResult = ReturnType<typeof useGetProductDetailLazyQuery>;
export type GetProductDetailQueryResult = Apollo.QueryResult<GetProductDetailQuery, GetProductDetailQueryVariables>;
export const GetProductByCategoryIdDocument = gql`
    query GetProductByCategoryID($category_id: Float!, $limit: Float, $offset: Float) {
  getProductByCategoryID(
    category_id: $category_id
    limit: $limit
    offset: $offset
  ) {
    products {
      ...ProductBriefSnippet
    }
  }
}
    ${ProductBriefSnippetFragmentDoc}`;

/**
 * __useGetProductByCategoryIdQuery__
 *
 * To run a query within a React component, call `useGetProductByCategoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByCategoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByCategoryIdQuery({
 *   variables: {
 *      category_id: // value for 'category_id'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetProductByCategoryIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByCategoryIdQuery, GetProductByCategoryIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByCategoryIdQuery, GetProductByCategoryIdQueryVariables>(GetProductByCategoryIdDocument, options);
      }
export function useGetProductByCategoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByCategoryIdQuery, GetProductByCategoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByCategoryIdQuery, GetProductByCategoryIdQueryVariables>(GetProductByCategoryIdDocument, options);
        }
export type GetProductByCategoryIdQueryHookResult = ReturnType<typeof useGetProductByCategoryIdQuery>;
export type GetProductByCategoryIdLazyQueryHookResult = ReturnType<typeof useGetProductByCategoryIdLazyQuery>;
export type GetProductByCategoryIdQueryResult = Apollo.QueryResult<GetProductByCategoryIdQuery, GetProductByCategoryIdQueryVariables>;
export const GetProductByCreatedByDocument = gql`
    query GetProductByCreatedBy($offset: Float, $limit: Float, $createdBy: Float!) {
  getProductByCreatedBy(offset: $offset, limit: $limit, createdBy: $createdBy) {
    hasMore
    total
    products {
      ...ProductBriefSnippet
    }
  }
}
    ${ProductBriefSnippetFragmentDoc}`;

/**
 * __useGetProductByCreatedByQuery__
 *
 * To run a query within a React component, call `useGetProductByCreatedByQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByCreatedByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByCreatedByQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      createdBy: // value for 'createdBy'
 *   },
 * });
 */
export function useGetProductByCreatedByQuery(baseOptions: Apollo.QueryHookOptions<GetProductByCreatedByQuery, GetProductByCreatedByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByCreatedByQuery, GetProductByCreatedByQueryVariables>(GetProductByCreatedByDocument, options);
      }
export function useGetProductByCreatedByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByCreatedByQuery, GetProductByCreatedByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByCreatedByQuery, GetProductByCreatedByQueryVariables>(GetProductByCreatedByDocument, options);
        }
export type GetProductByCreatedByQueryHookResult = ReturnType<typeof useGetProductByCreatedByQuery>;
export type GetProductByCreatedByLazyQueryHookResult = ReturnType<typeof useGetProductByCreatedByLazyQuery>;
export type GetProductByCreatedByQueryResult = Apollo.QueryResult<GetProductByCreatedByQuery, GetProductByCreatedByQueryVariables>;
export const GetTopRatedProductsDocument = gql`
    query GetTopRatedProducts($limit: Float, $offset: Float, $total: Float) {
  getTopRatedProducts(limit: $limit, offset: $offset, total: $total) {
    products {
      ...ProductBriefSnippet
    }
  }
}
    ${ProductBriefSnippetFragmentDoc}`;

/**
 * __useGetTopRatedProductsQuery__
 *
 * To run a query within a React component, call `useGetTopRatedProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopRatedProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopRatedProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      total: // value for 'total'
 *   },
 * });
 */
export function useGetTopRatedProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopRatedProductsQuery, GetTopRatedProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopRatedProductsQuery, GetTopRatedProductsQueryVariables>(GetTopRatedProductsDocument, options);
      }
export function useGetTopRatedProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopRatedProductsQuery, GetTopRatedProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopRatedProductsQuery, GetTopRatedProductsQueryVariables>(GetTopRatedProductsDocument, options);
        }
export type GetTopRatedProductsQueryHookResult = ReturnType<typeof useGetTopRatedProductsQuery>;
export type GetTopRatedProductsLazyQueryHookResult = ReturnType<typeof useGetTopRatedProductsLazyQuery>;
export type GetTopRatedProductsQueryResult = Apollo.QueryResult<GetTopRatedProductsQuery, GetTopRatedProductsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    account {
      ...AccountSnippet
    }
    access_token
  }
}
    ${AccountSnippetFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const OtherUserDocument = gql`
    query OtherUser($account_id: ID!) {
  otherUser(account_id: $account_id) {
    account {
      ...AccountSnippet
    }
  }
}
    ${AccountSnippetFragmentDoc}`;

/**
 * __useOtherUserQuery__
 *
 * To run a query within a React component, call `useOtherUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useOtherUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOtherUserQuery({
 *   variables: {
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useOtherUserQuery(baseOptions: Apollo.QueryHookOptions<OtherUserQuery, OtherUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OtherUserQuery, OtherUserQueryVariables>(OtherUserDocument, options);
      }
export function useOtherUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OtherUserQuery, OtherUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OtherUserQuery, OtherUserQueryVariables>(OtherUserDocument, options);
        }
export type OtherUserQueryHookResult = ReturnType<typeof useOtherUserQuery>;
export type OtherUserLazyQueryHookResult = ReturnType<typeof useOtherUserLazyQuery>;
export type OtherUserQueryResult = Apollo.QueryResult<OtherUserQuery, OtherUserQueryVariables>;
export const GetNumOfPostAndBlogDocument = gql`
    query GetNumOfPostAndBlog($account_id: ID!) {
  getNumOfPostAndBlog(account_id: $account_id) {
    total_post
    total_blog
  }
}
    `;

/**
 * __useGetNumOfPostAndBlogQuery__
 *
 * To run a query within a React component, call `useGetNumOfPostAndBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumOfPostAndBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumOfPostAndBlogQuery({
 *   variables: {
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useGetNumOfPostAndBlogQuery(baseOptions: Apollo.QueryHookOptions<GetNumOfPostAndBlogQuery, GetNumOfPostAndBlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumOfPostAndBlogQuery, GetNumOfPostAndBlogQueryVariables>(GetNumOfPostAndBlogDocument, options);
      }
export function useGetNumOfPostAndBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNumOfPostAndBlogQuery, GetNumOfPostAndBlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumOfPostAndBlogQuery, GetNumOfPostAndBlogQueryVariables>(GetNumOfPostAndBlogDocument, options);
        }
export type GetNumOfPostAndBlogQueryHookResult = ReturnType<typeof useGetNumOfPostAndBlogQuery>;
export type GetNumOfPostAndBlogLazyQueryHookResult = ReturnType<typeof useGetNumOfPostAndBlogLazyQuery>;
export type GetNumOfPostAndBlogQueryResult = Apollo.QueryResult<GetNumOfPostAndBlogQuery, GetNumOfPostAndBlogQueryVariables>;
export const GetRecentAccountDocument = gql`
    query GetRecentAccount($offset: Float, $limit: Float) {
  getRecentAccount(offset: $offset, limit: $limit) {
    accounts {
      id
      name
      img_url
      createdAt
      updateAt
    }
    hasMore
  }
}
    `;

/**
 * __useGetRecentAccountQuery__
 *
 * To run a query within a React component, call `useGetRecentAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentAccountQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetRecentAccountQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentAccountQuery, GetRecentAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentAccountQuery, GetRecentAccountQueryVariables>(GetRecentAccountDocument, options);
      }
export function useGetRecentAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentAccountQuery, GetRecentAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentAccountQuery, GetRecentAccountQueryVariables>(GetRecentAccountDocument, options);
        }
export type GetRecentAccountQueryHookResult = ReturnType<typeof useGetRecentAccountQuery>;
export type GetRecentAccountLazyQueryHookResult = ReturnType<typeof useGetRecentAccountLazyQuery>;
export type GetRecentAccountQueryResult = Apollo.QueryResult<GetRecentAccountQuery, GetRecentAccountQueryVariables>;
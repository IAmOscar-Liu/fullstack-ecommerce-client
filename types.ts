export interface SignInForm {
  username: string;
  password: string;
}

export interface SignUpForm extends SignInForm {
  email: string;
}

export interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  img_url: string;
  description: string;
  image?: File;
  img_src?: string;
}

export const PostSortType = ["Latest", "Most likes", "Most replies"];
export const BlogSortType = ["Latest", "Most likes", "Most comments"];
export const CommentSortType = ["Latest", "Most likes"];

export interface ProductForm {
  title: string;
  descriptions: string[];
  price: number | string;
  images: File[];
  images_name: string[];
  imgs_src: string[];
  isOnSale: boolean;
  categories?: boolean[];
}



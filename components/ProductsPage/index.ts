export { default as Header } from "./pageComps/Header";
export { default as Aside } from "./pageComps/Aside";
export { default as Products } from "./pageComps/Products";
export { default as ProductArticle } from "./pageComps/ProductArticle";
export { default as SingleProduct } from "./pageComps/SingleProduct";
export { default as PaginationBtn } from "./pageComps/PaginationBtn";
export { default as RatingPopup } from "./pageComps/RatingPopup";

export interface SingleProductProps {
  product_id: number;
}

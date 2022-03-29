import { CategoryData, ProductUpdateInput } from "../generated/graphql";
import { ProductForm } from "../types";

export const validateNewProductData = ({
  title,
  price,
  descriptions,
  images,
  categories,
}: ProductForm) => {
  if (!title) return "Title cannot be empty.";
  if (!price) return "Price cannot be empty.";
  if (descriptions.length === 1 && !descriptions[0])
    return "You should have at least one paragraph of description for this product.";
  if (descriptions.some((d) => !d))
    return "You should not have empty paragraph of description for this product";
  if (images.length === 0)
    return "You should have at least one image for this product.";
  if (!categories.some((c) => c))
    return "You should assign this product to at least one category.";

  return "";
};

export const validateUpdatedProductData = (
  updatedProductForm: ProductForm,
  oldProductForm: ProductForm
) => {
  if (
    updatedProductForm.title === oldProductForm.title &&
    updatedProductForm.price === oldProductForm.price &&
    JSON.stringify(updatedProductForm.descriptions) ===
      JSON.stringify(oldProductForm.descriptions) &&
    updatedProductForm.isOnSale === oldProductForm.isOnSale &&
    JSON.stringify(updatedProductForm.categories) ===
      JSON.stringify(oldProductForm.categories) &&
    updatedProductForm.imgs_src.length === oldProductForm.imgs_src.length &&
    !updatedProductForm.imgs_src.some((src) => src.startsWith("data")) &&
    JSON.stringify(updatedProductForm.imgs_src) ===
      JSON.stringify(oldProductForm.imgs_src)
  )
    return false;
  return true;
};

export const getProductUpdateInput = (
  updatedProductForm: ProductForm,
  oldProductForm: ProductForm,
  categoryData: CategoryData
): ProductUpdateInput => {
  const productUpdateInput: ProductUpdateInput = {};
  if (
    JSON.stringify(updatedProductForm.descriptions) !==
    JSON.stringify(oldProductForm.descriptions)
  )
    productUpdateInput.descriptions = updatedProductForm.descriptions;
  if (
    JSON.stringify(updatedProductForm.categories) !==
    JSON.stringify(oldProductForm.categories)
  )
    productUpdateInput.categories = updatedProductForm.categories
      .map((c, cIdx) => (c ? categoryData.categories[cIdx].id : ""))
      .filter((c) => c);
  if (updatedProductForm.isOnSale !== oldProductForm.isOnSale)
    productUpdateInput.isOnSale = updatedProductForm.isOnSale;
  if (
    !(
      updatedProductForm.imgs_src.length === oldProductForm.imgs_src.length &&
      !updatedProductForm.imgs_src.some((src) => src.startsWith("data")) &&
      JSON.stringify(updatedProductForm.imgs_src) ===
        JSON.stringify(oldProductForm.imgs_src)
    )
  )
    productUpdateInput.imgs_url = updatedProductForm.imgs_src.map((src) =>
      src.startsWith("data") ? "TBD" : src
    );

  return productUpdateInput;  
};

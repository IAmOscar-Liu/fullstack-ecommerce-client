import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  GetAllCategoryDocument,
  GetNumberOfProductAllTypesDocument,
  GetProductByCreatedByDocument,
  MeDocument,
  MeQuery,
  useGetAllCategoryQuery,
  useGetProductDetailQuery,
  useMeQuery,
  useUpdateProductMutation,
} from "../../../generated/graphql";
import { ProductForm } from "../../../types";
import {
  getProductUpdateInput,
  validateNewProductData,
  validateUpdatedProductData,
} from "../../../utils/validateNewProductData";
import styles from "./AddProduct.module.css";
import { EditProps, Loading } from "..";

const defaultProductInfo: ProductForm = {
  title: "",
  descriptions: [""],
  price: "",
  images: [],
  images_name: [],
  imgs_src: [],
  isOnSale: false,
};

const EditProduct: React.FC<EditProps> = ({ product_id }) => {
  const { data: allCategories } = useGetAllCategoryQuery();
  const { data: meQuery, loading } = useMeQuery();
  const { data: productDetail } = useGetProductDetailQuery({
    variables: { product_id: parseInt(product_id) },
  });
  const [productInfo, setProductInfo] = useState<ProductForm>({
    ...defaultProductInfo,
    categories: [],
  });
  const [isUpdating, toggleIsUpdating] = useState<boolean>(false);
  const [updateProduct] = useUpdateProductMutation();
  const client = useApolloClient();
  const router = useRouter();

  const getInitProductInfo = (): ProductForm => {
    return {
      title: productDetail.getProductDetail.name,
      descriptions: productDetail.getProductDetail.description.split("<br/>"),
      price: productDetail.getProductDetail.price,
      images: productDetail.getProductDetail.img_url
        .split("<br/>")
        .map(() => null),
      images_name: productDetail.getProductDetail.img_url
        .split("<br/>")
        .map((_, i) => `file_${i + 1}`),
      imgs_src: productDetail.getProductDetail.img_url.split("<br/>"),
      isOnSale: productDetail.getProductDetail.isOnSale,
      categories: allCategories.getAllCategory.categories.map((cat) =>
        productDetail.getProductDetail.categories.some((c) => c.id === cat.id)
      ),
    };
  };

  useEffect(() => {
    if (allCategories && productDetail) setProductInfo(getInitProductInfo());
  }, [allCategories, productDetail]);

  const addImage = (image: File) => {
    if (productInfo.images_name.find((name) => name === image.name))
      return window.alert("You cannot use the same image twice.");

    if (productInfo.images_name.length >= 5)
      return window.alert("Each product should have at most 5 images.");

    const reader = new FileReader();

    reader.onloadend = (e) => {
      setProductInfo((prev) => ({
        ...prev,
        imgs_src: [...prev.imgs_src, e.target.result as string],
        images: [...prev.images, image],
        images_name: [...prev.images_name, image.name],
      }));
    };

    reader.onerror = () =>
      window.alert("Sorry! Your image cannot be accepted.");

    // console.log(image);
    reader.readAsDataURL(image);
  };

  const changeImage = (image: File, imgIdx: number) => {
    if (productInfo.images_name[imgIdx] === image.name) return;

    if (
      productInfo.images_name
        .filter((_, i) => i !== imgIdx)
        .find((name) => name === image.name)
    )
      return window.alert("You cannot use the same image twice.");

    const reader = new FileReader();

    reader.onloadend = (e) => {
      setProductInfo((prev) => ({
        ...prev,
        imgs_src: prev.imgs_src.map((img_src, i) =>
          i === imgIdx ? (e.target.result as string) : img_src
        ),
        images: prev.images.map((img, i) => (i === imgIdx ? image : img)),
        images_name: prev.images_name.map((img_name, i) =>
          i === imgIdx ? image.name : img_name
        ),
      }));
    };

    reader.onerror = () =>
      window.alert("Sorry! Your image cannot be accepted.");

    // console.log(image);
    reader.readAsDataURL(image);
  };

  const removeImage = (imgIdx: number) => {
    setProductInfo((prev) => ({
      ...prev,
      imgs_src: prev.imgs_src.filter((_, fi) => imgIdx !== fi),
      images: prev.images.filter((_, fi) => imgIdx !== fi),
      images_name: prev.images_name.filter((_, fi) => imgIdx !== fi),
    }));
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

  const handleSubmit = async () => {
    if (isUpdating) return;

    const errMsg = validateNewProductData(productInfo);
    if (errMsg) return window.alert(errMsg);
    const initProductInfo = getInitProductInfo();
    if (!validateUpdatedProductData(productInfo, initProductInfo))
      return window.alert("Nothing changed.");
    if (!window.confirm("Are you sure you want to update this product?"))
      return;
    // console.log(productInfo);
    toggleIsUpdating(true);

    const productUpdateInput = getProductUpdateInput(
      productInfo,
      initProductInfo,
      allCategories.getAllCategory
    );
    const files = productInfo.images.filter((img) => img);

    await updateProduct({
      variables: {
        product_id,
        account_id: meQuery?.me.account?.id,
        productUpdateInput,
        file_1: files[0] ?? null,
        file_2: files[1] ?? null,
        file_3: files[2] ?? null,
        file_4: files[3] ?? null,
        file_5: files[4] ?? null,
      },
      refetchQueries: [
        { query: GetNumberOfProductAllTypesDocument },
        { query: GetAllCategoryDocument },
        {
          query: GetProductByCreatedByDocument,
          variables: {
            createdBy: parseInt(meQuery?.me.account?.id ?? "0"),
            limit: 3,
          },
        },
      ],
      update: (cache, { data }) => {
        // console.log(data.createProductAtOnce);
        window.alert("Your product has been updated successfully");
        cache.evict({
          fieldName: `getProductDetail({"product_id":${product_id}})`,
        });
        router.push(`/main/products/singleProduct/${data.updateProduct.id}`);
      },
      onError: (err) => {
        console.log("Fail to create product - ", err.message);
        if (err.message.startsWith("Access denied")) {
          if (
            window.confirm("You have been logged out. Please log in again.")
          ) {
            clearMeQuery();
            router.push("/login");
          }
        } else if (err.message.startsWith("Duplicate entry")) {
          window.alert(
            "Product's name has been taken. Please try another one!"
          );
        } else window.alert("Something went wrong. Please try again!");
      },
    });

    toggleIsUpdating(false);
  };

  const returnJSX = () => {
    if (loading) return <div>Loading...</div>;
    const user = meQuery?.me.account;
    if (!user) {
      router.replace("/login");
      return null;
    }
    if (
      productDetail?.getProductDetail?.createdBy &&
      user.id !== productDetail.getProductDetail.createdBy
    ) {
      router.back();
      return null;
    }
    return (
      <div className={styles["product-info"]}>
        {isUpdating && <Loading />}
        <h2 className={styles["info-title"]}>Product Info</h2>

        <div className={styles["title-and-price"]}>
          <p className={styles["title"]}>
            <input
              id="add-product-title"
              type="text"
              required
              value={productInfo.title}
              onChange={() => setProductInfo((prev) => prev)}
            />
            <label htmlFor="add-product-title">Title</label>
          </p>
          <p className={styles["price"]}>
            <input
              id="add-product-price"
              type="number"
              step="any"
              required
              value={parseFloat(productInfo.price + "").toFixed(2)}
              onChange={() => setProductInfo((prev) => prev)}
            />
            <label htmlFor="add-product-price">Price</label>
          </p>
        </div>

        {productInfo.descriptions.map((description, desIdx) => (
          <p key={desIdx} className={styles["description"]}>
            <textarea
              id={`add-product-description-${desIdx + 1}`}
              rows={5}
              required
              value={description}
              onChange={(e) =>
                setProductInfo((prev) => ({
                  ...prev,
                  descriptions: prev.descriptions.map((prevD, prevIdx) =>
                    desIdx === prevIdx ? e.target.value : prevD
                  ),
                }))
              }
            ></textarea>
            <label htmlFor={`add-product-description-${desIdx + 1}`}>
              Description{" "}
              {productInfo.descriptions.length > 1 &&
                ` - paragraph ${desIdx + 1}`}
            </label>
            {desIdx > 0 && (
              <i
                className="fas fa-trash"
                onClick={() =>
                  setProductInfo((prev) => ({
                    ...prev,
                    descriptions: prev.descriptions.filter(
                      (_, fi) => desIdx !== fi
                    ),
                  }))
                }
              ></i>
            )}
          </p>
        ))}

        <div className={styles["info-control"]}>
          <ul>
            <li>On Sale:</li>
            <li
              onClick={() =>
                setProductInfo((prev) => ({ ...prev, isOnSale: true }))
              }
            >
              <b className={productInfo.isOnSale ? styles["checked"] : ""}>
                <i className="fas fa-check"></i>
              </b>
              <span>Yes</span>
            </li>
            <li
              onClick={() =>
                setProductInfo((prev) => ({ ...prev, isOnSale: false }))
              }
            >
              <b className={!productInfo.isOnSale ? styles["checked"] : ""}>
                <i className="fas fa-check"></i>
              </b>
              <span>No</span>
            </li>
          </ul>
          <button
            onClick={() =>
              setProductInfo((prev) => ({
                ...prev,
                descriptions: [...prev.descriptions, ""],
              }))
            }
            className={styles["add-new-paragraph"]}
          >
            Add New Paragraph
          </button>
        </div>

        <input
          id="add-product-input-file"
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/tiff"
          onChange={(e) =>
            e.target.files.length > 0 && addImage(e.target.files[0])
          }
        />
        <label htmlFor="add-product-input-file">
          <i className="fas fa-plus"></i>Add Image
        </label>

        {productInfo.imgs_src.map((img_src, imgIdx) => (
          <React.Fragment key={imgIdx}>
            <div className={styles["imgBx"]}>
              <img src={img_src} alt="" />
            </div>
            <div className={styles["imgBx-info"]}>
              <span>
                Image {`${imgIdx + 1} of ${productInfo.imgs_src.length}`}
              </span>
              <input
                id={`change-product-input-file-${imgIdx + 1}`}
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/tiff"
                onChange={(e) =>
                  e.target.files.length > 0 &&
                  changeImage(e.target.files[0], imgIdx)
                }
              />
              <label
                className={styles["change-img"]}
                htmlFor={`change-product-input-file-${imgIdx + 1}`}
              >
                <i className="fas fa-edit"></i>Change
              </label>
              <button
                className={styles["delete-img"]}
                onClick={() => removeImage(imgIdx)}
              >
                <i className="fas fa-trash"></i>Delete
              </button>
            </div>
          </React.Fragment>
        ))}

        <div
          className={`${styles["imgBx"]} ${
            productInfo.imgs_src.length > 0 ? styles["add-more"] : ""
          }`}
        >
          <label htmlFor="add-product-input-file">
            {productInfo.imgs_src.length > 0 ? (
              <>
                <i className="fas fa-plus" style={{ marginRight: 8 }}></i>More
                image
              </>
            ) : (
              "Please select an image for this product"
            )}
          </label>
        </div>

        <div className={styles["category-grid"]}>
          <div className={styles["options"]}>
            <h2>Choose Categories</h2>
            <div className={styles["option-list"]}>
              <ul>
                {allCategories &&
                  allCategories.getAllCategory.categories.map((c, i) => (
                    <li key={i}>
                      <input
                        id={`category-${i + 1}-checkbox`}
                        type="checkbox"
                        checked={productInfo.categories[i]}
                        onChange={() =>
                          setProductInfo((prev) => ({
                            ...prev,
                            categories: prev.categories.map((p, ci) =>
                              i == ci ? !p : p
                            ),
                          }))
                        }
                      />
                      <label htmlFor={`category-${i + 1}-checkbox`}>
                        <b>
                          <i className="fas fa-check"></i>
                        </b>
                        <span>{c.name}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className={styles["output"]}>
            <h2>Categories</h2>
            <div className={styles["output-list"]}>
              {productInfo.categories.every((c) => !c) ? (
                <h5>No categories choosed</h5>
              ) : (
                <ul>
                  {productInfo.categories.map((c, i) =>
                    !c ? null : (
                      <li key={i}>
                        <div className={styles["imgBx"]}>
                          <img
                            src={
                              allCategories?.getAllCategory.categories[i]
                                .img_url ?? ""
                            }
                            alt=""
                          />
                        </div>
                        <p className={styles["output-name"]}>
                          {allCategories?.getAllCategory.categories[i].name ??
                            ""}
                        </p>
                        <label htmlFor={`category-${i + 1}-checkbox`}>
                          <i className="fas fa-times"></i>
                        </label>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={styles["form-btns"]}>
          <label onClick={handleSubmit}>
            <i className="fas fa-check"></i>
            Submit
          </label>
          <button onClick={() => setProductInfo(getInitProductInfo())}>
            <i className="fas fa-eraser"></i>Reset
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.add} id="add-product">
      <h1 className={styles["add-list-h1"]}>Edit Product</h1>
      <div className={styles["add-container"]}>{returnJSX()}</div>
    </section>
  );
};

export default EditProduct;

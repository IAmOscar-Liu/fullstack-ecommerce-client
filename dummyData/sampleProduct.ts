export type SampleProduct = {
  name: string;
  description: string;
  price: number;
  rating: number;
  img_url: string;
  isOnSale: boolean;
  createdBy: {
    name: string;
    img: string;
  };
  createdAt: string;
};

export const sampleProduct: SampleProduct = {
  name: "Star Regrigerator",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti aliquam labore nisi, molestias eaque quasi ex excepturi nihil reprehenderit possimus fugit maxime eius doloribus in, nulla laudantium eligendi, dolore ipsam voluptatum voluptatibus quia cumque quae vel exercitationem! Eligendi deserunt aperiam repellendus reprehenderit, sint qui laborum nobis eos repellat, omnis ab atque neque aspernatur itaque. Rem libero nesciunt repellat itaque aut numquam beatae corporis earum, qui, magnam dolorem repellendus commodi distinctio quidem consequatur cumque. Consectetur dicta esse exercitationem quod voluptatibus? Aspernatur aliquam tempore, perferendis nostrum quidem quos ipsam praesentium deserunt ut asperiores ipsa velit delectus numquam porro quia eligendi alias distinctio. Doloribus necessitatibus voluptatibus ea temporibus saepe repudiandae nihil, a blanditiis excepturi sed atque modi magni fuga, voluptas nulla neque quisquam!",
  price: 3.99,
  rating: 3,
  img_url:
    "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  isOnSale: true,
  createdBy: {
    name: "Oscar Liu",
    img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  createdAt: "2022/1/13",
};

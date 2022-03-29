export type SingleProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  img_url: string;
  isOnSale: boolean;
  sold_count: number;
  isAvailable: boolean;
};

export interface CartProduct extends SingleProduct {
  quantity: number;
}

/*
 id: string;
    name: string;
    price: number;
    img_url: string;
    isOnSale: boolean;
    avg_rating?: number;
    rating_times?: number;
    total_order_count?: number;
*/

export const onSaleProducts: SingleProduct[] = [
  {
    id: "0001",
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 3.99,
    rating: 3,
    img_url:
      "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isOnSale: true,
    sold_count: 120,
    isAvailable: true,
  },
  {
    id: "0002",
    name: "Product 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 3.99,
    rating: 2,
    img_url:
      "https://images.unsplash.com/photo-1639421240150-1911f8658352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isOnSale: true,
    sold_count: 120,
    isAvailable: true,
  },
  {
    id: "0003",
    name: "Product 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 3.99,
    rating: 1,
    img_url:
      "https://images.unsplash.com/photo-1639414302834-0fb9f594c2a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isOnSale: true,
    sold_count: 120,
    isAvailable: true,
  },
  {
    id: "0004",
    name: "Product 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 3.99,
    rating: 1,
    img_url:
      "https://images.unsplash.com/photo-1639435943487-0de285b269a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isOnSale: false,
    sold_count: 120,
    isAvailable: true,
  },
  {
    id: "0005",
    name: "Product 5",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 3.99,
    rating: 1,
    img_url:
      "https://images.unsplash.com/photo-1578942525827-429ebeb64b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isOnSale: false,
    sold_count: 120,
    isAvailable: true,
  },
  {
    id: "0006",
    name: "Product 6",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 3.99,
    rating: 1,
    img_url:
      "https://images.unsplash.com/photo-1629840892210-7d8aa15140b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isOnSale: false,
    sold_count: 120,
    isAvailable: true,
  },
];

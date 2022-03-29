import { CartProduct, onSaleProducts } from "./onSaleProducts";
import { OrderStatus } from "./recentOrders";

export interface HistoryProduct extends CartProduct {
  payment: "Paid" | "Due";
  status: OrderStatus;
}

export type SingleHistory = {
  time: string;
  products: HistoryProduct[];
};

export type SampleProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  img: string;
  createdAt: string;
  description: string;
  history: SingleHistory[];
};

export const sampleProfile: SampleProfile = {
  name: "Oscar Liu",
  email: "karta0989006@gmail.com",
  phone: "555-555-5555",
  address: `548 Market Street #87043, San Francisco, CA 94104`,
  img: "https://images.unsplash.com/photo-1639421240150-1911f8658352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  createdAt: "2022/1/10",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio eum dolorum vel esse, soluta, cumque tempora alias officiis voluptatem fugiat in dolor earum. Minima hic, error maxime pariatur blanditiis, autem, deleniti eveniet itaque ab architecto explicabo?",
  history: [
    {
      time: "2022/1/15",
      products: onSaleProducts
        .filter((_, i) => i < 3)
        .map((c, i) => ({
          ...c,
          quantity: 2,
          payment: "Due",
          status: i === 0 ? "Return" : "Pending",
        })),
    },
    {
      time: "2022/1/14",
      products: onSaleProducts
        .filter((_, i) => i > 3)
        .map((c) => ({
          ...c,
          quantity: 2,
          payment: "Paid",
          status: "In Progress",
        })),
    },
    {
      time: "2022/1/13",
      products: onSaleProducts
        .filter((_, i) => i % 2 === 1)
        .map((c) => ({
          ...c,
          quantity: 2,
          payment: "Paid",
          status: "Delievered",
        })),
    },
  ],
};

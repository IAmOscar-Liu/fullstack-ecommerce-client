export type OrderPayment = "Incomplete" | "Succeeded" | "Failed";
export type OrderStatus = "Delievered" | "Pending" | "Return" | "In Progress" | "Cancel";


export type SingleOrder = {
  name: string;
  price: number;
  payment: OrderPayment;
  status: OrderStatus;
};

export const recentOrders: SingleOrder[] = [
  {
    name: "Star Regrigerator",
    price: 1200,
    payment: "Succeeded",
    status: "Delievered",
  },
  {
    name: "Window cooler",
    price: 110,
    payment: "Incomplete",
    status: "Pending",
  },
  {
    name: "Speaker",
    price: 620,
    payment: "Succeeded",
    status: "Return",
  },
  {
    name: "HP laptop",
    price: 110,
    payment: "Incomplete",
    status: "Cancel",
  },
  {
    name: "Apple watch",
    price: 1200,
    payment: "Succeeded",
    status: "Delievered",
  },
  {
    name: "Wall Fan",
    price: 110,
    payment: "Succeeded",
    status: "Pending",
  },
  {
    name: "Adidas shoes",
    price: 620,
    payment: "Succeeded",
    status: "Return",
  },
  {
    name: "Denim shirts",
    price: 110,
    payment: "Incomplete",
    status: "In Progress",
  },
  {
    name: "Casual shoes",
    price: 575,
    payment: "Succeeded",
    status: "Pending",
  },
  {
    name: "Wall Fan",
    price: 110,
    payment: "Succeeded",
    status: "Pending",
  },
  {
    name: "Adidas shoes",
    price: 620,
    payment: "Succeeded",
    status: "Return",
  },
  {
    name: "Denim shirts",
    price: 110,
    payment: "Incomplete",
    status: "In Progress",
  },
];

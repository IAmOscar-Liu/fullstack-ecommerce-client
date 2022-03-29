export type Category = {
  name: string;
  amount: number;
  img: string;
};

export const allCategories: Category[] = [
  {
    name: "electronics",
    amount: 5,
    img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "applications",
    amount: 8,
    img: "https://images.unsplash.com/photo-1639421240150-1911f8658352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "entertainments",
    amount: 2,
    img: "https://images.unsplash.com/photo-1639414302834-0fb9f594c2a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "others",
    amount: 6,
    img: "https://images.unsplash.com/photo-1639435943487-0de285b269a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

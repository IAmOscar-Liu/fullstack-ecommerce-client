// For test
import { cardContents } from "./members";

export type SingleCustomer = {
  name: string;
  createdAt: string;
  img: string;
};

export const recentUsers: SingleCustomer[] = [
  {
    name: "David",
    createdAt: "10 minutes ago",
    img: cardContents[0].front_img,
  },
  {
    name: "Anna",
    createdAt: "1 hour ago",
    img: cardContents[0].back_img,
  },
  {
    name: "John",
    createdAt: "3 hours ago",
    img: cardContents[1].front_img,
  },
  {
    name: "Tony",
    createdAt: "5 hours ago",
    img: cardContents[1].back_img,
  },
  {
    name: "Elsa",
    createdAt: "1 day ago",
    img: cardContents[2].front_img,
  },
  {
    name: "Vivia",
    createdAt: "5 days ago",
    img: cardContents[2].back_img,
  },
  {
    name: "Luis",
    createdAt: "1 week ago",
    img: cardContents[0].front_img,
  },
  {
    name: "Tina",
    createdAt: "3 weeks ago",
    img: cardContents[0].back_img,
  },
  {
    name: "Justin",
    createdAt: "1 month ago",
    img: cardContents[1].front_img,
  },
  {
    name: "Kevin",
    createdAt: "5 month ago",
    img: cardContents[1].back_img,
  },
  {
    name: "Linda",
    createdAt: "1 year ago",
    img: cardContents[2].front_img,
  },
  {
    name: "Lee",
    createdAt: "2 years ago",
    img: cardContents[2].back_img,
  },
];

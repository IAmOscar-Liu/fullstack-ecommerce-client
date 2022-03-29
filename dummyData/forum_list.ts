export type ForumComment = {
  from: string;
  content: string;
  createdAt: string;
  img: string;
  likes: number;
};

export type SingleForumList = {
  username: string;
  user_img: string;
  createdAt: string;
  content: string;
  likes: number;
  img: string;
  comments: ForumComment[];
};

export const forum_list: SingleForumList[] = [
  {
    username: "Oscar Liu",
    user_img:
      "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    createdAt: "2022/1/10",
    content:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nesciunt, enim ducimus nisi ratione fuga totam veritatis, corrupti aspernatur laborum ad qui aut nobis.",
    likes: 2,
    img: "/h1_background.jpg",
    comments: [
      {
        from: "David Kuo",
        content: "Lorem ipsum dolor sit.",
        likes: 0,
        createdAt: "2022/1/10",
        img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
      {
        from: "David Kuo",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis molestiae optio beatae ut unde cumque atque exercitationem! Officia aspernatur vero accusamus recusandae sequi natus, voluptatibus minima praesentium dicta ab ratione blanditiis facilis vitae molestiae expedita facere at sint ipsum. Est expedita quis deleniti dolore pariatur nam doloribus praesentium.",
        likes: 2,
        createdAt: "2022/1/10",
        img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
    ],
  },
  {
    username: "Oscar Liu",
    user_img:
      "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    createdAt: "2022/1/10",
    content:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nesciunt, enim ducimus nisi ratione fuga totam veritatis, corrupti aspernatur laborum ad qui aut nobis.",
    likes: 2,
    img: "/h1_background.jpg",
    comments: [
      {
        from: "David Kuo",
        content: "Lorem ipsum dolor sit.",
        likes: 0,
        createdAt: "2022/1/10",
        img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
      {
        from: "David Kuo",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis molestiae optio beatae ut unde cumque atque exercitationem! Officia aspernatur vero accusamus recusandae sequi natus, voluptatibus minima praesentium dicta ab ratione blanditiis facilis vitae molestiae expedita facere at sint ipsum. Est expedita quis deleniti dolore pariatur nam doloribus praesentium.",
        likes: 2,
        createdAt: "2022/1/10",
        img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
    ],
  },
  {
    username: "Oscar Liu",
    user_img:
      "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    createdAt: "2022/1/10",
    content:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nesciunt, enim ducimus nisi ratione fuga totam veritatis, corrupti aspernatur laborum ad qui aut nobis.",
    likes: 2,
    img: "/h1_background.jpg",
    comments: [],
  },
  {
    username: "Oscar Liu",
    user_img:
      "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    createdAt: "2022/1/10",
    content:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nesciunt, enim ducimus nisi ratione fuga totam veritatis, corrupti aspernatur laborum ad qui aut nobis.",
    likes: 2,
    img: "/h1_background.jpg",
    comments: [],
  },
  {
    username: "Oscar Liu",
    user_img:
      "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    createdAt: "2022/1/10",
    content:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nesciunt, enim ducimus nisi ratione fuga totam veritatis, corrupti aspernatur laborum ad qui aut nobis.",
    likes: 2,
    img: "/h1_background.jpg",
    comments: [
      {
        from: "David Kuo",
        content: "afdsafdasfds",
        likes: 0,
        createdAt: "2022/1/10",
        img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
      {
        from: "David Kuo",
        content:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis molestiae optio beatae ut unde cumque atque exercitationem! Officia aspernatur vero accusamus recusandae sequi natus, voluptatibus minima praesentium dicta ab ratione blanditiis facilis vitae molestiae expedita facere at sint ipsum. Est expedita quis deleniti dolore pariatur nam doloribus praesentium.",
        likes: 2,
        createdAt: "2022/1/10",
        img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      },
    ],
  },
];

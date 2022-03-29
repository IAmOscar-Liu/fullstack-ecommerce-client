export type SamplePostComments = {
  content: string;
  createdAt: string;
  createdBy: {
    name: string;
    img: string;
  };
  likes: number;
};

export type SamplePost = {
  content: string;
  createdAt: string;
  createdBy: {
    name: string;
    img: string;
  };
  likes: number;
  comments: SamplePostComments[];
};

export const emptySamplePosts: SamplePost[] = [];

export const samplePosts: SamplePost[] = [
  {
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    createdAt: "2022/1/14",
    createdBy: {
      name: "Oscar Liu",
      img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    likes: 5,
    comments: [
      {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        createdAt: "2022/1/14",
        createdBy: {
          name: "Tony Chen",
          img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },
        likes: 2,
      },
      {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        createdAt: "2022/1/14",
        createdBy: {
          name: "Tony Chen",
          img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },
        likes: 2,
      },
    ],
  },
  {
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    createdAt: "2022/1/14",
    createdBy: {
      name: "Oscar Liu",
      img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    likes: 5,
    comments: [
      {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        createdAt: "2022/1/14",
        createdBy: {
          name: "Tony Chen",
          img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },
        likes: 2,
      },
      {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        createdAt: "2022/1/14",
        createdBy: {
          name: "Tony Chen",
          img: "https://images.unsplash.com/photo-1639427203698-ad680137107e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },
        likes: 2,
      },
    ],
  },
];

export const ACTION_KEY = {
  LIKE: "like",
  COMMENT: "comment",
  SHARE: "share",
};

export const action = [
  {
    id: 1,
    key: ACTION_KEY.LIKE,
    name: "Like",
    icon: "/svg/components/post/LoveIcon.svg",
    activeIcon: "/svg/components/post/LoveActiveIcon.svg",
    width: 24,
    height: 24,
  },
  {
    id: 2,
    key: ACTION_KEY.COMMENT,
    name: "Comment",
    icon: "/svg/components/post/CommentIcon.svg",
    width: 24,
    height: 24,
  },
  {
    id: 3,
    key: ACTION_KEY.SHARE,
    name: "Share",
    icon: "/svg/components/post/ShareIcon.svg",
    width: 24,
    height: 24,
  },
];

export const comments = [
  {
    userId: 1,
    cmtId: 1,
    name: "khangdt",
    comments: "Very nice !",
    time: "2d",
    love: false,
    replies: [
      {
        userId: 1,
        name: "khangdt",
        comments: "Very nice !",
        time: "2d",
        love: false,
      },
      {
        userId: 2,
        name: "hoangnv",
        comments: "Very nice !",
        time: "3m",
        love: true,
      },
    ],
  },
  {
    userId: 2,
    cmtId: 2,
    name: "hoangnv",
    comments: "Best picture !",
    time: "2d",
    love: false,
    replies: [],
  },
];

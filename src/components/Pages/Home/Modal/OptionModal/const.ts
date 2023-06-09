export const optionKey = {
  REPORT: "report",
  UNFOLLOW: "unfollow",
  GO_TO_POST: "gotopost",
  COPY_LINK: "copylink",
  ABOUT_THIS_ACCOUNT: "aboutthisaccount",
  CANCEL: "cancel",
  DELETE: "Delete",
  EDIT: "Edit",
  HIDE_LIKE_COUNT: "hidelikecount",
  UN_HIDE_LIKE_COUNT: "unhidelikecount",
  TURN_OFF_COMMENTING: "turnoffcommenting",
  TURN_ON_COMMENTING: "turnoncommenting",
};

export const ownOptions = [
  {
    id: 1,
    key: optionKey.DELETE,
    name: "Delete",
    link: "/",
    warning: true,
  },
  {
    id: 2,
    key: optionKey.EDIT,
    name: "Edit",
    link: "/",
    warning: false,
  },
  {
    id: 3,
    key: optionKey.HIDE_LIKE_COUNT,
    name: "Hide like count",
    opposite_name: "Un hide like count",
    link: "/",
    warning: false,
  },
  {
    id: 4,
    key: optionKey.TURN_OFF_COMMENTING,
    name: "Turn off commenting",
    opposite_name: "Turn on commenting",
    link: "/",
    warning: false,
  },
  {
    id: 5,
    key: optionKey.GO_TO_POST,
    name: "Go to post",
    link: "/",
    warning: false,
  },
  {
    id: 6,
    key: optionKey.CANCEL,
    name: "Cancel",
    link: "/",
    warning: false,
  },
];

export const ownDetailOption = ownOptions.filter(
  (option) =>
    option.key !== optionKey.HIDE_LIKE_COUNT &&
    option.key !== optionKey.GO_TO_POST
);

export const options = [
  {
    id: 1,
    key: optionKey.REPORT,
    name: "Report",
    link: "/",
    warning: true,
  },
  {
    id: 2,
    key: optionKey.UNFOLLOW,
    name: "Unfollow",
    link: "/",
    warning: true,
  },
  {
    id: 3,
    key: optionKey.GO_TO_POST,
    name: "Go to post",
    link: "/",
    warning: false,
  },
  {
    id: 4,
    key: optionKey.COPY_LINK,
    name: "Copy link",
    link: "/",
    warning: false,
  },
  {
    id: 5,
    key: optionKey.ABOUT_THIS_ACCOUNT,
    name: "About this account",
    link: "/",
    warning: false,
  },
  {
    id: 6,
    key: optionKey.CANCEL,
    name: "Cancel",
    link: "/",
    warning: false,
  },
];

export const detailOptions = options.filter(
  (option) => option.key !== optionKey.GO_TO_POST
);

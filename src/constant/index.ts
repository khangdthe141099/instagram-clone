export type User = {
  id?: string | number;
  email?: string;
  fullname?: string;
  username?: string;
  passsword?: string | number;
  profileImg?: string | null;
  bio?: string;
  is_private?: boolean;
  media?: Array<Photo | Video>;
  follower?: Array<string | number>;
  following?: Array<string | number>;
  external_url?: any;
};

export type Photo = {
  postId: string | number;
  userId: string | number;
  url: string;
  time: string | any;
  like: number[] | null;
  comment: Comment[];
  type: "photo";
};

export type Video = {
  postId: string | number;
  userId: string | number;
  url: string;
  time: string | any;
  like: number[] | null;
  comment: Comment[];
  type: "video";
};

export type Comment = {
  userId: string | number;
  content: string | null;
  time: string;
  like: number[];
  replies: Comment[];
};

export const COMMENT_TYPE = {
  LESS: "Less",
  MORE: "More",
};

export const LOGIN_TYPE = {
  GOOGLE: "google",
  GITHUB: "github",
  FACEBOOK: "facebook",
  CREDENTIALS: "credentials",
};

export const HTTP_STATUS_CONSTANTS = {
  OK: 200,
  ERROR_CODE_401: 401,
  SERVER_ERROR: "E0",
  ERROR: 400,
  SERVER_ERROR_CODE: 500,
};

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const LENGTH_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_TOTAL: 0,
  DEFAULT_TEXTAREA_ROWS: 4,
  MAX_LENGTH_INPUT: 256,
  DEFAULT_PAGE_SIZE: 10,
  MAX_LENGTH_DESCRIPTION: 320,
  DEFAULT_PAGE_SIZE_OPTIONS: ["10", "20", "50"],
};

export const TOAST_TEXT = {
  CREATE_POST: {
    ERROR_NULL:
      "🚫 Please make sure you have selected a photo and captioned the post!",
    ERROR_CREATE_FAILED: "Error when create new post...!",
    SUCCESS: "🔥 Your post has been shared !",
  },
  DELETE_POST: {
    SUCCESS: "⛔ Your post has been deleted !",
  },
  UPDATE_POST: {
    ERROR_NULL:
      "🚫 Please make sure you have selected a photo and captioned the post!",
    ERROR_CREATE_FAILED: "Error when updated post...!",
    SUCCESS: "🔥 Your post has been updated !",
  },
};

export const TYPE_OPTION_MODAL = {
  DETAIL: 'detail',
  ALL: 'all',
}

export const MAX_LENGTH_IMAGE_CREATE = 10;
export const UNDEFINED = "undefined";

export const LIMIT_DEFAULT = 5
export const OFF_SET_DEFAULT = 5 

export const MONTH_DATE_FORMAT = 'MMMM D'
export const MONTH_YEAR_FORMAT = 'MMMM YYYY'

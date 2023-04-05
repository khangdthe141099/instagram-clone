
export type User = {
    id?: string | number,
    email?: string,
    fullname?: string,
    username?: string,
    passsword?: string | number,
    profileImg?: string | null,
    bio?: string,
    is_private?: boolean,
    media?: Array<Photo | Video>,
    follower?: Array<string | number>,
    following? :Array<string | number>,
    external_url?: any
}

export type Photo = {
  postId: string | number,
  userId: string | number,
  url : string,
  time: string | any,
  like: number[] | null,
  comment: Comment[],
  type: "photo"
}

export type Video = {
  postId: string | number,
  userId: string | number,
  url : string,
  time: string | any,
  like: number[] | null,
  comment: Comment[],
  type: "video"
}

export type Comment = {
  userId: string | number,
  content: string | null,
  time: string,
  like: number[],
  replies: Comment[]
}
export const LENGTH_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_TOTAL: 0,
  MAX_LENGTH_INPUT: 256,
  DEFAULT_PAGE_SIZE: 10,
  MAX_LENGTH_DESCRIPTION: 320,
  DEFAULT_TEXTAREA_ROWS: 5,
  DEFAULT_PAGE_SIZE_OPTIONS: ["10", "20", "50"],
  DEFAULT_PAGE_SIZE_NFT_SET_AVATAR: 6,
};

export const COMMENT_TYPE = {
  LESS: "Less",
  MORE: "More"
}

export const LOGIN_TYPE = {
  GOOGLE: "google",
  GITHUB: "github",
  FACEBOOK: "facebook",
};

export const HTTP_STATUS_CONSTANTS = {
  OK: 200,
  ERROR_CODE_401: 401,
  SERVER_ERROR: 'E0',
  ERROR: 400,
};

export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

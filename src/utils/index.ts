import { HTTP_STATUS_CONSTANTS } from "@/constant";
import dynamic from "next/dynamic";
import type { RcFile } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import { UNDEFINED } from "@/constant";

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const checkSuccessRequest = (response: any) => {
  return response?.status < HTTP_STATUS_CONSTANTS.ERROR;
};

export const checkServerErrorResponse = (response: any) => {
  return response?.status >= HTTP_STATUS_CONSTANTS.SERVER_ERROR_CODE;
};

export const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const findUserById = (users: any, userId: string) => {
  const user = users.find((item: any) => item._id === userId);

  return user;
};

export const findUserByEmail = (users: any, email: string) => {
  const user = users.find((item: any) => item.email === email);

  return user;
};

export const sortCurrenPost = (posts: any) => {
  return posts?.sort((a: any, b: any) => {
    const date1 = new Date(a.createdAt).valueOf();
    const date2 = new Date(b.createdAt).valueOf();
    return date2 - date1;
  });
};

export const sortCurrenComment = (comments: any) => {
  return comments?.sort((a: any, b: any) => {
    const date1 = new Date(a.createdAt).valueOf();
    const date2 = new Date(b.createdAt).valueOf();
    return date2 - date1;
  });
};

export const isOwner = (userCheck: any, currentUser: any) => {
  return userCheck?.userId === currentUser?.email
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const smoothScrollToRef = (ref?: any, range = 0) => {
  if (typeof window !== UNDEFINED) {
    window.scrollTo({
      top: ref?.current?.offsetTop + range,
      left: 0,
      behavior: "smooth",
    });
  }
};

export const smoothScrollToTop = () => {
  if (typeof window !== UNDEFINED) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

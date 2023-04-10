import { HTTP_STATUS_CONSTANTS } from "@/constant";
import dynamic from "next/dynamic";
import type { RcFile } from "antd/es/upload/interface";

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

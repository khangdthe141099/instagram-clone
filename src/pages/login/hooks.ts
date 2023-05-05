import { userService } from "@/services/userService";
import { postService } from "@/services/postService";
import { commentService } from '@/services/commentService';
import { useEffect, useState } from "react";
import { HTTP_STATUS_CONSTANTS } from "@/constant";

export const useGetCurrentUser = (userId: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const setDefaultValue = () => {
      setIsLoading(false);
      setCurrentUser([]);
    };

    (async () => {
      setIsLoading(true);

      try {
        const { data, status }: any = await userService.getUserByEmail(userId);

        if (status === HTTP_STATUS_CONSTANTS.OK) setCurrentUser(data.user);
      } catch (e) {
        setDefaultValue();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  return {
    isLoading,
    currentUser,
  };
};

export const useGetAllUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const setDefaultValue = () => {
      setIsLoading(false);
      setAllUser([]);
    };

    (async () => {
      setIsLoading(true);

      try {
        const { data, status }: any = await userService.getAllUser();

        if (status === HTTP_STATUS_CONSTANTS.OK) setAllUser(data.user);
      } catch (e) {
        setDefaultValue();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    allUser,
  };
};

export const useGetCurrentPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState([]);
  const [total, setTotal] = useState(null)

  useEffect(() => {
    const setDefaultValue = () => {
      setIsLoading(false);
      setCurrentPost([]);
      setTotal(null)
    };

    (async () => {
      setIsLoading(true);

      try {
        const { data, status }: any = await postService.getAllPost();
        if (status === HTTP_STATUS_CONSTANTS.OK){
          setCurrentPost(data.post);
          setTotal(data.total)
        }
      } catch (e) {
        setDefaultValue();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    currentPost,
    total
  };
};


export const useGetAllComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    const setDefaultValue = () => {
      setIsLoading(false);
      setAllComment([]);
    };

    (async () => {
      setIsLoading(true);

      try {
        const { data, status }: any = await commentService.getAllComment();

        if (status === HTTP_STATUS_CONSTANTS.OK) setAllComment(data.comment);
      } catch (e) {
        setDefaultValue();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    allComment,
  };
};


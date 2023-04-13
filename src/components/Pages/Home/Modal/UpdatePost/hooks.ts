import { postService } from "@/services/postService";
import { useEffect, useState } from "react";
import { HTTP_STATUS_CONSTANTS } from "@/constant";

export const useGetPostById = (postId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentPost, setCurrentPost] = useState([]);
  
    useEffect(() => {
      if (!postId) return;
  
      const setDefaultValue = () => {
        setIsLoading(false);
        setCurrentPost([]);
      };
  
      (async () => {
        setIsLoading(true);
  
        try {
          const { data, status }: any = await postService.getPostByPostId(postId);
  
          if (status === HTTP_STATUS_CONSTANTS.OK) setCurrentPost(data.post);
        } catch (e) {
          setDefaultValue();
        } finally {
          setIsLoading(false);
        }
      })();
    }, [postId]);
  
    return {
      isLoading,
      currentPost,
    };
  };
import { userService } from "@/services/userService";
import { useEffect, useState } from "react";
import { HTTP_STATUS_CONSTANTS } from "@/constant";

const useGetCurrentUser = (userId: string) => {
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

export default useGetCurrentUser;

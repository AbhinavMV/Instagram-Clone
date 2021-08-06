import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const user = useContext(UserContext);
  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.userId);
      setActiveUser(response);
    }
    if (user?.userId) getUserObjByUserId();
  }, [user]);
  return { user: activeUser };
};
export default useUser;

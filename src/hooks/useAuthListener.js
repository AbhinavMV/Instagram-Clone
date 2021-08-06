import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebase";
import { getUserByUserId } from "../services/firebase";

const useAuthListener = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        console.log(authUser);
        const [user] = await getUserByUserId(authUser.uid);
        localStorage.setItem("authUser", JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    return () => listener();
  }, [firebase]);

  return { user };
};

export default useAuthListener;

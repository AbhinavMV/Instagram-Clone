import { createContext } from "react";

const UserContext = createContext({
  username: "",
  fullName: "",
  emailAddress: "",
  followers: [],
  userId: "",
  following: [],
  docId: "",
});

export default UserContext;

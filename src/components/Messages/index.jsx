import { useContext, useEffect, useReducer, useState } from "react";
import UserContext from "../../context/user";
import { getAllFollowingUsersData, getCurrUserMessagesFromFirebase } from "../../services/firebase";
import FollowersList from "./FollowersList";
import UserMessages from "./UserMessages";
const Messages = () => {
  const loggedInUser = useContext(UserContext);
  const [followersList, setFollowersList] = useState();
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    currUser: {},
    messages: [],
  };
  const [{ currUser, messages }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getUsersData() {
      if (loggedInUser) {
        const response = await getAllFollowingUsersData(loggedInUser.following);
        setFollowersList(response);
      }
    }
    getUsersData();
  }, [loggedInUser]);

  useEffect(() => {
    async function getUserMessages() {
      if (currUser.userId) {
        await getCurrUserMessagesFromFirebase(currUser.userId, loggedInUser.userId, dispatch);
      }
    }
    if (currUser.userId) getUserMessages();
  }, [currUser.userId, loggedInUser.userId]);

  return (
    <div
      className="container mx-auto max-w-screen-md border grid divide-x grid-cols-3 min-h-full"
      style={{ height: "80vh" }}
    >
      <FollowersList
        user={loggedInUser}
        currUser={currUser}
        followersList={followersList}
        setCurrUser={dispatch}
      />
      <UserMessages
        messages={messages}
        user={loggedInUser}
        currUser={currUser}
        setState={dispatch}
      />
    </div>
  );
};

export default Messages;

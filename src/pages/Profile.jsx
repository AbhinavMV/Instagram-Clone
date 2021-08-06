import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import { NOT_FOUND } from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/Profile";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  // const [userExists, setUserExists] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const tempUser = await getUserByUsername(username);
      if (tempUser) {
        setUser(tempUser[0]);
        // setUserExists(true);
      } else {
        history.push(NOT_FOUND);
      }
    }
    username && checkUserExists();
  }, [username, history]);

  return (
    <div className="bg-gray-background">
      <Header />
      {user ? (
        <div className="mx-auto max-w-xl">
          <UserProfile user={user} />
        </div>
      ) : null}
    </div>
  );
};

export default Profile;

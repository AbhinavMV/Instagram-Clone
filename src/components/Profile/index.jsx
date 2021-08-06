import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { getUserPhotosbyUserId } from "../../services/firebase";
import Header from "./Header";
import Photos from "./Photos";

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      //   const [user] = await getUserByUsername(userusername);
      //   console.log(user);
      const photos = await getUserPhotosbyUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers?.length || 0,
      });
    }
    user && getProfileInfoAndPhotos();
  }, [user]);

  return Object.keys(profile).length > 0 ? (
    <>
      <Header
        photosCount={photosCollection.length}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  ) : null;
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    following: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};

export default UserProfile;

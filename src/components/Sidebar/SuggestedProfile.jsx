import PropType from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateFollowedUserFollowersList,
  updateLoggedInUserFollowingList,
} from "../../services/firebase";
const SuggestedProfile = ({
  profileUserDocId,
  username,
  profileUserId,
  userId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    try {
      await updateLoggedInUserFollowingList(loggedInUserDocId, profileUserId, false);
      await updateFollowedUserFollowersList(profileUserDocId, userId, false);
    } catch (error) {
      console.log(error);
    }
  }

  return !followed ? (
    <div className="flex flex-row items-center align-middle justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/avatars/default.png";
          }}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="text-xs font-bold text-blue-medium"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
};

SuggestedProfile.propType = {
  userDocId: PropType.string.isRequired,
  username: PropType.string.isRequired,
  profileId: PropType.string.isRequired,
  userId: PropType.string.isRequired,
};

export default SuggestedProfile;

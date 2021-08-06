import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import UserContext from "../../context/user";

import useUser from "../../hooks/useUser";
import { followToggle } from "../../services/firebase";

const Header = ({ photosCount, profile, followerCount, setFollowerCount }) => {
  const { user } = useUser();
  const u = useContext(UserContext);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  useEffect(() => {
    setIsFollowingProfile(profile.followers.includes(user.userId));
  }, [profile.followers, user.userId]);
  const handleFollowToggle = async () => {
    console.log(u);
    setIsFollowingProfile(!isFollowingProfile);
    setFollowerCount({ followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1 });
    console.log(isFollowingProfile);
    await followToggle(profile.docId, profile.userId, user.docId, user.userId, isFollowingProfile);
    // setIsFollowingProfile({ profile: response });
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-2">
      <div className="justify-center">
        <img
          className="rounded-full w-auto h-auto"
          alt="profile"
          src={`/images/avatars/${profile.username}.jpg`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/avatars/default.png";
          }}
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
          {user.username && user.username !== profile.username && (
            <button
              onClick={handleFollowToggle}
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-5"
            >
              {isFollowingProfile ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="container hidden md:flex mt-4">
          {!profile.followers || !profile.following ? (
            <Skeleton coount={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` photos`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {followerCount === 1 ? " follower" : " followers"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile.following.length}</span>
                {` following`}
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile.fullName ? <Skeleton count={1} width={24} /> : profile.fullName}
          </p>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    following: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }).isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
};

export default Header;

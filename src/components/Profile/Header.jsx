import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import useUser from "../../hooks/useUser";
import { followToggle, updateUserProfilePhoto } from "../../services/firebase";

const Header = ({ photosCount, profile, followerCount, setFollowerCount }) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    setIsFollowingProfile(profile.followers.includes(user.userId));
  }, [profile.followers, user.userId]);

  const handleFollowToggle = async () => {
    setIsFollowingProfile(!isFollowingProfile);
    setFollowerCount({ followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1 });
    console.log(isFollowingProfile);
    await followToggle(profile.docId, profile.userId, user.docId, user.userId, isFollowingProfile);
    // setIsFollowingProfile({ profile: response });
  };

  const onProfileChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePhoto(file);
          updateUserProfilePhoto(file, user.userId, user.docId);
          document.getElementById("profile").src = reader.result;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setProfilePhoto(null);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-2">
      <div className="justify-center relative group">
        {user.photoURL ? (
          <img
            className="rounded-full w-24 h-24 md:w-40 md:h-40 flex object-cover blur-sm"
            alt="profile"
            id="profile"
            src={user?.photoURL}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/avatars/default.png";
            }}
          />
        ) : (
          <Skeleton count="1" className="rounded-full w-24 h-24 md:w-40 md:h-40 flex" />
        )}
        <div className="absolute bottom-0 rounded-full left-0 bg-gray-200 z-10 w-24 h-24 md:w-40 md:h-40 justify-evenly items-center bg-black-faded group-hover:flex hidden">
          <label
            htmlFor="profilePhoto"
            className="flex items-center text-white font-bold cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="evenodd"
                strokeLinejoin="evenodd"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </label>
          <input
            type="file"
            accept="image/x-png,image/jpeg"
            id="profilePhoto"
            className="hidden"
            onChange={onProfileChange}
          />
        </div>
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

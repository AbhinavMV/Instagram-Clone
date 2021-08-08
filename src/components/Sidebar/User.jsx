import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { memo } from "react";
const User = ({ fullName, username, photoURL }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`}>
      <div className="grid grid-cols-4 gap-4 mb-6 items-center">
        <div className="flex items-center justify-between col-span-1">
          <img
            className="rounded-full h-12 w-14 flex object-cover"
            src={photoURL}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/avatars/default.png";
            }}
            alt={`${username} profile`}
          />
        </div>
        <div className="col-span-3">
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p>
        </div>
      </div>
    </Link>
  );

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  photoURL: PropTypes.string,
};

User.whyDidYouRender = true;
export default memo(User);

import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FollowersList = ({ user, currUser, followersList, setCurrUser }) => {
  return followersList ? (
    <div
      className={`container ${currUser.userId ? "hidden md:block" : "col-span-3 md:col-span-1 "}`}
    >
      <div className="w-full h-8 text-lg text-center font-bold">{user.username}</div>
      <div className="overflow-y-auto" style={{ height: "74vh" }}>
        {followersList.map((user) => (
          <div key={user.userId} className="bg-gray-background mb-2 w-full">
            <Link to={`/messages/${user.userId}`}>
              <div
                className="flex flex-row items-center ml-4 mt-4"
                onClick={() => setCurrUser({ currUser: user })}
              >
                <img
                  className="rounded-full w-12 h-12 flex mr-4"
                  src={user.photoURL ? user.photoURL : "/images/avatars/default.png"}
                  alt={user.username}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/avatars/default.png";
                  }}
                />
                <p className="text-sm font-bold">{user.username}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Skeleton count={1} className="col-span-1 w-full h-full p-10" />
  );
};

FollowersList.proptTypes = {
  user: PropTypes.object,
  followersList: PropTypes.array,
  setCurrUser: PropTypes.func,
};

export default FollowersList;

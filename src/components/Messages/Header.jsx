import PropType from "prop-types";

const Header = ({ currUser, setCurrUser }) => {
  return (
    <div className="w-full h-14 bg-gray-primary flex">
      {currUser.userId && (
        <>
          <img
            className="rounded-full w-12 h-12 flex m-1"
            src={currUser.photoURL ? currUser.photoURL : "/images/avatars/default.png"}
            alt={currUser.username}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/avatars/default.png";
            }}
          />
          <p className="text-lg font-bold ml-3 my-auto">{currUser.fullName}</p>
          <button className="ml-auto mr-2" onClick={() => setCurrUser({ currUser: {} })}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

Header.propType = {
  currUser: PropType.shape({
    photoURL: PropType.string,
    userId: PropType.string,
    username: PropType.string,
    fullName: PropType.string,
  }).isRequired,
  setCurrUser: PropType.func.isRequired,
};

export default Header;

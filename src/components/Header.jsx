import { useContext } from "react";
import { Link } from "react-router-dom";

import { DASHBOARD, LOGIN, SIGN_UP } from "../constants/routes";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const user = useContext(UserContext);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8 px-3">
      <div className="container mx-auto max-w-screen-md h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-base text-center flex items-center align-middle cursor-pointer">
            <h1 className="flex justify-center max-w-md">
              <Link to={DASHBOARD} aria-label="Instagram Logo">
                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
              </Link>
            </h1>
          </div>
          <div className="text-gray-base text-center flex items-center align-middle">
            {!user ? (
              <p className="text-sm font-medium">Loading...</p>
            ) : Object.keys(user).length > 0 ? (
              <>
                <Link to={DASHBOARD} aria-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 mr-2 text-black-light cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/messages`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 mr-2 text-black-light cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </Link>
                </div>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") firebase.auth().signOut();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 mr-2 text-black-light cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                {/* user image */}
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.username}`}>
                    {
                      <img
                        className="rounded-full h-7 w-7 flex object-cover border bg-blend-darken"
                        src={user.photoURL ? user.photoURL : "/images/avatars/default.png"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/avatars/default.png";
                        }}
                        alt={`${user.fullName} profile`}
                      />
                    }
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getProfilesFromFirebase } from "../../services/firebase";
import SuggestedProfile from "./SuggestedProfile";
const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getProfilesFromFirebase(userId, following);
      setProfiles(response);
    }
    userId && suggestedProfiles();
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={1} height={150} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-middle justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileUserDocId={profile.docId}
            username={profile.username}
            profileUserId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

Suggestions.propType = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};

export default Suggestions;

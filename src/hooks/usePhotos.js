import { useEffect, useState } from "react";

import { getPhotos } from "../services/firebase";
import useUser from "./useUser";

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    async function getTimelinePhotos() {
      // const {following} = await
      let followedUserPhotos = [];
      if (user.following?.length > 0) {
        followedUserPhotos = await getPhotos(user.userId, user.following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    if (user?.userId) getTimelinePhotos();
  }, [user]);

  return { photos };
};

export default usePhotos;

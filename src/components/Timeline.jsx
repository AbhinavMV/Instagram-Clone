import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/usePhotos";
import AddPost from "./AddPost";
import Post from "./Post";

const Timeline = () => {
  //users photos
  const { photos } = usePhotos();
  //skeleton on loading
  //create post component
  //tell them to create some photos

  return (
    <div className="col-span-3 md:col-span-2 px-4">
      <AddPost />
      {!photos ? (
        <>
          <Skeleton count={4} height={500} className="mb-5 w-screen" />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;

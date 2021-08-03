import PropTypes from "prop-types";
import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import useUser from "../../hooks/useUser";

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const { user } = useUser();
  const handleSubmitComment = (e) => {
    e.preventDefault();
    setComments([{ displayName: user.username, comment }, ...comments]);
    setComment("");
    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName: user.username, comment }),
      });
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) => (comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault())}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment"
          ref={commentInput}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && "opacity-25"}`}
          type="submit"
          disabled={comment.length < 1}
        >
          Post
        </button>
      </form>
    </div>
  );
};

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};

export default AddComment;

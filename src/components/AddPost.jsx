import { useRef, useState } from "react";
import { uploadImageToFirebase } from "../services/firebase";

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const userInput = useRef(null);
  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        reader.readyState === 2 && setImage(file);
        let preview = document.getElementById("preview");
        preview.src = reader.result;
        userInput.current.focus();
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImageToFirebase(image);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4 flex flex-col items-center px-1">
      {/* <input type="text" className="w-full mx-auto h-20 rounded" aria-multiline="true" /> */}
      <div className="flex w-full">{image && <img alt="" id="preview" className="mb-2" />}</div>
      <div className="w-full flex items-center">
        <textarea
          className="w-full mx-auto h-20 resize-none border rounded-md text-md cursor-text"
          value={caption}
          placeholder="Caption..."
          onChange={(e) => setCaption(e.target.value)}
          ref={userInput}
        />
        <div className="flex flex-col justify-evenly mx-2">
          <label htmlFor="image" className="m-1 cursor-pointer">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
          <input
            type="file"
            accept="image/x-png,image/jpeg"
            className="hidden"
            name="image"
            id="image"
            onChange={onImageChange}
          />
          <button
            id="post-button"
            type="submit"
            className="disabled:opacity-20 m-1"
            disabled={!image}
          >
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddPost;

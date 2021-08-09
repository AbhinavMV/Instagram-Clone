import PropType from "prop-types";
import { useEffect, useRef, useState } from "react";
import { addMessage } from "../../services/firebase";
const UserMessages = ({ currUser, user, messages, setMessages }) => {
  const [message, setMessage] = useState("");
  const bottom = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (currUser.userId && user.userId) {
      await addMessage({ fromId: user.userId, toId: currUser.userId, text: message });
      setMessage("");
    }
  };

  useEffect(() => {
    messages.length > 0 && bottom.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="col-span-2 flex flex-col">
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
            <button className="ml-auto mr-2">
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
      {messages.length > 0 ? (
        <div className="w-full flex flex-col overflow-y-auto" style={{ height: "64vh" }}>
          {messages.map(({ docId, fromId, toId, text }) => (
            <p
              className={`text-md m-2 rounded-t-3xl whitespace-nowrap text-white min-w-min w-min p-3 ${
                user.userId === fromId
                  ? "bg-blue-medium text-right rounded-l-lg ml-auto"
                  : "bg-gray-base rounded-r-lg "
              }`}
              key={docId}
            >
              {text}
            </p>
          ))}
          <span id="bottom" ref={bottom}></span>
        </div>
      ) : (
        <p>Send a message</p>
      )}
      <form onSubmit={handleSendMessage} className="w-full mt-auto flex border-t">
        <input
          type="text"
          className="w-full p-2 border-r"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 mr-2 h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

UserMessages.propType = {
  messages: PropType.array.isRequired,
  currUser: PropType.object.isRequired,
  user: PropType.object.isRequired,
};

export default UserMessages;

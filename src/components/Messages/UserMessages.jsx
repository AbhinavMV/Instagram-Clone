import PropType from "prop-types";
import { useEffect, useRef, useState } from "react";
import { addMessage } from "../../services/firebase";
import Footer from "./Footer";
import Header from "./Header";
const UserMessages = ({ currUser, user, messages, setState }) => {
  const [message, setMessage] = useState("");
  const bottom = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (currUser.userId && user.userId) {
      addMessage({ fromId: user.userId, toId: currUser.userId, text: message });
      setMessage("");
    }
  };

  useEffect(() => {
    messages.length > 0 && bottom.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`${currUser.userId ? "col-span-3" : "hidden"} md:col-span-2 md:flex md:flex-col`}
    >
      {currUser.userId ? (
        <>
          <Header currUser={currUser} setCurrUser={setState} />
          {messages.length > 0 ? (
            <div className="w-full flex flex-col overflow-y-auto" style={{ height: "64vh" }}>
              {messages.map(({ docId, fromId, text }) => (
                <div className="flex px-1" key={docId}>
                  <img
                    className={`rounded-full w-8 h-8 mt-auto border border-black-light object-cover ${
                      user.userId === fromId && "order-last"
                    }`}
                    src={
                      user.userId !== fromId
                        ? currUser.photoURL
                          ? currUser.photoURL
                          : "/images/avatars/default.png"
                        : user.photoURL
                        ? user.photoURL
                        : "/images/avatars/default.png"
                    }
                    alt=""
                  />
                  <p
                    className={`text-md m-2 rounded-t-3xl whitespace-nowrap text-white min-w-min w-min p-3 ${
                      user.userId === fromId
                        ? "bg-blue-medium text-right rounded-l-lg ml-auto"
                        : "bg-gray-base rounded-r-lg "
                    }`}
                  >
                    {text}
                  </p>
                </div>
              ))}
              <span id="bottom" ref={bottom}></span>
            </div>
          ) : (
            <p className="text-xl text-center my-auto font-bold">Send a message</p>
          )}
          <Footer message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
        </>
      ) : (
        <p className="text-xl text-center my-auto font-bold">Select a friend to send a message</p>
      )}
    </div>
  );
};

UserMessages.propType = {
  messages: PropType.array.isRequired,
  currUser: PropType.object.isRequired,
  user: PropType.object.isRequired,
};

export default UserMessages;

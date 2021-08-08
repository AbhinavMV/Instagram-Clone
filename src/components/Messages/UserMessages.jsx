import PropType from "prop-types";
const UserMessages = ({ currUser, user, messages }) => {
  return (
    <div className="col-span-2 flex flex-col">
      <div className="w-full h-8 bg-gray-background ">Header</div>
      {messages.length > 0 ? (
        <div className="w-full flex flex-col">
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
        </div>
      ) : (
        <p>Send a message</p>
      )}
      <form className="w-full mt-auto flex">
        <input type="text" className="w-full p-2 border-t" />
        <button>Send</button>
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

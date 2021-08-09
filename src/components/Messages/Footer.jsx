import PropType from "prop-types";

const Footer = ({ message, setMessage, handleSendMessage }) => {
  return (
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
  );
};

Footer.propType = {
  message: PropType.string.isRequired,
  setMessage: PropType.func.isRequired,
  handleSendMessage: PropType.func.isRequired,
};

export default Footer;

import PropTypes from "prop-types";
import { useState } from "react";

export const Form = ({ socket, getMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const date = new Date().toLocaleTimeString().slice(0, 5);
    if (message === "") return;

    const newMessage = {
      body: message,
      date,
      from: "Me",
    };

    socket.emit("message", { body: newMessage.body, date: newMessage.date });
    getMessage(newMessage);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmitMessage(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmitMessage}
      className="flex justify-between gap-4 p-2 px-4 transition-opacity rounded-md hover:opacity-90 bg-zinc-700"
    >
      <textarea
        value={message}
        onKeyDown={handleKeyDown}
        onChange={(e) => setMessage(e.target.value)}
        className={`flex-grow bg-transparent input-message outline-none resize-none ${
          message.length >= 40 ? "h-16" : "h-7"
        }`}
        placeholder="Enter Message"
      ></textarea>

      <button className="hover:scale-95" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-send-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
          <path d="M6.5 12h14.5" />
        </svg>
      </button>
    </form>
  );
};

Form.propTypes = {
  socket: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
};

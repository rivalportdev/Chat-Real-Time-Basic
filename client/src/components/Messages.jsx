import PropTypes from "prop-types";
import { Message } from "./Message";

export const Messages = ({ messages }) => {
  return (
    <div className="overflow-auto message-container">
      <ul className="table w-full p-4">
        {messages?.map((message, index) => (
          <Message key={index} text={message.body} from={message.from} date={message.date} />
        ))}
      </ul>
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
};

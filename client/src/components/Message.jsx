import PropTypes from "prop-types";

export const Message = ({ text, from, date }) => {
  return (
    <li
      className={`p-2 rounded-md mb-3 table relative max-w-[75%] ${
        from === "Me" ? "bg-purple-600 left-full text-right -translate-x-full" : "bg-zinc-900"
      }`}
    >
      <p className="mb-2">{text}</p>
      <span className="text-xs opacity-70">{date}</span>
    </li>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

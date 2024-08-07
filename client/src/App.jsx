import io from "socket.io-client";
import { useState, useEffect } from "react";
import { Form } from "./components/Form";
import { Messages } from "./components/Messages";

const socket = io("/");

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) => setMessages((state) => [...state, message]);

  const getMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="flex justify-center w-screen h-screen p-4 overflow-hidden text-gray-300 bg-zinc-900">
      <main className="flex flex-col justify-between gap-4 p-4 rounded-lg w-[35rem] bg-zinc-800 shadow-xl">
        <Messages messages={messages} />
        <Form socket={socket} getMessage={getMessage} />
      </main>
    </div>
  );
};

export default App;

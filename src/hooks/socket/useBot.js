import { useEffect, useState } from "react";
import useSocket from "./useSocket";

export default function useBot() {
  const { socket } = useSocket();
  const [bot, setBot] = useState(false);

  useEffect(() => {
    const listener = (data) => {
      setBot(data);
    };

    socket &&
      socket.on("receive_bot", (data) => {
        setBot(data);
      });

    return () => {
      socket && socket.off("receive_bot", listener);
    };
  }, [socket]);

  return { bot };
}

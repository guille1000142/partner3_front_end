import { useEffect, useState } from "react";
import useSocket from "./useSocket";

export default function useUsers() {
  const { socket } = useSocket();
  const [donations, setDonations] = useState(false);

  useEffect(() => {
    const listener = (data) => {
      setDonations(data);
    };

    socket && socket.on("receive_donations", listener);

    return () => {
      socket && socket.off("receive_donations", listener);
    };
  }, [socket]);
  return { donations };
}

import { useEffect, useState } from "react";
import useSocket from "./useSocket";

export default function useUsers() {
  const { socket } = useSocket();
  const [users, setUsers] = useState(false);

  useEffect(() => {
    const listener = (data) => {
      setUsers(data);
    };

    socket && socket.on("receive_users", listener);

    return () => {
      socket && socket.off("receive_users", listener);
    };
  }, [socket]);

  return { users };
}

import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState(false);

  useEffect(() => {
    const socketUrl = process.env.REACT_APP_SOCKET_URL_WS;

    const JWT = process.env.REACT_APP_JWT;

    const socketOptions = {
      query: {
        token: JWT,
      },
    };

    const socketServer = io.connect(socketUrl, socketOptions);
    setSocket(socketServer);
  }, []);

  return { socket };
}

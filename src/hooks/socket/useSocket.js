import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState(false);

  useEffect(() => {
    const wssUrl = `wss://${process.env.REACT_APP_SOCKET_URL}`;
    const httpsUrl = `https://${process.env.REACT_APP_SOCKET_URL}`;

    const JWT = process.env.REACT_APP_JWT;

    const socketOptions = {
      query: {
        token: JWT,
      },
    };

    const socketServer = io.connect(wssUrl, socketOptions);
    setSocket(socketServer);
  }, []);

  return { socket };
}

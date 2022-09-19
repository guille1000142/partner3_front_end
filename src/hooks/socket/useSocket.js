import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import io from "socket.io-client";

export default function useSocket() {
  const { channel, history } = useContext(Context);
  const [socket, setSocket] = useState(false);
  const [bot, setBot] = useState(false);
  const [users, setUsers] = useState(false);
  const [donations, setDonations] = useState(false);
  const [predictions, setPredictions] = useState(false);

  useEffect(() => {
    const wssUrl = `ws://${process.env.REACT_APP_SOCKET_URL}`;
    const httpsUrl = `https://${process.env.REACT_APP_SOCKET_URL}`;

    const JWT = process.env.REACT_APP_JWT;

    const socketOptions = {
      query: {
        token: JWT,
      },
    };

    const socketServer = io.connect(wssUrl, socketOptions);
    setSocket(socketServer);

    // if (socket) {
    //   socket.on("receive_bot", (data) => {
    //     setBot(data);
    //   });

    //   socket.on("receive_users", (data) => {
    //     setUsers(data);
    //   });

    //   socket.on("receive_donations", (data) => {
    //     const order = data.sort((a, b) => b.time - a.time);
    //     setDonations(order);
    //   });

    //   socket.on("receive_predictions", (data) => {
    //     setPredictions(data);
    //   });
    // }

    // return () => {
    //   socket && socket.removeAllListeners();
    // };
  }, []);

  return { socket, bot, donations, predictions, users };
}

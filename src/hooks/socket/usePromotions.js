import { useEffect, useState } from "react";
import useSocket from "./useSocket";

export default function usePromotions() {
  const { socket } = useSocket();
  const [promotions, setPromotions] = useState(false);

  useEffect(() => {
    const listener = (data) => {
      setPromotions(data);
    };

    socket && socket.on("receive_promotions", listener);

    return () => {
      socket && socket.off("receive_promotions", listener);
    };
  }, [socket]);

  return { promotions };
}

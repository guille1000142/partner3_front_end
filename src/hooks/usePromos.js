import { useState, useEffect } from "react";

export default function usePromos({ promotions }) {
  const [promos, setPromos] = useState(false);

  useEffect(() => {
    if (promotions) {
      const last = promotions.sort((a, b) => b.time - a.time);

      const promotionsData = last.slice(0, 10);

      const data = promotionsData.map((promotion, index) => {
        const object = {
          id: index + 1,
          photo: promotion.photo,
          channel: promotion.channel,
          cid: promotion.id,
          wallet: promotion.wallet,
        };
        return object;
      });

      const column = [
        { name: "Channel", uid: "channel" },
        { name: "Donate", uid: "cid" },
      ];

      setPromos({ column, data });
    }
  }, [promotions]);

  return { promos };
}

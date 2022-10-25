import { useState, useEffect } from "react";
import useBot from "./socket/useBot";
import useChannel from "./useChannel";

export default function usePromos({ promotions, users }) {
  const [promos, setPromos] = useState(false);
  const { bot } = useBot();
  const { getChannel } = useChannel();

  useEffect(() => {
    if (promotions && users && bot) {
      const date = new Date();
      const utc = `${date.getUTCDate()}-${
        date.getUTCMonth() + 1
      }-${date.getUTCFullYear()}`;

      const utcPromotions = promotions.find(
        (promotion) => promotion.day === utc
      );

      const column = [
        { name: "Streamer", uid: "name" },
        { name: "Language", uid: "language" },
        { name: "Donate", uid: "cid" },
      ];
      if (utcPromotions !== undefined) {
        Promise.all(
          utcPromotions.ids.map(async (id) => {
            const access_token = bot[1].access_token;
            let data = await getChannel(id, access_token);
            return data;
          })
        ).then((promotion) => {
          const data = promotion.map((channel, index) => {
            const user = users.find(
              (user) => user.id === channel.broadcaster_id
            );
            const data = {
              id: index + 1,
              cid: channel.broadcaster_id,
              language: channel.broadcaster_language.toUpperCase(),
              name: channel.broadcaster_name,
              game: channel.game_name,
              title: channel.title,
              photo: user.photo,
              wallet: user.wallet,
            };

            return data;
          });
          setPromos({ column, data });
        });
      } else {
        setPromos({ column, data: [{ id: 1 }] });
      }
    }
  }, [promotions, users, bot]);

  return { promos };
}

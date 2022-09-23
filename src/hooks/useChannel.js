import { useEffect, useState } from "react";
import useBot from "./socket/useBot";

export default function useChannel(id) {
  const [channel, setChannel] = useState(false);
  const { bot } = useBot();

  useEffect(() => {
    if (bot && id) {
      fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bot[1].access_token}`,
          "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
        },
      })
        .then((res) => {
          res.json().then((channel) => {
            const channelData = channel.data;
            if (channelData.length > 0) {
              setChannel(channelData[0]);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [bot, id]);

  return { channel };
}

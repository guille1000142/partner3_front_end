import React, { useEffect } from "react";

export default function useSubscription({ user, chat, config }) {
  useEffect(() => {
    fetch(
      `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${config[0].id}&user_id=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${chat.access_token}`,
          "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    ).then((data) => console.log(data));
  }, []);
  return;
}

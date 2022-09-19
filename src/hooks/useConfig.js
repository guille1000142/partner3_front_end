import React, { useEffect, useState } from "react";

export default function useConfig() {
  const [config, setConfig] = useState(false);

  useEffect(() => {
    try {
      const twitch = window.Twitch.ext;
      // const config = twitch.configuration.broadcaster.content;
      // const configData = JSON.parse(config);
      const configData = false;
      if (configData) {
        setConfig(configData);
      } else {
        twitch.onAuthorized(function (auth) {
          fetch(
            `https://api.twitch.tv/helix/extensions/configurations?broadcaster_id=${auth.channelId}&extension_id=${auth.clientId}&segment=broadcaster`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${auth.token}`,
                "Client-Id": auth.clientId,
              },
            }
          )
            .then((res) => {
              res.json().then((data) => {
                setConfig(JSON.parse(data.data[0].content));
              });
            })
            .catch((err) => console.log(err));
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { config };
}

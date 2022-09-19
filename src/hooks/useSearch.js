import { useState } from "react";
import useBot from "./socket/useBot";

export default function useSearch() {
  const [result, setResult] = useState(false);
  const { bot } = useBot();

  const searchChannel = (search) => {
    fetch(
      `https://api.twitch.tv/helix/search/channels?query=${search}&live_only=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bot[0].access_token}`,
          "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
        },
      }
    )
      .then((res) => {
        res.json().then((results) => {
          setResult(results.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { searchChannel, result };
}

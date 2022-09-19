import React, { useEffect, useContext } from "react";
import { Context } from "../context/Context";
import useSocket from "./socket/useSocket";

export default function useUser() {
  const { user, setUser } = useContext(Context);
  const { bot } = useSocket();

  useEffect(() => {
    if (bot && !user) {
      const twitch = window.Twitch.ext;
      const viewer = twitch.viewer;

      fetch(`https://api.twitch.tv/helix/users?id=${viewer.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bot[0].access_token}`,
          "Client-Id": process.env.REACT_APP_CLIENT_ID,
        },
      })
        .then((res) => {
          res.json().then((data) => {
            const userData = Object.assign(data.data[0], viewer);
            setUser(userData);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [bot, user]);

  return;
}

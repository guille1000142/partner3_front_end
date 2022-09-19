import React, { useEffect, useState } from "react";
import tmi from "tmi.js";
import useSocket from "../hooks/socket/useSocket";
const toUnicodeVariant = require("../utils/toUnicodeVariant");

let client;

export default function useChat() {
  const [connect, setConnect] = useState(false);
  const { bot } = useSocket();

  useEffect(() => {
    if (bot && !connect) {
      const opts = {
        identity: {
          username: "partner3_bot",
          password: bot[1].access_token,
        },
        channels: ["partner3_bot", "s7siete7"],
      };
      client = new tmi.client(opts);
      client.connect();

      client.on("message", onMessageHandler);
      client.on("connected", onConnectedHandler);

      function onMessageHandler(target, context, msg, self) {
        if (self) {
          return false;
        }
        if (msg === "/p3_leaderboard") {
          client.whisper(target.name, "test");
        }
      }

      function onConnectedHandler(addr, port) {
        console.log("connected");
        setConnect(true);
      }
    }
  }, [bot]);

  const writeToChat = ({ user, amount, token, message, channel }) => {
    const donation = toUnicodeVariant(amount + " " + token, "bs");
    // const userName = toUnicodeVariant(user.display_name, "gb");
    const text = toUnicodeVariant(message, "is");

    client.say(
      `#${channel.userName}`,
      `${donation} @${user.display_name} ${text}`
    );
    // client
    //   .whisper(user.display_name, "thanks!")
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
  };

  return { writeToChat };
}

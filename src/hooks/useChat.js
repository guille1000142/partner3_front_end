import tmi from "tmi.js";
import useBot from "./socket/useBot";
import toUnicodeVariant from "../utils/toUnicodeVariant";

export default function useChat() {
  const { bot } = useBot();

  const writeToChat = (user, amount, token, message, channel) => {
    const donation = toUnicodeVariant(amount + " " + token, "bs");
    // const userName = toUnicodeVariant(user.display_name, "gb");
    const text = toUnicodeVariant(message, "is");

    const opts = {
      channels: [channel.broadcaster_name],
      identity: {
        username: "partner3_bot",
        password: bot[1].access_token,
      },
    };
    const client = new tmi.Client(opts);
    client.connect().catch(console.error);

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
      client.say(
        `#${channel.broadcaster_name}`,
        `${donation} @${user.display_name} ${text}`
      );

      // client
      //   .whisper(user.display_name, "thanks!")
      //   .then((data) => console.log(data))
      //   .catch((err) => console.log(err));
    }
  };

  return { writeToChat };
}

import { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export default function useLive({ donations }) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (donations) {
      TimeAgo.addDefaultLocale(en);
      const timeAgo = new TimeAgo("en-US");

      const order = donations.sort((a, b) => b.time - a.time);
      const limit = order.slice(0, 10);

      const data = limit.map((donation, index) => {
        const object = {
          id: index + 1,
          photo: donation.photo,
          name: donation.name,
          amount: donation.amount,
          token: donation.token,
          channel: donation.channel,
          time: timeAgo.format(new Date(donation.time * 1000)),
        };
        return object;
      });

      const column = [
        { name: "Viewer", uid: "user" },
        { name: "Amount", uid: "amount" },
        { name: "Streamer", uid: "channel" },
        { name: "Time", uid: "time" },
      ];

      setLive({ column, data });
    }
  }, [donations]);

  return { live };
}

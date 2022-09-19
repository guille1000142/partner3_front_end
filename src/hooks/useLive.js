import { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export default function useLive({ donations }) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (donations) {
      TimeAgo.addDefaultLocale(en);
      const timeAgo = new TimeAgo("en-US");

      const donationData = donations.slice(0, 40);

      const data = donationData.map((donation, index) => {
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
        { name: "User", uid: "user" },
        { name: "Amount", uid: "amount" },
        { name: "Channel", uid: "channel" },
        { name: "Time", uid: "time" },
      ];

      setLive({ column, data });
    }
  }, [donations]);

  return { live };
}

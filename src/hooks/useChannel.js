export default function useChannel() {
  const getChannel = (id, access_token) => {
    return fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
      },
    })
      .then((res) => {
        return res.json().then((channel) => {
          const data = channel.data[0];
          return data;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getUser = (id) => {
  //   return fetch(`https://api.twitch.tv/helix/users?id=${id}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${bot[1].access_token}`,
  //       "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
  //     },
  //   })
  //     .then((res) => {
  //       return res.json().then((channel) => {
  //         const data = channel.data[0];
  //         return data;
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return { getChannel };
}

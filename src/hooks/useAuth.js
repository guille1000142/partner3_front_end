import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSave from "./useSave";
import useUsers from "./socket/useUsers";

export default function useAuth() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const { saveUser } = useSave();
  const { users } = useUsers();

  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("code");
  const error = queryParams.get("error");

  useEffect(() => {
    if (code !== null && users) {
      const httpUrl = process.env.REACT_APP_SOCKET_URL_HTTP;
      fetch(`${httpUrl}/api/v1/${code}`)
        .then((data) => {
          data.json().then((tokens) => {
            const access_token = tokens.access_token;
            window.sessionStorage.setItem("token", access_token);
            fetch("https://id.twitch.tv/oauth2/validate", {
              method: "GET",
              headers: {
                Authorization: `OAuth ${access_token}`,
              },
            })
              .then((res) => {
                res.json().then((user) => {
                  fetch(
                    `https://api.twitch.tv/helix/users?id=${user.user_id}`,
                    {
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
                      },
                    }
                  )
                    .then((res) => {
                      res.json().then((profile) => {
                        const user = profile.data[0];
                        window.localStorage.setItem(
                          "user",
                          JSON.stringify(user)
                        );
                        saveUser({ users, user, navigate });
                        setUser(user);
                      });
                    })
                    .catch((err) => console.log(err));
                });
              })
              .catch((err) => {
                window.sessionStorage.clear();
              });
          });
        })
        .catch((err) => console.log(err));
    }

    if (error !== null) {
      navigate(-1);
    }
  }, [code, error, users]);

  const restoreSession = () => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    setUser(false);
  };

  useEffect(() => {
    const user_access_token = window.sessionStorage.getItem("token");
    if (user_access_token !== null) {
      verifyUser(user_access_token);
    }
  }, []);

  const verifyUser = (user_access_token) => {
    setUser("loading");
    fetch("https://id.twitch.tv/oauth2/validate", {
      method: "GET",
      headers: {
        Authorization: `OAuth ${user_access_token}`,
      },
    })
      .then((res) => {
        res.json().then((user) => {
          fetch(`https://api.twitch.tv/helix/users?id=${user.user_id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user_access_token}`,
              "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
            },
          })
            .then((res) => {
              res
                .json()
                .then((profile) => {
                  const user = profile.data[0];
                  setUser(user);
                })
                .catch((err) => restoreSession());
            })
            .catch((err) => restoreSession());
        });
      })
      .catch((err) => {
        console.log("error!");
        restoreSession();
      });
  };

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_URL;
    const responseType = "code";
    const scope = window.encodeURI(
      "channel:read:subscriptions user:read:email"
    );
    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  };

  return { handleLogin, user, setUser };
}

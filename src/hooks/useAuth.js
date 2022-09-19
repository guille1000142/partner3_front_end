import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSave from "./useSave";
import useUsers from "./socket/useUsers";

export default function useAuth({ setUser }) {
  let navigate = useNavigate();
  const { saveUser } = useSave();
  const { users } = useUsers();

  const queryParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(
    window.location.hash.replace("#", "?")
  );
  const accessToken = hashParams.get("access_token");
  const error = queryParams.get("error");

  const token = window.sessionStorage.getItem("token");

  useEffect(() => {
    if (error !== null) {
      navigate("/");
    }
  }, [error]);

  useEffect(() => {
    if (accessToken !== null) {
      window.sessionStorage.setItem("token", accessToken);
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    if (token && users) {
      fetch("https://id.twitch.tv/oauth2/validate", {
        method: "GET",
        headers: {
          Authorization: `OAuth ${token}`,
        },
      })
        .then((res) => {
          res.json().then((user) => {
            fetch(`https://api.twitch.tv/helix/users?id=${user.user_id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
              },
            })
              .then((res) => {
                res.json().then((profile) => {
                  const user = profile.data[0];
                  saveUser(users, user);
                  setUser(user);
                });
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => {
          window.sessionStorage.clear();
        });
    }
  }, [token, users]);

  return null;
}

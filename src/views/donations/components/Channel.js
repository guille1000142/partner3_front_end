import { useParams } from "react-router-dom";
import { Text, useTheme, Loading, Link } from "@nextui-org/react";
import styles from "../donations.module.css";
import Donation from "./Donation";
import useChannel from "../../../hooks/useChannel";
import useUsers from "../../../hooks/socket/useUsers";
import { useEffect } from "react";
import { useState } from "react";

export default function Channel() {
  const [profile, setProfile] = useState(false);
  const { isDark } = useTheme();
  const { id } = useParams();
  const { channel } = useChannel(id);
  const { users } = useUsers();

  // useEffect(() => {
  //   if (donations.length > 0) {
  //     setChannel(donations.find((channel) => donations.uid === urlParams));
  //   }
  // }, [donations, urlParams]);

  // useEffect(() => {
  //   if (urlParams) {
  //     if (urlParams.length !== 18 && urlParams.length !== 42) {
  //       navigate("/stats", { replace: true });
  //     }
  //   }
  // }, [urlParams]);

  useEffect(() => {
    if (users) {
      const userProfile = users.find((user) => user.id === id);
      setProfile(userProfile);
    }
  }, [users]);

  return channel ? (
    <>
      <div className="title">
        <Text
          css={{
            textGradient: "45deg, $yellow600 -20%, $purple600 100%",
          }}
          weight="bold"
          h1
          size={30}
        >
          DONATIONS
        </Text>
      </div>
      <div className={styles.search}>
        {profile ? (
          profile.wallet ? (
            <>
              <Text h5>User is registered in partner3!</Text>
              <Text h6>Wallet: {profile.wallet}</Text>
            </>
          ) : (
            <>
              <Text h5>
                User is registered in partner3, but no wallet setted!
              </Text>
              <Text h6>
                Tokens will save in our reserves meantime. &nbsp;
                <a>More info here</a>
              </Text>
            </>
          )
        ) : (
          <>
            <Text h5>User is not registered in partner3!</Text>
            <Text h6>
              Tokens will save in our reserves meantime. &nbsp;
              <a>More info here</a>
            </Text>
          </>
        )}
        <Donation profile={profile} name={channel.broadcaster_name} />
      </div>
    </>
  ) : (
    <div className="loading">
      <Loading size="lg" color="secondary" />
    </div>
  );
}

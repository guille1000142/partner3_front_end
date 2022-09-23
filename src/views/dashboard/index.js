import { Text, Button, Loading } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import useDonations from "../../hooks/socket/useDonations";
import useUsers from "../../hooks/socket/useUsers";
import styles from "./dashboard.module.css";
import useWeb3 from "../../hooks/useWeb3";
import Register from "./components/Register";
import Stats from "./components/Stats";

const truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};

export default function Dashboard() {
  const reference = useRef();
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [donationData, setDonationData] = useState(false);
  const [view, setView] = useState(false);
  const [profile, setProfile] = useState(false);
  const { donations } = useDonations();
  const { users } = useUsers();
  const { maticPrice } = useWeb3();

  useEffect(() => {
    if (users && user && !profile) {
      const userProfile = users.find((channel) => channel.id === user.id);
      setProfile(userProfile);
    }
  }, [users, user, profile]);

  useEffect(() => {
    if (donations && user && !donationData && maticPrice) {
      // CHANNEL STATS
      const channelDonations = donations.filter(
        (donation) => donation.cid === user.id
      );

      const channelMaticDonations = channelDonations.filter(
        (donation) => donation.token === "MATIC"
      );
      const channelMaticTokens = truncateDecimals(
        channelMaticDonations
          .map((donation) => parseFloat(donation.amount))
          .reduce((prev, curr) => prev + curr, 0),
        2
      );
      const channelMaticEarnings = truncateDecimals(
        parseFloat(channelMaticTokens * maticPrice),
        2
      );

      // USER STATS
      const userDonations = donations.filter(
        (donation) => donation.id === user.id
      );

      const userMaticDonations = userDonations.filter(
        (donation) => donation.token === "MATIC"
      );
      const userMaticTokens = truncateDecimals(
        userMaticDonations
          .map((donation) => parseFloat(donation.amount))
          .reduce((prev, curr) => prev + curr, 0),
        2
      );
      const userMaticEarnings = truncateDecimals(
        parseFloat(userMaticTokens * maticPrice),
        2
      );

      const channelData = {
        totalDonations: channelDonations.length,
        totalTokens: channelMaticTokens,
        totalEarnings: channelMaticEarnings,
      };
      const userData = {
        totalDonations: userDonations.length,
        totalTokens: userMaticTokens,
        totalEarnings: userMaticEarnings,
      };
      setDonationData({ channelData, userData });
    }
  }, [donations, user, donationData, maticPrice]);

  const scrollToReference = () => {
    reference.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToReference, []);

  return (
    <>
      <div ref={reference}></div>
      {user ? (
        users && profile && donationData ? (
          <>
            <div className="title">
              <Text
                css={{
                  textGradient: "45deg, $purple600 0%, $yellow600 100%",
                }}
                weight="bold"
                h1
                size={30}
              >
                DASHBOARD
              </Text>
            </div>
            <div className={styles.view}>
              <Button.Group color="secondary">
                <Button
                  style={{
                    maxWidth: "50px",
                    minWidth: "30px",
                    padding: "0 50px",
                  }}
                  ghost={view}
                  solid={!view}
                  onPress={() => setView(false)}
                >
                  Streamer
                </Button>
                <Button
                  style={{
                    maxWidth: "50px",
                    minWidth: "30px",
                    padding: "0 50px",
                  }}
                  ghost={!view}
                  solid={view}
                  onPress={() => setView(true)}
                >
                  Viewer
                </Button>
              </Button.Group>
            </div>
            {view ? (
              <Stats view={view} donationData={donationData.userData} />
            ) : profile.wallet ? (
              <Stats view={view} donationData={donationData.channelData} />
            ) : (
              <Register user={user} setProfile={setProfile} />
            )}
          </>
        ) : (
          <div className="loading">
            <Loading size="lg" color="secondary" />
          </div>
        )
      ) : (
        <div className="title">
          <Text
            css={{
              textGradient: "45deg, $yellow600 -20%, $purple600 100%",
            }}
            weight="bold"
            h1
            size={30}
          >
            LOGIN WITH TWITCH
          </Text>
        </div>
      )}
    </>
  );
}

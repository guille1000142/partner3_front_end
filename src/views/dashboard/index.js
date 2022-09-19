import {
  Text,
  Grid,
  Progress,
  Button,
  Spacer,
  Card,
  Loading,
  useTheme,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import useDonations from "../../hooks/socket/useDonations";
import styles from "./dashboard.module.css";
import MaticDark from "../../assets/imgs/polygon_dark.png";
// import BnbDark from "../../assets/imgs/bnb_dark.png";
import MaticLight from "../../assets/imgs/polygon_light.png";
// import BnbLight from "../../assets/imgs/bnb_light.png";
import useWeb3 from "../../hooks/useWeb3";

const ModalCards = ({ icon, color, value, text }) => {
  return (
    <Grid>
      <Card css={{ minWidth: "300px", minHeight: "100px" }}>
        <Card.Body
          css={{
            alignItems: "center",
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <div className={styles.icon}>
            <div className={styles[color]}>{icon}</div>
          </div>
          <div className={styles.content}>
            <h2>{value}</h2>
            <p>{text}</p>
          </div>
        </Card.Body>
      </Card>
    </Grid>
  );
};

const truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};

export default function Dashboard() {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [donationData, setDonationData] = useState(false);
  const [view, setView] = useState(false);
  const { donations } = useDonations();
  const { maticPrice } = useWeb3();
  const { isDark } = useTheme();
  console.log({ donations, user, donationData, maticPrice });

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

  const maxValue = 200;

  return user ? (
    donationData ? (
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

        <div className={styles.cards}>
          <Grid.Container gap={2} justify="space-evenly">
            <ModalCards
              color={isDark ? "orange-light" : "orange-light"}
              icon={<i className="fa-solid fa-circle-dollar-to-slot"></i>}
              value={
                view
                  ? donationData.userData.totalDonations
                  : donationData.channelData.totalDonations
              }
              text="Donations"
            />
            <ModalCards
              color={isDark ? "purple-light" : "purple-light"}
              icon={
                <img
                  width={32}
                  height={32}
                  src={isDark ? MaticLight : MaticDark}
                  alt="Matic"
                />
              }
              value={
                view
                  ? donationData.userData.totalTokens
                  : donationData.channelData.totalTokens
              }
              text="MATIC Tokens"
            />
            <ModalCards
              color={isDark ? "green-light" : "green-light"}
              icon={<i className="fa-solid fa-sack-dollar"></i>}
              value={`$${
                view
                  ? donationData.userData.totalEarnings
                  : donationData.channelData.totalEarnings
              }`}
              text="Earnings"
            />
          </Grid.Container>
        </div>

        <div className={styles.progress}>
          <Text h3>Donations</Text>
          <Text h5>{`${
            view
              ? donationData.userData.totalDonations
              : donationData.channelData.totalDonations
          } / ${maxValue}`}</Text>
          <Progress
            size="lg"
            value={
              view
                ? donationData.userData.totalDonations
                : donationData.channelData.totalDonations
            }
            max={maxValue}
            color="secondary"
            striped
          />
          <Spacer />
          <Button
            size="md"
            color="secondary"
            shadow
            disabled={
              view
                ? donationData.userData.totalDonations < maxValue
                : donationData.channelData.totalDonations < maxValue
            }
          >
            Unlock Staking
          </Button>
        </div>
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
  );
}

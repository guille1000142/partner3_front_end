import { Grid, Card, useTheme } from "@nextui-org/react";
import MaticDark from "../../../assets/imgs/polygon_dark.png";
// import BnbDark from "../../assets/imgs/bnb_dark.png";
import MaticLight from "../../../assets/imgs/polygon_light.png";
// import BnbLight from "../../assets/imgs/bnb_light.png";
import styles from "../dashboard.module.css";

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

export default function Stats({ donationData }) {
  const { isDark } = useTheme();

  const maxValue = 200;

  return (
    <div className={styles.cards}>
      <Grid.Container gap={2} justify="space-evenly">
        <ModalCards
          color={isDark ? "orange-light" : "orange-light"}
          icon={<i className="fa-solid fa-circle-dollar-to-slot"></i>}
          value={donationData.totalDonations}
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
          value={donationData.totalTokens}
          text="MATIC Tokens"
        />
        <ModalCards
          color={isDark ? "green-light" : "green-light"}
          icon={<i className="fa-solid fa-sack-dollar"></i>}
          value={`$${donationData.totalEarnings}`}
          text="Earnings"
        />
      </Grid.Container>

      {/* <div className={styles.progress}>
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
        </div> */}
    </div>
  );
}

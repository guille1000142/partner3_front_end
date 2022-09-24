import { Grid, Card, Text, Loading, useTheme } from "@nextui-org/react";
import MaticDark from "../../../assets/imgs/polygon_dark.png";
// import BnbDark from "../../assets/imgs/bnb_dark.png";
// import MaticLight from "../../../assets/imgs/polygon_light.png";
// import BnbLight from "../../assets/imgs/bnb_light.png";
import useTops from "../../../hooks/useTops";
// import useUser from "../../../hooks/useUser";
import styles from "../dashboard.module.css";
import TopAmount from "./topAmount";
import TopDonation from "./topDonation";
const ModalCards = ({ icon, color, value, text }) => {
  const { isDark } = useTheme();

  return (
    <Grid>
      <Card
        css={{
          minWidth: "340px",
          minHeight: "100px",
          bg: isDark
            ? "linear-gradient(300deg, rgba(190,190,190,1) 0%, rgba(235,235,235,1) 100%)"
            : "#ffffff",
        }}
      >
        <Card.Body
          css={{
            paddingLeft: "25px",
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

export default function Stats({ donations }) {
  const { isDark } = useTheme();
  const { tops } = useTops({ donations: donations.totalDonations });
  console.log(tops);

  // const maxValue = 200;
  return (
    <div className={styles.cards}>
      <Grid.Container gap={3} justify="space-evenly">
        <ModalCards
          color={isDark ? "orange-light" : "orange-light"}
          icon={<i className="fa-solid fa-circle-dollar-to-slot"></i>}
          value={donations.totalDonations.length}
          text="Donations"
        />
        <ModalCards
          color={isDark ? "purple-light" : "purple-light"}
          icon={<img width={32} height={32} src={MaticDark} alt="Matic" />}
          value={donations.totalTokens}
          text="MATIC Tokens"
        />
        <ModalCards
          color={isDark ? "green-light" : "green-light"}
          icon={<i className="fa-solid fa-sack-dollar"></i>}
          value={`$${donations.totalEarnings}`}
          text="Earnings"
        />
      </Grid.Container>

      {tops ? (
        <Grid.Container
          css={{ marginTop: "20px" }}
          gap={3}
          justify="space-evenly"
        >
          <Grid>
            <Text
              css={{
                textAlign: "center",
                color: isDark ? "#ffffff" : "#000000",
              }}
              h3
            >
              <i class="fa-solid fa-trophy"></i> &nbsp;Top Donations
            </Text>
            <TopDonation donation={tops.donation} isDark={isDark} />
          </Grid>
          <Grid>
            <Text
              css={{
                textAlign: "center",
                color: isDark ? "#ffffff" : "#000000",
              }}
              h3
            >
              <i class="fa-solid fa-trophy"></i> &nbsp;Top Amount
            </Text>
            <TopAmount amount={tops.amount} isDark={isDark} />
          </Grid>
        </Grid.Container>
      ) : (
        <div className="loading">
          <Loading size="lg" color="secondary" />
        </div>
      )}
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

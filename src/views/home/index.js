import { Text, Col, Card, Spacer, Grid, Loading } from "@nextui-org/react";
import useDonations from "../../hooks/socket/useDonations";
import useTops from "../../hooks/useTops";
import styles from "./home.module.css";
import Live from "./components/live";
import TopAmount from "./components/topAmount";
import TopDonation from "./components/topDonation";
import { useNavigate } from "react-router-dom";
import useLive from "../../hooks/useLive";

export default function Home() {
  const { donations } = useDonations();
  const { tops } = useTops({ donations });
  const { live } = useLive({ donations });
  let navigate = useNavigate();

  return (
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
          YOU HAVE THE POWER
        </Text>
      </div>

      <div className={styles.cards}>
        <Card>
          <div className={styles.coverContainer}></div>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
              <Text size={16} weight="bold" color="#ffffffAA">
                Partner3
              </Text>
              <Text h3 color="white">
                Decentralization
              </Text>
            </Col>
          </Card.Header>
          <Card.Footer css={{ bg: "#2b2b2b" }}>
            <div className={styles.modalFooter}>
              <div>
                <Text color="#d1d1d1" size={15}>
                  Free, fast and secure!
                </Text>
                <Text color="#d1d1d1" size={15}>
                  Metamask & Partner3.
                </Text>
              </div>
              <div className={styles.extensionContainer}>
                <button
                  onClick={() =>
                    window.open(
                      "https://metamask.app.link/dapp/google.es/",
                      "_blank"
                    )
                  }
                  className={`${styles.metamask} ${styles.orange}`}
                >
                  <span>Get Metamask</span>
                </button>
                <button
                  onClick={() => navigate("/donations")}
                  className={`${styles.twitch} ${styles.purple}`}
                >
                  <span>Donate Now</span>
                </button>
              </div>
            </div>
          </Card.Footer>
        </Card>
        <Spacer />
        {tops && live ? (
          <Grid.Container gap={6} justify="space-evenly">
            <Grid>
              <Text css={{ textAlign: "center" }} h3>
                <i class="fa-solid fa-fire"></i> &nbsp; Promoted Channels
              </Text>
              <TopAmount amount={tops.amount} />
            </Grid>
            <Grid>
              <Text css={{ textAlign: "center" }} h3>
                <i class="fa-solid fa-globe"></i> &nbsp;Live Donations
              </Text>
              <Live live={live} />
            </Grid>
            <Grid>
              <Text css={{ textAlign: "center" }} h3>
                <i class="fa-solid fa-trophy"></i> &nbsp;Top Amount
              </Text>
              <TopAmount amount={tops.amount} />
            </Grid>
            <Grid>
              <Text css={{ textAlign: "center" }} h3>
                <i class="fa-solid fa-trophy"></i> &nbsp;Top Donations
              </Text>
              <TopDonation donation={tops.donation} />
            </Grid>
          </Grid.Container>
        ) : (
          <div className="loading">
            <Loading size="lg" color="secondary" />
          </div>
        )}
      </div>
    </>
  );
}

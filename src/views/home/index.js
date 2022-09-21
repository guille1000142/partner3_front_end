import {
  Text,
  Col,
  Card,
  Spacer,
  Grid,
  Loading,
  useTheme,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useDonations from "../../hooks/socket/useDonations";
import useTops from "../../hooks/useTops";
import styles from "./home.module.css";
import Live from "./components/live";
import TopAmount from "./components/topAmount";
import Promoted from "./components/Promoted";
import TopDonation from "./components/topDonation";
import useLive from "../../hooks/useLive";
import usePromos from "../../hooks/usePromos";
import usePromotions from "../../hooks/socket/usePromotions";

export default function Home() {
  const { donations } = useDonations();
  const { promotions } = usePromotions();
  const { tops } = useTops({ donations });
  const { live } = useLive({ donations });
  const { promos } = usePromos({ promotions });
  const { isDark } = useTheme();

  let navigate = useNavigate();
  console.log({ donations, promotions });

  return (
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
          YOU HAVE THE POWER
        </Text>
      </div>

      <div className={styles.cards}>
        {/* <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=9mco1ahj5d62s8l1qtl7fhctsmr446&redirect_uri=http://localhost:3000&scope=chat:edit+chat:read">
          Connect Bot
        </a> */}
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
          <Card.Footer
            css={{
              bg: isDark ? "#bebebe" : "#FFFFFF",
            }}
          >
            <div className={styles.modalFooter}>
              <div>
                <Text color="#000000" size={15}>
                  Free, fast and secure!
                </Text>
                <Text color="#000000" size={15}>
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
                  className={
                    isDark
                      ? `${styles.metamaskD} ${styles.orangeD}`
                      : `${styles.metamaskL} ${styles.orangeL}`
                  }
                >
                  <span>Get Metamask</span>
                </button>
                <button
                  onClick={() => navigate("/donations")}
                  className={
                    isDark
                      ? `${styles.twitchD} ${styles.purpleD}`
                      : `${styles.twitchL} ${styles.purpleL}`
                  }
                >
                  <span>Donate Now</span>
                </button>
              </div>
            </div>
          </Card.Footer>
        </Card>
        <Spacer />
        {tops && live && promos ? (
          <Grid.Container
            css={{ marginTop: "20px" }}
            gap={4}
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
                <i class="fa-solid fa-fire"></i> &nbsp;Promoted Channels
              </Text>
              <Promoted promos={promos} isDark={isDark} />
            </Grid>
            <Grid>
              <Text
                css={{
                  textAlign: "center",
                  color: isDark ? "#ffffff" : "#000000",
                }}
                h3
              >
                <i class="fa-solid fa-globe"></i> &nbsp;Live Donations
              </Text>
              <Live live={live} isDark={isDark} />
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

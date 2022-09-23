import { useRef, useEffect } from "react";
import { Text, Grid, Loading, useTheme } from "@nextui-org/react";
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
  const reference = useRef();
  const { donations } = useDonations();
  const { promotions } = usePromotions();
  const { tops } = useTops({ donations });
  const { live } = useLive({ donations });
  const { promos } = usePromos({ promotions });
  const { isDark } = useTheme();

  let navigate = useNavigate();

  const scrollToReference = () => {
    reference.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToReference, []);

  return (
    <>
      <div ref={reference}></div>
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
        <div className={styles.coverContainer}>
          <div className={styles.coverHeader}>
            <Text size={16} weight="bold" color="#ffffffAA">
              Partner3
            </Text>
            <Text h3 color="white">
              Decentralization
            </Text>
          </div>
        </div>
        <div className={styles.dark}>
          <div className={styles.coverFooter}>
            <div>
              <p>Free, fast and secure!</p>
              <p>Metamask & Partner3.</p>
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
        </div>
        {tops && live && promos ? (
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

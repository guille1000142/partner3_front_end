import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Input,
  Grid,
  Card,
  useTheme,
  User,
  Badge,
  Loading,
  Spacer,
} from "@nextui-org/react";
import styles from "./donations.module.css";
import useSearch from "../../hooks/useSearch";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import usePromotions from "../../hooks/socket/usePromotions";
import usePromos from "../../hooks/usePromos";

const ModalCards = ({ id, photo, name, title, wallet }) => {
  let navigate = useNavigate();
  const isMobileResolution = useMatchMedia("(max-width:700px)", false);
  const { isDark } = useTheme();
  return (
    <div className={styles.cardMain} key={id}>
      <Card
        className={styles.cardChannel}
        css={{
          margin: "0 auto",
          maxWidth: "500px",
          height: "100px",
          bg: isDark
            ? "linear-gradient(300deg, rgba(190,190,190,1) 0%, rgba(235,235,235,1) 100%)"
            : "#ffffff",
        }}
        onPress={() => navigate(`/donations/${id}`)}
        isPressable
        isHoverable
        variant="bordered"
      >
        <Card.Body
          css={{
            paddingLeft: "25px",
            justifyContent: "center",
          }}
        >
          <div className={styles.icon}>
            {title ? (
              <Badge
                placement="top-left"
                enableShadow
                disableOutline
                color="error"
                content={"LIVE"}
              >
                <User
                  zoomed
                  size="lg"
                  src={photo}
                  name={<Text h5>{name}</Text>}
                  description={title.substring(0, 20) + "..."}
                  color="secondary"
                  bordered
                />
              </Badge>
            ) : (
              <User
                zoomed
                size="lg"
                src={photo}
                name={<Text h5>{name}</Text>}
                description={
                  wallet &&
                  wallet.substring(0, 5) + "..." + wallet.substring(38, 42)
                }
                color="secondary"
                bordered
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default function Donations() {
  const reference = useRef();
  const { isDark } = useTheme();
  const { searchChannel, result } = useSearch();
  const { promotions } = usePromotions();
  const { promos } = usePromos({ promotions });

  const handleSearch = (e) => {
    e.preventDefault();
    var search = e.target.value;
    searchChannel(search);
  };

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
          DONATIONS
        </Text>
      </div>

      <div className={styles.search}>
        <Grid.Container gap={2} justify="center">
          <Grid>
            <Input
              size="lg"
              css={{
                minWidth: "300px",
              }}
              status="secondary"
              placeholder="Search live channels"
              onChange={(e) => handleSearch(e)}
              maxLength={50}
              type="search"
              spellCheck={false}
              contentLeft={
                <i
                  className={
                    isDark
                      ? "fa-solid fa-magnifying-glass light"
                      : "fa-solid fa-magnifying-glass dark"
                  }
                ></i>
              }
            />
          </Grid>
        </Grid.Container>
        {result ? (
          <div className={styles.results}>
            <Text h3 css={{ color: isDark ? "#ffffff" : "#000000" }}>
              Live Channels
            </Text>
            <Spacer />
            {result.map((data, index) => {
              return (
                <div className={styles.channels} key={index}>
                  <ModalCards
                    id={data.id}
                    photo={data.thumbnail_url}
                    name={data.display_name}
                    title={data.title}
                  />
                </div>
              );
            })}
          </div>
        ) : promos ? (
          <div className={styles.results}>
            <Text h3 css={{ color: isDark ? "#ffffff" : "#000000" }}>
              Promoted Channels
            </Text>
            <Spacer />
            {promos.data.map((data, index) => {
              return (
                <div className={styles.channels} key={index}>
                  <ModalCards
                    id={data.cid}
                    photo={data.photo}
                    name={data.channel}
                    wallet={data.wallet}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loading">
            <Loading size="lg" color="secondary" />
          </div>
        )}
      </div>
    </>
  );
}

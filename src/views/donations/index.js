import { useNavigate } from "react-router-dom";
import {
  Text,
  Input,
  Grid,
  Card,
  useTheme,
  Avatar,
  Badge,
} from "@nextui-org/react";
import styles from "./donations.module.css";
import useSearch from "../../hooks/useSearch";
import { useMatchMedia } from "../../hooks/useMatchMedia";

const ModalCards = ({ id, photo, name, title }) => {
  let navigate = useNavigate();
  const isMobileResolution = useMatchMedia("(max-width:700px)", false);
  return (
    <div key={id}>
      <Card
        className={styles.cardChannel}
        css={{ height: "132px" }}
        onPress={() => navigate(`/donations/${id}`)}
        isPressable
        isHoverable
      >
        <Card.Body
          css={{
            alignItems: "center",
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <div className={styles.icon}>
            <Badge enableShadow disableOutline color="error" content={"LIVE"}>
              <Avatar zoomed size="lg" src={photo} color="secondary" bordered />
            </Badge>
          </div>
          <div>
            <div className={styles.name}>
              <h4>{name}</h4>
            </div>
            <small>
              {isMobileResolution ? title.substring(0, 15) + "..." : title}
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default function Donations() {
  const { isDark } = useTheme();
  const { searchChannel, result } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    var search = e.target.value;
    searchChannel(search);
  };

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
          DONATIONS
        </Text>
      </div>

      <div className={styles.search}>
        <Grid.Container gap={1} justify="center">
          <Grid>
            <Input
              size="lg"
              css={{ minWidth: "300px" }}
              placeholder="Search live channels"
              onChange={(e) => handleSearch(e)}
              maxLength={50}
              type="search"
              spellCheck={false}
              contentLeft={
                <div className={styles.searchIcon}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              }
            />
          </Grid>
        </Grid.Container>
        {result ? (
          <div className={styles.results}>
            <h3>Live Channels</h3>
            {result.map((data) => {
              return (
                <div className={styles.channels}>
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
        ) : (
          <div className={styles.results}>
            <h3>Promotion Channels</h3>
            <ModalCards
              id={123456789}
              photo={
                "https://imgs.search.brave.com/ZKZy8nA6cvBL6IJum_2_hungz5m3V9gfPCRVgTlw4ss/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5m/N1UyOXI3UGpZNi1y/Z2tHOGI2ZWZRSGFF/NyZwaWQ9QXBp"
              }
              name={"Test"}
              title={"Streaming playground"}
            />
          </div>
        )}
      </div>
    </>
  );
}

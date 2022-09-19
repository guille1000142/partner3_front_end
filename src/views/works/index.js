import { Text, Card, Grid, useTheme, Badge } from "@nextui-org/react";
import styles from "./works.module.css";

const ModalCards = ({ title, color, icon, text }) => {
  return (
    <Grid>
      <Card isHoverable variant="bordered" css={{ mw: "400px", mh: "300px" }}>
        <Card.Body
          css={{
            alignItems: "center",
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <Badge
            disableOutline
            shape="circle"
            color="error"
            size="lg"
            content={title}
            placement="top-left"
          >
            <div className={styles.icon}>
              <span className={styles[color]}>{icon}</span>
            </div>
          </Badge>

          <div className={styles.content}>
            <h4>{text}</h4>
          </div>
        </Card.Body>
      </Card>
    </Grid>
  );
};

export default function Works() {
  const { isDark } = useTheme();

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
          HOW IT WORKS
        </Text>
      </div>

      <div className={styles.cards}>
        <Grid.Container gap={1} justify="space-evenly">
          <ModalCards
            title={"1"}
            color={isDark ? "dark" : "light"}
            icon={<i className="fa-solid fa-wallet"></i>}
            text={
              "Install the Metamask wallet extension in your favorite browser"
            }
          />
          <ModalCards
            title={"2"}
            color={isDark ? "dark" : "light"}
            icon={<i className="fa-brands fa-twitch"></i>}
            text={"Install partner3 extension in your twitch channel"}
          />
          <ModalCards
            title={"3"}
            color={isDark ? "dark" : "light"}
            icon={<i className="fa-solid fa-gears"></i>}
            text={"Configure extension and enter your Metamask wallet address"}
          />
        </Grid.Container>
      </div>
    </>
  );
}

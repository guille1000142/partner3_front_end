import { Text, Card, Grid, Badge, useTheme } from "@nextui-org/react";
import styles from "./features.module.css";

const ModalCards = ({ title, color, icon, text }) => {
  return (
    <Grid>
      <Card isHoverable variant="bordered" css={{ mw: "400px", mh: "300px" }}>
        <div className={styles.title}>
          <Badge
            css={{
              marginTop: "20px",
            }}
            disableOutline
            shape="circle"
            color="secondary"
            size="lg"
            placement="top-right"
          >
            {title}
          </Badge>
        </div>

        <Card.Body
          css={{
            alignItems: "center",
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <div className={styles.icon}>
            <span className={styles[color]}>{icon}</span>
          </div>

          <div className={styles.content}>
            <h4>{text}</h4>
          </div>
        </Card.Body>
      </Card>
    </Grid>
  );
};

export default function Features() {
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
          FEATURES
        </Text>
      </div>

      <div className={styles.cards}>
        <Grid.Container gap={1} justify="space-evenly">
          <ModalCards
            title={"DASHBOARD"}
            color={isDark ? "dark" : "light"}
            icon={<i className="fa-solid fa-chart-line"></i>}
            text={
              "View stats and earnings from your dashboard panel in real time"
            }
          />
          <ModalCards
            title={"DONATIONS"}
            color={isDark ? "dark" : "light"}
            icon={<i class="fa-solid fa-comments-dollar"></i>}
            text={"Send donations with a message to chatroom"}
          />
          <ModalCards
            title={"RECORD"}
            color={isDark ? "dark" : "light"}
            icon={<i class="fa-solid fa-cloud"></i>}
            text={"We save all donations in our cloud servers"}
          />
        </Grid.Container>
      </div>
    </>
  );
}

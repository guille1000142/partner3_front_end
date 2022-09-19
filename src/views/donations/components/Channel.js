import { useParams } from "react-router-dom";
import { Text, useTheme, Loading } from "@nextui-org/react";
import styles from "../donations.module.css";
import Donation from "./Donation";
import useChannel from "../../../hooks/useChannel";

export default function Channel() {
  const { isDark } = useTheme();
  const { id } = useParams();
  const { channel } = useChannel(id);
  console.log({ id, channel });

  // useEffect(() => {
  //   if (donations.length > 0) {
  //     setChannel(donations.find((channel) => donations.uid === urlParams));
  //   }
  // }, [donations, urlParams]);

  // useEffect(() => {
  //   if (urlParams) {
  //     if (urlParams.length !== 18 && urlParams.length !== 42) {
  //       navigate("/stats", { replace: true });
  //     }
  //   }
  // }, [urlParams]);

  return channel ? (
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
        <Donation name={channel.broadcaster_name} />
      </div>
    </>
  ) : (
    <div className="loading">
      <Loading size="lg" color="secondary" />
    </div>
  );
}

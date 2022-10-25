import { useState } from "react";
import toast from "react-hot-toast";
import { Text, Button, Input, Card, Spacer, useTheme } from "@nextui-org/react";
import useSave from "../../../hooks/useSave";
import styles from "../dashboard.module.css";

export default function Register({ user, setProfile }) {
  const [wallet, setWallet] = useState("");
  const { saveWallet } = useSave();
  const { isDark } = useTheme();

  const handleWallet = (e) => {
    e.preventDefault();
    setWallet(e.target.value);
  };

  const saveUserWallet = () => {
    if (wallet.length !== 42) {
      toast.error("Invalid wallet address");
      return false;
    }
    saveWallet(wallet, user);
    setProfile({ wallet: true });
    toast.success("Saved!");
  };

  return (
    <div className={styles.cards}>
      <Card
        css={{
          maxWidth: "340px",
          margin: "0 auto",
          bg: isDark
            ? "linear-gradient(300deg, rgba(190,190,190,1) 0%, rgba(235,235,235,1) 100%)"
            : "#ffffff",
        }}
      >
        <Card.Body>
          <Text h3 css={{ textAlign: "center" }}>
            Set your wallet address to start receiving donations
          </Text>
          <Spacer />
          <Input
            size="lg"
            type="text"
            onChange={(e) => handleWallet(e)}
            spellCheck={false}
            maxLength={50}
            placeholder="Wallet address (Polygon Network)"
            status="secondary"
            css={{ marginBottom: "10px" }}
          />
          <Spacer />
          <Button
            onPress={() => saveUserWallet()}
            size="md"
            color="success"
            css={{ fontSize: "20px" }}
          >
            <i className="fa-solid fa-floppy-disk"></i> &nbsp; Save
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

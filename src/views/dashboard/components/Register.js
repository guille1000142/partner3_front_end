import { useState } from "react";
import toast from "react-hot-toast";
import { Text, Button, Input, Card, Spacer } from "@nextui-org/react";
import useSave from "../../../hooks/useSave";
import styles from "../dashboard.module.css";

export default function Register({ user, setProfile }) {
  const [wallet, setWallet] = useState("");
  const { saveWallet } = useSave();

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
      <Card css={{ maxWidth: "340px", margin: "0 auto" }}>
        <Card.Body>
          <Text h3 css={{ textAlign: "center" }}>
            Set your wallet address to start receiving donations
          </Text>
          <Spacer />
          <Input
            size="lg"
            type="text"
            onChange={(e) => handleWallet(e)}
            rounded
            bordered
            label="Matic Wallet Address (Polygon Network)"
            placeholder="Introduce your wallet"
            color="secondary"
            css={{ marginBottom: "10px" }}
          />
          <Spacer />
          <Button
            onPress={() => saveUserWallet()}
            size="md"
            color="secondary"
            css={{ fontSize: "20px" }}
            shadow
          >
            <i class="fa-solid fa-floppy-disk"></i> &nbsp; Save
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

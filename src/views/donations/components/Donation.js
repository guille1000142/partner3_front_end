import React, { useState } from "react";
import {
  Card,
  Grid,
  Input,
  Text,
  Button,
  Spacer,
  Avatar,
  Tooltip,
  useTheme,
} from "@nextui-org/react";
import Picker from "emoji-picker-react";
// import "emoji-picker-react/dist/main.css";
import { useNavigate } from "react-router-dom";
import useWeb3 from "../../../hooks/useWeb3";
import useDonation from "../../../hooks/useDonation";
import useAuth from "../../../hooks/useAuth";
import styles from "../donations.module.css";
import MaticLight from "../../../assets/imgs/polygon_light.png";
import MaticDark from "../../../assets/imgs/polygon_dark.png";

export default function Donation({
  channel,
  profile,
  account,
  network,
  balance,
  connectWallet,
  user,
  setUser,
}) {
  const [token, setToken] = useState(new Set(["MATIC"]));
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(false);
  const { isDark } = useTheme();
  const { sendTokens } = useDonation();
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleAmount = (e) => {
    e.preventDefault();
    setAmount(parseFloat(e.target.value));
  };

  const handleMessage = (e) => {
    e.preventDefault();
    const text = e.target.value.trim();
    setMessage(text);
  };

  const handleEmoji = (event, emojiObject) => {
    let emoticon = emojiObject.emoji;
    if (message.length < 50) {
      setMessage(message + emoticon);
    }
  };

  return (
    <div>
      <Card
        css={{
          maxWidth: "350px",
          margin: "0 auto",
          bg: isDark
            ? "linear-gradient(300deg, rgba(190,190,190,1) 0%, rgba(235,235,235,1) 100%)"
            : "#ffffff",
        }}
      >
        <Card.Header>
          <Grid.Container gap={0} justify="space-between">
            <Grid>
              <Button
                onPress={() => navigate("/donations")}
                flat
                size="xs"
                color="secondary"
                css={{ padding: "12px 0px 12px 0px", fontSize: "16px" }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
            </Grid>
            <Grid>
              <Tooltip
                content={network === "0x89" ? "MATIC" : "INVALID"}
                trigger="hover"
                color="secondary"
                placement="bottom"
              >
                <Button
                  flat
                  size="xs"
                  color="secondary"
                  css={{ padding: "12px 0px 12px 0px", fontSize: "16px" }}
                >
                  <span className="bold">{balance}</span>
                </Button>
              </Tooltip>
            </Grid>
          </Grid.Container>
        </Card.Header>

        <Card.Divider css={{ bg: isDark ? "#383838" : "silver" }} />

        <Card.Body css={{ py: "$8" }}>
          {profile && (
            <Avatar
              css={{ margin: "0 auto" }}
              size="lg"
              src={profile.photo}
              color="secondary"
              bordered
            />
          )}

          <Text h3 css={{ textAlign: "center" }}>
            {channel.broadcaster_name}
          </Text>
          <Spacer />
          {/* <Dropdown>
          <Dropdown.Button
            css={{ margin: "10px" }}
            light
            size="sm"
            color="secondary"
          >
            {token}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Single selection actions"
            color="secondary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={token}
            onSelectionChange={setToken}
          >
            <Dropdown.Item key="MATIC">MATIC (Low fee)</Dropdown.Item>
            <Dropdown.Item key="BNB">BNB (Medium fee)</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

          <Input
            size="lg"
            type="number"
            onChange={(e) => handleAmount(e)}
            value={amount}
            min={0.0}
            step={0.1}
            placeholder={`${token.entries().next().value[0]} Amount`}
            status="secondary"
            contentLeft={
              <div className={styles.inputIcon}>
                <img src={isDark ? MaticLight : MaticDark} alt="polygon" />
              </div>
            }
            contentLeftStyling={false}
          />

          {emoji && (
            <div className={styles.emoji}>
              <Picker
                onEmojiClick={handleEmoji}
                pickerStyle={{
                  height: "160px",
                  border: "none",
                  boxShadow: "none",
                }}
                disableSearchBar={true}
                disableAutoFocus={true}
                // preload={true}
              />
            </div>
          )}

          <Spacer />

          {/* <Button
            onPress={() => setEmoji(!emoji)}
            light
            size="xs"
            color="secondary"
            css={{ padding: "20px 20px", fontSize: "20px" }}
          >
            <i className="fas fa-smile"></i>
          </Button> */}

          {/* <Textarea
            status="secondary"
            spellCheck={false}
            onChange={(event) => handleMessage(event)}
            value={message}
            size="md"
            bordered
            maxRows={3}
            color="secondary"
            maxLength={50}
            label={"Message (Optional) "}
            placeholder="Type something..."
          /> */}

          <Input
            size="lg"
            type="text"
            onChange={(event) => handleMessage(event)}
            value={message}
            spellCheck={false}
            maxLength={50}
            placeholder="Type something..."
            status="secondary"
            contentLeft={
              <div
                className={styles.inputIcon}
                onClick={() => setEmoji(!emoji)}
              >
                <i
                  className={
                    isDark
                      ? "fa-solid fa-face-smile light"
                      : "fa-solid fa-face-smile dark"
                  }
                ></i>
              </div>
            }
            contentLeftStyling={false}
          />

          <Spacer />
          {user ? (
            <Button
              onPress={() =>
                !account
                  ? connectWallet()
                  : sendTokens({
                      account,
                      token: token.entries().next().value[0],
                      network,
                      message,
                      setMessage,
                      amount,
                      setAmount,
                      balance,
                      channel,
                      profile,
                      user,
                      setUser,
                    })
              }
              size="md"
              color={!account ? "warning" : "success"}
              css={{ fontSize: "18px" }}
              disabled={!profile}
            >
              {!account ? (
                <>
                  <i className="fa-solid fa-wallet"></i>&nbsp;
                  <span className="bold">Connect Wallet</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-comments-dollar"></i>&nbsp;
                  <span className="bold">Send Message</span>
                </>
              )}
            </Button>
          ) : (
            <Button
              onPress={handleLogin}
              size="md"
              color="secondary"
              css={{ fontSize: "20px" }}
            >
              <div className="login">
                <i className="fa-brands fa-twitch"></i>
                <span>Login</span>
              </div>
            </Button>
          )}
          <Text css={{ textAlign: "center", marginTop: "5px" }} size={14}>
            3% commissions
          </Text>
        </Card.Body>
      </Card>
      <Spacer />
    </div>
  );
}

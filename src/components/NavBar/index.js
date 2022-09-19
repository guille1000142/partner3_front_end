import { useState } from "react";
import {
  Navbar,
  Button,
  Link,
  Text,
  Dropdown,
  Avatar,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Profile } from "./components/Modals";
import Logo from "../../assets/imgs/logo.png";

export default function NavBar() {
  const [user, setUser] = useState(
    JSON.parse(window.sessionStorage.getItem("user"))
  );
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useAuth({ setUser });
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;
    const redirectUri = "http://localhost:3000";
    const responseType = "token";
    const scope = window.encodeURI(
      "channel:read:subscriptions user:read:email"
    );
    window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  };

  const handleAction = (action) => {
    if (action === "dashboard") {
      navigate("/dashboard");
    }
    if (action === "profile") {
      setProfile(true);
    }
    if (action === "settings") {
      setSettings(true);
    }
    if (action === "logout") {
      window.sessionStorage.clear();
      setUser(false);
    }
  };

  return (
    <>
      {user && <Profile user={user} modal={profile} setModal={setProfile} />}
      <Navbar
        maxWidth="xl"
        isCompact
        shouldHideOnScroll
        isBordered
        variant="sticky"
      >
        <Navbar.Brand>
          <Navbar.Toggle showIn="xs" />
          &nbsp;
          <img src={Logo} alt="logo" width="40" height="40" />
          &nbsp;
          <Text b size={20}>
            Partner3
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="underline-rounded"
        >
          <Navbar.Link
            isActive={location.pathname === "/"}
            onPress={() => navigate("/")}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            isActive={location.pathname === "/donations"}
            onPress={() => navigate("/donations")}
          >
            Donations
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <i
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`icon ${
              isDark ? "fa-solid fa-sun" : "fa-solid fa-moon"
            }`}
          ></i>
          {!user ? (
            <Button solid onPress={handleLogin} color="secondary" size="sm">
              <div className="login">
                <i className="fa-brands fa-twitch"></i>
                <span>Login</span>
              </div>
            </Button>
          ) : (
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    zoomed
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src={user.profile_image_url}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="Static Actions"
                css={{ minWidth: "150px" }}
                color="secondary"
                onAction={(action) => handleAction(action)}
              >
                <Dropdown.Item
                  icon={<i class="fa-solid fa-chart-line"></i>}
                  key="dashboard"
                >
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item
                  withDivider
                  icon={<i class="fa-solid fa-address-card"></i>}
                  key="profile"
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  icon={
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  }
                  key="logout"
                  color="error"
                >
                  Disconnect
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem>
            <Link color="text" onPress={() => navigate("/")}>
              Home
            </Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem>
            <Link color="text" onPress={() => navigate("/donations")}>
              Donations
            </Link>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

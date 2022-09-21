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
import useThemeApp from "../../hooks/useThemeApp";
import { Profile } from "./components/Modals";
import Logo from "../../assets/imgs/logo.png";

export default function NavBar() {
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogin, user, setUser } = useAuth();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  useThemeApp({ isDark });

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
        variant="static"
      >
        <Navbar.Brand>
          <Navbar.Toggle showIn="xs" />
          &nbsp;
          <img src={Logo} alt="logo" width="40" height="40" />
          &nbsp;
          <Text b size={20} css={{ color: isDark ? "#ffffff" : "#000000" }}>
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
            css={{ color: isDark ? "#ffffff" : "#000000" }}
            isActive={location.pathname === "/"}
            onPress={() => navigate("/")}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            css={{ color: isDark ? "#ffffff" : "#000000" }}
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
              isDark ? "fa-solid fa-sun light" : "fa-solid fa-moon dark"
            }`}
            // className={`icon ${"fa-solid fa-moon dark"}`}
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
                  icon={<i className="fa-solid fa-chart-line"></i>}
                  key="dashboard"
                  color="success"
                >
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item
                  withDivider
                  icon={<i className="fa-solid fa-address-card"></i>}
                  key="profile"
                  color="secondary"
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

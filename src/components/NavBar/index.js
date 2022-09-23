import { useState, useEffect } from "react";
import {
  Navbar,
  Button,
  Text,
  Dropdown,
  Avatar,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import useThemeApp from "../../hooks/useThemeApp";
import { Profile } from "./components/Modals";
import Logo from "../../assets/imgs/logo.png";

export default function NavBar() {
  const isMobileResolution = useMatchMedia("(max-width:650px)", false);
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogin, user, setUser } = useAuth();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  useThemeApp({ isDark, setTheme });

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

  useEffect(() => {
    if (isMobileResolution) {
      const container = document.querySelector(".btn-flotante");
      const menuIcon = document.querySelector(".menu-btn");
      const mobileMenu = document.querySelector(".mobile-menu");
      const body = document.querySelectorAll("body")[0];

      mobileMenu.style.backgroundColor = isDark ? "#000000e5" : "#ffffffe5";
      mobileMenu.style.color = isDark ? "#ffffff" : "#000000";

      if (mobile) {
        mobileMenu.style.visibility = "visible";

        container.style.opacity = "1";
        container.style.boxShadow = "2px 1px 6px 0px rgba(109, 109, 109, 0.6)";

        menuIcon.classList.add("open");

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
      } else {
        mobileMenu.style.visibility = "hidden";

        container.style.opacity = "0.7";
        container.style.boxShadow = "2px 1px 7px 0px rgba(109, 109, 109, 0.3)";

        menuIcon.classList.remove("open");

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
      }
    }
  }, [isDark, mobile, isMobileResolution]);

  return (
    <>
      {user && <Profile user={user} modal={profile} setModal={setProfile} />}
      {isMobileResolution && (
        <div
          role="button"
          onClick={() => setMobile(!mobile)}
          className="btn-flotante menu-btn"
        >
          <div class="menu-btn__burger"></div>
        </div>
      )}

      <Navbar
        maxWidth="xl"
        isCompact
        shouldHideOnScroll
        isBordered
        variant="static"
      >
        <Navbar.Brand>
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
      </Navbar>
      <div className="mobile-menu" onClick={() => setMobile(!mobile)}>
        <h2>Partner3</h2>
        <span
          className={location.pathname === "/" ? "purple" : ""}
          onClick={() => navigate("/")}
        >
          <i class="fa-solid fa-house-chimney"></i> &nbsp;Home
        </span>
        <span
          className={location.pathname === "/donations" ? "purple" : ""}
          onClick={() => navigate("/donations")}
        >
          <i class="fa-solid fa-comments-dollar"></i> &nbsp;Donations
        </span>
      </div>
    </>
  );
}

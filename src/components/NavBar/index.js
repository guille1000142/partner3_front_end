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
import { Profile } from "./components/Profile";
import Logo from "../../assets/imgs/logo.png";
import { icons } from "../Svgs/Icons";

export default function NavBar() {
  const isMobileResolution = useMatchMedia("(max-width:960px)", false);
  const [profile, setProfile] = useState(false);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, handleLogin } = useAuth();
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
    if (action === "logout") {
      window.sessionStorage.clear();
      window.localStorage.clear();
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

  const handleDropdown = (e) => {
    switch (e) {
      case "documentation":
        window.open("https://docs.partner3.live", "_blank");
        break;
      case "messages":
        window.open(
          "https://docs.partner3.live/s/getting-started/for-viewers",
          "_blank"
        );
        break;
      case "donations":
        window.open(
          "https://docs.partner3.live/s/getting-started/for-streamers",
          "_blank"
        );
        break;
      case "roadmap":
        window.open(
          "https://docs.partner3.live/s/partner3-team/roadmap",
          "_blank"
        );
        break;
      case "tokenomics":
        window.open(
          "https://docs.partner3.live/s/partner3-team/tokenomics",
          "_blank"
        );
        break;
      case "discord":
        window.open("https://discord.com/invite/suNRNRhbDe", "_blank");
        break;
      case "twitter":
        window.open("https://twitter.com/PartnerThree", "_blank");
        break;
    }
  };

  return (
    <>
      {user && <Profile user={user} modal={profile} setModal={setProfile} />}

      <Navbar maxWidth="xl" isCompact shouldHideOnScroll variant="static">
        <div
          className="role-button"
          onClick={() => window.open("https://partner3.live/", "_blank")}
        >
          <Navbar.Brand>
            <img src={Logo} alt="logo" width="40" height="40" />
            &nbsp;
            <Text
              b
              size={22}
              css={{
                color: isDark ? "#ffffff" : "#000000",
                fontFamily: "Berlin Sans FB Demi, sans-serif",
              }}
            >
              PARTNER3
            </Text>
          </Navbar.Brand>
        </div>

        <Navbar.Content
          activeColor="secondary"
          hideIn="sm"
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
          <Dropdown>
            <Navbar.Item>
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                  color: isDark ? "#ffffff" : "#000000",
                }}
                ripple={false}
              >
                Resources
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              color="secondary"
              variant="flat"
              onAction={handleDropdown}
              aria-label="resources"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                css={{ color: isDark ? "#ffffff" : "#000000" }}
                key="documentation"
                icon={<i class="fa-solid fa-book"></i>}
              >
                Documentation
              </Dropdown.Item>

              <Dropdown.Item
                css={{ color: isDark ? "#ffffff" : "#000000" }}
                key="messages"
                icon={<i class="fa-solid fa-paper-plane"></i>}
              >
                How to send messages
              </Dropdown.Item>
              <Dropdown.Item
                css={{ color: isDark ? "#ffffff" : "#000000" }}
                key="donations"
                showFullDescription
                icon={<i class="fa-solid fa-hand-holding-dollar"></i>}
              >
                How to receive donations
              </Dropdown.Item>
              <Dropdown.Item
                css={{ color: isDark ? "#ffffff" : "#000000" }}
                key="roadmap"
                showFullDescription
                icon={<i class="fa-solid fa-road"></i>}
              >
                Roadmap
              </Dropdown.Item>
              <Dropdown.Item
                css={{ color: isDark ? "#ffffff" : "#000000" }}
                key="tokenomics"
                showFullDescription
                icon={<i class="fa-solid fa-chart-pie"></i>}
              >
                PTT Tokenomics
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Navbar.Item>
              <Dropdown.Button
                auto
                light
                color="secondary"
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                  color: isDark ? "#ffffff" : "#000000",
                }}
                ripple={false}
              >
                Community
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              color="secondary"
              variant="flat"
              onAction={handleDropdown}
              aria-label="community"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                css={{ color: isDark ? "#ffffff" : "#000000" }}
                key="discord"
                showFullDescription
                description="Be part of our big community and participate in live events"
                icon={icons.discord}
              >
                Join us on Discord
              </Dropdown.Item>
              <Dropdown.Item
                css={{ color: isDark ? "#ffffff" : "#000000" }}
                key="twitter"
                showFullDescription
                description="We publish news and important updates about the project"
                icon={icons.twitter}
              >
                Follow us on Twitter
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>

        <Navbar.Content>
          <i
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`icon ${
              isDark ? "fa-solid fa-sun light" : "fa-solid fa-moon dark"
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

      {isMobileResolution && (
        <>
          <div
            role="button"
            onClick={() => setMobile(!mobile)}
            className="btn-flotante menu-btn"
          >
            <div class="menu-btn__burger"></div>
          </div>
          <div className="mobile-menu" onClick={() => setMobile(!mobile)}>
            <h2>PARTNER3</h2>
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
            <span
              onClick={() =>
                window.open("https://docs.partner3.live", "_blank")
              }
            >
              <i class="fa-solid fa-book"></i> &nbsp;Documentation
            </span>
            <span
              onClick={() =>
                window.open(
                  "https://docs.partner3.live/s/getting-started/for-viewers",
                  "_blank"
                )
              }
            >
              <i class="fa-solid fa-paper-plane"></i> &nbsp;How to send messages
            </span>
            <span
              onClick={() =>
                window.open(
                  "https://docs.partner3.live/s/getting-started/for-streamers",
                  "_blank"
                )
              }
            >
              <i class="fa-solid fa-hand-holding-dollar"></i> &nbsp;How to
              receive donations
            </span>
            <span
              onClick={() =>
                window.open(
                  "https://docs.partner3.live/s/partner3-team/roadmap",
                  "_blank"
                )
              }
            >
              <i class="fa-solid fa-road"></i> &nbsp;Roadmap
            </span>
            <span
              onClick={() =>
                window.open(
                  "https://docs.partner3.live/s/partner3-team/tokenomics",
                  "_blank"
                )
              }
            >
              <i class="fa-solid fa-chart-pie"></i> &nbsp;PTT Tokenomics
            </span>
            <span
              onClick={() =>
                window.open("https://discord.com/invite/suNRNRhbDe", "_blank")
              }
            >
              <i class="fa-brands fa-discord"></i> &nbsp;Discord
            </span>
            <span
              onClick={() =>
                window.open("https://twitter.com/PartnerThree", "_blank")
              }
            >
              <i class="fa-brands fa-twitter"></i> &nbsp;Twitter
            </span>
          </div>
        </>
      )}
    </>
  );
}

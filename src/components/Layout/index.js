import React, { useState, useMemo, useEffect } from "react";
import { toast, ToastBar, Toaster, useToasterStore } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Context } from "../../context/Context";
import NavBar from "../NavBar";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

export function GlobalLayout() {
  const [user, setUser] = useState(false);
  const [channel, setChannel] = useState(false);
  const [history, setHistory] = useState(false);
  console.log({ user, channel });
  return (
    <Context.Provider
      value={useMemo(
        () => ({
          user,
          setUser,
          channel,
          setChannel,
          history,
          setHistory,
        }),
        [user, setUser, channel, setChannel, history, setHistory]
      )}
    >
      <ToastModal />
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <header>
            <NavBar />
          </header>
          <main>
            <section>
              <Outlet />
            </section>
          </main>
        </NextUIProvider>
      </NextThemesProvider>
    </Context.Provider>
  );
}

function ToastModal() {
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <div className="div-test">
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        className="toast-modal"
        toastOptions={{
          // Define default options
          className: "toast-settings",
          duration: 5000,
          style: {
            marginTop: "45px",
            background: "rgba(28, 31, 35, 1)",
            color: "whitesmoke",
          },
          // Default options for specific types
          success: {
            duration: 5000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <span
                    className="toast-close"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <i className="fa-solid fa-xmark fa-lg"></i>
                  </span>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}

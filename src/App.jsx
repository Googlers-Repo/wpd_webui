import * as React from "react";

import {
  Divider,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Toolbar,
  AppBar,
  Alert,
} from "@mui/material";

import { Scaffold } from "./components/Scaffold";
import { HideOnScroll } from "./components/HideOnScroll";
import { MMRLSwitch } from "./components/Switch";
import { useNetworks } from "./hooks/useNetworks";
import { configStoreFallback } from "./util/configStoreFallback";
import { useLocalStorage } from "usehooks-ts";
import { isMMRL } from "./util/isMMRL";

function App() {
  return (
    <Box sx={{ paddingBottom: "var(--window-inset-bottom)", flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar
          sx={{
            paddingTop: "var(--window-inset-top)",
            backgroundColor: "var(--surfaceContainer)",
            // boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="var(--onSurface)"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              WiFi Password Viewer
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar
        sx={{
          paddingTop: "var(--window-inset-top)",
        }}
      />
      <Scaffold>
        {isMMRL() ? (
          <Alert
            sx={{
              marginTop: "8px",
              marginBottom: "8px",
            }}
            variant="filled"
            severity="error"
          >
            You running this WebUI in a non-MMRL environment. You'll may facing
            visual and other issues
          </Alert>
        ) : null}

        {!$mmrl_wpd.getHasAccessToFileSystem() ? (
          <Alert
            sx={{
              marginTop: "8px",
              marginBottom: "8px",
            }}
            variant="filled"
            severity="error"
          >
            The access to the FileSystem API has been disabled. Please enable
            the FileSystem API in the MMRL settings to use this module. Pushed
            fallback data.
          </Alert>
        ) : (
          <WifiView />
        )}
      </Scaffold>

      <Box
        sx={{
          width: "100%",
          background:
            "linear-gradient(180deg, var(--background) 30%, rgba(0,0,0,0) 70%)",
          height: "calc(var(--window-inset-top) * 3.5)",
          position: "fixed",
          top: "0",
        }}
      />
      <Box
        sx={{
          width: "100%",
          background:
            "linear-gradient(0deg, var(--background) 30%, rgba(0,0,0,0) 70%)",
          height: "calc(var(--window-inset-bottom) * 3)",
          position: "fixed",
          bottom: "0",
        }}
      />
    </Box>
  );
}

const WifiView = () => {
  const networks = useNetworks(configStoreFallback);

  const [hidePasswords, setHidePasswords] = useLocalStorage(
    "hidePasswords",
    true
  );

  return (
    <>
      <ListItem>
        <ListItemText
          sx={{
            "& .MuiTypography-root": {
              color: "var(--onSurface)",
            },
          }}
          primary="Hide passwords"
        />
        <MMRLSwitch
          checked={hidePasswords}
          onChange={(e) => setHidePasswords(e.target.checked)}
        />
      </ListItem>

      {networks.map((wifi, index, arr) => (
        <>
          <ListItem>
            <ListItemText
              sx={{
                "& .MuiListItemText-secondary": {
                  color: "var(--onSurface)",
                  WebkitTextSecurity:
                    wifi.psk !== null && hidePasswords ? "disc" : "none",
                  wordWrap: "break-word",
                  fontStyle: wifi.psk === null ? "italic" : "none",
                },
              }}
              primary={
                <Typography color="var(--onSurface)" variant="h5">
                  {wifi.ssid}
                </Typography>
              }
              secondary={
                <Box
                  sx={{
                    userSelect: "text",
                    marginTop: "16px",
                    padding: "16px",
                    wordWrap: "break-word",
                    backgroundColor: "var(--surfaceContainerLowest)",
                    borderRadius: "20px",
                    color: "var(--onSurface)",
                  }}
                  onClick={() => {
                    if (!hidePasswords) {
                      $mmrl_wpd.shareText(wifi.psk);
                    }
                  }}
                >
                  {wifi.psk
                    ? hidePasswords
                      ? wifi.psk.slice(1, 9)
                      : wifi.psk
                    : "Has no password"}
                </Box>
              }
            />
          </ListItem>
          {index + 1 !== arr.length && <Divider variant="middle" />}
        </>
      ))}
    </>
  );
};

export { App };

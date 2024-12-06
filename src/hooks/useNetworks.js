import * as React from "react";
import { useConfigStore } from "./useConfigStore.js";

const useNetworks = (fallback) => {
  const [networks, setNetworks] = React.useState([]);
  const config = useConfigStore(fallback);

  React.useEffect(() => {
    if (config) {
      const wifiXmlParser = new DOMParser();
      const xml = wifiXmlParser.parseFromString(config, "text/xml");

      const WifiConfigStoreData = xml.getElementsByTagName(
        "WifiConfigStoreData"
      )[0];
      const NetworkList =
        WifiConfigStoreData.getElementsByTagName("NetworkList")[0];

      const WifiConfiguration = [
        ...NetworkList.getElementsByTagName("WifiConfiguration"),
      ];

      setNetworks(
        WifiConfiguration.map((s) => {
          const ssid = s.querySelector('string[name="SSID"]').innerHTML;

          const psk = s.querySelector('string[name="PreSharedKey"]');

          return {
            ssid: ssid.replace(/"(.+)"/g, "$1"),
            psk: psk ? psk.innerHTML.replace(/"(.+)"/g, "$1") : null,
          };
        })
      );
    }
  }, [config]);

  return networks;
};

export { useNetworks };

import { useExec } from "./useExec";

const useConfigStore = (fallback) => {
  const result = useExec(
    "cat /data/misc/apexdata/com.android.wifi/WifiConfigStore.xml || cat /data/misc/wifi/WifiConfigStore.xml"
  );

  return result || fallback;
};

export { useConfigStore };

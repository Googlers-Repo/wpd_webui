const useConfigStore = (fallback) => {
  const paths = [
    "/data/misc/apexdata/com.android.wifi/WifiConfigStore.xml",
    "/data/misc/wifi/WifiConfigStore.xml",
  ];

  if (typeof window["$MmFile"] == "undefined") return fallback;

  const file = $MmFile;

  for (const path of paths) {
    if (file.exists(path)) {
      return file.read(path);
    } else {
      return fallback;
    }
  }
};

export { useConfigStore };

import * as React from "react";
import { exec } from "kernelsu";

const useExec = (command) => {
  const [result, setResult] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const { errno, stdout, stderr } = await exec(command);
      if (errno === 0) {
        setResult(stdout);
      }
    })();
  }, []);

  return result;
};

export { useExec };

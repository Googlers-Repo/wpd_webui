import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const MMRLSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--primary)",
    "&:hover": {
      backgroundColor: `rgba(red(var(--primary)), green(var(--primary)), blue(var(--primary)), ${theme.palette.action.hoverOpacity})`,
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--primary)",
  },
}));

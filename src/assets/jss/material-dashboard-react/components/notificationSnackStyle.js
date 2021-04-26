import {
  defaultFont,
  whiteColor,
  blackColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react.js";

const notificationSnackStyle = {
  root: {
    ...defaultFont,
    flexWrap: "unset",
    position: "relative",
    padding: "20px 15px",
    lineHeight: "20px",
    marginBottom: "20px",
    fontSize: "14px",
    backgroundColor: whiteColor,
    color: grayColor[7],
    borderRadius: "3px",
    minWidth: "unset",
    maxWidth: "unset",
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(whiteColor) +
      ", 0.28), 0 4px 20px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 7px 8px -5px rgba(" +
      hexToRgb(whiteColor) +
      ", 0.2)",
  },
  message: {
    padding: "0",
    display: "block",
    maxWidth: "89%",
  },
  button: {
    width: "11px",
    height: "11px",
  },
  iconButton: {
    width: "24px",
    height: "24px",
    padding: "0px",
  },
  icon: {
    display: "block",
    left: "15px",
    position: "absolute",
    top: "50%",
    marginTop: "-15px",
    width: "30px",
    height: "30px",
  },
};

export default notificationSnackStyle;

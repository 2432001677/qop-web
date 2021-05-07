import { hexToRgb } from "assets/jss/material-dashboard-react.js";

const styles = {
  title: {
    fontSize: "18px",
  },
  itemIcon: {
    width: "24px",
    height: "30px",
    fontSize: "24px",
    lineHeight: "30px",
    float: "left",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "rgba(" + hexToRgb("#0D47A1") + ", 0.8)",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: 16,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: 8,
  },
};
export default styles;

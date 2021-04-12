import { transition } from "assets/jss/material-dashboard-react.js";

const styles = {
  questionnairePreview: {
    background: " #f4f4f4f4",
    minHeight: "100%",
    padding: "80px 0",
    // backgroundImage: url('../assets/bacg.jpg'),
    backgroundSize: "cover",
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  questionnaireView: {
    width: "800px",
    margin: "0 auto",
    background: "white",
    padding: "30px 50px",
  },
  questionTitle: {
    fontSize: "20px",
    margin: "10px 0",
  },
  option: {
    marginLeft: "20px",
    marginBottom: "5px",
    display: "block",
    height: "30px",
    lineHeight: "30px",
  },
  weight: {
    margin: "20px 0",
  },
  active: {
    border: "#ed4014 2px solid",
  },
  slider: {
    width: "76.5%",
    marginLeft: "3.5%",
    marginTop: "25px",
  },
  weightDiv: {
    marginTop: "10px",
    width: "100%",
  },
};
export default styles;

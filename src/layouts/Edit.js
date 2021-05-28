import React, { useState, useEffect } from "react";

import EditTopBar from "components/Navbars/EditTopBar";
import EditSider from "components/Sidebar/EditSider.js";
import EditContent from "components/Content/EditContent.js";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/layouts/editStyle.js";

let ps;

const useStyles = makeStyles(styles);
export default function Edit(props) {
  const qid = props.match.params.id;
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [scoringModeOpen, setScoringModeOpen] = useState(false);

  const [questionnaire, setQuestionnaire] = useState({
    title: "title",
    answer_num: 0,
    status: 1,
    description: "des",
    scoring_mode: false,
    questions: [],
  });
  const [questions, setQuestions] = useState([]);

  const state = {
    qid,
    scoringModeOpen,
    setScoringModeOpen,
    questionnaire,
    setQuestionnaire,
    questions,
    setQuestions,
  };

  useEffect(() => {
    if (
      navigator.platform.indexOf("Win") > -1 ||
      navigator.platform.indexOf("Linux") > -1
    ) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    return function cleanup() {
      if (
        navigator.platform.indexOf("Win") > -1 ||
        navigator.platform.indexOf("Linux") > -1
      ) {
        ps.destroy();
      }
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <EditSider {...state} />
      <div style={{ maxHeight: "100%" }} ref={mainPanel}>
        <EditContent {...state} />
      </div>
      <EditTopBar {...state}/>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { getAnalysisByQid } from "Api/Api.js";

import Statistic from "components/Statistic/Statistic.js";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from "assets/jss/material-dashboard-react/views/analysisStyle.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

let ps;
export default function Analysis(props) {
  const { qid } = props.match.params;
  const mainPanel = React.createRef();
  const classes = useStyles();
  const [statistic, setStatistic] = useState({
    title: "问卷",
    answer_count: 0,
    average_total_score: 0,
    scoring_mode: true,
    analysis_form_list: [],
  });

  useEffect(() => {
    const getStatistic = async () => {
      try {
        const { data } = await getAnalysisByQid(qid);
        console.log(data);
        setStatistic(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatistic();
  }, [qid]);

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
    // Specify how to clean up after this effect:
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
      <div style={{ maxHeight: "100%" }} ref={mainPanel}>
        <Statistic statistic={statistic} />
      </div>
    </div>
  );
}

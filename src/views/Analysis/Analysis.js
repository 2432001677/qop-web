import React from "react";

import Statistic from "components/Statistic/Statistic.js";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from "assets/jss/material-dashboard-react/views/analysisStyle.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

let ps;
export default function Analysis(props) {
  const mainPanel = React.createRef();
  const classes = useStyles();
  const statistic = {
    title: "问卷",
    answer_count: 55,
    average_total_score: 80,
    scoring_mode: true,
    analysis_form_list: [
      {
        qtitle: "你当前的心情",
        qtype: 0,
        answer_count: 17,
        average_score: 16.5,
        pass: 1,
        options: [
          { selected_count: 3, text: "开心", score: 3 },
          { selected_count: 5, text: "一般", score: 2 },
          { selected_count: 9, text: "痛苦", score: 1 },
        ],
      },
      {
        qtitle: "随便说",
        qtype: 2,
        answer_count: 22,
        pass: 2,
        options: [
          { text: "Talk is cheap", score: 3 },
          { text: "Show me your code", score: 3 },
          { text: "Wat", score: 3 },
          { text: "Hello world!", score: 3 },
          { text: "Foo", score: 3 },
          { text: "Bar", score: 3 },
          { text: "Java sucks", score: 3 },
          { text: "xczcxz", score: 3 },
        ],
      },
      {
        qtitle: "我全都要",
        qtype: 1,
        answer_count: 42,
        average_score: 18.5,
        pass: 4,
        options: [
          { selected_count: 30, text: "苹果🍎", score: 3 },
          { selected_count: 31, text: "香蕉🍌", score: 3 },
          { selected_count: 9, text: "西瓜🍉", score: 3 },
        ],
      },
    ],
  };

  React.useEffect(() => {
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

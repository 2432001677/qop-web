import React, { useEffect, useState, useRef } from "react";
import { get, post } from "Utils/Axios.js";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from "assets/jss/material-dashboard-react/views/analysisStyle.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function Analysis(props) {
  const classes = useStyles();
  const statistic = {
    title:'title',
    answerCount: 55,
    analysisFormList: [
      {
        qtitle: '单选题',
        qtype:0
      }
    ],
  };
  const Statistic = () => {
    return (
      <div>
        <template v-if="analysis.qtype==='填空'">
          <span className={classes.analysisQuestionTitle}>
            回答数：{"analysis.answerCount"}
          </span>
          <div className={classes.blankScroll}>
            <div
              className={classes.analysisQuestionTitlex}
              // v-for="(option,index) in analysis.options"
            >
              {"option.text"}
            </div>
          </div>
        </template>
        <template v-else>
          <div className={classes.analysisQuestion}>
            <div className={classes.questionTitle}>{"analysis.qtitle"}</div>
            <div
              // :ref="['analysis-'+index]"
              style={{ width: "80%", height: "390px", margin: "0 auto" }}
            />
          </div>
        </template>
      </div>
    );
  };
  return (
    <div className={classes.analysis}>
      <div dataTitle="统计报表" />
      <div className={classes.analysisQuestionnaireTitleDiv}>
        <span className={classes.analysisQuestionnaireTitle}>
          {statistic.title}
        </span>
        <span className={classes.analysisQuestionnaireTitle}>
          {`收到答卷: ${statistic.answerCount}份`}
        </span>
      </div>
      <button
        className={classes.floatButton}
        // onClick={"backToTop()"}
      >
        {/* <img src="/assets/top.svg" aria-hidden="true" /> */}
        {"Top"}
      </button>
      {statistic.analysisFormList.map((prop, key) => {
        return (
          <div className={classes.analysisQuestionDiv} key={`title-${key}`}>
            <div className={classes.analysisQuestions}>
              <div className={classes.analysisQuestionTitle}>
                {`Q${key + 1}: ${prop.qtitle} ${prop.qtype}`}
              </div>
            </div>
          </div>
        );
      })}
      {/* <div
        className={classes.analysisQuestionDiv}
        // v-for="(analysis,index) in statistic.analysisFormList"
        key="analysis.qtitle"
      >
        <div className={classes.analysisQuestions}>
          <div className={classes.analysisQuestionTitle}>
            Q{"index+1"}: {"analysis.qtitle"} ({"analysis.qtype"})
          </div>
        </div>
      </div> */}
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";

import * as echarts from "echarts";

import classnames from "classnames";
import { get, post } from "Utils/Axios.js";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from "assets/jss/material-dashboard-react/views/analysisStyle.js";

import { makeStyles } from "@material-ui/core/styles";

import top from "assets/img/top.svg";

const useStyles = makeStyles(styles);

export default function Analysis(props) {
  const classes = useStyles();
  const refDom = useRef([]);
  const statistic = {
    title: "问卷",
    answerCount: 55,
    analysisFormList: [
      {
        qtitle: "单选题",
        qtype: 0,
        answerCount: 22,
        options: [
          { selectedCount: 30, text: "开心" },
          { selectedCount: 51, text: "一般" },
          { selectedCount: 29, text: "痛苦" },
        ],
      },
      {
        qtitle: "填空题",
        qtype: 2,
        answerCount: 22,
        options: [
          { text: "xczcxz" },
          { text: "xczcxz" },
          { text: "xczcxz" },
          { text: "xczcxz" },
          { text: "xczcxz" },
          { text: "xczcxz" },
          { text: "xczcxz" },
          { text: "xczcxz" },
        ],
      },
    ],
  };

  useEffect(() => {
    const drawLine = (index) => {
      console.log(refDom.current[index]);
      let myChart = echarts.init(refDom.current[index]);
      let optionData = [];
      let optionCount = [];
      let options = this.statistic.analysisFormList[index].options;
      for (let i = 0; i < options.length; i++) {
        optionData.push(options[i].text);
        optionCount.push(options[i].selectedCount);
      }
      // 绘制图表
      myChart.setOption({
        title: {
          text:
            "答题人数：" + this.statistic.analysisFormList[index].answerCount,
          left: "center",
        },
        tooltip: {},
        xAxis: {
          data: optionData,
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: optionCount,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          },
        ],
      });
    };
    const chartFn = (index) => {
      console.log(refDom.current[index]);
      let pieChart = echarts.init(refDom.current[index]);
      let optionData = [];
      let optionCount = [];
      let options = statistic.analysisFormList[index].options;
      for (let i = 0; i < options.length; i++) {
        optionData.push(options[i].text);
        optionCount[i] = {};
        optionCount[i]["value"] = options[i].selectedCount;
        optionCount[i]["name"] = options[i].text;
      }

      // if (this.statistic.analysisFormList[index].qtype === "比重") {
      // }
      pieChart.setOption({
        title: {
          text: "答题人数：" + statistic.analysisFormList[index].answerCount,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: optionData,
        },
        series: [
          {
            name: "选项",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: optionCount,
          },
        ],
      });
    };
    const analyze = () => {
      for (let i = 0; i < statistic.analysisFormList.length; i++) {
        if (statistic.analysisFormList[i].qtype === 2) {
          continue;
        } else {
          chartFn(i);
        }
      }
    };
    analyze();
  }, []);

  const BlankStatistic = (props) => {
    return (
      <div>
        <span
          className={classnames({
            [classes.analysisQuestionTitle]: true,
            [classes.blankAnswers]: true,
            [classes.titleSize]: true,
          })}
        >
          回答数：{props.answerCount}
        </span>
        <div className={classes.blankScroll}>
          {props.options.map((prop) => {
            return (
              <div
                key={prop.text}
                className={classnames({
                  [classes.analysisQuestionTitle]: true,
                  [classes.blankAnswers]: true,
                })}
              >
                {prop.text}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const NormalStatistic = (props) => {
    return (
      <div className={classes.analysisQuestion}>
        <div className={classes.questionTitle}>{props.qtitle}</div>
        <div
          style={{ width: "80%", height: "390px", margin: "0 auto" }}
          ref={(node) => (refDom.current[props.index] = node)}
        />
      </div>
    );
  };
  const Statistic = ({ qtype, ...rest }) => {
    console.log(props);
    if (qtype === 2) {
      return <BlankStatistic {...rest} />;
    } else {
      return <NormalStatistic {...rest} />;
    }
  };
  return (
    <div className={classes.analysis}>
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
        <img src={top} aria-hidden="true" />
        {"Top"}
      </button>
      {statistic.analysisFormList.map((prop, key) => {
        return (
          <div className={classes.analysisQuestionDiv} key={`title-${key}`}>
            <div className={classes.analysisQuestions}>
              <div className={classes.analysisQuestionTitle}>
                {`Q${key + 1}: ${prop.qtitle} ${prop.qtype}`}
              </div>
              <Statistic index={key} {...prop} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

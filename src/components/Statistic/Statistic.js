import React, { useEffect, useRef } from "react";

import { BackTop } from "antd";

import * as echarts from "echarts";

import classNames from "classnames";
import { questionTypeList } from "variables/questions.js";

import styles from "assets/jss/material-dashboard-react/components/statisticStyle.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function Statistic(props) {
  const classes = useStyles();
  const refDom = useRef([]);

  const { statistic } = props;
  // 多选
  const drawLine = (answer, index) => {
    let myChart = echarts.init(refDom.current[index]);
    let optionData = [];
    let optionCount = [];
    let options = answer.options;
    for (let i = 0; i < options.length; i++) {
      optionData.push(options[i].text);
      optionCount.push(options[i].selected_count);
    }
    const option = {
      title: {
        text: "答题人数：" + answer.answer_count,
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
    };
    // 绘制图表
    myChart.setOption(option);
  };

  // 单选
  const chartFn = (answer, index) => {
    let pieChart = echarts.init(refDom.current[index]);
    let optionData = [];
    let optionCount = [];
    let options = answer.options;
    for (let i = 0; i < options.length; i++) {
      optionData.push(options[i].text);
      optionCount[i] = {};
      optionCount[i]["value"] = options[i].selected_count;
      optionCount[i]["name"] = options[i].text;
    }

    // if (this.statistic.analysisFormList[index].qtype === "比重") {
    // }

    const option = {
      title: {
        text: "答题人数：" + answer.answer_count,
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
    };

    pieChart.setOption(option);
  };

  useEffect(() => {
    const analyze = () => {
      for (let i = 0; i < statistic.analysis_form_list.length; i++) {
        const answer = statistic.analysis_form_list[i];
        if (answer.qtype === 1) {
          drawLine(answer, i);
        } else if (answer.qtype !== 2) {
          chartFn(answer, i);
        }
      }
    };
    analyze();
  }, [statistic]);

  const BlankStatistic = (props) => {
    return (
      <div>
        <span
          className={classNames({
            [classes.analysisQuestionTitle]: true,
            [classes.blankAnswers]: true,
            [classes.titleSize]: true,
          })}
        >
          {`回答数：${props.answer_count}`}
        </span>
        <div className={classes.blankScroll}>
          {props.options.map((prop, key) => {
            return (
              <div
                key={`text-${key}`}
                className={classNames({
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
          className={classes.questionAverage}
        >{`平均分：${props.average_score}`}</div>
        <div
          style={{ width: "80%", height: "390px", margin: "0 auto" }}
          ref={(node) => (refDom.current[props.index] = node)}
        />
      </div>
    );
  };
  const Statistic = ({ qtype, ...rest }) => {
    if (qtype === 2) {
      return <BlankStatistic {...rest} />;
    } else {
      return <NormalStatistic {...rest} />;
    }
  };
  return (
    <div className={classes.analysis}>
      <BackTop>
        <div className={classes.backToTop}>UP</div>
      </BackTop>
      <div className={classes.analysisQuestionnaireTitleDiv}>
        <span className={classes.analysisQuestionnaireTitle}>
          {statistic.title}
        </span>
        <span className={classes.analysisQuestionnaireTitle}>
          {`收到答卷: ${statistic.answer_count}份`}
        </span>
      </div>
      {statistic.analysis_form_list.map((prop, key) => {
        return (
          <div className={classes.analysisQuestionDiv} key={`title-${key}`}>
            <div className={classes.analysisQuestions}>
              <div className={classes.analysisQuestionTitle}>
                {`Q${key + 1}: ${prop.qtitle} ${questionTypeList[prop.qtype]}`}
              </div>
              <Statistic index={key} {...prop} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";
import * as R from "ramda";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/editSiderStyle.js";

import {
  SmileTwoTone,
  SignalFilled,
  ProjectFilled,
  PieChartFilled,
  CheckSquareTwoTone,
  EditTwoTone,
  CheckCircleTwoTone,
  SaveFilled,
} from "@ant-design/icons";
import { Layout, Button } from "antd";
const { Sider } = Layout;
const useStyles = makeStyles(styles);

export default function EditSider({ questions, setQuestions }) {
  const classes = useStyles();
  const updateQuestions = () => setQuestions(questions.slice());
  const addNewOneQuestion = (qtype) => {
    let question = {
      qtitle: "",
      qtype: qtype,
      pass: 0,
      required: true,
      option_num: 1,
      options: [],
    };
    if (qtype === 0) {
      question.qtitle = "单选题";
      question.options = [{ text: "选项1", score: 0 }];
    } else if (qtype === 1) {
      question.qtitle = "多选题";
      question.options = [{ text: "选项1", score: 0 }];
    } else if (qtype === 2) {
      question.qtitle = "填空题";
    } else if (qtype === 3) {
      question.qtitle = "评分题";
      question.options = [];
    } else if (qtype === 4) {
      question.qtitle = "级联题";
    } else if (qtype === 5) {
      question.qtitle = "下拉题";
      question.options = [
        {
          value: 0,
          label: "选项1",
          score: 0,
        },
      ];
    } else if (qtype === 6) {
      question.qtitle = "比重题";
      question.sum_score = 0;
      question.options = [{ text: "选项1", score: 0 }];
    } else if (qtype === 7) {
      question.qtitle = "附件题";
    } else if (qtype === 8) {
      question.qtitle = "听力题";
      question.options = [{ text: "选项1", score: 0 }];
    }
    return R.compose(updateQuestions, () => questions.push(question));
  };
  const buttonMatrix = [
    [
      {
        icon: <CheckCircleTwoTone />,
        onClick: addNewOneQuestion(0),
        children: "单选题",
      },
      {
        icon: <CheckSquareTwoTone />,
        onClick: addNewOneQuestion(1),
        children: "多选题",
      },
    ],
    [
      {
        icon: <EditTwoTone />,
        onClick: addNewOneQuestion(2),
        children: "填空题",
      },
      {
        icon: <SmileTwoTone />,
        onClick: addNewOneQuestion(3),
        children: "评分题",
      },
    ],
    [
      {
        icon: <SignalFilled />,
        onClick: addNewOneQuestion(4),
        children: "级联题",
      },
      {
        icon: <ProjectFilled />,
        onClick: addNewOneQuestion(5),
        children: "下拉题",
      },
    ],
    [
      {
        icon: <PieChartFilled />,
        onClick: addNewOneQuestion(6),
        children: "比重题",
      },
      {
        icon: <SaveFilled />,
        onClick: addNewOneQuestion(7),
        children: "附件题",
      },
    ],
    [
      {
        icon: <PieChartFilled />,
        onClick: addNewOneQuestion(8),
        children: "听力题",
      },
      {
        icon: <SaveFilled />,
        onClick: addNewOneQuestion(9),
        children: "排序题",
      },
    ],
  ];

  const QuestionButton = (props) => (
    <Button className={classes.btn} type="primary" {...props} />
  );
  const ButtonRaw = ({ buttons }) => (
    <div className={classes.allBtnDiv}>
      {buttons.map((prop, key) => (
        <QuestionButton key={`button-${key}`} {...prop} />
      ))}
    </div>
  );
  const ButtonBar = () => (
    <div className={classes.allBtn}>
      {buttonMatrix.map((prop, key) => (
        <ButtonRaw key={`raw-${key}`} buttons={prop} />
      ))}
    </div>
  );

  return (
    <Sider
      width={300}
      collapsedWidth={120}
      style={{
        position: "fixed",
        minHeight: "100vh",
      }}
    >
      <ButtonBar />
    </Sider>
  );
}

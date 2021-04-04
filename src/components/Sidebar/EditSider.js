import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/EditSiderStyle.js';

import {
  SmileTwoTone,
  SignalFilled,
  ProjectFilled,
  PieChartFilled,
  CheckSquareTwoTone,
  EditTwoTone,
  CheckCircleTwoTone,
  SaveFilled,
} from '@ant-design/icons';
import { Layout, Button } from 'antd';
const { Sider } = Layout;
const useStyles = makeStyles(styles);

export default function EditSider(props) {
  const classes = useStyles();
  const { questions, setQuestions } = props;
  const addNewOneQuestion = (qtype) => {
    let question = {
      qtitle: '',
      qtype: qtype,
      required: true,
      option_num: 1,
      options: {},
    };
    if (qtype === 0 || qtype === 1) {
      question.qtitle = '单选题';
      question.options.list = ['选项一'];
    } else if (qtype === 2) {
    } else if (qtype === 3) {
    } else if (qtype === 4) {
    }
    return () => {
      questions.push(question);
      setQuestions(questions.slice());
    };
  };
  const buttonMatrix = [
    [
      {
        icon: <CheckCircleTwoTone />,
        onClick: addNewOneQuestion(0),
        children: '单选题',
      },
      {
        icon: <CheckSquareTwoTone />,
        onClick: addNewOneQuestion(1),
        children: '多选题',
      },
    ],
    [
      {
        icon: <EditTwoTone />,
        onClick: addNewOneQuestion(2),
        children: '填空题',
      },
      {
        icon: <SmileTwoTone />,
        onClick: addNewOneQuestion(3),
        children: '评分题',
      },
    ],
    [
      {
        icon: <SignalFilled />,
        onClick: addNewOneQuestion(4),
        children: '级联题',
      },
      {
        icon: <ProjectFilled />,
        onClick: addNewOneQuestion(5),
        children: '下拉题',
      },
    ],
    [
      {
        icon: <PieChartFilled />,
        onClick: addNewOneQuestion(6),
        children: '比重题',
      },
      {
        icon: <SaveFilled />,
        onClick: addNewOneQuestion(7),
        children: '附件题',
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
    <Sider width={300} collapsedWidth={120}>
      <ButtonBar />
    </Sider>
  );
}

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

const buttonMatrix = [
  [
    {
      icon: <CheckCircleTwoTone />,
      onClick: () => console.log('btn'),
      children: '单选题',
    },
    {
      icon: <CheckSquareTwoTone />,
      onClick: () => console.log('btn'),
      children: '多选题',
    },
  ],
  [
    {
      icon: <EditTwoTone />,
      onClick: () => console.log('btn'),
      children: '填空题',
    },
    {
      icon: <SmileTwoTone />,
      onClick: () => console.log('btn'),
      children: '评分题',
    },
  ],
  [
    {
      icon: <SignalFilled />,
      onClick: () => console.log('btn'),
      children: '级联题',
    },
    {
      icon: <ProjectFilled />,
      onClick: () => console.log('btn'),
      children: '下拉题',
    },
  ],
  [
    {
      icon: <PieChartFilled />,
      onClick: () => console.log('btn'),
      children: '比重题',
    },
    {
      icon: <SaveFilled />,
      onClick: () => console.log('btn'),
      children: '附件题',
    },
  ],
];

export default function EditSider(props) {
  const classes = useStyles();
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

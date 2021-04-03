import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/EditContentStyle.js';

import {
  PoweroffOutlined,
  DeleteOutlined,
  PlusSquareFilled,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Radio,
  Input,
  Button,
  Checkbox,
  Col,
  Rate,
  Cascader,
  Slider,
  Upload,
} from 'antd';
const { Content } = Layout;
const { TextArea } = Input;
const useStyles = makeStyles(styles);

export default function EditContent(props) {
  console.log(props);
  const classes = useStyles();
  const { questionnaire, setQuestionnaire, questions, setQuestions } = props;

  const changeQuestionnaire = (prop) => {
    return (e) => {
      console.log(prop);
      console.log(e.target.value);
      questionnaire[prop] = e.target.value;
      setQuestionnaire(questionnaire);
    };
  };

  const DeleteSingleOptionButton = ({ questionIndex, optionIndex }) => {
    const deleteOneOption = () => {
      if (optionIndex <= 0) {
        return;
      }
      const question = questions[questionIndex];
      const optionNum = question['options']['list'].length - 1;
      question['options']['list'].splice(optionIndex, 1);
      question['option_num'] = optionNum;
      setQuestions(questions.slice());
    };
    return (
      <Button
        className={classes.optionDelete}
        shape="circle"
        size="small"
        icon={<DeleteOutlined />}
        onClick={deleteOneOption}
      />
    );
  };
  const SingleOption = ({ questionIndex, optionIndex, value }) => {
    return (
      <div className={classes.optionDiv}>
        <div style={{ display: 'flex', width: '50%' }}>
          <Radio className={classes.optionRadio} key="option" />
          <Input maxLength={50} placeholder="输入单个选项" />
        </div>
        <DeleteSingleOptionButton {...{ questionIndex, optionIndex }} />
      </div>
    );
  };
  const AddSingleOptionButton = ({ index }) => {
    const addNewOneOption = () => {
      const question = questions[index];
      const optionNum = question['options']['list'].length + 1;
      question['options']['list'].push(`选项${optionNum}`);
      question['option_num'] = optionNum;
      setQuestions(questions.slice());
    };
    return (
      <Button
        className={classes.newOptionAdd}
        type="primary"
        onClick={addNewOneOption}
      >
        <PlusSquareFilled />
        {'添加单个选项'}
      </Button>
    );
  };

  const SingleSelect = (props) => {
    console.log(props);
    return (
      <div>
        {props.options.list.map((prop, key) => {
          return (
            <SingleOption
              key={`options-${key}`}
              value={prop}
              questionIndex={props.index}
              optionIndex={key}
            />
          );
        })}
        {/* <SingleOption /> */}
        <AddSingleOptionButton index={props.index} />
      </div>
    );
  };
  const MultiSelect = (props) => {
    return (
      <div>
        <div className={classes.optionDiv}>
          <div style={{ display: 'flex', width: '50%' }}>
            <Checkbox className={classes.optionMulti} />
            <Input
              // style="margin-left: 5px"
              maxLength={50}
              autosize={{ minRows: 1, maxRows: 1 }}
              placeholder="输入单个选项"
            />
          </div>
          <DeleteSingleOptionButton {...props} />
        </div>
        <AddSingleOptionButton {...props} />
      </div>
    );
  };

  const Blank = () => {};
  const TrueOrFalse = () => {};
  const Cascade = () => {};

  const Question = ({ qtype, ...rest }) => {
    if (qtype === 0) {
      return <SingleSelect {...rest} />;
    } else if (qtype === 1) {
      return <MultiSelect {...rest} />;
    } else if (qtype === 2) {
      return <Blank {...rest} />;
    } else if (qtype === 3) {
      return <TrueOrFalse {...rest} />;
    } else if (qtype === 4) {
      return <Cascade {...rest} />;
    }
  };
  const QuestionnaireTitle = () => (
    <div className={classes.titleCard}>
      <input
        className={classes.titleText}
        placeholder="请输入"
        onChange={changeQuestionnaire('title')}
      />
      <TextArea
        className={classes.descriptionText}
        showCount
        maxLength={500}
        autoSize={{ minRows: 2, maxRows: 5 }}
        placeholder="请输入描述..."
        onChange={changeQuestionnaire('description')}
      />
    </div>
  );
  const QuestionCard = ({ required, ...rest }) => {
    const OperationBtns = () => {
      return (
        <div className={classes.operationBtns}>
          <Button
            disabled
            type="primary"
            size="small"
            icon={<PoweroffOutlined />}
            onClick={() => {
              console.log('operation-btns');
            }}
          ></Button>
          <Button
            danger
            size="small"
            icon={<PoweroffOutlined />}
            onClick={() => console.log('deleteQuestionCard')}
          />
        </div>
      );
    };
    return (
      <div className={classes.questionCard}>
        <div className={classes.questionTitle}>
          <span className={classes.questionSortNum}>{rest.index + 1}</span>
          <Input className={classes.questionTitleText} placeholder="请输入" />
          <OperationBtns />
        </div>
        <Question {...rest} />
      </div>
    );
  };
  return (
    <Content className={classes.content}>
      <QuestionnaireTitle />
      {questions.map((prop, key) => (
        <QuestionCard key={`question-${key}`} index={key} {...prop} />
      ))}
    </Content>
  );
}

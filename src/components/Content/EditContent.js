import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/components/EditContentStyle.js';

import {
  PoweroffOutlined,
  DeleteOutlined,
  PlusSquareFilled,
  DeleteFilled,
  HeartOutlined,
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
  // console.log(props);
  const classes = useStyles();
  const { questionnaire, setQuestionnaire, questions, setQuestions } = props;

  // 删除单个选项按钮
  const DeleteSingleOptionButton = ({ questionIndex, optionIndex }) => {
    const question = questions[questionIndex];
    // 删除选项点击事件
    const deleteOneOption = () => {
      if (question['options']['list'].length <= 1 || optionIndex < 0) {
        return;
      }
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

  // 单个选项
  const SingleOption = ({ questionIndex, optionIndex, value }) => {
    const question = questions[questionIndex];
    return (
      <div className={classes.optionDiv}>
        <div style={{ display: 'flex', width: '50%' }}>
          <Radio className={classes.optionRadio} key="option" />
          <Input
            maxLength={50}
            placeholder="输入单个选项"
            defaultValue={value}
            onChange={(e) =>
              (question['options']['list'][optionIndex] = e.target.value)
            }
            onBlur={() => setQuestions(questions.slice())}
          />
        </div>
        <DeleteSingleOptionButton {...{ questionIndex, optionIndex, value }} />
      </div>
    );
  };
  const MultiOption = ({ questionIndex, optionIndex, value }) => {
    const question = questions[questionIndex];
    return (
      <div className={classes.optionDiv}>
        <div style={{ display: 'flex', width: '50%' }}>
          <Checkbox className={classes.optionMulti} key="option" />
          <Input
            style={{ marginLeft: '5px' }}
            maxLength={50}
            placeholder="输入单个选项"
            defaultValue={value}
            onChange={(e) =>
              (question['options']['list'][optionIndex] = e.target.value)
            }
            onBlur={() => console.log('blur')}
          />
        </div>
        <DeleteSingleOptionButton {...{ questionIndex, optionIndex }} />
      </div>
    );
  };
  // 添加单个选项按钮
  const AddSingleOptionButton = ({ index }) => {
    // 添加选项点击事件
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

  // 具体问题
  const SingleSelect = (props) => {
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
        <AddSingleOptionButton index={props.index} />
      </div>
    );
  };
  const MultiSelect = (props) => {
    return (
      <div>
        {/* <div className={classes.optionDiv}>
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
        </div> */}
        {props.options.list.map((prop, key) => {
          return (
            <MultiOption
              key={`options-${key}`}
              value={prop}
              questionIndex={props.index}
              optionIndex={key}
            />
          );
        })}
        <AddSingleOptionButton index={props.index} />
      </div>
    );
  };

  const Blank = () => {};
  const TrueOrFalse = () => {};
  const Cascade = () => {};

  // 问题
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
  // 问题标题
  const QuestionnaireTitle = () => (
    <div className={classes.titleCard}>
      <Input
        className={classes.titleText}
        placeholder="请输入"
        defaultValue={questionnaire.title}
        onChange={(e) => (questionnaire.title = e.target.value)}
        onBlur={() => setQuestionnaire(questionnaire)}
      />
      <TextArea
        className={classes.descriptionText}
        defaultValue={questionnaire.description}
        showCount
        maxLength={500}
        autoSize={{ minRows: 2, maxRows: 5 }}
        placeholder="请输入描述..."
        onChange={(e) => (questionnaire.description = e.target.value)}
        onBlur={() => setQuestionnaire(questionnaire)}
      />
    </div>
  );
  // 问题卡片
  const QuestionCard = ({ required, qtitle, ...rest }) => {
    const index = rest.index;
    const changeQuestionTitle = (e) => {
      questions[index].qtitle = e.target.value;
    };
    const blurQuestionTitle = () => {
      setQuestions(questions.slice());
    };
    const requireQuestion = () => {
      questions[index].required = !questions[index].required;
      setQuestions(questions.slice());
    };
    const moveQuestionCard = (offset) => {
      const swapIndex = index + offset;
      return () => {
        const now = questions[index];
        const swap = questions[swapIndex];
        questions[index] = swap;
        questions[swapIndex] = now;
        setQuestions(questions.slice());
      };
    };

    const deleteQuestion = () => {
      questions.splice(index, 1);
      setQuestions(questions.slice());
    };
    const OperationBtns = () => {
      return (
        <div className={classes.operationBtns}>
          <Button
            danger={required}
            size="small"
            icon={<HeartOutlined twoToneColor="#eb2f96" />}
            onClick={requireQuestion}
          />
          <Button
            disabled={index === 0}
            type="primary"
            size="small"
            icon={<PoweroffOutlined />}
            onClick={moveQuestionCard(-1)}
          />
          <Button
            disabled={index === questions.length - 1}
            type="primary"
            size="small"
            icon={<PoweroffOutlined />}
            onClick={moveQuestionCard(1)}
          />
          <Button
            danger
            size="small"
            icon={<DeleteFilled twoToneColor="#eb2f96" />}
            onClick={deleteQuestion}
          />
        </div>
      );
    };
    return (
      <div className={classes.questionCard}>
        <div className={classes.questionTitle}>
          <span className={classes.questionSortNum}>{required ? '*' : ''}</span>
          <span className={classes.questionSortNum}>{rest.index + 1}</span>
          <Input
            className={classes.questionTitleText}
            placeholder="请输入"
            defaultValue={qtitle}
            onChange={changeQuestionTitle}
            onBlur={blurQuestionTitle}
          />
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

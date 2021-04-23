import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/EditContentStyle.js";

import {
  PoweroffOutlined,
  DeleteOutlined,
  PlusSquareFilled,
  DeleteFilled,
  HeartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Radio,
  Input,
  Button,
  Checkbox,
  Rate,
  Cascader,
  Slider,
  InputNumber,
} from "antd";
const { Content } = Layout;
const { TextArea } = Input;
const useStyles = makeStyles(styles);

export default function EditContent(props) {
  const classes = useStyles();
  const {
    scoring,
    questionnaire,
    setQuestionnaire,
    questions,
    setQuestions,
  } = props;

  // 删除单个选项按钮
  const DeleteSingleOptionButton = ({ questionIndex, optionIndex }) => {
    const question = questions[questionIndex];
    // 删除选项点击事件
    const deleteOneOption = () => {
      if (question["options"].length <= 1 || optionIndex < 0) {
        return;
      }
      const optionNum = question["options"].length - 1;
      question["options"].splice(optionIndex, 1);
      question["option_num"] = optionNum;
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
        <div style={{ display: "flex", width: "50%" }}>
          <Radio className={classes.optionRadio} key="option" />
          <Input
            maxLength={50}
            placeholder="输入单个选项"
            defaultValue={value.text}
            onChange={(e) =>
              (question["options"][optionIndex].text = e.target.value)
            }
            onBlur={() => setQuestions(questions.slice())}
          />
          <InputNumber
            style={{
              display: scoring ? "inline" : "none",
            }}
            min={0}
            max={100}
            onChange={(value) =>
              (question["options"][optionIndex].score = value)
            }
            onBlur={() => setQuestions(questions.slice())}
            defaultValue={value.score}
          />
        </div>
        <DeleteSingleOptionButton {...{ questionIndex, optionIndex }} />
      </div>
    );
  };
  const MultiOption = ({ questionIndex, optionIndex, value }) => {
    const question = questions[questionIndex];
    return (
      <div className={classes.optionDiv}>
        <div style={{ display: "flex", width: "50%" }}>
          <Checkbox className={classes.optionMulti} key="option" />
          <Input
            style={{ marginLeft: "5px" }}
            maxLength={50}
            placeholder="输入单个选项"
            defaultValue={value.text}
            onChange={(e) =>
              (question["options"][optionIndex].text = e.target.value)
            }
            onBlur={() => setQuestions(questions.slice())}
          />
          <InputNumber
            style={{
              display: scoring ? "inline" : "none",
            }}
            min={0}
            max={100}
            onChange={(value) =>
              (question["options"][optionIndex].score = value)
            }
            onBlur={() => setQuestions(questions.slice())}
            defaultValue={value.score}
          />
        </div>
        <DeleteSingleOptionButton {...{ questionIndex, optionIndex }} />
      </div>
    );
  };
  const DropdownOption = ({ questionIndex, optionIndex, raw }) => {
    const question = questions[questionIndex];
    return (
      <div className={classes.optionDiv}>
        <Input
          style={{ width: "44%", marginLeft: "6%" }}
          maxLength={50}
          placeholder="输入单个选项"
          defaultValue={raw.label}
          prefix={<DownOutlined />}
          onChange={(e) =>
            (question["options"][optionIndex].label = e.target.value)
          }
          onBlur={() => setQuestions(questions.slice())}
        />
        <InputNumber
          style={{
            display: scoring ? "inline" : "none",
          }}
          min={0}
          max={100}
          onChange={(value) => (question["options"][optionIndex].score = value)}
          onBlur={() => setQuestions(questions.slice())}
          defaultValue={raw.score}
        />
        <DeleteSingleOptionButton {...{ questionIndex, optionIndex }} />
      </div>
    );
  };
  const WeightOption = ({ questionIndex, optionIndex, value }) => {
    const question = questions[questionIndex];
    return (
      <div className={classes.weightDiv}>
        <div className={classes.optionDiv}>
          <Input
            style={{ width: "44%", marginLeft: "6%" }}
            maxLength={50}
            placeholder="请输入权重描述"
            defaultValue={value}
            onChange={(e) =>
              (question["options"][optionIndex] = e.target.value)
            }
            onBlur={() => setQuestions(questions.slice())}
          />
          <DeleteSingleOptionButton {...{ questionIndex, optionIndex }} />
        </div>
        <Slider className={classes.slider} />
      </div>
    );
  };
  // 添加单个选项按钮
  const AddSingleOptionButton = ({ index }) => {
    // 添加选项点击事件
    const addNewOneOption = () => {
      const question = questions[index];
      const optionNum = question["options"].length + 1;
      question["options"].push({ text: `选项${optionNum}`, score: 0 });
      question["option_num"] = optionNum;
      setQuestions(questions.slice());
    };
    return (
      <Button
        className={classes.newOptionAdd}
        type="primary"
        onClick={addNewOneOption}
      >
        <PlusSquareFilled />
        {"添加单个选项"}
      </Button>
    );
  };

  // 添加下拉选项按钮
  const AddDropDownOptionButton = ({ index }) => {
    // 添加选项点击事件
    const addNewOneOption = () => {
      const question = questions[index];
      const optionNum = question["options"].length;
      question["options"].push({
        value: optionNum,
        label: `选项${optionNum + 1}`,
        score: 0,
      });
      question["option_num"] = optionNum + 1;
      setQuestions(questions.slice());
    };
    return (
      <Button
        className={classes.newOptionAdd}
        type="primary"
        onClick={addNewOneOption}
      >
        <PlusSquareFilled />
        {"添加单个选项"}
      </Button>
    );
  };

  // 添加单个选项按钮
  const AddWeightOptionButton = ({ index }) => {
    // 添加选项点击事件
    const addNewOneOption = () => {
      const question = questions[index];
      const optionNum = question["options"].length + 1;
      question["options"].push(`选项${optionNum}`);
      question["option_num"] = optionNum;
      setQuestions(questions.slice());
    };
    return (
      <Button
        className={classes.newOptionAdd}
        type="primary"
        onClick={addNewOneOption}
      >
        <PlusSquareFilled />
        {"添加单个选项"}
      </Button>
    );
  };

  // 具体问题
  const SingleSelect = (props) => {
    return (
      <div>
        {props.options.map((prop, key) => {
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
        {props.options.map((prop, key) => {
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

  const Blank = (props) => {
    return (
      <TextArea
        className={classes.blankText}
        showCount
        autosize={{ minRows: 6, maxRows: 10 }}
        maxLength={500}
        placeholder="输入文字"
      />
    );
  };
  const Rates = (props) => {
    const toolTips = ["很差", "较差", "中等", "较好", "完美"];
    const [value, setValue] = useState(3);
    return (
      <span>
        <Rate
          tooltips={toolTips}
          value={value}
          style={{ marginLeft: "5%", marginTop: "20px" }}
          onChange={(value) => setValue(value)}
        />
        {value ? (
          <span className="ant-rate-text">{toolTips[value - 1]}</span>
        ) : (
          ""
        )}
      </span>
    );
  };
  const Cascade = (props) => {
    return (
      <Cascader
        data="question['data']"
        style={{ marginTop: "10px", marginLeft: "5%", width: "77%" }}
      />
    );
  };
  const DropdownSelect = (props) => {
    return (
      <div>
        {props.options.map((prop, key) => {
          return (
            <DropdownOption
              key={`options-${key}`}
              raw={prop}
              questionIndex={props.index}
              optionIndex={key}
            />
          );
        })}
        <AddDropDownOptionButton index={props.index} />
      </div>
    );
  };
  const WeightsAssign = (props) => {
    return (
      <div>
        <span
          style={{
            display: scoring ? "inline-block" : "none",
            marginTop: "10px",
            marginLeft: "5%",
          }}
        >
          {"比重总分"}
          <InputNumber
            min={0}
            max={100}
            onChange={(value) => (questions[props.index].score = value)}
            onBlur={() => setQuestions(questions.slice())}
            defaultValue={questions[props.index].score}
          />
        </span>
        {props.options.map((prop, key) => {
          return (
            <WeightOption
              key={`options-${key}`}
              value={prop}
              questionIndex={props.index}
              optionIndex={key}
            />
          );
        })}
        <AddWeightOptionButton index={props.index} />
      </div>
    );
  };

  const UploadFile = (props) => {
    return <div></div>;
  };
  // 问题
  const Question = ({ qtype, ...rest }) => {
    if (qtype === 0) {
      return <SingleSelect {...rest} />;
    } else if (qtype === 1) {
      return <MultiSelect {...rest} />;
    } else if (qtype === 2) {
      return <Blank {...rest} />;
    } else if (qtype === 3) {
      return <Rates {...rest} />;
    } else if (qtype === 4) {
      return <Cascade {...rest} />;
    } else if (qtype === 5) {
      return <DropdownSelect {...rest} />;
    } else if (qtype === 6) {
      return <WeightsAssign {...rest} />;
    } else if (qtype === 7) {
      return <UploadFile {...rest} />;
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
          <span className={classes.questionSortNum}>{required ? "*" : ""}</span>
          <span className={classes.questionSortNum}>{rest.index + 1}</span>
          <Input
            className={classes.questionTitleText}
            placeholder="请输入"
            defaultValue={qtitle}
            onChange={(e) => (questions[index].qtitle = e.target.value)}
            onBlur={() => setQuestions(questions.slice())}
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

import React from "react";
import * as R from "ramda";
import classNames from "classnames";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";
import {
  styles,
  defaultColor,
  planningColor,
  attentionColor,
  simultaneousColor,
  successiveColor,
} from "assets/jss/material-dashboard-react/components/editContentStyle.js";

import {
  DeleteOutlined,
  PlusSquareFilled,
  DeleteFilled,
  HeartOutlined,
  DownOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Radio,
  Input,
  Button,
  Checkbox,
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
    scoringModeOpen,
    questionnaire,
    setQuestionnaire,
    questions,
    setQuestions,
  } = props;
  const colorList = [
    defaultColor,
    planningColor,
    attentionColor,
    simultaneousColor,
    successiveColor,
  ];
  const hoverList = [
    classes.defaultHover,
    classes.planningHover,
    classes.attentionHover,
    classes.simultaneousHover,
    classes.successiveHover,
  ];
  const updateQuestionnaire = () => setQuestionnaire(questionnaire);
  const updateQuestions = () => setQuestions(questions.slice());

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
    };
    return (
      <Button
        className={classes.optionDelete}
        shape="circle"
        size="small"
        icon={<DeleteOutlined />}
        onClick={R.compose(updateQuestions, deleteOneOption)}
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
            className={hoverList[questions[questionIndex].pass || 0]}
            defaultValue={value.text}
            onChange={(e) =>
              (question["options"][optionIndex].text = e.target.value)
            }
            onBlur={updateQuestions}
          />
          <InputNumber
            style={{
              display: scoringModeOpen ? "inline" : "none",
            }}
            className={hoverList[questions[questionIndex].pass || 0]}
            min={0}
            max={100}
            onChange={(value) =>
              (question["options"][optionIndex].score = value)
            }
            onBlur={updateQuestions}
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
            className={hoverList[questions[questionIndex].pass || 0]}
            defaultValue={value.text}
            onChange={(e) =>
              (question["options"][optionIndex].text = e.target.value)
            }
            onBlur={updateQuestions}
          />
          <InputNumber
            className={hoverList[questions[questionIndex].pass || 0]}
            style={{
              display: scoringModeOpen ? "inline" : "none",
            }}
            min={0}
            max={100}
            onChange={(value) =>
              (question["options"][optionIndex].score = value)
            }
            onBlur={updateQuestions}
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
        <div style={{ display: "flex", width: "50%" }}>
          <Input
            style={{ marginLeft: "14%" }}
            maxLength={50}
            placeholder="输入单个选项"
            className={hoverList[questions[questionIndex].pass || 0]}
            defaultValue={raw.label}
            prefix={<DownOutlined />}
            onChange={(e) =>
              (question["options"][optionIndex].label = e.target.value)
            }
            onBlur={updateQuestions}
          />
          <InputNumber
            style={{
              display: scoringModeOpen ? "inline" : "none",
            }}
            className={hoverList[questions[questionIndex].pass || 0]}
            min={0}
            max={100}
            onChange={(value) =>
              (question["options"][optionIndex].score = value)
            }
            onBlur={updateQuestions}
            defaultValue={raw.score}
          />
        </div>
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
            className={hoverList[questions[questionIndex].pass || 0]}
            style={{ width: "44%", marginLeft: "6%" }}
            maxLength={50}
            placeholder="请输入权重描述"
            defaultValue={value}
            onChange={(e) =>
              (question["options"][optionIndex] = e.target.value)
            }
            onBlur={updateQuestions}
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
    };
    return (
      <Button
        className={classes.newOptionAdd}
        style={{
          backgroundColor: colorList[questions[index].pass || 0],
          borderColor: colorList[questions[index].pass || 0],
        }}
        type="primary"
        onClick={R.compose(updateQuestions, addNewOneOption)}
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
    };
    return (
      <Button
        className={classes.newOptionAdd}
        style={{
          backgroundColor: colorList[questions[index].pass || 0],
          borderColor: colorList[questions[index].pass || 0],
        }}
        type="primary"
        onClick={R.compose(updateQuestions, addNewOneOption)}
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
      question["options"].push({ text: `选项${optionNum}`, score: 0 });
      question["option_num"] = optionNum;
    };
    return (
      <Button
        className={classes.newOptionAdd}
        style={{
          backgroundColor: colorList[questions[index].pass || 0],
          borderColor: colorList[questions[index].pass || 0],
        }}
        type="primary"
        onClick={R.compose(updateQuestions, addNewOneOption)}
      >
        <PlusSquareFilled />
        {"添加单个选项"}
      </Button>
    );
  };

  // 具体问题
  const SingleSelect = ({ index, ...rest }) => {
    return (
      <div>
        {rest.options.map((prop, key) => {
          return (
            <SingleOption
              key={`options-${key}`}
              value={prop}
              questionIndex={index}
              optionIndex={key}
            />
          );
        })}
        <AddSingleOptionButton index={index} />
      </div>
    );
  };
  const MultiSelect = ({ index, ...rest }) => {
    return (
      <div>
        {rest.options.map((prop, key) => {
          return (
            <MultiOption
              key={`options-${key}`}
              value={prop}
              questionIndex={index}
              optionIndex={key}
            />
          );
        })}
        <AddSingleOptionButton index={index} />
      </div>
    );
  };

  const Blank = ({ index }) => {
    return (
      <TextArea
        className={classNames({
          [classes.blankText]: true,
          [hoverList[questions[index].pass || 0]]: true,
        })}
        showCount
        autosize={{ minRows: 6, maxRows: 10 }}
        maxLength={500}
        placeholder="输入文字"
      />
    );
  };
  const Rates = ({ index, ...rest }) => {
    const toolTips = ["很差", "较差", "中等", "较好", "完美"];
    const question = questions[index];
    if (question.options.length === 0) {
      toolTips.map((prop, index) =>
        question.options.push({ text: prop, score: 0 })
      );
    }
    return (
      <div style={{ display: "flex", marginLeft: "50px" }}>
        {toolTips.map((prop, index) => {
          return (
            <div
              key={`input-div-${index}`}
              style={{ height: "70px", width: "300px", display: "flex" }}
            >
              <h4 style={{ marginTop: "22px" }}>{prop}</h4>
              <InputNumber
                key={`input-${index}`}
                style={{
                  display: scoringModeOpen ? "inline" : "none",
                  marginTop: "20px",
                  marginLeft: "5px",
                  height: "30px",
                  width: "50px",
                }}
                className={hoverList[question.pass || 0]}
                min={0}
                max={100}
                onChange={(value) => (question.options[index].score = value)}
                onBlur={updateQuestions}
                defaultValue={question.options[index].score}
              />
            </div>
          );
        })}
      </div>
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
  const DropdownSelect = ({ index, ...rest }) => {
    return (
      <div>
        {rest.options.map((prop, key) => {
          return (
            <DropdownOption
              key={`options-${key}`}
              raw={prop}
              questionIndex={index}
              optionIndex={key}
            />
          );
        })}
        <AddDropDownOptionButton index={index} />
      </div>
    );
  };
  const WeightsAssign = ({ index, ...rest }) => {
    return (
      <div>
        <span
          style={{
            display: scoringModeOpen ? "inline-block" : "none",
            marginTop: "10px",
            marginLeft: "5%",
          }}
        >
          {"比重总分"}
          <InputNumber
            className={hoverList[questions[index].pass || 0]}
            min={0}
            max={100}
            onChange={(value) => (questions[index].sum_score = value)}
            onBlur={() => setQuestions(questions.slice())}
            defaultValue={questions[index].sum_score}
          />
        </span>
        {rest.options.map((prop, key) => {
          return (
            <WeightOption
              key={`options-${key}`}
              value={prop.text}
              questionIndex={index}
              optionIndex={key}
            />
          );
        })}
        <AddWeightOptionButton index={index} />
      </div>
    );
  };

  const UploadFile = (props) => {
    return <div></div>;
  };
  // 问题
  const Question = ({ qtype, ...rest }) => {
    if (qtype === 0 || qtype === 8) {
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
        onBlur={updateQuestionnaire}
      />
      <TextArea
        className={classes.descriptionText}
        defaultValue={questionnaire.description}
        showCount
        maxLength={500}
        autoSize={{ minRows: 2, maxRows: 5 }}
        placeholder="请输入描述..."
        onChange={(e) => (questionnaire.description = e.target.value)}
        onBlur={updateQuestionnaire}
      />
    </div>
  );
  // 问题卡片
  const QuestionCard = ({ required, qtitle, ...rest }) => {
    const index = rest.index;
    const requireQuestion = () =>
      (questions[index].required = !questions[index].required);
    const moveQuestionCard = (offset) => {
      const swapIndex = index + offset;
      return R.compose(updateQuestions, () => {
        const now = questions[index];
        questions[index] = questions[swapIndex];
        questions[swapIndex] = now;
      });
    };
    const deleteQuestion = () => questions.splice(index, 1);
    const OperationBtns = () => {
      return (
        <div className={classes.operationBtns}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">PASS</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={questions[index].pass || 0}
              onChange={R.compose(
                updateQuestions,
                (e) => (questions[index].pass = e.target.value)
              )}
              label="PASS"
            >
              <MenuItem value={0}>
                <em>无</em>
              </MenuItem>
              <MenuItem value={1}>
                <div style={{ color: planningColor }}>{"计划"}</div>
              </MenuItem>
              <MenuItem value={2}>
                <div style={{ color: attentionColor }}>{"注意"}</div>
              </MenuItem>
              <MenuItem value={3}>
                <div style={{ color: simultaneousColor }}>{"同时性加工"}</div>
              </MenuItem>
              <MenuItem value={4}>
                <div style={{ color: successiveColor }}>{"继时性加工"}</div>
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            style={{ marginTop: 20 }}
            danger={required}
            size="middle"
            icon={<HeartOutlined twoToneColor="#eb2f96" />}
            onClick={R.compose(updateQuestions, requireQuestion)}
          />
          <Button
            disabled={index === 0}
            type="primary"
            size="middle"
            icon={<CaretUpOutlined />}
            onClick={moveQuestionCard(-1)}
          />
          <Button
            disabled={index === questions.length - 1}
            type="primary"
            size="middle"
            icon={<CaretDownOutlined />}
            onClick={moveQuestionCard(1)}
          />
          <Button
            danger
            size="middle"
            icon={<DeleteFilled twoToneColor="#eb2f96" />}
            onClick={R.compose(updateQuestions, deleteQuestion)}
          />
        </div>
      );
    };
    return (
      <div
        className={classNames({
          [classes.questionCard]: true,
          [hoverList[questions[index].pass || 0]]: true,
        })}
      >
        <div className={classes.questionTitle}>
          <span className={classes.questionSortNum}>{required ? "*" : ""}</span>
          <span className={classes.questionSortNum}>{rest.index + 1}</span>
          <Input
            className={classNames({
              [classes.questionTitleText]: true,
              [hoverList[questions[index].pass || 0]]: true,
            })}
            placeholder="请输入"
            defaultValue={qtitle}
            onChange={(e) => (questions[index].qtitle = e.target.value)}
            onBlur={updateQuestions}
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

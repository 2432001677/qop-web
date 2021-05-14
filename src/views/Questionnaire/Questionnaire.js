import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "components/Navbars/Navbar.js";
import {
  getQuestionnaireByQid,
  submitAnswer,
  submitGroupAnswer,
  getGroupQuestionnaireByQid,
} from "Api/Api.js";
import routes from "routes.js";
import * as R from "ramda";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from "assets/jss/material-dashboard-react/components/questionnaireStyle.js";

import { makeStyles } from "@material-ui/core/styles";

import {
  Input,
  Radio,
  Button,
  Checkbox,
  Rate,
  Cascader,
  Slider,
  Upload,
  Col,
  Space,
  Row,
  InputNumber,
} from "antd";

let ps;
const useStyles = makeStyles(styles);
export default function Questionnaire(props) {
  const { qid, gid } = props.match.params;
  const history = useHistory();
  const classes = useStyles();
  const mainPanel = useRef();
  const [scoringModeOpen, setScoringModeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [answers, setAnswers] = useState({
    questionnaire_id: "",
    title: "",
    description: "",
    scoring_mode: false,
    answered_questions: [],
  });

  const updateAnswers = () => setAnswers({ ...answers });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    if (
      navigator.platform.indexOf("Win") > -1 ||
      navigator.platform.indexOf("Linux") > -1
    ) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    return () => {
      if (
        navigator.platform.indexOf("Win") > -1 ||
        navigator.platform.indexOf("Linux") > -1
      ) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  useEffect(() => {
    const getQuestionnaire = async () => {
      try {
        let questionnaire;
        if (gid) {
          const { data } = await getGroupQuestionnaireByQid(gid, qid);
          questionnaire = data;
        } else {
          const { data } = await getQuestionnaireByQid(qid);
          questionnaire = data;
        }

        setScoringModeOpen(questionnaire.scoring_mode);
        answers.questionnaire_id = questionnaire.id;
        answers.title = questionnaire.title;
        answers.description = questionnaire.description;
        answers.answered_questions = questionnaire.questions;
        setAnswers({ ...answers });
      } catch (error) {
        console.log(error);
      }
    };
    getQuestionnaire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAnswers = async () => {
    answers.answered_questions.forEach((question) => console.log(question));
    try {
      let res;
      if (gid) {
        const { data } = await submitGroupAnswer(gid, answers);
        res = data;
      } else {
        const { data } = await submitAnswer(answers);
        res = data;
      }
      history.push("/result");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // 具体问题
  const SingleSelect = ({ index, ...rest }) => {
    const question = answers.answered_questions[index];
    question.index = index;
    const changeOption = (e) => {
      const optionIndex = e.target.value;
      question.answer = [optionIndex];
      if (scoringModeOpen) {
        question.score = question.options[optionIndex].score;
      }
    };
    return (
      <Radio.Group
        style={{ width: "100%" }}
        onChange={R.compose(updateAnswers, changeOption)}
        value={question.answer ? question.answer[0] : ""}
      >
        <div>
          {rest.options.map((prop, key) => {
            return (
              <Radio
                className={classes.option}
                key={`option-${key}`}
                value={key}
              >
                {prop.text}
              </Radio>
            );
          })}
        </div>
      </Radio.Group>
    );
  };
  const MultiSelect = ({ index, ...rest }) => {
    const question = answers.answered_questions[index];
    question.index = index;
    const changeOption = (optionIndex) => {
      question.answer = optionIndex;
      question.score = 0;
      optionIndex.forEach((i) => (question.score += question.options[i].score));
    };
    return (
      <Checkbox.Group
        style={{ marginLeft: "22px" }}
        onChange={R.compose(updateAnswers, changeOption)}
        value={question.answer}
      >
        {rest.options.map((prop, key) => {
          return (
            <div key={`option-${key}`}>
              <Checkbox key={`option-${key}`} value={key}>
                {prop.text}
              </Checkbox>
              <br />
            </div>
          );
        })}
      </Checkbox.Group>
    );
  };

  const Blank = ({ index }) => {
    const question = answers.answered_questions[index];
    question.index = index;
    question.score = 0;
    return (
      <Input.TextArea
        showCount
        style={{ marginLeft: "24px" }}
        maxLength={500}
        autosize={{ minRows: 6, maxRows: 10 }}
        placeholder="输入文字"
        onChange={(e) => (question.content = e.target.value)}
        onBlur={updateAnswers}
        defaultValue={question.content}
      />
    );
  };
  const Rates = ({ index, ...rest }) => {
    const question = answers.answered_questions[index];
    question.index = index;
    let toolTips = question.options.map((prop, index) => prop.text);
    const changeRate = (value) => {
      question.score = question.options[value - 1].score;
      question.answer = [value - 1];
    };
    return (
      <div>
        <Rate
          tooltips={toolTips}
          value={question.answer ? question.answer[0] + 1 : 0}
          onChange={R.compose(updateAnswers, changeRate)}
        />{" "}
        {question.answer ? (
          <span className="ant-rate-text">
            {toolTips[question.answer[0] + 1]}
          </span>
        ) : (
          ""
        )}
      </div>
    );
  };
  const Cascade = (props) => {
    return (
      <Cascader
        data="question['data']"
        style={{
          marginTop: "10px",
          marginLeft: "25px",
          width: "40%",
        }}
      />
    );
  };

  // value可能会重复问题
  const DropdownSelect = ({ index }) => {
    const question = answers.answered_questions[index];
    question.index = index;
    const changeValue = (optionIndex) => {
      question.answer = optionIndex;
      if (scoringModeOpen) {
        question.score = question.options[optionIndex].score;
      }
    };
    return (
      <div style={{ marginLeft: "24px" }}>
        <Cascader
          width="500px"
          options={question.options}
          onChange={R.compose(updateAnswers, changeValue)}
          value={question.answer ? question.answer : []}
        />
      </div>
    );
  };
  const WeightsAssign = ({ index, ...rest }) => {
    const question = answers.answered_questions[index];
    question.index = index;
    if (!question.answer) {
      question.answer = question.options.map(() => {
        return { weight: 0, score: 0 };
      });
    }
    const changeWeight = (index) => {
      return (value) => {
        question.answer[index] = {
          weight: value,
          score: (value * question.sum_score) / 100,
        };
      };
    };

    const clickStep = (index) => {
      return R.compose(
        updateAnswers,
        (value) => (question.answer[index] = value)
      );
    };

    return (
      <div>
        <span
          style={{
            display: "inline-block",
            marginTop: "10px",
            marginLeft: "3%",
          }}
        >
          {`最大比重总和：100%`}
        </span>
        <div className={classes.weightDiv}>
          {rest.options.map((prop, key) => {
            return (
              <div
                key={`weight-${key}`}
                style={{ width: "80%", marginLeft: "3%" }}
              >
                <span>{prop.text}</span>
                <Row>
                  <Col span={15}>
                    <Slider
                      value={question.answer[key].weight}
                      onChange={changeWeight(key)}
                      onAfterChange={updateAnswers}
                    />
                  </Col>
                  <Col span={1}>
                    <InputNumber
                      min={0}
                      max={100}
                      style={{ margin: "0 36px" }}
                      value={question.answer[key].weight}
                      onChange={changeWeight(key)}
                      onBlur={updateAnswers}
                      onStep={clickStep(key)}
                    />
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const UploadFile = (props) => {
    return (
      <div style={{ width: "100%", marginTop: "10px" }}>
        <Upload
          multiple
          type="drag"
          v-model="question['selected']"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <div style={{ padding: "20px 0" }}>
            {/* <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" /> */}
            <p>选择文件(30M以内)</p>
          </div>
        </Upload>
      </div>
    );
  };

  const SimpleTitleBar = ({ index, required, qtitle }) => {
    return (
      <div className={classes.questionTitle}>
        <span style={{ color: "red" }}>{required ? "*" : ""}</span>
        <span style={{ marginLeft: required ? "5px" : "16px" }}>{`${
          index + 1
        }.`}</span>
        <span>{qtitle}</span>
      </div>
    );
  };

  const AudioTitleBar = ({ index, required, qtitle }) => {
    return (
      <div className={classes.questionTitle}>
        <span style={{ color: "red" }}>{required ? "*" : ""}</span>
        <span style={{ marginLeft: required ? "5px" : "16px" }}>{`${
          index + 1
        }.`}</span>
        <span>{qtitle}</span>
      </div>
    );
  };

  const QuestionTitleBar = ({ qtype, ...rest }) => {
    switch (qtype) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return <SimpleTitleBar {...rest} />;
      case 8:
        return <AudioTitleBar {...rest} />;
      default:
        break;
    }
  };

  // 问题选项
  const QuestionOption = ({ qtype, ...rest }) => {
    switch (qtype) {
      case 0:
      case 8:
        return <SingleSelect {...rest} />;
      case 1:
        return <MultiSelect {...rest} />;
      case 2:
        return <Blank {...rest} />;
      case 3:
        return <Rates {...rest} />;
      case 4:
        return <Cascade {...rest} />;
      case 5:
        return <DropdownSelect {...rest} />;
      case 6:
        return <WeightsAssign {...rest} />;
      case 7:
        return <UploadFile {...rest} />;
      default:
        break;
    }
  };

  // 问题
  const Question = (props) => {
    return (
      <Space direction="vertical" style={{ width: "680px" }}>
        <QuestionTitleBar {...props} />
        <div>
          <QuestionOption {...props} />
          <div
            style={{
              borderTop: "#eaeaea 2px solid",
              marginTop: "20px",
            }}
          >
            <div style={{ display: "none", color: "red" }}>请完成该问题</div>
          </div>
        </div>
      </Space>
    );
  };

  const Panel = () => {
    return (
      <div className={classes.questionnairePreview}>
        <div className={classes.questionnaireView} ref={mainPanel}>
          <h1 style={{ textAlign: "center" }}>{answers.title}</h1>
          <h3>{answers.description}</h3>
          <div
            style={{
              background: "#1890ff",
              height: "3px",
              marginBottom: "10px",
            }}
          />
          {answers.answered_questions.map((prop, key) => {
            return (
              <div key={`question-${key}`} style={{ marginBottom: "30px" }}>
                <Question index={key} {...prop} />
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderBottom: "#cac6c6 2px solid",
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{ margin: "40px auto" }}
            onClick={submitAnswers}
            loading={false}
          >
            提交
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.mainPanel} ref={mainPanel}>
      <Navbar routes={routes} handleDrawerToggle={handleDrawerToggle} />
      <Panel />
    </div>
  );
}

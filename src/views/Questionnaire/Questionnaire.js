import React, { useEffect, useState, useRef } from "react";
import { get, post } from "Utils/Axios.js";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from "assets/jss/material-dashboard-react/components/QuestionnaireStyle.js";

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
  const id = props.match.params.id;
  const classes = useStyles();
  const mainPanel = useRef();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [answers, setAnswers] = useState({
    questionnaire_id: "",
    title: "",
    description: "",
    answered_questions: [],
  });

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
    return function cleanup() {
      if (
        navigator.platform.indexOf("Win") > -1 ||
        navigator.platform.indexOf("Linux") > -1
      ) {
        ps.destroy();
      }
    };
  }, [mainPanel]);

  useEffect(() => {
    const getQuestionnaireById = async () => {
      try {
        const { data } = await get(
          "/questionnaire/questionnaire/" + id,
          false,
          true
        );
        const questionnaire = data.data;
        answers.questionnaire_id = questionnaire.id;
        answers.title = questionnaire.title;
        answers.description = questionnaire.description;
        answers.answered_questions = questionnaire.questions;
        setAnswers({ ...answers });
      } catch (error) {
        console.log(error);
      }
    };
    getQuestionnaireById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAnswers = async () => {
    answers.answered_questions.forEach((question) => console.log(question));
    try {
      const { data } = await post(
        "/questionnaire/answer",
        answers,
        false,
        true
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 具体问题
  const SingleSelect = ({ index, ...rest }) => {
    const question = answers.answered_questions[index];
    const changeOption = (e) => {
      question.selected = [e.target.value];
      setAnswers({ ...answers });
    };
    return (
      <Radio.Group
        style={{ width: "100%" }}
        onChange={changeOption}
        value={question.selected ? question.selected[0] : ""}
      >
        <div>
          {rest.options.map((prop, key) => {
            return (
              <Radio
                className={classes.option}
                key={`option-${key}`}
                value={key}
              >
                {prop}
              </Radio>
            );
          })}
        </div>
      </Radio.Group>
    );
  };
  const MultiSelect = ({ index, ...rest }) => {
    const question = answers.answered_questions[index];
    const changeOption = (e) => {
      question.selected = e;
      setAnswers({ ...answers });
    };
    return (
      <Checkbox.Group
        style={{ marginLeft: "22px" }}
        onChange={changeOption}
        value={question.selected}
      >
        {rest.options.map((prop, key) => {
          return (
            <div key={`option-${key}`}>
              <Checkbox key={`option-${key}`} value={prop}>
                {prop}
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
    return (
      <Input.TextArea
        showCount
        style={{ marginLeft: "24px" }}
        maxLength={500}
        autosize={{ minRows: 6, maxRows: 10 }}
        placeholder="输入文字"
        onChange={(e) => (question.content = e.target.value)}
        onBlur={() => {
          setAnswers({ ...answers });
        }}
        value={question.content}
      />
    );
  };
  const Rates = ({ index, ...rest }) => {
    const question = answers.answered_questions[index];
    const toolTips = ["很差", "较差", "中等", "较好", "完美"];
    const changeRate = (value) => {
      question.selected = [value];
      setAnswers({ ...answers });
    };
    return (
      <div>
        <Rate
          tooltips={toolTips}
          value={question.selected ? question.selected[0] : 0}
          onChange={changeRate}
        />{" "}
        {question.selected ? (
          <span className="ant-rate-text">
            {toolTips[question.selected[0] - 1]}
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
    const changeValue = (index) => {
      question.selected = [index];
      setAnswers({ ...answers });
    };
    return (
      <div style={{ marginLeft: "24px" }}>
        <Cascader
          width="500px"
          options={question.options}
          onChange={changeValue}
          value={question.selected ? question.selected[0] : ""}
        />
      </div>
    );
  };
  const WeightsAssign = ({ index, ...rest }) => {
    const question = answers.answered_questions[index];
    if (!question.selected) {
      question.selected = question.options.map(() => 0);
    }
    const changeWeight = (index) => {
      return (value) => {
        question.selected[index] = value;
      };
    };

    const clickStep = (index) => {
      return (value) => {
        question.selected[index] = value;
        setAnswers({ ...answers });
      };
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
          {"最大比重总和：100"}
        </span>
        <div className={classes.weightDiv}>
          {rest.options.map((prop, key) => {
            return (
              <div
                key={`weight-${key}`}
                style={{ width: "80%", marginLeft: "3%" }}
              >
                <span>{prop}</span>
                <Row>
                  <Col span={15}>
                    <Slider
                      value={question.selected[key]}
                      onChange={changeWeight(key)}
                      onAfterChange={() => setAnswers({ ...answers })}
                    />
                  </Col>
                  <Col span={1}>
                    <InputNumber
                      min={0}
                      max={100}
                      style={{ margin: "0 36px" }}
                      value={question.selected[key]}
                      onChange={changeWeight(key)}
                      onBlur={() => setAnswers({ ...answers })}
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
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  React.useEffect(() => {
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
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (
        navigator.platform.indexOf("Win") > -1 ||
        navigator.platform.indexOf("Linux") > -1
      ) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  const Panel = () => {
    return (
      <div className={classes.questionnairePreview} >
        <div className={classes.questionnaireView} ref={mainPanel}>
          <h1 style={{ textAlign: "center" }}>{answers.title}</h1>
          <h3>{answers.description}</h3>
          <div
            style={{
              background: "#1890ff",
              width: "100%",
              height: "3px",
              marginBottom: "10px",
            }}
          />
          {answers.answered_questions.map((prop, key) => {
            const { qtitle, required } = prop;
            return (
              <div key={`question-${key}`} style={{ marginBottom: "30px" }}>
                <Space direction="vertical" style={{ width: "680px" }}>
                  <div className={classes.questionTitle}>
                    <span style={{ color: "red" }}>{required ? "*" : ""}</span>
                    <span style={{ marginLeft: required ? "5px" : "16px" }}>{`${
                      key + 1
                    }.`}</span>
                    <span>{qtitle}</span>
                  </div>
                  <div>
                    <Question key={`question-${key}`} index={key} {...prop} />
                    <div
                      style={{
                        borderTop: "#eaeaea 2px solid",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{ display: "none", color: "red" }}
                      >
                        请完成该问题
                      </div>
                    </div>
                  </div>
                </Space>
              </div>
            );
          })}
        </div>
        {/* <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderBottom: "#cac6c6 2px solid",
          }}
        > */}
          <Button
            type="primary"
            size="large"
            style={{ margin: "40px auto" }}
            onClick={submitAnswers}
            loading={false}
          >
            提交
          </Button>
        {/* </div> */}
      </div>
    );
  };

  return <Panel />;
}

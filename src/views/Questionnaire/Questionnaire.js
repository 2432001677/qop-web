import React, { useEffect, useState } from "react";
import { get } from "Utils/Axios.js";

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

const useStyles = makeStyles(styles);
export default function Questionnaire(props) {
  const id = props.match.params.id;
  const classes = useStyles();
  const [questionnaire, setQuestionnaire] = useState({
    title: "",
    answer_num: 0,
    status: 1,
    description: "",
    questions: [
      // {
      //   qtitle: "比重题",
      //   qtype: 6,
      //   required: true,
      //   option_num: 1,
      //   options: ["aaa", "bbb"],
      // },
      // {
      //   qtitle: "下拉题",
      //   qtype: 5,
      //   required: true,
      //   option_num: 1,
      //   options: [
      //     { value: 0, label: "xxx" },
      //     { value: 1, label: "aaa" },
      //   ],
      // },
      // {
      //   qtitle: "级联题",
      //   qtype: 4,
      //   required: true,
      //   option_num: 1,
      //   options: [],
      // },
      // {
      //   qtitle: "评分题",
      //   qtype: 3,
      //   required: true,
      //   option_num: 5,
      //   options: [],
      // },
      // {
      //   qtitle: "填空题",
      //   qtype: 2,
      //   required: true,
      //   option_num: 1,
      //   options: [],
      // },
      // {
      //   qtitle: "多选题",
      //   qtype: 1,
      //   required: false,
      //   option_num: 1,
      //   options: ["xxx", "vcxvcx"],
      // },
      // {
      //   qtitle: "单选题一",
      //   qtype: 0,
      //   required: true,
      //   option_num: 2,
      //   options: ["xxx", "aaa"],
      // },
    ],
  });
  const getQuestionnaireById = async () => {
    try {
      const { data } = await get(
        "/questionnaire/questionnaire/" + id,
        false,
        true
      );
      console.log(data.data);
      setQuestionnaire(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestionnaireById();
  }, []);

  // 具体问题
  const SingleSelect = (props) => {
    const changeOption = (e) => {
      console.log(e);
    };
    return (
      <Radio.Group style={{ width: "100%" }} onChange={changeOption}>
        <div>
          {props.options.map((prop, key) => {
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
  const MultiSelect = (props) => {
    const changeOption = (e) => {
      console.log(e);
    };
    return (
      <Checkbox.Group style={{ marginLeft: "22px" }} onChange={changeOption}>
        {props.options.map((prop, key) => {
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

  const Blank = (props) => {
    return (
      <Input.TextArea
        showCount
        style={{ marginLeft: "24px" }}
        maxLength={500}
        autosize={{ minRows: 6, maxRows: 10 }}
        placeholder="输入文字"
      />
    );
  };
  const Rates = (props) => {
    const toolTips = ["很差", "较差", "中等", "较好", "完美"];
    const [value, setValue] = useState(3);
    return (
      <div>
        <Rate
          tooltips={toolTips}
          value={value}
          onChange={(value) => setValue(value)}
        />{" "}
        {value ? (
          <span className="ant-rate-text">{toolTips[value - 1]}</span>
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
          width: "400px",
          marginTop: "10px",
          marginLeft: "25px",
          width: "60%",
        }}
      />
    );
  };
  const DropdownSelect = (props) => {
    const changeValue = (index) => {
      console.log(index);
    };
    return (
      <div style={{ marginLeft: "24px" }}>
        <Cascader options={props.options.list} onChange={changeValue} />
      </div>
    );
  };
  const WeightsAssign = (props) => {
    const onChange = (value) => {
      console.log(value);
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
          {props.options.map((prop, key) => {
            return (
              <div
                key={`weight-${key}`}
                style={{ width: "80%", marginLeft: "3%" }}
              >
                <span>{prop}</span>
                <Row>
                  <Col span={15}>
                    <Slider />
                  </Col>
                  <Col span={1}>
                    <InputNumber
                      min={1}
                      max={10}
                      style={{ margin: "0 36px" }}
                      value={8}
                      onChange={onChange}
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
    console.log(qtype);
    console.log(rest);
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

  console.log(questionnaire);
  return (
    <div className={classes.questionnairePreview}>
      <title></title>
      <div className={classes.questionnaireView}>
        <h1 style={{ textAlign: "center" }}>{questionnaire.title}</h1>
        <h3>{questionnaire.description}</h3>
        <div
          style={{
            background: "#1890ff",
            width: "100%",
            height: "3px",
            marginBottom: "10px",
          }}
        />
        {questionnaire.questions.map((prop, key) => {
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
                  <Question key={`question-${key}`} {...prop} />
                  <div
                    style={{
                      borderTop: "#eaeaea 2px solid",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      // ref="['warning'+index]"
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
          // onClick="submitAnswers"
          loading={false}
        >
          提交
        </Button>
      </div>
    </div>
  );
}

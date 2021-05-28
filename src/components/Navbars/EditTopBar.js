import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { getQuestionnaireByQid, preserveQuestionnaire } from "Api/Api.js";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Button, Space } from "antd";

export default function EditTopBar(props) {
  const {
    qid,
    scoringModeOpen,
    setScoringModeOpen,
    questionnaire,
    setQuestionnaire,
    questions,
    setQuestions,
  } = props;
  const history = useHistory();

  const [states, setStates] = useState({
    save: false,
    loading: false,
    countDown: 10,
  });

  const switchScoringMode = () => {
    setScoringModeOpen(!scoringModeOpen);
  };
  const preserveAndRedirect = () => {
    preserve();
    history.goBack();
  };

  const preserve = async () => {
    states.loading = true;
    setStates({ ...states });
    if (qid) {
      questionnaire.id = qid;
    }
    questionnaire.questions = questions;
    questionnaire.scoring_mode = scoringModeOpen;
    try {
      await preserveQuestionnaire(qid, questionnaire);
    } catch (error) {
      console.log(error);
    } finally {
      states.loading = false;
      setStates({ ...states });
    }
  };

  const backToPrevious = () => {
    if (history.length >= 1) {
      history.goBack();
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    const getQuestionnaire = async () => {
      try {
        const { data } = await getQuestionnaireByQid(qid);
        setScoringModeOpen(data.scoring_mode);
        setQuestionnaire(data);
        console.log(data.questions);
        setQuestions(data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    if (qid) {
      getQuestionnaire();
    }
  }, [qid]);

  return (
    <div style={{ position: "absolute", right: "20px", top: "5px" }}>
      <Space size={3}>
        <Button type="primary" onClick={switchScoringMode}>
          {"计分模式"}
        </Button>
        <Button
          loading={states.loading}
          type="primary"
          onClick={preserveAndRedirect}
        >
          {"完成"}
        </Button>
        <Button type="primary" onClick={preserve}>
          <span>{"保存"}</span>
        </Button>
        <Button type="primary" onClick={backToPrevious}>
          <span>{"返回"}</span>
        </Button>
      </Space>
    </div>
  );
}

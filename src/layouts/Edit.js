import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { post } from "Utils/Axios.js";

import EditSider from "components/Sidebar/EditSider.js";
import EditContent from "components/Content/EditContent.js";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/layouts/editStyle.js";

import { Button, Space } from "antd";
import { ClockCircleTwoTone } from "@ant-design/icons";

let ps;

const useStyles = makeStyles(styles);
export default function Edit(props) {
  console.log("edit");
  const classes = useStyles();
  const history = useHistory();
  const mainPanel = React.createRef();
  const [states, setStates] = useState({
    save: false,
    loading: false,
    countDown: 10,
  });
  const success = props.location.state === true ? true : false;
  const [login, setLogin] = useState(success);
  const [questionnaire, setQuestionnaire] = useState({
    title: "title",
    answer_num: 0,
    status: 1,
    description: "des",
    questions: [],
  });
  const [questions, setQuestions] = useState([]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  const state = {
    login: login,
    change: setLogin,
    questionnaire,
    setQuestionnaire,
    questions,
    setQuestions,
  };

  const preserveAndRedirect = () => {
    preserve();
    history.goBack();
  };
  const preserve = async () => {
    states.loading = true;
    setStates(states);
    questionnaire.questions = questions;
    try {
      const res = await post(
        "/questionnaire/questionnaire",
        questionnaire,
        false,
        true
      );
    } catch (error) {
      console.log(error);
    } finally {
      states.loading = false;
      setStates(states);
    }
  };

  const backToPrevious = () => {
    if (history.length >= 1) {
      history.goBack();
    } else {
      history.push("/");
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
  return (
    <div className={classes.wrapper}>
      <EditSider {...state} />
      <div style={{ maxHeight: "100%" }} ref={mainPanel}>
        <EditContent {...state} />
      </div>
      <div style={{ position: "absolute", right: "20px", top: "5px" }}>
        <Space size={3}>
          <Button
            loading={states.loading}
            type="primary"
            onClick={preserveAndRedirect}
          >
            {"完成编辑"}
          </Button>
          <Button
            type="primary"
            onClick={preserve}
            icon={<ClockCircleTwoTone />}
          >
            <span>
              {states.save ? "自动保存中..." : "保存"} ({states.countDown})
            </span>
          </Button>
          <Button type="primary" onClick={backToPrevious}>
            <span>{"返回"}</span>
          </Button>
        </Space>
      </div>
    </div>
  );
}

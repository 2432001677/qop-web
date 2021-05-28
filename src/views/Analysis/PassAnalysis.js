import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

import Chartist from "chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/passAnalysisStyle.js";
import {
  getMyGroups,
  getQuestionnairesByGroupId,
  getMyQuestionnairesPage,
  getQuestionnaireByQid,
  getPassAnalysis,
} from "Api/Api";

const delays = 80,
  durations = 500;
const delays2 = 80,
  durations2 = 500;
const useStyles = makeStyles(styles);

export default function PassAnalysis() {
  const classes = useStyles();
  // 分类下标
  const [category, setCategory] = useState(0);
  // 群组下标
  const [group, setGroup] = useState("");
  // 群组列表
  const [groupsInfo, setGroupsInfo] = useState([]);
  // 问卷下标
  const [questionnaire, setQuestionnaire] = useState("");
  // 问卷列表
  const [questionnairesInfo, setQuestionnairesInfo] = useState([]);
  // 问题下标
  const [question, setQuestion] = useState("");
  // 问题列表
  const [questionsInfo, setQuestionsInfo] = useState([]);

  const [planning, setPlanning] = useState({
    proportion: "",
    result: "",
    labels: "",
    series: [],
  });
  const [attention, setAttention] = useState({
    proportion: "",
    result: "",
    labels: "",
    series: [],
  });
  const [simultaneous, setSimultaneous] = useState({
    proportion: "",
    result: "",
    labels: "",
    series: [],
  });
  const [successive, setSuccessive] = useState({
    proportion: "",
    result: "",
    labels: "",
    series: [],
  });

  const planningGraph = {
    options: {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0,
      },
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: (value) => value[0],
          },
        },
      ],
    ],
    animation: {
      draw: (data) => {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };

  const attentionGraph = {
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 50, // bruce yu: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    // for animation
    animation: {
      draw: (data) => {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };

  const simultaneousSuccessiveGraph = {
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // bruce yu: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    animation: {
      draw: (data) => {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };

  const handleCategory = async (event) => {
    const index = event.target.value;
    setCategory(index);
    try {
      if (index === 1) {
        const { data } = await getMyGroups();
        setGroupsInfo(data);
        const gid = data[0].id;
        if (data.length > 0) {
          const { data } = await getQuestionnairesByGroupId(gid);
          setQuestionnairesInfo(data);
          handleGroup({ target: { value: 0 } }, null, gid);
        }
      } else {
        const { data } = await getMyQuestionnairesPage(1, 100);
        setGroup("");
        setQuestionnairesInfo(data);
        if (data.length > 0) {
          setQuestionnaire(0);
          handleQuestionnaire(
            { target: { value: 0 } },
            null,
            data[0].id,
            index,
            0
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroup = async (event, o, gid) => {
    const index = event.target.value;
    setGroup(index);
    try {
      let groupId = gid || groupsInfo[index].id;
      const { data } = await getQuestionnairesByGroupId(groupId);
      setQuestionnairesInfo(data);
      if (data.length > 0) {
        handleQuestionnaire(
          { target: { value: 0 } },
          null,
          data[0].id,
          groupId,
          1
        );
      } else {
        setQuestionsInfo([]);
        setQuestion("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuestionnaire = async (event, o, id, gid, c) => {
    c = c || category;
    const index = event.target.value;
    setQuestionnaire(index);
    try {
      const { data } = await getQuestionnaireByQid(
        id || questionnairesInfo[index].id
      );
      setQuestionsInfo([{ qtitle: "全部" }, ...data.questions]);
      handleQuestion({ target: { value: 0 } }, null, id, gid, c);
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuestion = async (event, o, id, gid, c) => {
    gid = gid || groupsInfo[group];
    c = c || category;
    const index = event.target.value;
    setQuestion(index);
    let analysis;
    if (index === 0) {
      analysis = await getPassAnalysis(
        id || questionnairesInfo[questionnaire].id,
        c === 0 ? -1 : gid
      );
    } else if (index > 0) {
      analysis = await getPassAnalysis(
        id || questionnairesInfo[questionnaire].id,
        c === 0 ? -1 : gid,
        index - 1
      );
    }
    if (analysis) {
      const { planning, attention, simultaneous, successive } = analysis.data;
      planning.series = [planning.series];
      attention.series = [attention.series];
      simultaneous.series = [simultaneous.series];
      setPlanning(planning);
      setAttention(attention);
      setSimultaneous(simultaneous);
      setSuccessive(successive);
    }
  };

  useEffect(() => {
    handleCategory({ target: { value: 0 } });
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>{"筛选"}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={category}
              onChange={handleCategory}
            >
              <MenuItem value={0}>{"公开"}</MenuItem>
              <MenuItem value={1}>{"小组"}</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>{category === 1 ? "小组" : ""}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={group}
              disabled={category === 0}
              onChange={handleGroup}
            >
              {groupsInfo.map((prop, key) => (
                <MenuItem value={key} key={`group-${key}`}>
                  {prop.group_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>{"问卷"}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={questionnaire}
              onChange={handleQuestionnaire}
            >
              {questionnairesInfo.map((prop, key) => (
                <MenuItem value={key} key={`questionnaire-${key}`}>
                  {prop.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>{"问题"}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={question}
              onChange={handleQuestion}
            >
              {questionsInfo.map((prop, key) => (
                <MenuItem value={key} key={`question-${key}`}>
                  {`${key === 0 ? "" : key + ""} ${prop.qtitle}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="planning" stats icon>
              <CardIcon color="planning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>{"计划"}</p>
              <h3 className={classes.cardTitle}>
                {planning.proportion}
                <small>🎨</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  {planning.result}
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="attention" stats icon>
              <CardIcon color="attention">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>{"注意"}</p>
              <h3 className={classes.cardTitle}>👆{attention.score}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {attention.result}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="simultaneous" stats icon>
              <CardIcon color="simultaneous">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>{"同时性加工"}</p>
              <h3 className={classes.cardTitle}>{simultaneous.score}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                {simultaneous.result}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="successive" stats icon>
              <CardIcon color="successive">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>{"继时性加工"}</p>
              <h3 className={classes.cardTitle}>{successive.power}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                {successive.result}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={planning}
                type="Bar"
                options={planningGraph.options}
                responsiveOptions={planningGraph.responsiveOptions}
                listener={planningGraph.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>计划值</h4>
              <p className={classes.cardCategory}>分布相差较大</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                2天以内的数据
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={attention}
                type="Line"
                options={attentionGraph.options}
                listener={attentionGraph.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>注意值</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                近期内整体上升
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> 4分钟前更新
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={simultaneous}
                type="Line"
                options={simultaneousSuccessiveGraph.options}
                listener={simultaneousSuccessiveGraph.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>同时性-继时性</h4>
              <p className={classes.cardCategory}>表现整体下降</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                自2天前开始统计
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

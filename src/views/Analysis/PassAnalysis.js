import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
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
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/passAnalysisStyle.js";

const useStyles = makeStyles(styles);

export default function PassAnalysis() {
  const classes = useStyles();
  const [category, setCategory] = React.useState("");
  const [group, setGroup] = React.useState("");
  const [questionnaire, setQuestionnaire] = React.useState("");
  const [question, setQuestion] = React.useState("");

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleGroup = (event) => {
    setGroup(event.target.value);
  };
  const handleQuestionnaire = (event) => {
    setQuestionnaire(event.target.value);
  };
  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

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
              <MenuItem value={10}>{"公开"}</MenuItem>
              <MenuItem value={20}>{"小组"}</MenuItem>
              <MenuItem value={30}>{"未公开"}</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>小组</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={group}
              onChange={handleGroup}
            >
              <MenuItem value={10}>aa</MenuItem>
              <MenuItem value={20}>bb</MenuItem>
              <MenuItem value={30}>cc</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>问卷</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={questionnaire}
              onChange={handleQuestionnaire}
            >
              <MenuItem value={10}>毕设完成情况问卷</MenuItem>
              <MenuItem value={20}>大学生问卷</MenuItem>
              <MenuItem value={30}>程序员的调查问卷</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>问题</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={question}
              onChange={handleQuestion}
            >
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
              <MenuItem value={30}>3</MenuItem>
              <MenuItem value={30}>4</MenuItem>
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
                9/30 <small>🎨</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  计划性较低
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
              <h3 className={classes.cardTitle}>👆32</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                注意力正常
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
              <h3 className={classes.cardTitle}>35</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                同时处理能力
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
              <h3 className={classes.cardTitle}>+24</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                连续性
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
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
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
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
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
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
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
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}

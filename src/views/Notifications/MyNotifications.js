/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import NotificationSnack from "components/Snackbar/NotificationSnack.js";

import styles from "assets/jss/material-dashboard-react/views/myNotificationStyle.js";

const useStyles = makeStyles(styles);

export default function Notifications() {
  const classes = useStyles();

  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>{"通知中心"}</h4>
        <p className={classes.cardCategoryWhite}>
          {"在这里你将会看到你所收到的所有通知 。"}
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <br />
            <NotificationSnack
              message={
                <span
                  className={classes.iconMessage}
                >{`Bruce邀请你加入小组 学习`}</span>
              }
            />
            <NotificationSnack
              message={
                <span className={classes.iconMessage}>{`AAA 已经解散`}</span>
              }
            />
          </GridItem>
        </GridContainer>
        <br />
        <br />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
            <h5>
              {"消息通知"}
              <br />
              <small>{"你可以在此处理未读通知"}</small>
            </h5>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}

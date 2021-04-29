/*eslint-disable*/
import React, { useState } from "react";
import * as R from "ramda";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { getMyNotifications, responseInvitation } from "Api/Api.js";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import NotificationSnack from "components/Snackbar/NotificationSnack.js";

import "antd/dist/antd.css";

import styles from "assets/jss/material-dashboard-react/views/myNotificationStyle.js";

const useStyles = makeStyles(styles);

export default function Notifications() {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    const data = await getMyNotifications();
    console.log(data);
    setNotifications(data.data);
  };

  React.useEffect(() => {
    getNotifications();
  }, []);

  const clickResponse = R.curry(async (id, v) => {
    const res = await responseInvitation({ id: id, answer: v });
    console.log(res);
    getNotifications();
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
            {notifications.map((prop, key) => {
              let msg;
              if (prop.type === 0) {
                msg = (
                  <span className={classes.iconMessage}>
                    <b>{prop.info}</b>
                    {`已经解散`}
                  </span>
                );
              } else if (prop.type === 1) {
                msg = (
                  <span className={classes.iconMessage}>
                    <b>{prop.info.inviter_name}</b>
                    {"邀请你加入小组"}
                    <b>{prop.info.group_name}</b>
                  </span>
                );
              }
              const clickRes = clickResponse(prop.id);
              const state = {
                index: key,
                message: msg,
                time: prop.create_time,
                clickAnswer: () => clickRes("Y"),
                clickReject: () => clickRes("N"),
              };
              return (
                <NotificationSnack key={`notification-${key}`} {...state} />
              );
            })}
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

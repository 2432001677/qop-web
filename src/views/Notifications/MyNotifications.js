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
        <h4 className={classes.cardTitleWhite}>Notifications</h4>
        <p className={classes.cardCategoryWhite}>
          Handcrafted by our friends from{" "}
          <a
            target="_blank"
            href="https://material-ui-next.com/?ref=creativetime"
          >
            Material UI
          </a>{" "}
          and styled by{" "}
          <a
            target="_blank"
            href="https://www.creative-tim.com/?ref=mdr-notifications-page"
          >
            Creative Tim
          </a>
          . Please checkout the{" "}
          <a href="#pablo" target="_blank">
            full documentation
          </a>
          .
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h5>Notifications Style</h5>
            <br />
            <NotificationSnack
              message={
                <span
                  className={classes.iconMessage}
                >{`Bruce邀请你加入 学习`}</span>
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

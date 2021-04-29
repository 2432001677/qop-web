import React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import Snack from "@material-ui/core/SnackbarContent";

import { Space } from "antd";

import styles from "assets/jss/material-dashboard-react/components/notificationSnackStyle.js";

const plusZero = (number) => {
  return number <= 10 ? "0" + number : number;
};

const useStyles = makeStyles(styles);
export default function NotificationSnack(props) {
  const classes = useStyles();

  const { message, index, time, clickAnswer, clickReject } = props;
  const date = new Date(time);
  const dateStr = `${plusZero(date.getHours())}:${plusZero(
    date.getMinutes()
  )}  ${plusZero(date.getMonth() + 1)}-${plusZero(
    date.getDate()
  )}-${date.getFullYear()}`;
  const action = [
    <Space size={12} key={`space-${index}`}>
      <span>{dateStr}</span>
      <div>
        <IconButton
          className={classes.iconButton}
          key="open"
          aria-label="Open"
          color="inherit"
          onClick={clickAnswer}
        >
          <CheckIcon className={classes.button} />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={clickReject}
        >
          <Close className={classes.button} />
        </IconButton>
      </div>
    </Space>,
  ];

  return (
    <Snack
      message={
        <div>
          <AddAlert className={classes.icon} />
          {message}
        </div>
      }
      classes={{
        root: classes.root,
        message: classes.message,
        action: classNames(),
      }}
      action={action}
    />
  );
}

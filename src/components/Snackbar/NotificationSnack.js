import React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import Snack from "@material-ui/core/SnackbarContent";

import styles from "assets/jss/material-dashboard-react/components/notificationSnackStyle.js";

const useStyles = makeStyles(styles);
export default function NotificationSnack(props) {
  const classes = useStyles();

  const { message } = props;
  const action = [
    <IconButton
      className={classes.iconButton}
      key="open"
      aria-label="Open"
      color="inherit"
    >
      <CheckIcon className={classes.button} />
    </IconButton>,
    <IconButton
      className={classes.iconButton}
      key="close"
      aria-label="Close"
      color="inherit"
    >
      <Close className={classes.button} />
    </IconButton>,
  ];

  return (
    <Snack
      message={
        <div>
          <AddAlert className={classes.icon} />
          {/* <span className={classes.iconMessage}>{`AAA 已经解散`}</span> */}
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

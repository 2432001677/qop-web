import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogScaffod(props) {
  const {
    dialogOpen,
    closeDialog,
    dialogTitle,
    dialogContentText,
    dialogContent,
    dialogActions,
  } = props;
  return (
    <Dialog
      open={dialogOpen}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
        {dialogContent}
      </DialogContent>
      {dialogActions}
    </Dialog>
  );
}

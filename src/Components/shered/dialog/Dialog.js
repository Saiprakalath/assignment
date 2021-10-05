import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@material-ui/core";

const DialogBox = ({ dialog = {} }) => {
  const {
    maxWidth = "sm",
    open = false,
    onClose = () => {},
    title = "",
    content = "",
    actions = [],
  } = dialog;

  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>{title}</DialogTitle>
      {typeof content === "function" ? (
        content()
      ) : (
        <>
          <Box component={DialogContent} maxWidth="300px">
            <DialogContentText variant="body1" color="textPrimary">
              {content}
            </DialogContentText>
          </Box>
          <DialogActions>
            {!!actions?.length &&
              actions.map(
                (action, index) =>
                  React.isValidElement(action) &&
                  React.cloneElement(action, {
                    key: index,
                  })
              )}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
export default DialogBox;

import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";

const loadingStyle = {
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function LoadingIndicator(props) {
  return (
    <Dialog open={props.openIndicator} maxWidth="xs">
      <Grid item xs={12} align="center">
        <Box
          component={DialogContent}
          {...loadingStyle}
          minHeight="unset !important">
          <Typography>{props.text || "Loading..."}</Typography>
        </Box>
      </Grid>
    </Dialog>
  );
}

export default LoadingIndicator;
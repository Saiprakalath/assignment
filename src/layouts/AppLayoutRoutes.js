import React from "react";
import { Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import { TaskHomeSuspense, TaskListSuspense } from "./AppRoutes";
import Scrollbars from "react-custom-scrollbars";
import BreadcrumbBar from "./BreadcumbBar";


const App =() => {
  return (
    <Box className="d-flex" paddingTop={["58px", "34px"]} bgcolor="#fafafa">
      <div className="w-100">
        <Box component={Scrollbars} autoHide={false} height="94vh !important">
          <BreadcrumbBar />
          <Switch>
            <Route path="/" exact component={TaskHomeSuspense} />
            <Route path="/list/:name" exact component={TaskListSuspense} />
          </Switch>
        </Box>
      </div>
    </Box>
  );
};

 export default App;
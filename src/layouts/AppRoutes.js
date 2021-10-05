import React, { Suspense } from "react";
import {
  LinearProgress as LinearProgressComponent,
  Box,
} from "@material-ui/core";

const LinearProgress = () => (
  <Box marginTop="300px" className="p-5 w-50" marginLeft="25%">
    <LinearProgressComponent />
  </Box>
);

const TaskHome = React.lazy(() => import("../Components/TaskList/ListPanel"));
const TaskList = React.lazy(() => import("../Components/TaskList/List"));

export const TaskHomeSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <TaskHome {...props} />
  </Suspense>
);

export const TaskListSuspense = (props) => (
  <Suspense fallback={<LinearProgress />}>
    <TaskList {...props} />
  </Suspense>
);

import React from "react";
import ListHome from "./ListHome";
import {
  Box,
  Grid,
  Typography,
  Button,
  Hidden,
  Divider,
  CardContent,
  Card,
} from "@material-ui/core";
import { getTasks } from "../../Redux/actions/todoActions";
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { updateBreadcrumbPath } from "../../Redux/actions/breadcrumbActions";
import LoadingIndicator from "../shered/loadingIndicator.js/LoadingIndicator";
import { toast } from "react-toastify";


const ListPanel = () => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector((state) => state?.task?.tasks);

  React.useEffect(() => {
    const path = [
      {
        label: "Tasks",
      },
      {
        label: "Lists",
      },
    ];
    updateBreadcrumbPath(path)(dispatch);
    const fetchTask = async () => {
      try {
        setLoading(true);
        await getTasks();
      } catch (ex) {
        console.error(ex);
        toast.error(ex?.message || "Failed to fetch necessary task details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [dispatch]);

  React.useEffect(() => {
    document.title = "TODO | Task-List";
  }, []);

  React.useEffect(() => {
    try {
      const taskTimer = setInterval(() => getTasks()(dispatch), 1000);
      return () => {
        clearInterval(taskTimer);
      };
    } catch (ex) {
      console.error(ex.message);
    }
  }, [dispatch]);


  const handleCreate = () => {
    history.push("/list/create");
  };

  const newTaskButton = (
    <Button
      variant="contained"
      disableElevation
      color="secondary"
      onClick={handleCreate}
      className="m-1"
      startIcon={<AddOutlined />}
    >
      New<Hidden smDown> Task</Hidden>
    </Button>
  );

  return (
    <Box className="pb-0 px-1 px-sm-3" marginTop="24px">
      {loading && <LoadingIndicator text="Loading..." openIndicator={true} />} 
      <Box display="flex" flexDirection="column" minHeight="6vh">
        <Grid container>
          <Grid item xs={12} lg={8}>
            <Typography variant="h3">Task List</Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {!!tasks?.length && newTaskButton}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <CardContent>
        {!tasks?.length && !loading&& (
          <Box
            component={Card}
            variant="outlined"
            className="d-flex flex-column justify-content-center align-items-center text-center m-3"
            height="75vh"
            width="100%"
          >
            <Typography className="font-weight-bold text-theme">
              There is no existing task .
              <br />
              Please click the button below to create one.
            </Typography>
            {newTaskButton}
          </Box>
        )}
        {!!tasks?.length && <ListHome tasks={tasks} />}
      </CardContent>
    </Box>
  );
};

export default ListPanel;

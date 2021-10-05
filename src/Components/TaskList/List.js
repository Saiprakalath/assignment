import React from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Typography,
  CardContent,
} from "@material-ui/core";
import { updateBreadcrumbPath } from "../../Redux/actions/breadcrumbActions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createTask , updateTask} from "../../api/todoApi";
import SimpleReactValidator from "simple-react-validator";
import { useHistory } from "react-router-dom";
import LoadingIndicator from "../shered/loadingIndicator.js/LoadingIndicator";
import { toast } from "react-toastify";

const List = () => {
  const [loading, setLoading] = React.useState();
  const [update, setUpdate] = React.useState(false);
  const [task, setTask] = React.useState({});
  const history = useHistory();
  const { name: operation } = useParams();
  const simpleValidator = new SimpleReactValidator({
    locale: "en",
    validators: {},
  });
  const validationRef = React.useRef(simpleValidator);
  const validator = validationRef.current;
  const CHARACTER_LIMIT = 500;

  const dispatch = useDispatch();
  const label = " task - " + operation;
  React.useEffect(() => {
    document.title = "TODO |" + label;
  }, [label]);

  React.useEffect(() => {
    const path = [
      {
        label: "Tasks",
      },
      {
        label: "Lists",
        path: "/",
      },
      {
        label:
          (operation === "edit" && "Edit Task") ||
          (operation === "create" && "Create Task") ||
          (operation === "view" && "View Task"),
        path:
          (operation === "edit" && "/list/edit") ||
          (operation === "create" && "/list/create") ||
          (operation === "view" && "/list/view"),
      },
    ];
    updateBreadcrumbPath(path)(dispatch);
  }, [dispatch, operation]);

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("task"));
    if (!!data && !update && (operation === "edit"|| operation === "view")) {
      setUpdate(true);
      setTask(data);
    }
  }, [operation, task, update]);

  validator.message("name", task?.name, "required");

  const getValidatorError = (nameOfStateProp) => {
    const allErrorMessages = validator.getErrorMessages();
    return allErrorMessages[nameOfStateProp];
  };

  const handleApply = async () => {
    let cloneTask = { ...task };
    console.log(cloneTask)
    try {
      setLoading(true);
      if(operation === "create"){
      await createTask(cloneTask);
      toast.success("Task is created successfully.");
      setLoading(false);
      return history.push("/");
      }
      await updateTask(cloneTask.id,cloneTask);
      toast.success("Task is upadte successfully.");
      setLoading(false);
      return history.push("/");
    } catch (ex) {
      console.error(ex);
      toast.error(ex?.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (task?.description?.length >= CHARACTER_LIMIT) {
      return toast.error("no longer then 500 charactor");
    }
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });

  };

  return (
    <Box
      component={Grid}
      container
      className="pb-0 px-1 px-sm-3"
      marginTop="24px"
    >
      {loading && <LoadingIndicator text="Loading..." openIndicator={true} />}
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            flexDirection="column"
            minHeight="6vh"
            className="mt-3"
          >
            <Typography variant="h3">Create Task</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box component={Grid} container>
        <Box
          position="relative"
          width={["100%"]}
          component={Card}
          className="px-sm-3 px-1 pt-1"
          height={"100%"}
        >
          <Box component={CardContent} height="90%">
            <Grid container>
              <Grid item lg={10}>
                <Box position="relative" className="px-sm-3 px-1 pt-1">
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    value={task?.name ?? ""}
                    variant="outlined"
                    error={getValidatorError("name")}
                    disabled={operation === "view" ? true : false}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                    InputProps={{ className: "p-2" }}
                    helperText={getValidatorError("name") ?? "Name of the task"}
                  />
                  <TextField
                    label="Description"
                    fullWidth
                    name="description"
                    value={task?.description ?? ""}
                    multiline
                    rows={3}
                    variant="outlined"
                    onChange={handleChange}
                    disabled={operation === "view" ? true : false}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      className: "p-2",
                      maxLength: CHARACTER_LIMIT,
                    }}
                    helperText={
                      task?.description
                        ? `${task.description.length}/${CHARACTER_LIMIT}`
                        : "Description of the task"
                    }
                  />
                  <FormControl className="w-100">
                    <InputLabel shrink>Status</InputLabel>
                    <Select
                      variant="outlined"
                      className="p-2"
                      value={task?.status ?? ""}
                      name="status"
                      onChange={handleChange}
                      disabled={
                        operation === "edit" || (operation === "view"  && task.status !== "pending")}
                    >
                      <MenuItem value="">--None--</MenuItem>

                      <MenuItem value="pending">Pending</MenuItem>
                     {operation === "view"|| operation === "edit" &&
                      <MenuItem value="done">Done</MenuItem>}
                    </Select>
                    <FormHelperText>Status of the task</FormHelperText>
                  </FormControl>

                  <TextField
                    id="selectedToDatetime"
                    type="date"
                    label="Due Date"
                    value={task?.date ?? ""}
                    fullWidth
                    name="date"
                    onChange={handleChange}
                    disabled={operation === "view" ? true : false}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      className: "p-2",
                    }}
                    helperText={"Due date of the task"}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            display="flex"
            flexDirection={["column", "row"]}
            width="100%"
            marginRight={[0, 0, 0, 4]}
            justifyContent="flex-end"
            bottom="0px"
            right="1px"
            paddingRight="1%"
            className="mb-3"
          >
  
            <Box
              width={["100%", "140px"]}
              variant="contained"
              disabled={loading || !simpleValidator.allValid()}
              className="m-1"
              onClick={handleApply}
            >
          {    <Button
                fullWidth
                disableElevation
                color="secondary"
                variant="contained"
              >
                Save
              </Button>}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default List;

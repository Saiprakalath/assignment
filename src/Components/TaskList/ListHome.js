import React from "react";
import {
  Card,
  Grid,
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  TableBody,
  Typography,
  Button,
} from "@material-ui/core";
import { Visibility, Edit, Delete, Check } from "@material-ui/icons";
import { deleteTask, updateTask } from "../../api/todoApi.js";
import { HEAD_CELL, Status } from "../constance/TaskConst";
import { useHistory } from "react-router-dom";
import Dialog from "../shered/dialog/Dialog";
import { toast } from "react-toastify";
import LoadingIndicator from "../shered/loadingIndicator.js/LoadingIndicator";

const ListHome = ({ tasks = [] }) => {
  const [loading, setLoading] = React.useState();
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [selection, setSection] = React.useState(null);
  const history = useHistory();
  const CustomCard = React.useMemo(
    () =>
      React.forwardRef((cardProps, ref) => (
        <Card ref={ref} variant="outlined" {...cardProps} />
      )),
    []
  );

  const handleEdit = (task) => {
    localStorage.setItem("task", JSON.stringify(task));
    history.push("/list/edit");
  };

  const handleView = (task) => {
    localStorage.setItem("task", JSON.stringify(task));
    history.push("/list/view");
  };

  const handleDeletDialog = (id) => {
    setSection(id);
    setDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await deleteTask(selection);
      toast.success("successfully deleted");
    } catch (ex) {
      toast.error(ex);
    }
    setLoading(false);
    setDeleteDialog(false);
  };

  const handleDelete = () => {
    const dialogProps = {
      open: true,
      onClose: handleCloseDelete,
      title: "Confirmation",
      actions: [
        <Button
          variant="outlined"
          color="inherit"
          className="cancelDialogButton"
          onClick={handleCloseDelete}
        >
          Cancel
        </Button>,
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          className="okDialogButton"
          onClick={handleDeleteConfirm}
        >
          Confirm
        </Button>,
      ],
      content: (
        <Box className="w=100">
          <Grid container className="p-2">
            <Grid item xs={9}>
              <div className="font-weight-light-bold">{selection}</div>
            </Grid>
          </Grid>
          To confirm that you want to delete this task definition, choose the
          confirm button below.
        </Box>
      ),
    };
    return <Dialog dialog={dialogProps} />;
  };

  const handleCheck = async (data) => {
    let cloneData = { ...data, status: "done" };

    try {
      setLoading(true);
      await updateTask(cloneData.id, cloneData);
      toast.success("Task is upadte successfully.");
      return setLoading(false);
    } catch (ex) {
      console.error(ex);
      toast.error(ex?.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  const displaytask = tasks.map((v) => {
    return {
      taskid: v?.id,
      name: v.name,
      description: v.description,
      status: (
        <Box
          color={Status[v?.status]}
          component={Typography}
          className="p-1 font-weight-bold"
        >
          {typeof v?.status === "string" && v.status.toUpperCase()}
        </Box>
      ),
      date: v.date,
      actions: (
        <Grid container item xs={12}>
          <IconButton size="small">
            <Tooltip title="Update task" aria-label="add">
              <Edit
                onClick={() => {
                  handleEdit(v);
                }}
              />
            </Tooltip>
          </IconButton>
          <IconButton size="small">
            <Tooltip title="Detele task" aria-label="add">
              <Delete
                onClick={() => {
                  handleDeletDialog(v.id);
                }}
              />
            </Tooltip>
          </IconButton>
          <IconButton size="small">
            <Tooltip title={`View of task`} aria-label="add">
              <Visibility
                onClick={() => {
                  handleView(v);
                }}
              />
            </Tooltip>
          </IconButton>
          {v.status !== "done" && <IconButton size="small">
            <Tooltip title={`Check of task`} aria-label="add">
              <Check
                onClick={() => {
                  handleCheck(v);
                }}
              />
            </Tooltip>
          </IconButton>}
        </Grid>
      ),
    };
  });

  return (
    <Box component={CustomCard}>
      {loading && <LoadingIndicator text="Loading..." openIndicator={true} />}
      <Grid item xs={12}>
        <Table>
          <TableHead>
            <TableRow>
              {HEAD_CELL.map((data) => {
                return <TableCell key={data.id}>{data.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {displaytask.map((data) => {
              return (
                <TableRow key={data.taskid}>
                  <TableCell>{data.taskid}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.actions}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
      {deleteDialog && handleDelete()}
    </Box>
  );
};

export default ListHome;

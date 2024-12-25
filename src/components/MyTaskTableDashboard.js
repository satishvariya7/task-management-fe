import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { getMyTasks } from "../utils/apiCallActions";
import { MY_TASK_TABLE_HEADERS } from "../utils";
import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const MyTaskTableDashboard = (props) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(null);
  const [value, setValue] = useState({ status: 0, priority: 0, dueDate: 0 });

  useEffect(() => {
    props?.getMyTasks(navigate);
  }, []);

  const handleOnChang = (e, name) => {
    const { myTask } = props;
    if (name === "dueDate") {
      const currentDate = e ? e.format("DD-MM-YYYY") : "";
      setFilteredData(myTask?.filter((i) => i?.dueDate === currentDate));
    } else {
      const value = e.target.value;
      setFilteredData(myTask?.filter((i) => i[name] === value));
      setValue({ ...value, [name]: value });
    }
  };

  return (
    <Fragment>
      <Grid2 container spacing={2} className="space-between">
        <Grid2 size={2}>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              sx={{ width: "150px", height: "54px" }}
              label="Status"
              value={value?.status || 0}
              size="small"
              disabled={props?.myTask?.length === 0}
              onChange={(e) => handleOnChang(e, "status")}
            >
              <MenuItem disabled value={0}>
                Select Status
              </MenuItem>
              <MenuItem value="toDo">To Do</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl>
            <InputLabel>Priority</InputLabel>
            <Select
              disabled={props?.myTask?.length === 0}
              value={value?.priority || 0}
              sx={{ width: "150px", height: "54px" }}
              label="Priority"
              size="small"
              onChange={(e) => handleOnChang(e, "priority")}
            >
              <MenuItem disabled value={0}>
                Select Priority
              </MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">low</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                disabled={props?.myTask?.length === 0}
                minDate={dayjs()}
                onChange={(e) => handleOnChang(e, "dueDate")}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
                label="Due Date"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid2>
        <Grid2 size={2}>
          <Button
            disabled={props?.myTask?.length === 0}
            onClick={() => {
              setFilteredData(null);
              setValue({ status: 0, priority: 0, dueDate: 0 });
            }}
            size="large"
            color="error"
            variant="outlined"
          >
            Clear all
          </Button>
        </Grid2>
      </Grid2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {MY_TASK_TABLE_HEADERS?.map((i, index) => (
                <TableCell key={index} align="center" className="fw-bold">
                  {i}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.myTask?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" className="text-danger">
                  You were not given any task!
                </TableCell>
              </TableRow>
            ) : filteredData && filteredData?.length === 0 ? (
              <TableCell colSpan={7} align="center" className="text-danger">
                Task list is empty!
              </TableCell>
            ) : (
              (filteredData ? filteredData : props?.myTask)?.map((task) => (
                <React.Fragment key={task?._id}>
                  <TableRow>
                    <TableCell align="center">{task?.title || ""}</TableCell>
                    <TableCell align="center">
                      {task?.description || ""}
                    </TableCell>
                    <TableCell align="center">{task?.dueDate || ""}</TableCell>
                    <TableCell className="text-capitalize" align="center">
                      {task?.priority || ""}
                    </TableCell>
                    <TableCell align="center">
                      {task?.status === "inProgress"
                        ? "In Progress"
                        : task?.status === "toDo"
                        ? "To Do"
                        : task?.status === "done"
                        ? "Done"
                        : ""}
                    </TableCell>
                    <TableCell className="text-capitalize" align="center">
                      {task?.author || ""}
                    </TableCell>
                    <TableCell align="center">
                      {task?.teamMember?.map((m) => m?.name + " ") || ""}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    myTask: state.taskData.myTask,
  };
};

const mapDispatchToProps = {
  getMyTasks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTaskTableDashboard);

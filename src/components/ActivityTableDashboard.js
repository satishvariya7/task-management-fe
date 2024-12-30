import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getActivityCount, getAllActivity } from "../utils/apiCallActions";
import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

const ActivityTableDashboard = (props) => {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props?.getAllActivity(navigate);
    props?.getActivityCount(navigate);
  }, []);

  useEffect(() => {
    if (value !== 0) {
      props?.getAllActivity(navigate, null, value);
      props?.getActivityCount(navigate, value);
    } else {
      props?.getAllActivity(navigate);
    }
  }, [value]);

  const handlePaginationChange = (e, page) => {
    setCurrentPage(page);
    const skip = page * 10 - 10;
    props?.getAllActivity(navigate, null, value, skip);
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 container size={12}>
        <Grid2 size={6} sx={{ display: "flex", gap: "10px" }}>
          <FormControl>
            <InputLabel>Select Task</InputLabel>
            <Select
              sx={{ width: "150px", height: "54px" }}
              label="Select Task"
              value={value}
              size="small"
              onChange={(e) => {
                setValue(e.target.value);
                setCurrentPage(1);
              }}
            >
              <MenuItem disabled value={0}>
                Select Task
              </MenuItem>
              <MenuItem value="Add Task">Add Task</MenuItem>
              <MenuItem value="Update Task">Update Task</MenuItem>
              <MenuItem value="Delete Task">Delete Task</MenuItem>
            </Select>
          </FormControl>

          <Button
            sx={{ height: "54px" }}
            variant="outlined"
            color="error"
            disabled={value === 0}
            onClick={() => {
              setValue(0);
              setCurrentPage(1);
              props?.getActivityCount(navigate);
              props?.getAllActivity(navigate);
            }}
          >
            Clear
          </Button>
        </Grid2>
        <Grid2
          size={6}
          sx={{ justifyContent: "end", display: "flex", alignItems: "center" }}
        >
          {props?.totalActivity &&
          props?.totalActivity !== 0 &&
          props?.totalActivity > 10 ? (
            <Pagination
              color="primary"
              onChange={handlePaginationChange}
              page={currentPage}
              count={Math.ceil(props?.totalActivity / 10)}
            />
          ) : (
            ""
          )}
        </Grid2>
      </Grid2>
      <Grid2 size={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="fw-bold">
                  User
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Category
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Activity
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Date
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.activity?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" className="text-danger">
                    Activity list is empty!
                  </TableCell>
                </TableRow>
              ) : (
                props?.activity?.map((activity) => (
                  <React.Fragment key={activity?._id}>
                    <TableRow>
                      <TableCell align="center">
                        {activity?.userName || "-"}
                      </TableCell>
                      <TableCell align="center">
                        {activity?.category || "-"}
                      </TableCell>
                      <TableCell align="center">
                        {activity?.activity || ""}
                      </TableCell>
                      <TableCell align="center">
                        {activity?.date || ""}
                      </TableCell>
                      <TableCell align="center">
                        {activity?.time || ""}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
      <Grid2 size={12} className="justify-content-center d-flex">
        {!props?.loadMoreBtn && props?.activity?.length !== 0 && (
          <Button
            onClick={() =>
              props?.getAllActivity(
                navigate,
                props?.activity?.length + 10,
                value
              )
            }
            className="text-capitalize w-25"
            size="small"
            variant="contained"
          >
            Load More
          </Button>
        )}
      </Grid2>
    </Grid2>
  );
};

const mapStateToProps = (state) => {
  return {
    activity: state.taskData.activity,
    loadMoreBtn: state.taskData.loadMoreBtn,
    totalActivity: state.taskData.totalActivity,
  };
};

const mapDispatchToProps = {
  getAllActivity,
  getActivityCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityTableDashboard);

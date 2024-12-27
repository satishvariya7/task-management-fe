import React, { Fragment, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllActivity } from "../utils/apiCallActions";
import { Button, Grid2 } from "@mui/material";

const ActivityTableDashboard = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props?.getAllActivity(navigate);
  }, []);

  return (
    <Grid2 container spacing={2}>
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
                  <TableCell colSpan={4} align="center" className="text-danger">
                    User list is empty!
                  </TableCell>
                </TableRow>
              ) : (
                props?.activity?.map((activity) => (
                  <React.Fragment key={activity?._id}>
                    <TableRow>
                      <TableCell align="center">
                        {activity?.userName || ""}
                      </TableCell>
                      <TableCell align="center">
                        {activity?.category || ""}
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
        {!props?.loadMoreBtn && (
          <Button
            onClick={() =>
              props?.getAllActivity(navigate, props?.activity?.length + 10)
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
  };
};

const mapDispatchToProps = {
  getAllActivity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityTableDashboard);

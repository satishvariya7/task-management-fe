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
import { Box, Collapse, IconButton } from "@mui/material";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { deleteTaskById, getTasks } from "../utils/apiCallActions";
import Swal from "sweetalert2";
import { TASK_TABLE_HEADERS } from "../utils";

const TaskDashboard = (props) => {
  const navigate = useNavigate();

  const loggedUser = localStorage.getItem("logged-user")
    ? JSON.parse(localStorage.getItem("logged-user"))
    : null;

  const [openRows, setOpenRows] = useState({});
  const handleToggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    props?.getTasks(navigate);
  }, []);

  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Do you want to delete task?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        props?.deleteTaskById(id, navigate);
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {TASK_TABLE_HEADERS?.map((i, index) => (
              <TableCell key={index} align="center" className="fw-bold">
                {i}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.tasks?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" className="text-danger">
                Task list is empty!
              </TableCell>
            </TableRow>
          ) : (
            props?.tasks?.map((tasks) => (
              <React.Fragment key={tasks?._id}>
                <TableRow>
                  <TableCell align="center">{tasks?.title || ""}</TableCell>
                  <TableCell align="center">
                    {tasks?.description || ""}
                  </TableCell>
                  <TableCell align="center">{tasks?.dueDate || ""}</TableCell>
                  <TableCell className="text-capitalize" align="center">
                    {tasks?.priority || ""}
                  </TableCell>
                  <TableCell align="center">
                    {tasks?.status === "inProgress"
                      ? "In Progress"
                      : tasks?.status === "toDo"
                      ? "To Do"
                      : tasks?.status === "done"
                      ? "Done"
                      : ""}
                  </TableCell>
                  <TableCell className="text-capitalize" align="center">
                    {tasks?.author || ""}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleToggleRow(tasks?._id)}
                    >
                      {openRows[tasks?._id] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    {tasks?.userId === loggedUser?._id ||
                    loggedUser?.category === "Project Manager" ? (
                      <Fragment>
                        <IconButton
                          onClick={() => navigate(`/edit-task/${tasks?._id}`)}
                        >
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteTask(tasks?._id)}
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Fragment>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={4}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={openRows[tasks?._id] || false}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Table size="small" aria-label="team members">
                          <TableHead>
                            <TableRow>
                              <TableCell className="fw-bold" align="center">
                                ID
                              </TableCell>
                              <TableCell className="fw-bold" align="center">
                                Name
                              </TableCell>
                              <TableCell className="fw-bold" align="center">
                                Category
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tasks?.teamMember?.map((member, index) => (
                              <TableRow key={index}>
                                <TableCell align="center">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                  {member?.name || ""}
                                </TableCell>
                                <TableCell align="center">
                                  {member?.category || ""}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.taskData.tasks,
  };
};

const mapDispatchToProps = {
  getTasks,
  deleteTaskById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDashboard);

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton, Collapse, Box, Button } from "@mui/material";
import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { deleteProjectById, getProjects } from "../utils/apiCallActions";
import Swal from "sweetalert2";

const TableDashboard = (props) => {
  const [openRows, setOpenRows] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    props?.getProjects(navigate);
  }, []);

  const handleToggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteProject = (id) => {
    Swal.fire({
      title: "Do you want to delete project?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        props?.deleteProjectById(id, navigate);
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="fw-bold">
              Project Name
            </TableCell>
            <TableCell align="center" className="fw-bold">
              Description
            </TableCell>
            <TableCell align="center" className="fw-bold">
              Team Members
            </TableCell>
            {props?.edited && (
              <TableCell align="center" className="fw-bold">
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.projects?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" className="text-danger">
                User list is empty!
              </TableCell>
            </TableRow>
          ) : (
            props?.projects?.map((project) => (
              <React.Fragment key={project?._id}>
                <TableRow>
                  <TableCell align="center">
                    {project?.projectName || ""}
                  </TableCell>
                  <TableCell align="center">
                    {project?.description || ""}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleToggleRow(project?._id)}
                    >
                      {openRows[project?._id] ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  {props?.edited && (
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          navigate(`/edit-project/${project?._id}`)
                        }
                      >
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteProject(project?._id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={4}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={openRows[project?._id] || false}
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
                            {project?.teamMember?.map((member, index) => (
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
    projects: state.projectData.projects,
  };
};

const mapDispatchToProps = {
  getProjects,
  deleteProjectById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDashboard);

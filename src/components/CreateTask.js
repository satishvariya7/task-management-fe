import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addTask, getProjects } from "../utils/apiCallActions";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AccountCircle,
  AccountTree,
  Logout,
  ManageSearch,
  Preview,
  Task,
} from "@mui/icons-material";
import { connect, useDispatch } from "react-redux";
import { getUserProfile } from "../utils/apiCallActions";
import { handleLogout } from "../utils";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import UserSelection from "./UserSelection";
import dayjs from "dayjs";

const drawerWidth = 240;

const CreateTask = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    projectId: "",
    teamMember: [],
  });
  const [validation, setValidation] = useState({});

  const imgSrc = props?.userProfile?.image
    ? `http://localhost:8000/users/images/${props?.userProfile?.image}`
    : "";

  const loggedUser = localStorage.getItem("logged-user")
    ? JSON.parse(localStorage.getItem("logged-user"))
    : null;

  useEffect(() => {
    const loggedUser = localStorage.getItem("logged-user");
    if (loggedUser) {
      props?.getUserProfile(JSON.parse(loggedUser), navigate);
      props?.getProjects(navigate);
    }
  }, []);

  const handleOnchange = (e, name) => {
    if (name === "dueDate") {
      const currentDate = e ? e.format("DD-MM-YYYY") : "";
      setData({ ...data, dueDate: currentDate });
      setValidation({ ...validation, dueDate: false });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: false });
    }
  };

  const formValidation = () => {
    let isValid = true;
    const newValidation = { ...validation };
    Object.keys(data).forEach((key) => {
      if (key === "teamMember" && data?.teamMember?.length === 0) {
        isValid = false;
        newValidation.teamMember = true;
      } else if (data[key] === "") {
        isValid = false;
        newValidation[key] = true;
      }
    });
    setValidation(newValidation);
    return isValid;
  };

  const handleCreateClick = () => {
    const isValid = formValidation();
    if (isValid) {
      props.addTask(data, setData, navigate);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {imgSrc && (
            <div className="profile">
              <img
                crossOrigin="anonymous"
                src={imgSrc}
                alt="profile-image"
                style={{ width: "45px", height: "45px", borderRadius: "50%" }}
              />
              <h5 className="m-0">{props?.userProfile?.name || ""}</h5>
              <h6 className="m-0">({props?.userProfile?.category || ""})</h6>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/my-task")}>
                <ListItemIcon>
                  <Task />
                </ListItemIcon>
                <ListItemText primary="My Task" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/dashboard")}>
                <ListItemIcon>
                  <AccountTree />
                </ListItemIcon>
                <ListItemText primary="Manage Task" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/activity")}>
                <ListItemIcon>
                  <Preview />
                </ListItemIcon>
                <ListItemText primary="Activity" />
              </ListItemButton>
            </ListItem>
            {(loggedUser?.category === "admin" ||
              loggedUser?.category === "project-manager") && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/projects")}>
                  <ListItemIcon>
                    <ManageSearch />
                  </ListItemIcon>
                  <ListItemText primary="Manage Project" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/profile")}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Manage Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleLogout(navigate)}>
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: "#d32f2f" }} primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div>
          <Grid2
            size={{ md: 6, xs: 12 }}
            container
            spacing={2}
            className="login-root"
          >
            <Grid2 size={{ md: 8, sm: 8, xs: 12 }}>
              <h4 className="login-text-header">CREATE TASK</h4>

              {/* title */}
              <div className="space-between">
                <TextField
                  size="small"
                  variant="outlined"
                  value={data?.title || ""}
                  name="title"
                  label="Title"
                  error={validation?.title}
                  fullWidth
                  onChange={(e) => handleOnchange(e)}
                />
                {validation?.title && (
                  <span className="error-massage">
                    Project name is required!
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-between">
                <TextField
                  size="small"
                  variant="outlined"
                  value={data?.description || ""}
                  name="description"
                  label="Description"
                  error={validation?.description}
                  fullWidth
                  onChange={(e) => handleOnchange(e)}
                />
                {validation?.description && (
                  <span className="error-massage">
                    Description name is required!
                  </span>
                )}
              </div>

              {/* Priority */}
              <div className="space-between">
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={data?.priority || 0}
                    label="Priority"
                    name="priority"
                    size="small"
                    error={validation?.priority || false}
                    onChange={(e) => handleOnchange(e)}
                  >
                    <MenuItem disabled value={0}>
                      Select Priority
                    </MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
                {validation?.priority && (
                  <span className="error-massage">Priority is required!</span>
                )}
              </div>

              {/* Date */}
              <div className="space-between">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      minDate={dayjs()}
                      sx={{ width: "100%" }}
                      onChange={(e) => handleOnchange(e, "dueDate")}
                      slotProps={{
                        textField: {
                          size: "small",
                          error: validation?.dueDate,
                          helperText: validation?.dueDate
                            ? "Date is require"
                            : "",
                        },
                      }}
                      label="Due Date"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              {/* Status */}
              <div className="space-between">
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={data?.status || 0}
                    label="Status"
                    name="status"
                    size="small"
                    error={validation?.status || false}
                    onChange={(e) => handleOnchange(e)}
                  >
                    <MenuItem disabled value={0}>
                      Select Status
                    </MenuItem>
                    <MenuItem value="toDo">To Do</MenuItem>
                    <MenuItem value="inProgress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </FormControl>
                {validation?.status && (
                  <span className="error-massage">Status is required!</span>
                )}
              </div>

              {/* Users */}
              <div className="space-between">
                <UserSelection
                  handleOnchange={handleOnchange}
                  error={validation?.teamMember}
                  value={data?.teamMember}
                />
                {validation?.teamMember && (
                  <span className="error-massage">Status is required!</span>
                )}
              </div>

              {/* Projects */}
              <div className="space-between">
                <FormControl fullWidth>
                  <InputLabel>Projects</InputLabel>
                  <Select
                    value={data?.projectId || 0}
                    label="Project"
                    name="projectId"
                    size="small"
                    error={validation?.projectId || false}
                    onChange={(e) => handleOnchange(e)}
                  >
                    <MenuItem disabled value={0}>
                      Select Project
                    </MenuItem>
                    {props?.projects?.length < 1 ? (
                      <MenuItem sx={{ color: "red" }} disabled>
                        No Project available first create a project!
                      </MenuItem>
                    ) : (
                      props?.projects?.map((i, index) => (
                        <MenuItem key={index} value={i?._id}>
                          {i?.projectName || ""}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {validation?.projectId && (
                  <span className="error-massage">Projects is required!</span>
                )}
              </div>

              {/* Buttons */}
              <div className="space-between d-flex gap-2">
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  fullWidth
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={() => handleCreateClick()}
                >
                  Create
                </Button>
              </div>
            </Grid2>
          </Grid2>
        </div>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    userProfile: state?.userData?.userProfile,
    existProject: state?.projectData?.existProject,
    projects: state?.projectData?.projects,
  };
};

const mapDispatchToProps = { getUserProfile, addTask, getProjects };

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);

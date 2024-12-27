import { Button, Grid2, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { addProject } from "../utils/apiCallActions";
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
import { handleLogout, SET_EXIST_PROJECT } from "../utils";
import UserSelection from "./UserSelection";

const drawerWidth = 240;

const CreateProject = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    projectName: "",
    description: "",
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
    }
  }, []);

  const handleOnchange = (e) => {
    if (e.target.name === "projectName") {
      setData({ ...data, projectName: e.target.value });
      setValidation({ ...validation, projectName: false });
      if (props?.existProject) {
        dispatch({ type: SET_EXIST_PROJECT, payload: false });
      }
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
      }
      if (data[key] === "") {
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
      props.addProject(data, setData, navigate);
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
              loggedUser?.category === "Project Manager") && (
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
              <h4 className="login-text-header">CREATE PROJECT</h4>

              {/* Project name */}
              <div className="space-between">
                <TextField
                  size="small"
                  variant="outlined"
                  value={data?.projectName || ""}
                  name="projectName"
                  label="Project Name"
                  error={validation?.projectName ? true : props?.existProject}
                  fullWidth
                  onChange={(e) => handleOnchange(e)}
                />
                {validation?.projectName && (
                  <span className="error-massage">
                    Project name is required!
                  </span>
                )}
                {props?.existProject && (
                  <span className="error-massage">
                    Project name already exist!
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

              {/* Team member */}
              <div className="space-between">
                <UserSelection
                  handleOnchange={handleOnchange}
                  error={validation?.teamMember}
                  value={data?.teamMember}
                />
                {validation?.teamMember && (
                  <span className="error-massage">
                    Team member is required!
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="space-between d-flex gap-2">
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  fullWidth
                  onClick={() => navigate("/projects")}
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
  };
};

const mapDispatchToProps = { addProject, getUserProfile };

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

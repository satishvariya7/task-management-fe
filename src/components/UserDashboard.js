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
import { connect } from "react-redux";
import { getUserProfile } from "../utils/apiCallActions";
import { useEffect } from "react";
import { handleLogout } from "../utils";
import TableDashboard from "./TableDashboard";
import { Button, Grid2, Typography } from "@mui/material";
import TaskDashboard from "./TaskDashboard";

const drawerWidth = 240;

const UserDashboard = (props) => {
  const navigate = useNavigate();

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
              <h5 className="m-0">
                {props?.userProfile?.name?.slice(0, 1).toUpperCase() || ""}
                {props?.userProfile?.name?.slice(1) || ""}
              </h5>
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
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <Typography align="center" variant="h5">
              Manage Task
            </Typography>
          </Grid2>
          <Grid2 size={12} className="d-flex justify-content-end">
            <Button
              onClick={() => navigate("/create-task")}
              variant="contained"
            >
              Create Task
            </Button>
          </Grid2>
          <Grid2 size={12}>
            <TaskDashboard />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.userData.userProfile,
  };
};

const mapDispatchToProps = {
  getUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);

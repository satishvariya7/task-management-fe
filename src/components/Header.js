import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <div className="header-root">
      <AppBar position="static">
        <Toolbar variant="dense">
          <div className="menu-item">
            <Typography
              variant="body1"
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </Typography>
            <Typography
              variant="body1"
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              SIGNUP
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

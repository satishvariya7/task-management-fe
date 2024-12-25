import {
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userLogin } from "../utils/apiCallActions";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { EMAIL_EXPRESSION } from "../utils";

const Login = (props) => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(null);
  const [data, setData] = useState({ email: "", password: "" });
  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        if (decodeToken.exp < new Date().getTime() / 1000) {
          setLogin(false);
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        setLogin(false);
        localStorage.removeItem("token");
      }
    } else setLogin(false);
  }, []);

  const handleOnchange = (e) => {
    if (e.target.name === "email") {
      setData({ ...data, email: e.target.value });
      setValidation({ ...validation, email: false, invalidEmail: false });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: false });
    }
  };

  const formValidation = () => {
    let isValid = true;
    const newValidation = { ...validation };
    Object.keys(data).forEach((key) => {
      if (key === "email" && data?.email !== "") {
        if (!EMAIL_EXPRESSION?.test(data?.email)) {
          isValid = false;
          newValidation.invalidEmail = true;
        }
      }
      if (data[key] === "") {
        isValid = false;
        newValidation[key] = true;
      }
    });
    setValidation(newValidation);
    return isValid;
  };

  const handleLoginClick = () => {
    const isValid = formValidation();
    if (isValid) {
      props.userLogin(data, navigate);
    }
  };

  return (
    login === false && (
      <div>
        <Header />
        <Grid2
          size={{ md: 6, xs: 12 }}
          container
          spacing={2}
          className="login-root"
        >
          <Grid2 size={{ md: 6, sm: 8, xs: 12 }}>
            <h3 className="login-text-header">LOGIN</h3>
            <div className="space-between">
              <TextField
                size="small"
                variant="outlined"
                value={data?.email || ""}
                name="email"
                label="Email"
                error={validation?.email ? true : validation?.invalidEmail}
                fullWidth
                onChange={(e) => handleOnchange(e)}
              />
              <span className="error-massage">
                {validation?.email
                  ? "Email is required!"
                  : validation?.invalidEmail
                  ? "Invalid email!"
                  : ""}
              </span>
            </div>
            <div className="space-between">
              <TextField
                size="small"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={data?.password || ""}
                name="password"
                label="Password"
                error={validation?.password || false}
                fullWidth
                onChange={(e) => handleOnchange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {validation?.password && (
                <span className="error-massage"> Password is required!</span>
              )}
            </div>
            <div className="space-between">
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={() => handleLoginClick()}
              >
                LOGIN
              </Button>
            </div>
          </Grid2>
        </Grid2>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = { userLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Login);

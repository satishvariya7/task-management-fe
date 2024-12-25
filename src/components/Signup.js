import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { userSignUp } from "../utils/apiCallActions";
import { CATEGORY_ITEMS, EMAIL_EXPRESSION, SET_EXIST_EMAIL } from "../utils";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DropzoneArea from "./DropzoneArea";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState(null);
  const [data, setData] = useState({
    name: "",
    gender: "",
    age: "",
    hobbies: [],
    email: "",
    password: "",
    image: "",
    category: "",
  });
  const [validation, setValidation] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        if (decodeToken.exp < new Date().getTime() / 1000) {
          setLogin(false);
          localStorage.removeItem("token");
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
    if (e.target.name === "hobbies") {
      if (e.target.checked) {
        setData({ ...data, hobbies: [...data.hobbies, e.target.value] });
      } else {
        setData({
          ...data,
          hobbies: data?.hobbies?.filter((i) => i !== e.target.value),
        });
      }
      setValidation({ ...validation, [e.target.name]: false });
    } else if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setData({ ...data, image: file });
        setValidation({ ...validation, image: false });
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgSrc(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else if (e.target.name === "email") {
      setData({ ...data, email: e.target.value });
      setValidation({ ...validation, email: false, invalidEmail: false });
    } else if (e.target.name === "name") {
      setData({ ...data, name: e.target.value, title: e.target.value });
      setValidation({ ...validation, name: false });
    } else if (e.target.name === "age") {
      setData({ ...data, age: e.target.value });
      setValidation({ ...validation, age: false, invalidAge: false });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: false });
    }
    if (e.target.name === "email" && props.existEmail) {
      dispatch({ type: SET_EXIST_EMAIL, payload: false });
    }
  };

  const formValidation = () => {
    let isValid = true;
    const newValidation = { ...validation };
    Object.keys(data).forEach((key) => {
      if (key === "hobbies") {
        if (data?.hobbies?.length === 0) {
          isValid = false;
          newValidation.hobbies = true;
        }
      }
      if (key === "age" && data?.age !== "") {
        if (data?.age < 1) {
          isValid = false;
          newValidation.invalidAge = true;
        }
      } else if (key === "email" && data?.email !== "") {
        if (!EMAIL_EXPRESSION?.test(data?.email)) {
          isValid = false;
          newValidation.invalidEmail = true;
        }
      } else if (data[key] === "") {
        isValid = false;
        newValidation[key] = true;
      }
    });
    setValidation(newValidation);
    return isValid;
  };

  const handleSignClick = () => {
    const isValid = formValidation();
    if (isValid) {
      props.userSignUp(data, setData, setImgSrc);
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
            <h3 className="login-text-header">SIGNUP</h3>

            {/* Name */}
            <div className="space-between">
              <TextField
                size="small"
                variant="outlined"
                value={data?.name || ""}
                name="name"
                label="Name"
                error={validation?.name || false}
                fullWidth
                onChange={(e) => handleOnchange(e)}
              />
              {validation?.name && (
                <span className="error-massage">Name is required!</span>
              )}
            </div>

            {/* Gender */}
            <div className="space-between">
              <RadioGroup
                row
                onChange={(e) => {
                  handleOnchange(e);
                }}
              >
                <FormLabel style={{ marginRight: "20px" }}>Gender :</FormLabel>
                <FormControlLabel
                  label="Male"
                  name="gender"
                  value="male"
                  checked={data?.gender === "male" || false}
                  style={{ marginLeft: "0px" }}
                  control={
                    <Radio
                      size="small"
                      style={{ padding: "0px 3px 0px 0px" }}
                    />
                  }
                />
                <FormControlLabel
                  label="Female"
                  name="gender"
                  value="female"
                  checked={data?.gender === "female" || false}
                  style={{ marginLeft: "0px" }}
                  control={
                    <Radio
                      size="small"
                      style={{ padding: "0px 3px 0px 0px" }}
                    />
                  }
                />
                <FormControlLabel
                  label="Other"
                  name="gender"
                  value="other"
                  checked={data?.gender === "other" || false}
                  style={{ marginLeft: "0px" }}
                  control={
                    <Radio
                      size="small"
                      style={{ padding: "0px 3px 0px 0px" }}
                    />
                  }
                />
              </RadioGroup>
              {validation?.gender && (
                <span className="error-massage">Gender is required!</span>
              )}
            </div>

            {/* Age */}
            <div className="space-between">
              <TextField
                size="small"
                variant="outlined"
                value={data?.age || ""}
                name="age"
                label="Age"
                type="number"
                error={
                  validation?.age ? true : validation?.invalidAge ? true : false
                }
                fullWidth
                onChange={(e) => handleOnchange(e)}
              />
              <span className="error-massage">
                {validation?.age
                  ? "Age is required!"
                  : validation?.invalidAge
                  ? "Invalid age!"
                  : ""}
              </span>
            </div>

            {/* Hobbies */}
            <div className="space-between">
              <FormGroup
                row
                onChange={(e) => {
                  handleOnchange(e);
                }}
              >
                <FormLabel style={{ marginRight: "20px" }}>Hobbies :</FormLabel>
                <FormControlLabel
                  label="Gaming"
                  name="hobbies"
                  value="gaming"
                  checked={
                    data?.hobbies?.find((i) => i === "gaming") ? true : false
                  }
                  style={{ marginLeft: "0px" }}
                  control={
                    <Checkbox
                      size="small"
                      style={{ padding: "0px 3px 0px 0px" }}
                    />
                  }
                />
                <FormControlLabel
                  label="Reading"
                  name="hobbies"
                  value="reading"
                  checked={
                    data?.hobbies?.find((i) => i === "reading") ? true : false
                  }
                  style={{ marginLeft: "0px" }}
                  control={
                    <Checkbox
                      size="small"
                      style={{ padding: "0px 3px 0px 0px" }}
                    />
                  }
                />
                <FormControlLabel
                  label="Cricket"
                  name="hobbies"
                  value="cricket"
                  checked={
                    data?.hobbies?.find((i) => i === "cricket") ? true : false
                  }
                  style={{ marginLeft: "0px" }}
                  control={
                    <Checkbox
                      size="small"
                      style={{ padding: "0px 3px 0px 0px" }}
                    />
                  }
                />
              </FormGroup>
              {validation?.hobbies && (
                <span className="error-massage">Hobbies is required!</span>
              )}
            </div>

            {/* Email */}
            <div className="space-between">
              <TextField
                size="small"
                variant="outlined"
                value={data?.email || ""}
                name="email"
                label="Email"
                error={validation?.email || props?.existEmail || false}
                fullWidth
                onChange={(e) => handleOnchange(e)}
              />
              <span className="error-massage">
                {validation?.email
                  ? "Email is required!"
                  : validation?.invalidEmail
                  ? "Invalid email!"
                  : props?.existEmail
                  ? "Email already exist!"
                  : ""}
              </span>

              {/* {validation?.email && (
                <span className="error-massage">Email is required!</span>
              )}
              {props?.existEmail && (
                <span className="error-massage">Email already exist!</span>
              )} */}
            </div>

            {/* Password */}
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
                <span className="error-massage">Password is required!</span>
              )}
            </div>

            {/* Profile image */}
            <div className="space-between">
              <DropzoneArea
                handleOnchange={handleOnchange}
                imgSrc={imgSrc}
                note={
                  "Drag 'n' drop some files here, or click to select profile picture"
                }
              />

              {validation?.image && (
                <p className="error-massage">Profile picture is required!</p>
              )}
            </div>

            {/* Category */}
            <div className="space-between">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  value={data?.category || 0}
                  label="Age"
                  name="category"
                  onChange={(e) => handleOnchange(e)}
                  error={validation?.category}
                >
                  {CATEGORY_ITEMS?.map((item, index) => (
                    <MenuItem
                      key={index}
                      disabled={item?.disable}
                      value={item?.value}
                    >
                      {item?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {validation?.category && (
                <p className="error-massage">Category picture is required!</p>
              )}
            </div>

            {/* Button */}
            <div className="space-between">
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={() => handleSignClick()}
              >
                SIGNUP
              </Button>
            </div>
          </Grid2>
        </Grid2>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    existEmail: state.userData.existEmail,
  };
};

const mapDispatchToProps = { userSignUp };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

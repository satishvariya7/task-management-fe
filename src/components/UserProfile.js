import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserById, updateUserById } from "../utils/apiCallActions";
import { useNavigate, useParams } from "react-router-dom";
import DropzoneArea from "./DropzoneArea";

const UserProfile = (props) => {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("logged-user"))._id;

  const [data, setData] = useState({
    name: "",
    gender: "",
    age: "",
    hobbies: [],
    email: "",
    image: "",
  });
  const [validation, setValidation] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const productImage = data?.image
    ? `http://localhost:8000/users/images/${data?.image}`
    : "";

  useEffect(() => {
    props.getUserById(id, navigate);
  }, [id]);

  useEffect(() => {
    const { editUser } = props;
    if (editUser) {
      setData({
        name: editUser?.name,
        gender: editUser?.gender,
        age: editUser?.age,
        hobbies: editUser?.hobbies,
        email: editUser?.email,
        password: editUser?.password,
        image: editUser?.image,
      });
    }
  }, [props.editUser]);

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
        setData({ ...data, image: file, updated: true });
        setValidation({ ...validation, image: false });
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgSrc(reader.result);
        };
        reader.readAsDataURL(file);
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
      if (key === "hobbies") {
        if (data?.hobbies?.length === 0) {
          isValid = false;
          newValidation.hobbies = true;
        }
      } else if (data[key] === "") {
        isValid = false;
        newValidation[key] = true;
      }
    });
    setValidation(newValidation);
    return isValid;
  };

  const handleSaveClick = () => {
    const isValid = formValidation();
    if (isValid) {
      props.updateUserById(id, data, navigate);
    }
  };

  return (
    props?.editUser && (
      <div>
        <Grid2
          size={{ md: 8, xs: 12 }}
          container
          spacing={2}
          className="login-root"
        >
          <Grid2 size={{ md: 8, sm: 8, xs: 12 }}>
            <h3 className="login-text-header">EDIT PROFILE</h3>

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
                error={validation?.age || false}
                fullWidth
                onChange={(e) => handleOnchange(e)}
              />
              {validation?.age && (
                <span className="error-massage">Age is required!</span>
              )}
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
                error={validation?.email || false}
                fullWidth
                disabled
                onChange={(e) => handleOnchange(e)}
              />
              {validation?.email && (
                <span className="error-massage">Email is required!</span>
              )}
            </div>

            {/* Profile image */}
            <div className="space-between">
              <DropzoneArea
                handleOnchange={handleOnchange}
                imgSrc={imgSrc ? imgSrc : productImage}
                note={
                  "Drag 'n' drop some files here, or click to change profile picture"
                }
              />
              {validation?.image && (
                <p className="error-massage">Profile picture is required!</p>
              )}
            </div>

            {/* Category */}
            <div className="space-between">
              <TextField
                size="small"
                variant="outlined"
                value={props?.editUser?.category || ""}
                name="category"
                label="Category"
                fullWidth
                disabled
              />
            </div>

            {/* Button */}
            <div className="space-between d-flex gap-2">
              <Button
                variant="contained"
                size="small"
                fullWidth
                color="error"
                onClick={() => navigate("/dashboard")}
              >
                CANCEL
              </Button>
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={() => handleSaveClick()}
              >
                SAVE
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
    editUser: state.userData.editUser,
  };
};

const mapDispatchToProps = { getUserById, updateUserById };

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

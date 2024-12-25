import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { getUsers } from "../utils/apiCallActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserSelection = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    props.getUsers(navigate);
  }, []);

  const onChange = (e, value) => {
    if (value?.length > 0) {
      props?.handleOnchange({ target: { name: "teamMember", value: value } });
    } else {
      props?.handleOnchange({ target: { name: "teamMember", value: [] } });
    }
  };

  return (
    <Stack sx spacing={3}>
      <Autocomplete
        multiple
        id="teamMember"
        options={props?.users}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        disableClearable
        value={props?.value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField error={props?.error} {...params} label="Team member" />
        )}
      />
    </Stack>
  );
};

const mapStateToProps = (state) => {
  return {
    userProfile: state?.userData?.userProfile,
    users: state?.userData?.users,
  };
};

const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UserSelection);

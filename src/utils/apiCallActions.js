import axios from "axios";
import Swal from "sweetalert2";
import {
  ADD_PROJECT,
  ADD_TASK,
  DELETE_PROJECT_BY_ID,
  DELETE_TASK_BY_ID,
  GET_ALL_ACTIVITY,
  GET_ALL_PROJECTS,
  GET_ALL_TASKS,
  GET_MY_TASKS,
  GET_PROJECT_BY_ID,
  GET_TASK_BY_ID,
  GET_USER_BY_ID,
  GET_USER_PROFILE,
  GET_USERS,
  SET_ALL_ACTIVITY,
  SET_DISABLE_LOAD_MORE,
  SET_EXIST_EMAIL,
  SET_EXIST_PROJECT,
  SET_MY_TASK,
  SET_PROJECTS,
  SET_SINGLE_PRODUCT,
  SET_SINGLE_TASK,
  SET_SINGLE_USER,
  SET_TASKS,
  SET_USER_PROFILE,
  SET_USERS,
  UPDATE_PROJECT_BY_ID,
  UPDATE_TASK_BY_ID,
  UPDATE_USER_BY_ID,
  USER_LOGIN,
  USER_SIGNUP,
  userUnauthorize,
} from "../utils";

//Users API...
export const userSignUp = (data, setData, setImgSrc) => async (dispatch) => {
  const formdata = new FormData();
  Object.keys(data)?.forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item) => formdata.append(key, item));
    } else {
      formdata.append(key, data[key]);
    }
  });
  await axios
    .post(USER_SIGNUP, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      const { isError, message, success, existEmail } = res.data;
      if (isError) {
        console.log("Error in userSignup is ==>", message);
      } else {
        if (existEmail) {
          dispatch({ type: SET_EXIST_EMAIL, payload: true });
        } else if (success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully signup!",
            showConfirmButton: false,
            timer: 1500,
          });
          setData({
            name: "",
            gender: "",
            age: "",
            hobbies: [],
            email: "",
            password: "",
            image: "",
          });
          setImgSrc("");
        }
      }
    })
    .catch((err) => {
      console.log("Error in userSignup is ==>", err.message);
    });
};

export const userLogin = (data, navigate) => async (dispatch) => {
  await axios
    .post(USER_LOGIN, data)
    .then((res) => {
      const { isError, message, isLogin, token, loggedUser } = res.data;
      if (isError) {
        console.log("Error in userLogin is ==>", message);
      } else if (isLogin) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("token", token);
        localStorage.setItem("logged-user", JSON.stringify(loggedUser));
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credential invalid!",
        });
      }
    })
    .catch((err) => {
      console.log("Error in userLogin is ==>", err.message);
    });
};

export const getUsers = (navigate) => async (dispatch) => {
  await axios
    .get(GET_USERS, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getUsers is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        dispatch({ type: SET_USERS, payload: data });
      }
    })
    .catch((err) => {
      console.log("Error in getUsers is ==>", err.message);
    });
};

export const getUserById = (id, navigate) => async (dispatch) => {
  await axios
    .get(GET_USER_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getUserById is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        dispatch({ type: SET_SINGLE_USER, payload: data });
      }
    })
    .catch((err) => {
      console.log("Error in getUserById is ==>", err.message);
    });
};

export const updateUserById = (id, data, navigate) => async (dispatch) => {
  const formdata = new FormData();
  Object.keys(data)?.forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item) => formdata.append(key, item));
    } else {
      formdata.append(key, data[key]);
    }
  });
  const newData = typeof data?.image === "string" ? data : formdata;
  await axios
    .put(UPDATE_USER_BY_ID(id), newData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, updated, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getUserById is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else if (updated) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Record successfully updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getUserById(id, navigate));
        const loggedUser = localStorage.getItem("logged-user");
        if (loggedUser) {
          const newData = JSON.parse(loggedUser);
          dispatch(
            getUserProfile(
              { email: newData?.email, password: newData?.password },
              navigate
            )
          );
        }
      } else
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.message,
        });
    })
    .catch((err) => {
      console.log("Error in getUserById is ==>", err.message);
    });
};

export const getUserProfile = (data, navigate) => async (dispatch) => {
  const newData = { email: data?.email, password: data?.password };
  await axios
    .post(GET_USER_PROFILE, newData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getUserProfile is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        dispatch({ type: SET_USER_PROFILE, payload: data });
      }
    })
    .catch((err) => {
      console.log("Error in getUserProfile is ==>", err.message);
    });
};

//Product API...
export const addProject = (data, setData, navigate) => async (dispatch) => {
  const loggedUser = localStorage.getItem("logged-user")
    ? JSON.parse(localStorage.getItem("logged-user"))
    : null;

  data.user = loggedUser?.name;
  data.userId = loggedUser?._id;
  await axios
    .post(ADD_PROJECT, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, success, existProject, unauthorize } = res.data;
      if (isError) {
        console.log("Error in addProject is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        if (existProject) {
          dispatch({ type: SET_EXIST_PROJECT, payload: true });
        } else if (success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
          setData({
            projectName: "",
            description: "",
            teamMember: [],
          });
        }
      }
    })
    .catch((err) => {
      console.log("Error in addProject is ==>", err.message);
    });
};

export const getProjects = (navigate) => async (dispatch) => {
  await axios
    .get(GET_ALL_PROJECTS, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getUsers is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        dispatch({ type: SET_PROJECTS, payload: data });
      }
    })
    .catch((err) => {
      console.log("Error in getUsers is ==>", err.message);
    });
};

export const getProjectById = (id, navigate) => async (dispatch) => {
  await axios
    .get(GET_PROJECT_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getProjectById is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        dispatch({ type: SET_SINGLE_PRODUCT, payload: data });
      }
    })
    .catch((err) => {
      console.log("Error in getProjectById is ==>", err.message);
    });
};

export const updateProjectById = (id, data, navigate) => async (dispatch) => {
  const loggedUser = localStorage.getItem("logged-user")
    ? JSON.parse(localStorage.getItem("logged-user"))
    : null;

  data.userId = loggedUser?._id;
  await axios
    .put(UPDATE_PROJECT_BY_ID(id), data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, updated, unauthorize } = res.data;
      if (isError) {
        console.log("Error in updateProjectById is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else if (updated) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Record successfully updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getProjectById(id, navigate));
      }
    })
    .catch((err) => {
      console.log("Error in updateProjectById is ==>", err.message);
    });
};

export const deleteProjectById = (id, navigate) => async (dispatch) => {
  await axios
    .delete(DELETE_PROJECT_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, deleted, unauthorize } = res.data;
      if (isError) {
        console.log("Error in deleteProjectById is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else if (deleted) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Record successfully deleted!",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getProjects(navigate));
      } else
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
    })
    .catch((err) => {
      console.log("Error in deleteProjectById is ==>", err.message);
    });
};

//Task API...
export const addTask = (data, setData, navigate) => async (dispatch) => {
  const loggedUser = localStorage.getItem("logged-user")
    ? JSON.parse(localStorage.getItem("logged-user"))
    : null;

  const newData = {
    ...data,
    userId: loggedUser._id,
    author: loggedUser.category,
  };
  await axios
    .post(ADD_TASK, newData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, success, unauthorize } = res.data;
      if (isError) {
        console.log("Error in addTask is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else if (success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setData({
          title: "",
          description: "",
          dueDate: "",
          priority: "",
          status: "",
          projectId: "",
          teamMember: [],
        });
      }
    })
    .catch((err) => {
      console.log("Error in addTask is ==>", err.message);
    });
};

export const getTasks = (navigate) => async (dispatch) => {
  await axios
    .get(GET_ALL_TASKS, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getTasks is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        dispatch({ type: SET_TASKS, payload: data });
      }
    })
    .catch((err) => {
      console.log("Error in getTasks is ==>", err.message);
    });
};

export const getTaskById = (id, navigate) => async (dispatch) => {
  await axios
    .get(GET_TASK_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getTaskById is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        dispatch({ type: SET_SINGLE_TASK, payload: data });
      }
    })
    .catch((err) => {
      console.log("Error in getTaskById is ==>", err.message);
    });
};

export const updateTaskById = (id, data, navigate) => async (dispatch) => {
  const loggedUser = localStorage.getItem("logged-user")
    ? JSON.parse(localStorage.getItem("logged-user"))
    : null;
  data.userId = loggedUser._id;
  await axios
    .put(UPDATE_TASK_BY_ID(id), data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, updated } = res.data;
      if (isError) {
        console.log("Error in updateTaskById is ==>", message);
      } else if (updated) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Record successfully updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getTaskById(id, navigate));
      }
    })
    .catch((err) => {
      console.log("Error in updateTaskById is ==>", err.message);
    });
};

export const deleteTaskById = (id, navigate) => async (dispatch) => {
  const loggedUser = localStorage.getItem("logged-user")
    ? JSON.parse(localStorage.getItem("logged-user"))
    : null;

  await axios
    .delete(DELETE_TASK_BY_ID(id, loggedUser._id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, deleted, unauthorize } = res.data;
      if (isError) {
        console.log("Error in deleteTaskById is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else if (deleted) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Record successfully deleted!",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getTasks(navigate));
      } else
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
    })
    .catch((err) => {
      console.log("Error in deleteTaskById is ==>", err.message);
    });
};

export const getAllActivity = (navigate, loadMore) => async (dispatch) => {
  await axios
    .get(GET_ALL_ACTIVITY(loadMore), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getAllActivity is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        if (loadMore && loadMore - 10 === data?.length) {
          dispatch({ type: SET_DISABLE_LOAD_MORE, payload: true });
        } else {
          dispatch({ type: SET_ALL_ACTIVITY, payload: data });
          dispatch({ type: SET_DISABLE_LOAD_MORE, payload: false });
        }
      }
    })
    .catch((err) => {
      console.log("Error in getAllActivity is ==>", err.message);
    });
};

export const getMyTasks = (navigate, value) => async (dispatch) => {
  const loggedUser = localStorage.getItem("logged-user")
    ? JSON.parse(localStorage.getItem("logged-user"))
    : null;
  await axios
    .get(GET_MY_TASKS(loggedUser?._id, value), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const { isError, message, data, unauthorize } = res.data;
      if (isError) {
        console.log("Error in getMyTasks is ==>", message);
      } else if (unauthorize) {
        userUnauthorize(navigate);
      } else {
        dispatch({ type: SET_MY_TASK, payload: data });
      }
    })
    .catch((err) => {
      console.log("Error in getMyTasks is ==>", err.message);
    });
};

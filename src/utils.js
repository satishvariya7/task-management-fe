import Swal from "sweetalert2";

export const SET_EXIST_EMAIL = "SET_EXIST_EMAIL";
export const SET_USERS = "SET_USERS";
export const SET_SINGLE_USER = "SET_SINGLE_USER";
export const SET_USER_PROFILE = "SET_USER_PROFILE";

export const SET_EXIST_PROJECT = "SET_EXIST_PROJECT";
export const SET_PROJECTS = "SET_PROJECTS";
export const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

export const SET_TASKS = "SET_TASKS";
export const SET_MY_TASK = "SET_MY_TASK";
export const SET_SINGLE_TASK = "SET_SINGLE_TASK";

export const SET_ALL_ACTIVITY = "SET_ALL_ACTIVITY";
export const SET_DISABLE_LOAD_MORE = "SET_DISABLE_LOAD_MORE";
export const SET_ACTIVITY_COUNT = "SET_ACTIVITY_COUNT";

export const EMAIL_EXPRESSION =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const CATEGORY_ITEMS = [
  { label: "Select category", disable: true, value: 0 },
  { label: "Admin", value: "Admin" },
  { label: "Project Manager", value: "Project Manager" },
  { label: "Team Member", value: "Team Member" },
];

export const TASK_TABLE_HEADERS = [
  "Task Title",
  "Description",
  "Due Date",
  "Priority",
  "Status",
  "Author",
  "Team member",
  "Actions",
];

export const MY_TASK_TABLE_HEADERS = [
  "Task Title",
  "Description",
  "Due Date",
  "Priority",
  "Status",
  "Author",
  "Team member",
];

export const USER_SIGNUP = "http://localhost:8000/user/add";
export const USER_LOGIN = "http://localhost:8000/user/login";
export const GET_USERS = "http://localhost:8000/user/all";
export const GET_USER_PROFILE = "http://localhost:8000/user/profile";
export const CHANGE_USERS_PASSWORD =
  "http://localhost:8000/user/change-password";
export const GET_USER_BY_ID = (id) => `http://localhost:8000/user/${id}`;
export const UPDATE_USER_BY_ID = (id) =>
  `http://localhost:8000/user/update/${id}`;
export const DELETE_USER_BY_ID = (id) =>
  `http://localhost:8000/user/delete/${id}`;

export const ADD_PROJECT = "http://localhost:8000/project/add";
export const GET_ALL_PROJECTS = "http://localhost:8000/project/all";
export const GET_PROJECT_BY_ID = (id) => `http://localhost:8000/project/${id}`;
export const UPDATE_PROJECT_BY_ID = (id) =>
  `http://localhost:8000/project/update/${id}`;
export const DELETE_PROJECT_BY_ID = (id) =>
  `http://localhost:8000/project/delete/${id}`;

export const ADD_TASK = "http://localhost:8000/task/add";
export const GET_ALL_TASKS = `http://localhost:8000/task/all`;
export const GET_TASK_BY_ID = (id) => `http://localhost:8000/task/${id}`;
export const UPDATE_TASK_BY_ID = (id) =>
  `http://localhost:8000/task/update/${id}`;
export const GET_MY_TASKS = (id, value) => {
  const newValue = value ? value : "all";
  return `http://localhost:8000/task/my-task/${id}/${newValue}`;
};
export const DELETE_TASK_BY_ID = (id, userId) =>
  `http://localhost:8000/task/delete/${id}/${userId}`;
export const GET_USER_TASK_BY_ID = (id) =>
  `http://localhost:8000/task/user/${id}`;

export const GET_ALL_ACTIVITY = (more) => {
  if (more) return `http://localhost:8000/activity/all/${more}`;
  else return `http://localhost:8000/activity/all/10`;
};
export const GET_ACTIVITY_LENGTH = (search) => {
  if (search) return `http://localhost:8000/activity/count/${search}`;
  else return `http://localhost:8000/activity/count/all`;
};

export const handleLogout = (navigate) => {
  Swal.fire({
    title: "Do you want to logout?",
    showDenyButton: true,
    confirmButtonText: "Logout",
    denyButtonText: `Cancel`,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("credential");
      navigate("/login");
    }
  });
};

export const userUnauthorize = (navigate) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Unauthorize user!",
  });
  localStorage.removeItem("logged-user");
  localStorage.removeItem("token");
  navigate("/login");
};

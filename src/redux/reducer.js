import {
  SET_ALL_ACTIVITY,
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
} from "../utils";

const initialState = {
  users: null,
  existEmail: false,
  existProduct: false,
  editUser: null,
  userProfile: null,
};

const initialProjectState = {
  existProject: false,
  projects: [],
  editProject: null,
};

const initialTaskState = {
  tasks: null,
  editTask: null,
  myTask: null,
  activity: null,
};

export const userData = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USERS:
      return {
        ...state,
        users: payload,
      };
    case SET_EXIST_EMAIL:
      return {
        ...state,
        existEmail: payload,
      };
    case SET_SINGLE_USER:
      return {
        ...state,
        editUser: payload,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
      };
    default:
      return state;
  }
};

export const projectData = (state = initialProjectState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_EXIST_PROJECT:
      return {
        ...state,
        existProject: payload,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: payload,
      };
    case SET_SINGLE_PRODUCT:
      return {
        ...state,
        editProject: payload,
      };
    default:
      return state;
  }
};

export const taskData = (state = initialTaskState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    case SET_MY_TASK:
      return {
        ...state,
        myTask: payload,
      };
    case SET_SINGLE_TASK:
      return {
        ...state,
        editTask: payload,
      };
    case SET_ALL_ACTIVITY:
      return {
        ...state,
        activity: payload,
      };
    default:
      return state;
  }
};

import { createSlice } from "@reduxjs/toolkit";
import config from "../config.json";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "projects",
  initialState: { list: [], loading: "false" },
  reducers: {
    projectsRequested: (projects, action) => {
      projects.loading = true;
    },
    projectsRequestFail: (projects, action) => {
      projects.loading = false;
    },
    projectsReceived: (projects, action) => {
      projects.list = action.payload;
      projects.loading = false;
    },
    projectAdded: (projects, action) => {
      projects.list.push({
        id: Date.now(),
        name: action.payload.name,
      });
    },
    projectEdited: (projects, action) => {
      const index = projects.list.findIndex((b) => b.id === action.payload.id);
      projects.list[index].name = action.payload.name;
    },
    projectRemoved: (projects, action) => {
      const index = projects.list.findIndex((b) => b.id === action.payload.id);
      projects.list.splice(index, 1);
    },
  },
});
const url = config.projects;
const {
  projectAdded,
  projectRemoved,
  projectsRequested,
  projectsRequestFail,
  projectsReceived,
  projectEdited,
} = slice.actions;

export const loadProjects = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/projects",
      onStart: projectsRequested.type,
      onError: projectsRequestFail.type,
      onSuccess: projectsReceived.type,
    })
  );
};

export const addProject = (project) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: url,
      method: "post",
      data: project,
      onSuccess: projectAdded.type,
    })
  );
};
export const editProject = (id, projectText) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/${id}`,
      method: "patch",
      data: { name: projectText },
      onSuccess: projectEdited.type,
    })
  );
};

export const removeProject = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `${url}/${id}`,
      method: "delete",
      data: id,
      onSuccess: projectRemoved.type,
    })
  );
};

export default slice.reducer;

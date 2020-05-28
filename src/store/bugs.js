import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";
import * as actions from "./api";
import config from "../config.json";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: "false",
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestFail: (bugs, action) => {
      bugs.loading = false;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((b) => b.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugEdited: (bugs, action) => {
      const index = bugs.list.findIndex((b) => b.id === action.payload.id);
      bugs.list[index].description = action.payload.description;
    },
    userAssignedToBug: (bugs, action) => {
      const index = bugs.list.findIndex((b) => b.id === action.payload.id);
      bugs.list[index].userId = action.payload.userId;
    },
    projectAssignedToBug: (bugs, action) => {
      const index = bugs.list.findIndex((b) => b.id === action.payload.id);
      bugs.list[index].projectId = action.payload.projectId;
    },
  },
});

const url = config.bugs;

const {
  bugAdded,
  bugResolved,
  userAssignedToBug,
  bugsReceived,
  bugsRequested,
  bugsRequestFail,
  projectAssignedToBug,
  bugEdited,
} = slice.actions;
export default slice.reducer;
//loading bugs
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;
  return dispatch(
    actions.apiCallBegan({
      url: url,
      onStart: bugsRequested.type,
      onError: bugsRequestFail.type,
      onSuccess: bugsReceived.type,
    })
  );
};

export const addBug = (bug) =>
  actions.apiCallBegan({
    url: url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  actions.apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const editBug = (id, bug) =>
  actions.apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: { description: bug },
    onSuccess: bugEdited.type,
  });

export const assignUserToBug = (id, userId) =>
  actions.apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: { userId },
    onSuccess: userAssignedToBug.type,
  });

export const assignProjectToBug = (bugId, projectId) =>
  actions.apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: { projectId },
    onSuccess: projectAssignedToBug.type,
  });

export const unresolvedBUgsSelector = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((b) => !b.resolved)
);

export const bugsOfUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((b) => b.userId === userId)
  );

export const bugsOfProjectSelector = (projectId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((b) => b.projectId === projectId)
  );

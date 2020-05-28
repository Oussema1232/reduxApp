import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { loadBugs, bugsOfProjectSelector } from "../store/bugs";
import { loadProjects } from "../store/projects";
import Panel from "../commun/panel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.entities.projects.list);

  useEffect(() => {
    dispatch(loadProjects());
    dispatch(loadBugs());
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <Panel project={project} />
      ))}
    </div>
  );
}

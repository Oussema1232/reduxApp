import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { blue } from "@material-ui/core/colors";
import { grey } from "@material-ui/core/colors";
import SecondList from "./bugList";
import AddItem from "../commun/addItem";
import ItemLayout from "../commun/itemLayout";
import { editProject, removeProject } from "../store/projects";
import { addBug } from "../store/bugs";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "70%",
    flexShrink: 0,
    color: "#eee",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  panel: {
    borderBottom: "1px solid blue",
    borderTop: "1px solid blue",
  },
  bugList: {
    backgroundColor: grey[100],
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Panel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon style={{ color: blue[500] }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.panel}
        >
          <ItemLayout
            item={props.topList}
            name="name"
            firstIconItem={<DeleteIcon />}
            secondIconItem={<EditIcon />}
            secondIconTextfield={<SaveIcon />}
            color="primary"
            onDispatchFirstButton={removeProject}
            firstButtonBeforeClick="delete"
            firstButtonAfterClick=""
            onDispatchSecondButton={editProject}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.bugList}>
          <SecondList list={props.list} />

          <AddItem
            onDispatchAdd={addBug}
            name="description"
            projectId={props.topList.id}
            label={`New Bug for ${props.topList.name}`}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

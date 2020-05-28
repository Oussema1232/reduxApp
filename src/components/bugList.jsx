import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import ItemLayout from "../commun/itemLayout";
import { resolveBug, editBug } from "../store/bugs";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },

  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

export default function SecondList({ list }) {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      <li className={classes.listSection}>
        <ul className={classes.ul}>
          {list.map((item) => (
            <ItemLayout
              key={item.id}
              item={item}
              name="description"
              color="secondary"
              secondIconItem={<EditIcon />}
              secondIconTextfield={<SaveIcon />}
              onDispatchFirstButton={resolveBug}
              firstButtonBeforeClick="Resolve"
              firstButtonAfterClick="Resolved"
              onDispatchSecondButton={editBug}
            />
          ))}
        </ul>
      </li>
    </List>
  );
}

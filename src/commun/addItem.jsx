import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

const AddItem = (props) => {
  const classes = useStyles();

  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onchange = ({ target: input }) => {
    setValue(input.value);
  };

  const onSubmit = () => {
    if (value !== "") {
      dispatch(
        props.onDispatchAdd({
          [props.name]: value,
          projectId: props.projectId,
        })
      );
      setValue("");
    }
  };
  return (
    <ListItem className={classes.root}>
      <TextField
        required
        id={props.id}
        label={props.label}
        value={value}
        onChange={onchange}
      />
      <ColorButton
        variant="outlined"
        size="small"
        startIcon={<AddCircleIcon />}
        onClick={onSubmit}
      >
        Add
      </ColorButton>
    </ListItem>
  );
};

export default AddItem;

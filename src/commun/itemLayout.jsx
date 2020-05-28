import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
    alignItems: "center",
    width: "0%",
  },
  listText: { width: "80%", maxWidth: "80%", overflow: "auto" },
  button: {
    margin: theme.spacing(1),
  },
}));

const ItemLayout = (props) => {
  const classes = useStyles();
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(props.item[props.name]);
  const dispatch = useDispatch();

  const onchange = ({ target: input }) => {
    setValue(input.value);
  };
  return (
    <ListItem>
      {show ? (
        <div className={classes.listItem}>
          <ListItemText
            className={classes.listText}
            multiline
            primary={props.item[props.name]}
          />

          <div>
            <Button
              variant="outlined"
              size="small"
              color={props.color}
              startIcon={props.firstIconItem}
              className={classes.button}
              disabled={props.item.resolved}
              onClick={() =>
                dispatch(props.onDispatchFirstButton(props.item.id))
              }
            >
              {props.item.resolved
                ? props.firstButtonAfterClick
                : props.firstButtonBeforeClick}
            </Button>
            <Button
              variant="outlined"
              color={props.color}
              className={classes.button}
              size="small"
              startIcon={props.secondIconItem}
              onClick={() => {
                setShow(false);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.listItem}>
          <TextField
            required
            multiline
            id={props.item.id}
            label="Required"
            value={value}
            onChange={onchange}
            className={classes.listText}
          />
          <div>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              size="small"
              startIcon={props.firstIconTextfield}
              onClick={() => setShow(true)}
            >
              cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              size="small"
              startIcon={props.secondIconTextfield}
              onClick={() => {
                setShow(true);
                dispatch(props.onDispatchSecondButton(props.item.id, value));
              }}
            >
              save
            </Button>
          </div>
        </div>
      )}
    </ListItem>
  );
};

export default ItemLayout;

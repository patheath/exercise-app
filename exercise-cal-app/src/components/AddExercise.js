import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  hours: {
    margin: theme.spacing(1),
    width: 100,
  },
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export function AddExercise(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedExercise, setSelectedExercise] = React.useState('');
  const [hours, setHours] = React.useState(1);
  const [exercises, setExercises] = React.useState([]);
  const [errorExercise, setErrorExercise] = React.useState(false);
  const [errorHours, setErrorHours] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (exerciseId, hours) => {
    if (exerciseId && hours) {
      addExercise(exerciseId, hours);
      setOpen(false);
      setErrorExercise(false);
      setErrorHours(false);
    } else {
      exerciseId ? setErrorExercise(false) : setErrorExercise(true);
      hours ? setErrorHours(false) : setErrorHours(true);
    }

  };

  const addExercise = (exerciseId, hours) => {

    //validate we have an exercise and hours

    const monthDB = props.month + 1;  // Javascript Jan is zero, DB's Jan is 1
    const date = `${props.year}-${monthDB}-${props.day}`;

    const data = {
      "date": date,
      "exerciseId": exerciseId,
      "length": hours,
    };

    const API = `http://localhost:3033/calendar_entries`;

    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) =>  {
      if (!response.ok) { console.error('Error:', response.statusText); }
      response.json() })
    .then((data) => {
      props.displayExercise(props.year, props.month, props.day, props.rowIndex);
    });
  }

  useEffect(() => {
    const fetchData = () => {
      const API = `http://localhost:3033/exercises`;
      let menuItems = [];
      fetch(API)
      .then(results => {
        return results.json();
      })
      .then(data => {
        menuItems = data.map((exercise) => {
          return (<MenuItem key={exercise.id} value={exercise.id}>{exercise.type}</MenuItem>);
        })
        setExercises(menuItems);
      })
    };
    fetchData();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Exercise
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add exercise
        </DialogTitle>
        <DialogContent dividers>
          <FormControl 
            className={classes.formControl} 
            required
            error={errorExercise}
          >
            <InputLabel id="demo-simple-select-label">Exercises</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedExercise}
              onChange={(e) => {setSelectedExercise(e.target.value)}}
            >
            {exercises}
            </Select>
          </FormControl>
          <br />
          <TextField 
            className={classes.hours}
            id="standard-basic"
            label="Hours"
            onChange={(e) => setHours(e.target.value)}
            defaultValue={hours}
            required
            error={errorHours}
          >
          {hours}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus 
            onClick={() => { handleClose(selectedExercise, hours, props.displayExercise) }}
            color="primary"
          >
          Save exercise
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

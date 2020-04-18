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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  listItem: {
    selected: true
  }
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
  const [selectedExercise, setSelectedExercise] = React.useState('');
  const [hours, setHours] = React.useState(1);
  const [exercises, setExercises] = React.useState([]);
  const [errorExercise, setErrorExercise] = React.useState(false);
  const [errorHours, setErrorHours] = React.useState(false);

  const handleSubmit = (exerciseId, hours) => {
    if (exerciseId && hours) {
      props.submitExercise(exerciseId, hours);
      setErrorExercise(false);
      setErrorHours(false);
      setSelectedExercise('');
      setHours(1);
    } else {
      exerciseId ? setErrorExercise(false) : setErrorExercise(true);
      hours ? setErrorHours(false) : setErrorHours(true);
    }

  };

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

  if (!props.open) {
    return null;
  } else {

    const completedExercises = props.completedExercises.map((exercise, index) => {
      const text = `${exercise.type} - ${exercise.length} hours`;
      return(
        <ListItem
          className={className.listItem}
          key={index}
        >
          <ListItemText
            primary={text}
          />
        </ListItem>
      )
    });

    return (
      <div>
        <Dialog onClose={props.setClosed} aria-labelledby="customized-dialog-title" open={props.open}>
          <DialogTitle id="simple-dialog-title">Completed exercises</DialogTitle>
          <List>
            {completedExercises}
          </List>
          <DialogTitle id="customized-dialog-title" onClose={props.setClosed}>
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
              value={hours}
              required
              error={errorHours}
            >
            {hours}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button 
              variant="contained" 
              onClick={() => { handleSubmit(selectedExercise, hours) }}
              color="primary"
            >
            Save exercise
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

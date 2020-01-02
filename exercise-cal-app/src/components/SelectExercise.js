import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    '& .MuiTextField-root': {
      width: 200,
    }

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectExercise(props) {

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');

  const classes = useStyles();

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

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Exercises</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
        {exercises}
        </Select>
        <TextField 
          id="standard-basic"
          label="Hours"
          defaultValue="1"
          required
        />
      </FormControl>
    </div>
  )
}




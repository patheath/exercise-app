import React, { Component } from 'react';
import DayCell from './DayCell';
import ExerciseRow from './ExerciseRow';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {display: 'none'},
      exercise: '',
      exerciseRowKey: '',
    };
  }

  displayExercise = (year, month, day, rowIndex) => {
    const monthDB = month + 1;  // Javascript Jan is zero, DB's Jan is 1
    const date = `${year}-${monthDB}-${day}`;
    const exerciseRowKey = `${year}-${month}-${rowIndex}`;
    const API = `http://localhost:3033/calendar_entries?date=${date}&_expand=exercise`;

    fetch(API)
    .then(results => {
      return results.json();
    }).then(data => {
      var exercises = data.map((exercise, index) => {
        let type = exercise.exercise.type;
        let length = exercise.length;
        let text = `${type} - ${length} hours`;
        return(<li key={index}>{text}</li>);
      });

      const element = (
        <div>
        <ul style={{listStyleType: 'none'}}>
          { exercises.map(exercise => {
            return exercise})
          }
        </ul>
        </div>
      ); 

      this.setState((state) => { 
      return(
        {
          style: {display: 'table-row' },
          exercise: element,
          exerciseRowKey: exerciseRowKey,
        }) 
      });
    })
  };

  render (props) {
    const days = this.props.days;
    const prefix = this.props.year + "-" + this.props.month + "-"

    const row = days.map((num, index) => {
      const key = num ? (prefix + num) : (prefix + "null-" + this.props.rowIndex + "-" + index);
      return (
        <DayCell 
          key={key}
          id={key}
          year={this.props.year}
          month={this.props.month}
          day={num}
          rowIndex={this.props.rowIndex}
          displayExercise={this.displayExercise}
        />
      )
    });

    // Exercise row initial settings
    const exerciseRowKey = prefix + this.props.rowIndex;

    return(
      <>
        <tr>{row}</tr>
        <ExerciseRow 
          key={exerciseRowKey}
          style={this.state.style}
          exercise={this.state.exercise}
        />
      </>
    )
  }  
}
export default Row;
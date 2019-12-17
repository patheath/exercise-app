import React, { Component } from 'react';
import DayCell from './DayCell';
import ExerciseRow from './ExerciseRow';

class Row extends Component {

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
          displayExercise={this.props.displayExercise}
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
          style={this.props.row.style}
          exercise={this.props.row.exercise}
        />
      </>
    )
  }  
}
export default Row;
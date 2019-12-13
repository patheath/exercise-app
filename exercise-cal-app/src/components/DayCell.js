import React, { Component } from 'react';

class DayCell extends Component {

  render (props) {
    return(
      <td onClick={(e) => {
        this.props.displayExercise(
          this.props.year,
          this.props.month,
          this.props.day,
          this.props.rowIndex
        )}}
      >{this.props.day}</td>)
  }
}
export default DayCell;
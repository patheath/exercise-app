import React, { Component } from 'react';

class DayCell extends Component {

  render (props) {
    const today = new Date();
    const todayMarker = (today.getFullYear() === this.props.year &&
      today.getMonth() === this.props.month &&
      today.getDate() === this.props.day);

    const className = todayMarker ? "today" : (this.props.day ? "day" : "nil")

    return(
      <td className={className} onClick={(e) => {
        this.props.displayExercise(
          this.props.year,
          this.props.month,
          this.props.day,
          this.props.rowIndex,
        )}}
      >{this.props.day}</td>)
  }
}
export default DayCell;
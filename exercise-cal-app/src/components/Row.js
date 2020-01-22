import React, { Component } from 'react';
import DayCell from './DayCell';

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
          setOpen={this.props.setOpen}
        />
      )
    });

    return(
        <tr>{row}</tr>
    )
  }  
}
export default Row;
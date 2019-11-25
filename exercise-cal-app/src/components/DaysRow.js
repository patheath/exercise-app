import React, { Component } from 'react';
import DayCell from './DayCell';

class DaysRow extends Component {

  render (props) {
    const days = this.props.days;
    const row = days.map((num) => 
      <DayCell 
        year={this.props.year}
        month={this.props.month}
        day={num}
      />
    );

    return(<tr key={this.props.row}>{row}</tr>)
  }  
}
export default DaysRow;
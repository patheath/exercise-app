import React, { Component } from 'react';

class DayCell extends Component {

  render (props) {
    const key = this.props.year + "-" + this.props.month + "-" + this.props.day
    return(<td key={key}>{this.props.day}</td>)
  }
}
export default DayCell;
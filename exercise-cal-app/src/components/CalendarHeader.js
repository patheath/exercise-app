import React, { Component } from 'react';

class CalendarHeader extends Component {

  render (props) {
    return(
      <div className="header"> 
        <span className="left button" id="prev" onClick={this.props.previous}> &lang; </span> 
        <span className="month-year" id="label"> {this.props.month} {this.props.year}  </span> 
        <span className="right button" id="next" onClick={this.props.next}> &rang; </span>
      </div> 
    )
  }
}

export default CalendarHeader;
import React, { Component } from 'react';

class CalendarHeader extends Component {

  render (props) {
    return(
      <div class="header"> 
        <span class="left button" id="prev" onClick={this.props.previous}> &lang; </span> 
        <span class="month-year" id="label"> {this.props.month} {this.props.year}  </span> 
        <span class="right button" id="next" onClick={this.props.next}> &rang; </span>
      </div> 
    )
  }
}

export default CalendarHeader;
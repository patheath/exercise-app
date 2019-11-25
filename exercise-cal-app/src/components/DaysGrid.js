import React, { Component } from 'react';
import DaysHeader from './DaysHeader';
import DaysRow from './DaysRow';

class DaysGrid extends Component {

  buildDays = (startingDay, daysInMonth) => {
    let day = 1;
    let days = [];

    // Build our 6 * 7 calendar of days - we will
    // use nulls for days not in this month on the
    // calendar
    for (var w = 0; w < 6; w++) {  // weeks
      for (var d = 0; d < 7; d++) {  // days
        if (w === 0) {
          // start of month
          if (d >= startingDay) {
            days.push(day);
            day++;
          } else {
            days.push(null);
          }
        } else { 
          // check end of month
          if (day <= daysInMonth) {
            days.push(day);
            day++;
          } else {
            days.push(null);
          }
        }
      }
    }
    return days
  }


  render(props) {
    
    const gridRows = [0,1,2,3,4,5]; // six rows
    const days = this.buildDays(this.props.startingDay, this.props.daysInMonth);

    const rows = gridRows.map( i => {
      const daysSlice = days.slice(i*7, i*7+7);
      console.log(daysSlice);
      return (
        <DaysRow 
          row={i}
          days={daysSlice}
          year={this.props.year}
          month={this.props.month}
        />
      )
    });

    return(
      <div>
        <DaysHeader />
        <div id="cal-frame"> 
          <table class="curr"> 
              <tbody>
                {rows}
              </tbody> 
          </table>
        </div>
      </div>
    )
  }
}

export default DaysGrid;
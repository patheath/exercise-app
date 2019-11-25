import React, { Component } from 'react'
import Exercise from './Exercise';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class Calendar extends Component {

  constructor () {
    const today = new Date();

    super();

    const month = today.getMonth();
    const year = today.getFullYear();

    const [daysInMonth, startingDay] = this.calculateDays(month, year);
    const dayElement = this.buildDays(startingDay, daysInMonth, today.getDate());
    const cacheKey = month + "-" + year;

    this.state = { 
      month: month, 
      year: year,
      days: dayElement,
      [cacheKey]: dayElement
    };
  }

  displayExercise = () =>{
    console.log(this.parentNode.rowIndex);
  }

  drawDay = (day, today) => {
    if (day === today) {
      return (<td class="today" onClick={this.displayExercise}>{day}</td>);
    } else {
      return (<td onClick={this.next}>{day}</td>);
    }
  }

  buildDays = (startDay, daysInMonths, today) => {
    let tableRows = [];
    let className;
    let day = 1;
    for (var w = 0; w < 6; w++) {  // weeks
      let days = [];

      for (var d = 0; d < 7; d++) {  // days
        if (w === 0) {
          // start of month
          if (d >= startDay) {
            days.push(this.drawDay(day, today));
            day++;
          } else {
            days.push(<td class="nil"></td>);
          }
        } else { 
          // check end of month
          if (day <= daysInMonths) {
            days.push(this.drawDay(day, today));
            day++;
          } else {
            days.push(<td class="nil"></td>);
          }
        }
      }
      tableRows.push(<tr>{days}</tr>);
      tableRows.push(<tr style={{display: 'none'}}><td colspan="7"></td></tr>);
    }
  return tableRows;
  }

  calculateDays = (month, year) => {
    // Basically go to the next month and setDate(0) which moves you to the last day of previous month
    // and we can then know how many days in the month
    const nextMonthDateString = (month === 11) ? months[0] + " " + (year + 1) : months[month + 1] + " " + year;
    const selectedMonth = new Date(nextMonthDateString);
    selectedMonth.setDate(0);  // set to last day of previous month in selected month
    const daysInMonth = selectedMonth.getDate();
    selectedMonth.setDate(1);  // set to first day in the selected month
    const startingDay = selectedMonth.getDay();

    return [daysInMonth, startingDay];

  }
  switchMonth = (forward) => {
    let month = this.state.month;
    let year = this.state.year;

    forward ? month++ : month--

    if (month > 11) {
      month=0;
      year++;
    } else if (month < 0) {
      month = 11;
      year--;
    }

    const cacheKey = month + "-" + year;
    let dayElement;

    if (cacheKey in this.state) {
      dayElement = this.state[cacheKey];
    } else {
      const [daysInMonth, startingDay] = this.calculateDays(month, year);
      dayElement = this.buildDays(startingDay, daysInMonth, 0);
      this.state[cacheKey] = dayElement;
    }

    // have my starting day and my length of month let's draw!
    this.setState({ month: month, year: year, days: dayElement});
  }

  next = () => {
    this.switchMonth(true);
  }

  previous = () => {
    this.switchMonth(false);
  }

  render () {
    return(
      <div id="cal"> 
        <div class="header"> 
          <span class="left button" id="prev" onClick={this.previous}> &lang; </span> 
          <span class="month-year" id="label"> {months[this.state.month]} {this.state.year} </span> 
          <span class="right button" id="next" onClick={this.next}> &rang; </span>
        </div> 
        <table id="days"> 
          <td>sun</td> 
          <td>mon</td> 
          <td>tue</td> 
          <td>wed</td> 
          <td>thu</td> 
          <td>fri</td> 
          <td>sat</td>
        </table> 
        <div id="cal-frame"> 
          <table class="curr"> 
              <tbody>{this.state.days}</tbody> 
          </table>
        </div> 
      </div>
    )
  }
}
export default Calendar;

import React, { Component } from 'react';
import CalendarHeader from './CalendarHeader';
import DaysGrid from './DaysGrid';

const DISPLAY_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Calendar extends Component {

  constructor () {
    super();

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.state = { 
      month: month, 
      year: year,
    };
  }


  calculateDays = (month, year) => {
    // Basically go to the next month and setDate(0) which moves you to the last day of previous month
    // and we can then know how many days in the month
    const nextMonthDateString = (month === 11) ? DISPLAY_MONTHS[0] + " " + (year + 1) : DISPLAY_MONTHS[month + 1] + " " + year;
    const selectedMonth = new Date(nextMonthDateString);
    selectedMonth.setDate(0);  // set to last day of previous month in selected month
    const daysInMonth = selectedMonth.getDate();
    selectedMonth.setDate(1);  // set to first day in the selected month
    const startingDay = selectedMonth.getDay();

    return [daysInMonth, startingDay];

  }

  switchMonth = (forward) => {

    this.setState((state) => {
      let month = state.month;
      let year = state.year;

      forward ? month++ : month--

      if (month > 11) {
        month=0;
        year++;
      } else if (month < 0) {
        month = 11;
        year--;
      }

      // have my starting day and my length of month let's draw!
      return ({ month: month, year: year })
    });
  }

  next = () => {
    this.switchMonth(true);
  }

  previous = () => {
    this.switchMonth(false);
  }


  render () {

    const displayMonth = DISPLAY_MONTHS[this.state.month];
    const [daysInMonth, startingDay] = this.calculateDays(this.state.month, this.state.year);
    const gridKey = this.state.year + "-" + this.state.month;

    return(
      <div id="cal"> 
        <CalendarHeader 
          month={displayMonth}
          year={this.state.year}
          previous={this.previous}
          next={this.next}
        />
        <DaysGrid 
          key={gridKey}
          daysInMonth={daysInMonth}
          startingDay={startingDay}
          year={this.state.year}
          month={this.state.month}
        />
      </div>
    )
  }
}
export default Calendar;

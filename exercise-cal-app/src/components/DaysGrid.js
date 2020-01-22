import React, { Component } from 'react';
import DaysHeader from './DaysHeader';
import Row from './Row';
import { AddExercise } from './AddExercise';

const gridRows = [0,1,2,3,4,5]; // six rows

class DaysGrid extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      open: false,
      selectedDate: '', 
      completedExercises: [],
    };

    this.setOpen = this.setOpen.bind(this);
    this.submitExercise = this.submitExercise.bind(this);
    this.setClosed = this.setClosed.bind(this);
  }

  updateCompletedExercises (date) {
    const API = `http://localhost:3033/calendar_entries?date=${date}&_expand=exercise`;

    fetch(API)
    .then(results => {
      if (!results.ok) { console.error('Error:', results.statusText); }
      return results.json();
    }).then(data => {
      var exercises = data.map((exercise, index) => {
        return( { num: index, type: exercise.exercise.type, length: exercise.length })
      });
      this.setState((state) => {
        return ({
          completedExercises: exercises
        })
      });
    })
  }

  setOpen (year, month, day) {
    // Update selected date and update exercises
    const monthDB = month + 1;  // Javascript Jan is zero, DB's Jan is 1
    const date = `${year}-${monthDB}-${day}`;

    this.setState((state) => ({ open: true, selectedDate: date, }));

    this.updateCompletedExercises(date);
  }

  setClosed() {
    this.setState((state) => ({ 
        open: false,
        selectedDate: '', 
        completedExercises: [],
    }));
  }

  submitExercise (exerciseId, hours) {
    //validate we have an exercise and hours
    const selectedDate = this.state.selectedDate;

    const data = {
      "date": selectedDate,
      "exerciseId": exerciseId,
      "length": hours,
    };
    console.log(data);

    const API = `http://localhost:3033/calendar_entries`;

    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) =>  {
      if (!response.ok) { console.error('Error:', response.statusText); }
      response.json() })
    .then((data) => {
      this.updateCompletedExercises(selectedDate);
    });
  }

  buildDays (startingDay, daysInMonth) {
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
    
    const days = this.buildDays(this.props.startingDay, this.props.daysInMonth);

    const rows = gridRows.map( i => {
      const daysSlice = days.slice(i*7, i*7+7);
      const key = this.props.year + "-" + this.props.month + "-" + i;
      return (
          <Row 
            key={key}
            rowIndex={i}
            days={daysSlice}
            year={this.props.year}
            month={this.props.month}
            setOpen = {this.setOpen}
          />
      )
    });

    return(
      <div>
        <DaysHeader />
        <div id="cal-frame">
          <AddExercise 
            open={this.state.open}
            setClosed = {this.setClosed}
            submitExercise = {this.submitExercise}
            completedExercises = {this.state.completedExercises}
          />
          <table className="curr"> 
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
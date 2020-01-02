import React, { Component } from 'react';
import DaysHeader from './DaysHeader';
import Row from './Row';
import { AddExercise } from './AddExercise';


const gridRows = [0,1,2,3,4,5]; // six rows

class DaysGrid extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rows: this.emptyRows(),
    };
  }

  emptyRows = () => {
    return (gridRows.map((i) => {
      return {
        style: {display: 'none'},
        exercise: '',
      };
    }))
  };

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

  addExercise = (year, month, day, rowIndex) => {
    console.log('Yes!')
  }

  displayExercise = (year, month, day, rowIndex) => {
    const monthDB = month + 1;  // Javascript Jan is zero, DB's Jan is 1
    const date = `${year}-${monthDB}-${day}`;
    const API = `http://localhost:3033/calendar_entries?date=${date}&_expand=exercise`;

    let rows = this.emptyRows();

    fetch(API)
    .then(results => {
      return results.json();
    }).then(data => {
      var exercises = data.map((exercise, index) => {
        let type = exercise.exercise.type;
        let length = exercise.length;
        let text = `${type} - ${length} hours`;
        return(<li key={index}>{text}</li>);
      });

      let element;
      if (exercises.length > 0) {

        element = (
          <div>
          <ul style={{listStyleType: 'none'}}>
            { exercises.map(exercise => {
              return exercise
              })
            }
          </ul>
          </div>
        );
      } else {
          const key = `${year}-${month}-${day}`;
          element = <AddExercise 
            key={key}
            year={year}
            month={month}
            day={day}
            addExercise={this.addExercise}
        />;
      }

      rows[rowIndex] = {
        style: {display: 'table-row'},
        exercise: element,
      };


      this.setState((state) => { 
        return(
          { rows: rows }
        );
      });
    })
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
            row = {this.state.rows[i]}
            displayExercise = {this.displayExercise}
            addExercise = {this.addExercise}
          />
      )
    });

    return(
      <div>
        <DaysHeader />
        <div id="cal-frame"> 
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
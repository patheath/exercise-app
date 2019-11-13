import React, { Component } from 'react'

class Calendar extends Component {

  constructor () {
    const today = new Date();

    super();

    this.state = { 
      month: today.getMonth(), 
      year: today.getFullYear(),
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
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

    // How long is the month? Move one month in future then subtract 1 day and see 
    // how many days in the month
    const nextMonthDateString = (month == 11) ? this.state.months[0] + " " + (year + 1) : this.state.months[month + 1] + " " + year;
    const selectedMonth = new Date(nextMonthDateString);
    selectedMonth.setDate(0);  // set to last day in selected month
    const daysInMonths = selectedMonth.getDate();
    selectedMonth.setDate(1);  // set to first day in the selected month
    const startingDay = selectedMonth.getDay();

    // have my starting day and my length of month let's draw!
    
    this.setState({ month: month, year: year});
  }

  next = () => {
    this.switchMonth(true);
  }

  previous = () => {
    this.switchMonth(false);
  }
/*
  exerciseCalendar = () => { 
    var wrap, 
      label,  
      months = ["January", "February", "March", "April", 
      "May", "June", "July", "August", "September", 
      "October", "November", "December"]; 

    function init(newWrap) { 
      wrap     = $(newWrap || "#cal"); 
      label    = wrap.find("#label"); 
      wrap.find("#prev").bind("click.calendar", 
        function () { switchMonth(false); }); 
      wrap.find("#next").bind("click.calendar", 
        function () { switchMonth(true);  }); 
      label.bind("click", 
        function () { switchMonth(
          null, new Date().getMonth(), new Date().getFullYear()); });        
      label.click();
    } 

    function switchMonth(next, month, year) { 
      var curr = label.text().trim().split(" "), calendar, tempYear =  parseInt(curr[1], 10); 
      month = month || ((next) ? ( (curr[0] === "December") ? 0 : months.indexOf(curr[0]) + 1 ) : ( (curr[0] === "January") ? 11 : months.indexOf(curr[0]) - 1 )); 
      year = year || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear - 1 : tempYear);

      calendar =  createCal(year, month); 
      $("#cal-frame", wrap) 
          .find(".curr") 
              .removeClass("curr") 
              .addClass("temp") 
          .end() 
          .prepend(calendar.calendar()) 
          .find(".temp") 
              .fadeOut("slow", function () { $(this).remove(); }); 

      $('#label').text(calendar.label);
    } 

    function createCal(year, month) { 
      var day = 1, i, j, haveDays = true,  
      startDay = new Date(year, month, day).getDay(), 
      daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
      calendar = [];

      if (createCal.cache[year]) {
        if (createCal.cache[year][month]) { 
          return createCal.cache[year][month]; 
        }
      } else { 
        createCal.cache[year] = {}; 
      }

      i = 0; 
      while (haveDays) { 
          calendar[i] = []; 
          for (j = 0; j < 7; j++) { 
              if (i === 0) { 
                  if (j === startDay) { 
                      calendar[i][j] = day++; 
                      startDay++; 
                  } 
              } else if (day <= daysInMonths[month]) { 
                  calendar[i][j] = day++; 
              } else { 
                  calendar[i][j] = ""; 
                  haveDays = false; 
              } 
              if (day > daysInMonths[month]) { 
                  haveDays = false; 
              } 
          } 
          i++; 
      }

      if (calendar[5]) { 
        for (i = 0; i < calendar[5].length; i++) { 
            if (calendar[5][i] !== "") { 
                calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>"; 
            } 
      } 
      calendar = calendar.slice(0, 5); 

      for (i = 0; i < calendar.length; i++) { 
          calendar[i] = "<tr><td>" + calendar[i].join("</td><td>") + "</td></tr>"; 
      } 
      calendar = $("<table>" + calendar.join("") + "</table>").addClass("curr"); 
     
      $("td:empty", calendar).addClass("nil"); 
      if (month === new Date().getMonth()) { 
          $('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today"); 
      } 
      createCal.cache[year][month] = { calendar : function () { return calendar.clone() }, label : months[month] + " " + year }; 
     
      return createCal.cache[year][month];
    } 
    createCal.cache = {}; 
    return { 
        init : init, 
        switchMonth : switchMonth, 
        createCal   : createCal 
    }; 
  }; 
*/

  render () {
    return(
      <div id="cal"> 
        <div class="header"> 
          <span class="left button" id="prev" onClick={this.previous}> &lang; </span> 
          <span class="month-year" id="label"> {this.state.months[this.state.month]} {this.state.year} </span> 
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
              <tbody> 
                  <tr><td class="nil"></td><td class="nil"></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr> 
                  <tr><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td class="today">11</td><td>12</td></tr> 
                  <tr><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td></tr> 
                  <tr><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td></tr> 
                  <tr><td>27</td><td>28</td><td>29</td><td>30</td><td class="nil"></td><td class="nil"></td><td class="nil"></td></tr> 
              </tbody> 
          </table>
                  </div> 
      </div>
    )
  }
}
export default Calendar;

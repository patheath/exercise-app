import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Calendar from './components/Calendar';
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Calendar />
      </div>
    )
  }
}

export default App;

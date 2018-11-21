import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarStatistic from './component/bar-statistic/bar-statistic.js';
const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
      <div className="App">
      <BarStatistic></BarStatistic>
       
      </div>
    );
  }
}

export default App;

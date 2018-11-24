import React, { Component } from "react";
import BarStatistic from "../../component/bar-statistic/bar-statistic";
import TopStatistic from "../../component/top-statistic/top-statistic";

export default class Overview extends Component {
  render() {
    return (
      <div>
        <TopStatistic />
        <BarStatistic />
      </div>
    );
  }
}

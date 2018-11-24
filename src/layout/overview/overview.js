import React, { Component } from "react";
import { Slider, Icon } from "antd";
import BarStatistic from "../../component/bar-statistic/bar-statistic";
import TopStatistic from "../../component/top-statistic/top-statistic";

export default class Overview extends Component {
  state = {
    value: 0
  };

  handleChange = value => {
    this.setState({ value });
  };
  render() {
    const { max, min } = this.props;
    const { value } = this.state;
    const mid = ((max - min) / 2).toFixed(5);

    return (
      <div>
        <TopStatistic />
        <Slider disable onChange={this.handleChange} max={60} value={32} />
        <BarStatistic />
      </div>
    );
  }
}

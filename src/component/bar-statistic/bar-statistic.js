import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { connect } from "react-redux";
import { config } from "../../config";
import { Button, Switch, Select } from "antd";
import moment from "moment";
const Option = Select.Option;

class BarStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeGroupKey: "day",
      bAutoRefresh: true,
      data: {
        Productive: [],
        Neutral: [],
        Distracting: []
      }
    };
   
  }
  onSwitch(checked) {
    this.setState(
      {
        bAutoRefresh: checked
      },
      () => {
        if (checked) {
          this.componentDidMount();
        }else{
          this.componentWillUnmount();
        }
      }
    );
  }
  
  componentDidMount() {
    
    if (this.state.bAutoRefresh) {
     
      this.interval = setInterval(() => {
        this.groupData();
      }, config.intervalSec * 1000);
    }
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  handleChange(v) {
    this.setState({
      timeGroupKey: v.key
    });
    this.groupData();
  }
  // arrayInSpan(key, year, month) {
  //   switch (key) {
  //     case "minute":
  //       return Array(60).fill(0);
  //     case "hour":
  //       return Array(60).fill(0);
  //     case "day":
  //       return Array(24).fill(0);
  //     case "week":
  //       return Array(7).fill(0);
  //     case "month":
  //       return Array(new Date(year, month, 0).getDate()).fill(0);
  //     case "year":
  //       return Array(12).fill(0);
  //     case "years":
  //       return Array(5).fill(0);
  //     default:
  //       break;
  //   }
  // }

  getTimeFormat() {
    let groupKey = this.state.timeGroupKey;
    switch (groupKey) {
      case "minute":
        return "s";
      case "hour":
        return "m";
      case "day":
        return "H";
      case "week":
        return "d";
      case "month":
        return "DD";
      case "year":
        return "M";
      case "years":
        return "YYYY";
      default:
        break;
    }
  }
  getAxis() {
    let groupKey = this.state.timeGroupKey;
    switch (groupKey) {
      case "minute":
        return [...Array(60).keys()];
      case "hour":
        return [...Array(60).keys()];
      case "day":
        return [...Array(24).keys()];
      case "week":
        return [...Array(7).keys()];
      case "month":
        return [
          ...Array(
            new Date(moment().year(), moment().month(), 0).getDate()
          ).keys()
        ];
      case "year":
        return [...Array(12).keys()];
      case "years":
        return [...Array(5).keys()].map(v => moment().year() - v);

      default:
        break;
    }
  }
  groupData() {
    let length = this.getAxis().length;
    let data = {
      Productive: Array(length).fill(0),
      Neutral: Array(length).fill(0),
      Distracting: Array(length).fill(0)
    };

    let timeFormat = this.getTimeFormat();
    for (let v of this.props.stat) {
      const idx = moment(v.start).format(timeFormat);
      // console.log("idx",idx)
      data[v.type][idx] += v.duration;
    }

    this.setState({ data: data });
  }
  getOption() {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ["Productive", "Neutral", "Distracting"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      yAxis: {
        type: "value",
        max:'dataMax'
      },
      xAxis: {
        type: "category",
        data: this.getAxis()
      },
      color: ["#9DE949", "#23BBD8", "#FF6377"],
      series: [
        {
          name: "Productive",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "insideRight"
            }
          },
          data: this.state.data.Productive
        },
        {
          name: "Neutral",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "insideRight"
            }
          },

          data: this.state.data.Neutral
        },
        {
          name: "Distracting",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "insideRight"
            }
          },
          data: this.state.data.Distracting
        }
      ]
    };
  }

  render() {
    return (
      <div>
        {/* {this.props.stat} */}
        <ReactEcharts
          option={this.getOption()}
          style={{ height: "200px", width: "100%" }}
          className="react_for_echarts"
        />
        <Select
          labelInValue
          defaultValue={{ key: "day" }}
          style={{ width: 120 }}
          onChange={e => this.handleChange(e)}
        >
          {/* <Option value="minute">minute</Option> */}
          {/* <Option value="hour">hour</Option> */}
          <Option value="day">day</Option>
          <Option value="week">week</Option>
          <Option value="month">month</Option>
          <Option value="year">year</Option>
        </Select>

        <Switch
          defaultChecked={this.state.bAutoRefresh}
          onChange={e => this.onSwitch(e)}
        />
      </div>
    );
  }
}

export default connect(
  state => state,
  {   }
)(BarStatistic);

import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { connect } from "react-redux";
import { getConfig } from "../../util/configUtil";
import { Switch, Select } from "antd";
import moment from "moment";
const Option = Select.Option;
let config = getConfig();
let yAxisMax={
  "day":3600,
  "week":3600,
  "month":3600,
  "year":3600,
}
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
      },
      xAxisCache: {}
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
        } else {
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
      // case "minute":
      //   return "s";
      // case "hour":
      //   return "m";
      case "day":
        return "H";
      case "week":
        return "d";
      case "month":
        return "DD";
      case "year":
        return "M";
      // case "years":
      //   return "YYYY";
      default:
        break;
    }
  }

  getxAxis() {
    let groupKey = this.state.timeGroupKey;
    if (groupKey in this.state.xAxisCache) {
      return this.state.xAxisCache[groupKey];
    }
    switch (groupKey) {
      case "minute":
        this.state.xAxisCache[groupKey] = [...Array(60).keys()];
        break;
      case "hour":
        this.state.xAxisCache[groupKey] = [...Array(60).keys()];
        break;
      case "day":
        this.state.xAxisCache[groupKey] = [...Array(24).keys()];
        break;
      case "week":
        this.state.xAxisCache[groupKey] = [...Array(7).keys()];
        break;
      case "month":
        this.state.xAxisCache[groupKey] = [
          ...Array(
            new Date(moment().year(), moment().month(), 0).getDate()
          ).keys()
        ];
        break;
      case "year":
        this.state.xAxisCache[groupKey] = [...Array(12).keys()];
        break;
      case "years":
        this.state.xAxisCache[groupKey] = [...Array(5).keys()].map(
          v => moment().year() - v
        );
        break;

      default:
        break;
    }
    return this.state.xAxisCache[groupKey];
  }
  groupData() {
    let groupKey = this.state.timeGroupKey;

    let length = this.getxAxis().length;
    let data = {
      Productive: Array(length).fill(0),
      Neutral: Array(length).fill(0),
      Distracting: Array(length).fill(0)
    };

    // let timeFormat = this.getTimeFormat();
    for (let v of this.props.stat) {
      const idx = v.timeFormat[groupKey];
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
        max: "dataMax"
      },
      xAxis: {
        type: "category",
        data: this.getxAxis()
      },

      color: ["#9DE949", "#23BBD8", "#FF6377"],
      series: [
        // {
        //   // For shadow
        //   type: "bar",
        //   itemStyle: {
        //     normal: { color: "rgba(0,0,0,0.05)" }
        //   },
        //   barGap: "-100%",
        //   barCategoryGap: "40%",
        //   data: Array(this.getxAxis().length).fill(3600),
        //   animation: false
        // },
        {
          name: "Productive",
          type: "bar",
          stack: "总量",
          // label: {
          //   normal: {
          //     show: true,
          //     position: "insideRight"
          //   }
          // },
          data: this.state.data.Productive
        },
        {
          name: "Neutral",
          type: "bar",
          stack: "总量",
          // label: {
          //   normal: {
          //     show: true,
          //     position: "insideRight"
          //   }
          // },

          data: this.state.data.Neutral
        },
        {
          name: "Distracting",
          type: "bar",
          stack: "总量",
          // label: {
          //   normal: {
          //     show: true,
          //     position: "insideRight"
          //   }
          // },
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
        <div style={{ textAlign: "center" }}>
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
            checkedChildren="刷新中"
            unCheckedChildren="已关闭"
            defaultChecked={this.state.bAutoRefresh}
            onChange={e => this.onSwitch(e)}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  {}
)(BarStatistic);

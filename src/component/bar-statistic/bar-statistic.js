import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { connect } from "react-redux";
import { Switch, Select } from "antd";
import moment from "moment";
import { switchRefresh } from "../../redux/refresh.redux";
import { getStat } from "../../util/configUtil";
const Option = Select.Option;

class BarStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeGroupKey: "day",
      data: {
        Productive: [],
        Neutral: [],
        Distracting: []
      },
      xAxisCache: {}
    };
    this.handleChange("day")
  }
  initData() {
    let length = this.getxAxis().length;
    this.setState({
      data: {
        Productive: Array(length).fill(0),
        Neutral: Array(length).fill(0),
        Distracting: Array(length).fill(0)
      }
    });
  }
  componentDidMount() {
    this.initData();
  }
  async handleChange(v) {
    this.setState(
      {
        timeGroupKey: v.key
      },
      () => {
        this.componentDidMount();
      }
    );
    let rawData = await getStat();
    this.groupData(rawData);
  }

  componentWillReceiveProps(props) {
    if (props.refresh) {
      this.groupData([props.stat]);
    }
  }

  getTimeFormat() {
    let groupKey = this.state.timeGroupKey;
    switch (groupKey) {
      case "day":
        return "H";
      case "week":
        return "d";
      case "month":
        return "DD";
      case "year":
        return "M";
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

  async groupData(events) {
    let data = {
      Productive: [...this.state.data.Productive],
      Neutral: [...this.state.data.Neutral],
      Distracting: [...this.state.data.Distracting]
    };

    for (let event of events) {
      const idx = moment(event.start).format(this.getTimeFormat());
      data[event.type][idx] += event.duration;
    }
    this.setState({ data });
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
        {
          // For shadow
          type: "bar",
          itemStyle: {
            normal: { color: "rgba(0,0,0,0.05)" }
          },
          barGap: "-100%",
          barCategoryGap: "40%",
          data: Array(this.getxAxis().length).fill(3600),
          animation: false
        },
        {
          name: "Productive",
          type: "bar",
          stack: "总量",

          data: this.state.data.Productive
        },
        {
          name: "Neutral",
          type: "bar",
          stack: "总量",

          data: this.state.data.Neutral
        },
        {
          name: "Distracting",
          type: "bar",
          stack: "总量",

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
            <Option value="day">day</Option>
            <Option value="week">week</Option>
            <Option value="month">month</Option>
            <Option value="year">year</Option>
          </Select>
          <Switch
            checkedChildren="刷新中"
            unCheckedChildren="已关闭"
            defaultChecked={this.props.refresh}
            onChange={e => this.props.switchRefresh()}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  { switchRefresh }
)(BarStatistic);

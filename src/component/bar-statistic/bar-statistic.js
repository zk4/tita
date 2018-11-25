import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { connect } from "react-redux";
import { Select } from "antd";
import moment from "moment";
import { switchRefresh } from "../../redux/refresh.redux";
import { getStat } from "../../util/configUtil";
import { getMonthdays } from "../../util/timeUtil";

const Option = Select.Option;
const yMaxMaps = {
  day: 3600,
  week: 3600 * 24 * 7,
  month: 3600 * 24 * getMonthdays(),
  year: 3600 * 24 * 31 * 12
};
class BarStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeGroupKey: "day",
      data: {
        Productive: [],
        Neutral: [],
        Distracting: []
      }
    };
    this.xAxisCache = {};
  }
  componentDidMount() {
    this.initXY();
  }
  async initXY() {
    this.resetY();
    this.updateY(await getStat());
  }
  async onTimeSelect(v) {
    this.setState({ timeGroupKey: v.key }, async () => {
      this.initXY();
    });
  }

  resetY() {
    let length = this.getxAxis().length;
    this.setState({
      data: {
        Productive: Array(length).fill(0),
        Neutral: Array(length).fill(0),
        Distracting: Array(length).fill(0)
      }
    });
  }

  componentWillReceiveProps(props) {
    if (props.refresh) this.updateY([props.stat]);
    if (props.windowEvent === "focus") this.initXY();
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
    if (groupKey in this.xAxisCache) {
      return this.xAxisCache[groupKey];
    }
    switch (groupKey) {
      case "minute":
        this.xAxisCache[groupKey] = [...Array(60).keys()];
        break;
      case "hour":
        this.xAxisCache[groupKey] = [...Array(60).keys()];
        break;
      case "day":
        this.xAxisCache[groupKey] = [...Array(24).keys()];
        break;
      case "week":
        this.xAxisCache[groupKey] = [...Array(7).keys()];
        break;
      case "month":
        this.xAxisCache[groupKey] = [...Array(getMonthdays()).keys()];
        break;
      case "year":
        this.xAxisCache[groupKey] = [...Array(12).keys()];
        break;
      case "years":
        this.xAxisCache[groupKey] = [...Array(5).keys()].map(
          v => moment().year() - v
        );
        break;
      default:
        break;
    }
    return this.xAxisCache[groupKey];
  }

  async updateY(events) {
    let data = {
      Productive: [...this.state.data.Productive],
      Neutral: [...this.state.data.Neutral],
      Distracting: [...this.state.data.Distracting]
    };
    if (events) {
      for (let event of events) {
        if (event) {
          const idx = moment(event.start).format(this.getTimeFormat());
          data[event.type][idx] += event.duration;
        }
      }
      this.setState({ data });
    }
  }

  getOption() {
    return {
      toolbox: {
        show : true,
        feature : {
            // mark : {show: true},
            // dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            // restore : {show: true},
            // saveAsImage : {show: true}
        }
    },
    
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
          data: Array(this.getxAxis().length).fill(
            yMaxMaps[this.state.timeGroupKey]
          ),
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
            onChange={e => this.onTimeSelect(e)}
          >
            <Option value="day">day</Option>
            <Option value="week">week</Option>
            <Option value="month">month</Option>
            <Option value="year">year</Option>
          </Select>
          {/* <Switch
            
            checkedChildren="刷新中"
            unCheckedChildren="已关闭"
            checked={this.props.refresh}
            onChange={e => this.props.switchRefresh()}
          /> */}
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  { switchRefresh }
)(BarStatistic);

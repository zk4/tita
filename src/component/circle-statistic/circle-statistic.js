import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { connect } from "react-redux";
import { getCircleData } from "../../util/configUtil";

class CircleStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Productive: 0,
      Neutral: 0,
      Distracting: 0,
      
    };
  }
  componentDidMount() {
    this.initXY();
  }
  resetY() {
    this.setState({
      Productive: 0,
      Neutral: 0,
      Distracting: 0
    });
  }
  async initXY() {
    this.resetY();
    this.updateY(await getCircleData());
  }
  updateY(events) {
    for (let event of events) {
      let type = event.type;
      this.setState({
        [type]: this.state[type] + event.duration
      });
    }
  }
  componentWillReceiveProps(props) {
    if (props.windowEvent === "focus") this.initXY();

    if (props.refresh) {
      if (props.stat) {
        this.updateY([props.stat]);
      }
    }
  }
  getOption() {
    var dt = new Date();
    const passed_sec = (dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours()));
    var remain_secs = 86400-passed_sec;
    var unkown=passed_sec-(this.state.Neutral+this.state.Productive+this.state.Distracting);
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["Productive", "Neutral", "Distracting","Remaining","Unkown"],
        show: false
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: ["50%", "90%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "20",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ["#9DE949", "#23BBD8", "#FF6377","#eee","#777"],

          data: [
            { value: this.state.Productive, name: "Productive" },
            { value: this.state.Neutral, name: "Neutral" },
            { value: this.state.Distracting, name: "Distracting" },
            { value: remain_secs, name: "Remaining" },
            { value: unkown, name: "Unkown" }
          ]
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <ReactEcharts
          option={this.getOption()}
          style={{ width: "100%" }}
          className="react_for_echarts"
        />
      </div>
    );
  }
}
export default connect(
  state => state,
  {}
)(CircleStatistic);

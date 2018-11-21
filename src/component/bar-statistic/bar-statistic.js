import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import {connect} from 'react-redux'
import { Button, Select } from "antd";
import {api} from "../../util/mac-api";
import {addStatEvent} from '../../redux/stat.redux'
const Option = Select.Option;
const timeSpan = {
  day: [
    "0点",
    "1点",
    "2点",
    "3点",
    "4点",
    "5点",
    "6点",
    "7点",
    "8点",
    "9点",
    "10点",
    "11点",
    "12点",
    "13点",
    "14点",
    "15点",
    "16点",
    "17点",
    "18点",
    "19点",
    "20点",
    "21点",
    "22点",
    "23点",
    "24点"
  ],
  week: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
  month:[1,2,3,4,5,6,7,8,9,10,11,12],
  year:[2018,2019,2020,2021]
};
const rawData={
    "web":{
        "title":"youtube",
        "timeStamp":new Date()

    }
}

 
class BarStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeGroupKey: "day"
    };

  }
  componentDidMount(){
    console.log(this.props)
  }
  groupData(data,groupKey){

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
        type: "value"
      },
      xAxis: {
        type: "category",
        data: timeSpan[this.state.timeGroupKey]
      },
      color: [
        "#9DE949",
        "#23BBD8",
        "#FF6377",
       
      ],
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
          data: [
            320,
            302,
            301,
            334,
            320,
            302,
            301,
            334,
            320,
            302,
            301,
            334,
            320,
            302,
            301,
            334,
            320,
            302,
            301,
            334,
            390,
            330,
            320
          ]
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
         
          data: [120, 132, 101, 134, 90, 230, 210]
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
          data: [260, 182, 191, 234, 290, 330, 310]
        }
      ]
    };
  }
  handleChange(v) {
    this.setState({
      timeGroupKey: v.key
    });
    console.log(v); // { key: "lucy", label: "Lucy (101)" }
  }
 
  render() {
    return (
      <div>
        {this.props.stat}
        <ReactEcharts
          option={this.getOption()}
          style={{ height: "300px", width: "100%" }}
          className="react_for_echarts"
        />
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
        
        <Button onClick={this.props.addStatEvent}>add one</Button>
      </div>
    );
  }
}

export default 
connect(state=>state,{addStatEvent})
(BarStatistic);
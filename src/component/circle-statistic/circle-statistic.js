import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
 
export default class CircleStatistic extends Component {
    getOption(){
 
        return   {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                show:false

            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['20%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
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
            style={{  width: '100%'}}
            className='react_for_echarts' />
         
      </div>

    )
  }
}

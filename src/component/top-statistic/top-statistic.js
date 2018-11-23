import React, { Component } from "react";
import { List, Card } from "antd";
import CircleStatistic from "../circle-statistic/circle-statistic";
import { connect } from "react-redux";

class TopStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Productive: [{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 }],
      Neutral: [{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 }],
      Distracting: [{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 },{ name: "", duration: 0 }]
    };
  }
  reOrder(type, idx) {
    for (let i = idx; i > 0; i--) {
      if (this.state[type][i].duration > this.state[type][i - 1].duration) {
        [this.state[type][i], this.state[type][i - 1]] = [
          this.state[type][i - 1],
          this.state[type][i]
        ];
      } else {
        break;
      }
    }
  }
  componentWillReceiveProps(props) {
    if (props.refresh) {
      let event = props.stat;
      let type = props.stat.type;
      let exist = false;
      for (let i = this.state[type].length - 1; i >= 0; i--) {
        let v = this.state[type][i];
        if (v.name === event.name) {
          v.duration += event.duration;
          exist = true;
          this.reOrder(type, i);
          break;
        }
      }
      if (!exist) {
        this.state[type].push(event);
        this.reOrder(type, this.state[type].length - 1);
      }
      this.setState({
        [type]: [...this.state[type]]
      });
    }
  }

  render() {
    const style = { height: "300px" };
    const data = [
      {
        title: "Productive",
        titleColor: "#9DE949"
      },
      {
        title: "Neutral",
        titleColor: "#23BBD8"
      },
      {
        title: "Distracting",
        titleColor: "#FF6377"
      },
      {
        title: ""
      }
    ];
    return (
      <div>
        <div>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={(item, idx) => (
              <List.Item>
                {idx < 3 ? (
                  <Card
                    headStyle={{ background: item.titleColor }}
                    style={{ style }}
                    title={item.title}
                  >
                    <List
                      dataSource={this.state[item.title].slice(0, 6)}
                      renderItem={i => (
                        <List.Item key={i.name}  >
                          {i.name +" - "+i.duration}
                        </List.Item>
                      )}
                    />
                  </Card>
                ) : (
                  <Card style={{ style }}>
                    <CircleStatistic />
                  </Card>
                )}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
export default connect(
  state => state,
  {}
)(TopStatistic);

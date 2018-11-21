import React, { Component } from "react";
import "./App.css";
import { List, Tabs, Card } from "antd";

import BarStatistic from "./component/bar-statistic/bar-statistic";
import CircleStatistic from "./component/circle-statistic/circle-statistic";

const TabPane = Tabs.TabPane;
const data = [
  {
    title: "Title 1"
  },
  {
    title: "Title 2"
  },
  {
    title: "Title 3"
  },
  {
    title: "Title 4"
  }
];
function callback(key) {
  console.log(key);
}

const { app } = window.require("electron").remote;

class App extends Component {
  render() {
    const style = { height:"400px" };
    return (
      <div className="App">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Overview" key="1">
            <div style={{ padding: "5px 100px " }}>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={(item, idx) => (
                  <List.Item>
                    {idx < 3 ? (
                      <Card  style={{style}} title={item.title}>Card content{idx}</Card>
                    ) : (
                      <Card style={{style}}  title={item.title}>
                        <CircleStatistic />
                      </Card>
                    )}
                  </List.Item>
                )}
              />
            </div>
            <BarStatistic />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;

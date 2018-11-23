import React, { Component } from "react";
import "./App.css";
import { List, Tabs, Card } from "antd";

import Config from './layout/config/config'
import BarStatistic from "./component/bar-statistic/bar-statistic";
import CircleStatistic from "./component/circle-statistic/circle-statistic";

 
// import locale from "react-json-editor-ajrm/locale/en";
// import Editor from './component/editor/editor'; // ES6

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

 

const { app } = window.require("electron").remote;

class App extends Component {
  render() {
    const style = { height: "300px" };
    const headerTitle=[
      "Productive", "Neutral", "Distracting",""
    ]
    const headerColors=[
      "#9DE949", "#23BBD8", "#FF6377",
    ]
    
    return (
      <div>
        <Tabs defaultActiveKey="1"  >
          <TabPane tab="Overview" key="1">
            <div style={{ padding: "5px 100px " }}>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={(item, idx) => (
                  <List.Item>
                    {idx < 3 ? (
                      <Card headStyle={{"background":headerColors[idx]}} style={{ style }} title={headerTitle[idx]}>
                        Card content{idx}
                      </Card>
                    ) : (
                      <Card style={{ style }} >
                        <CircleStatistic />
                      </Card>
                    )}
                  </List.Item>
                )}
              />
            </div>
            <BarStatistic />
          </TabPane>
          <TabPane tab="TimeLine" key="2">
           
          </TabPane>
          <TabPane   tab="Config" key="3">
          <Config></Config>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;

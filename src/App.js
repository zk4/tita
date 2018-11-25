import React, { Component } from "react";
import "./App.css";
import { Tabs } from "antd";

import JsonConfig from "./layout/config/jsonConfig/jsonConfig";
import Overview from "./layout/overview/overview";
import Timeline from './layout/timeline/timeline';
import Todo from './layout/todo/todo';
const TabPane = Tabs.TabPane;
// const { app } = window.require("electron").remote;

class App extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
            <Overview />
          </TabPane>
          <TabPane tab="Todo" key="2" >
          <Todo></Todo>
          </TabPane>
          <TabPane tab="TimeLine" key="3" >
          <Timeline></Timeline>
          </TabPane>
          <TabPane tab="Config" key="4">
            <JsonConfig />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;

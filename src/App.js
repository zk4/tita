import React, { Component } from "react";
import "./App.css";
import { Tabs } from "antd";

import JsonConfig from "./layout/config/jsonConfig/jsonConfig";
import Overview from "./layout/overview/overview";
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
          <TabPane tab="TimeLine" key="2" />
          <TabPane tab="Config" key="3">
            <JsonConfig />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;

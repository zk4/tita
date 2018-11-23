import React, { Component } from "react";
import "./App.css";
import { Tabs } from "antd";

import Config from "./layout/config/config";
import BarStatistic from "./component/bar-statistic/bar-statistic";
import TopStatistic from "./component/top-statistic/top-statistic";

const TabPane = Tabs.TabPane;

const { app } = window.require("electron").remote;

class App extends Component {
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
            <TopStatistic />
            <BarStatistic />
          </TabPane>
          <TabPane tab="TimeLine" key="2" />
          <TabPane tab="Config" key="3">
            <Config />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;

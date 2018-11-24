import React, { Component } from "react";
import "./App.css";
import { Tabs, message } from "antd";

import Config from "./layout/config/config";
import BarStatistic from "./component/bar-statistic/bar-statistic";
import TopStatistic from "./component/top-statistic/top-statistic";

const TabPane = Tabs.TabPane;
// const { app } = window.require("electron").remote;

var robot = window.require("robotjs");

let mouseData = {
  position: { x: 0, y: 0 },
  intervalSec: 5,
  maxCheckSec: 60*10,
  nowSec: 0
};
setInterval(() => {
  var mouse = robot.getMousePos();
  // console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
  if (mouse.x === mouseData.position.x && mouse.y === mouseData.position.y) {
    mouseData.nowSec += mouseData.intervalSec;
    if (mouseData.nowSec > mouseData.maxCheckSec) {
      message.info("mouse is not moving, stop monioring.");
    }
  } else {
    mouseData.position.x=mouse.x;
    mouseData.position.y=mouse.y;
    mouseData.nowSec = 0;
  }
}, mouseData.intervalSec * 1000);

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

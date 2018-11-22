import React, { Component } from "react";
import JSONInput from "react-json-editor-ajrm";
import { config } from "../../config";
import { Tabs, Button } from "antd";
const TabPane = Tabs.TabPane;

export default class Config extends Component {
  saveJson(e) {
    console.log("json", e);
  }
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane className="center" tab="config" key="1" />
          <TabPane tab="Json (Advanced)" key="2">
            <JSONInput
              width="100%"
              height="100%"
              id="a_unique_id"
              placeholder={config}
              theme="light_mitsuketa_tribute"
              onChange={e => this.saveJson(e)}
            />
            <Button onClick={e => {}} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

import React, { Component } from "react";
import { getConfig, saveConfig } from "../../util/configUtil";
import { Input, Tabs, Button } from "antd";
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const config = getConfig();

export default class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: JSON.stringify(config, null, 4)
    };
  }
  saveJson(e) {
    saveConfig(this.state.value);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="2">
          <TabPane className="center" tab="config" key="1" />
          <TabPane tab="Json (Advanced)" key="2">
            <TextArea
              rows={4}
              autosize
              defaultValue={this.state.value}
              onChange={e => this.onChange(e)}
            />
           
            <Button type="primary" onClick={this.saveJson.bind(this)} block>
              Save
            </Button>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

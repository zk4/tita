import React, { Component } from 'react'
import appStore from "../../mobx/appStore"
import Counter from "../../component/Counter"

export default class Timeline extends Component {
  render() {
    return (
      <div>
        timeline
        <Counter store={appStore}></Counter>

      </div>
    )
  }
}

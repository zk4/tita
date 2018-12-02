import { observer } from "mobx-react";
import React, { Component } from "react";
 import Devtools from 'mobx-react-devtools'

 
class Counter extends Component {
  

  render() {
    return (
      <div>
        <Devtools></Devtools>
        Counter:{this.props.store.count}
        <button onClick={this.handleDec}>-</button>
        <button onClick={this.handleInc}>+</button>
      </div>
    );
  }
  handleDec = () => {
    this.props.store.decrease()
  };
  handleInc = () => {
    this.props.store.increment()
  };
}
export default observer(Counter);

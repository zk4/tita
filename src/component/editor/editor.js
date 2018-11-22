import React, { Component } from "react";
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import {config} from '../../util/configUtil';
export default class Editor extends React.Component {
    constructor(props) {
      super(props)
      this.state = { text: '' } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(value) {
      this.setState({ text: value })
    }
  
    render() {
      return (
        <ReactQuill value={JSON.stringify(config)}
                    onChange={this.handleChange} />
      )
    }
  }
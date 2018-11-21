import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import frFR from 'antd/lib/locale-provider/fr_FR';
import moment from 'moment';
import 'moment/locale/fr';
import 'antd/dist/antd.css'; // or antd/lib/button/style/css for css format file

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
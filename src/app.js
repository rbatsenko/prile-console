import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import $ from 'jquery';
import 'tether';
import 'popper.js';
import 'bootstrap';
import 'slimscroll';
import 'moment';
import 'chartist';
import 'metismenu';
import 'onoffcanvas';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/icomoon/icomoon.css';
import './styles/styles.scss';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('app'));

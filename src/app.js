import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import App from './components/App';
import 'tether';
import 'popper.js';
import 'bootstrap';
import 'slimscroll';
import 'metismenu';
import 'onoffcanvas';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import './styles/c3.min.css';

sessionStorage.setItem('isLoggedIn', true);

ReactDOM.render(
    <BrowserRouter history={browserHistory} basename={'/console'}>
        <App />
    </BrowserRouter>
, document.getElementById('app'));
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import $ from 'jquery';
import { BrowserRouter, Route } from 'react-router-dom';
import 'tether';
import 'popper.js';
import 'bootstrap';
import 'slimscroll';
import 'moment';
import 'chartist';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';

const ProfilePage = () => (
    <div>
        This is Profile Page!
    </div>
);

const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={Dashboard} exact={true} />
            <Route path="/profile" component={ProfilePage} exact={true} />
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));

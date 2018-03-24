import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import DashboardMain from '../components/DashboardMain';
import Profile from '../components/Profile';
import History from '../components/History';
import PaymentRequest from '../components/PaymentRequest';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <Router>
        <div className="app-wrap">
            <Header />
                <div className="app-container">
                    <SideNav />
                    <Switch>
                        <Route path="/" component={DashboardMain} exact={true} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/history" component={History} exact={true} />
                        <Route path="/payment-request" component={PaymentRequest} exact={true} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            <Footer />
        </div>
    </Router>
);

export default AppRouter;
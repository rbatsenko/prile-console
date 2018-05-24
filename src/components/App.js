import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import pathToRegexp from 'path-to-regexp';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import InnerHeader from '../components/InnerHeader';
import Footer from '../components/Footer';
import DashboardMain from '../components/DashboardMain';
import Profile from '../components/Profile';
import History from '../components/History';
import Confirmation from '../components/Confirmation';
import NotFoundPage from '../components/NotFoundPage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PrivateRoute = ({ component: Component,...rest }) => (
    <Route {...rest} render={(props) => (
      sessionStorage.getItem('isLoggedIn')
        ? <Component {...props} />
        : console.log('error')
    )} />
);

axios.defaults.baseURL = '/api';

const App = ({ location }) => {

    const currentKey = location.pathname.split('/')[1] || '/';

    return (
        <div className="app-wrap">
            <Header />
                <div className="app-container">
                    <SideNav />
                    <div className="app-main">
                    <InnerHeader />
                        <TransitionGroup component="main">
                        <CSSTransition
                            appear
                            key={currentKey}
                            timeout={300}
                            classNames='fade'
                        >
                            <Switch location={location}>
                                <PrivateRoute exact path="/" component={DashboardMain} />
                                <PrivateRoute exact path="/profile" component={Profile} />
                                <PrivateRoute exact path="/history" component={History} />
                                <Route path='/accounts' component={Confirmation} />
                                <Route component={NotFoundPage} />
                            </Switch>
                        </CSSTransition>
                        </TransitionGroup>
                    </div>
                </div>
            <Footer />
        </div>
    );
}

export default withRouter(App);
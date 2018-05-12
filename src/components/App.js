import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import InnerHeader from '../components/InnerHeader';
import Footer from '../components/Footer';
import DashboardMain from '../components/DashboardMain';
import Profile from '../components/Profile';
import History from '../components/History';
import NotFoundPage from '../components/NotFoundPage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PrivateRoute = ({ component: Component,...rest }) => (
    <Route {...rest} render={(props) => (
      sessionStorage.getItem('isLoggedIn')
        ? <Component {...props} />
        : window.location.href = '/login'
    )} />
  )

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
                                <PrivateRoute path="/" component={DashboardMain} exact />
                                <PrivateRoute path="/profile" component={Profile} exact />
                                <PrivateRoute path="/history" component={History} exact />
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
import React from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { logIn, logOut, getCash, getSites } from '../utils/ApiFunctions';
import 'tether';
import 'bootstrap';
import 'metismenu';
import 'onoffcanvas';

export default class SideNav extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            isLoggedIn : false,
            email : '',
            password : '',
            moneroAccount : '',
            cash : 0,
            sites : []
        }
    }

    user = {
        email: 'r.batsenkokarma@gmail.com',
        password: 'Prile'
    };

    componentDidMount() {

        sessionStorage.setItem('email', 'r.batsenkokarma@gmail.com');
        //localStorage.setItem('password', 'Prile');

        axios.post('http://www.prile.io/api/session', {
                email: this.user.email,
                password: this.user.password
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                if (response.status == 200) {
                    console.log('Success!');
                } else {
                    localStorage.setItem('error', 'Please try another credentials!');
                    window.location.href = 'http://prile.karma-dev.pro/login';
                }
            })
            .catch((error) => {
                //console.log(error);
            });
        
        /*if ( user.email && user.password ) {
            
        } else {
            localStorage.setItem('error', 'Please try another credentials!');
            window.location.href = 'http://prile.karma-dev.pro/login';
        }*/

    }

    render() {
        return (
            <aside className="app-side" id="app-side">
                {/* {/*BEGIN .side-content */}
                <div className="side-content ">
                    {/* BEGIN .user-profile */}
                    <div className="user-profile">
                        <img src="images/user.png" className="profile-thumb" alt="User Thumb" />
                        <h6 className="profile-name">{/*localStorage.getItem('email').substr(0, localStorage.getItem('email').indexOf('@'))*/}</h6>
                        <ul className="profile-actions">
                            <li>
                                <a href="/logout" onClick={this.logOut}>
                                    <i className="icon-export"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* END .user-profile */}
                    {/* BEGIN .side-nav */}
                    <nav className="side-nav">
                        {/* BEGIN: side-nav-content */}
                        <ul className="unifyMenu" id="unifyMenu">
                            <li>
                                <NavLink to="/" exact={true}>
                                    <span className="has-icon">
                                        <i className="icon-laptop_windows"></i>
                                    </span>
                                    <span className="nav-title">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" exact={true}>
                                    <span className="has-icon">
                                        <i className="icon-user"></i>
                                    </span>
                                    <span className="nav-title">Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/history" exact={true}>
                                    <span className="has-icon">
                                        <i className="icon-chart-area-outline"></i>
                                    </span>
                                    <span className="nav-title">Withdrawals</span>
                                </NavLink>
                            </li>
                            <li>
                                <a href="/logout" onClick={this.logOut} className="log-out" aria-expanded="false">
                                    <span className="has-icon">
                                        <i className="icon-lock_outline"></i>
                                    </span>
                                    <span className="nav-title">Log Out</span>
                                </a>
                            </li>
                        </ul>
                        {/* END: side-nav-content */}
                    </nav>
                    {/* END: .side-nav */}
                </div>
                {/* END: .side-content */}
            </aside>
        );
    }
};
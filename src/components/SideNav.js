import React from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import 'tether';
import 'bootstrap';
import 'metismenu';
import 'onoffcanvas';

export default class SideNav extends React.Component {

    componentDidMount() {
        $('#unifyMenu li .active').each( function(i) {
            $(this).parent().toggleClass('active selected current-page');
        });
    }

    render() {
        return (
            <aside className="app-side" id="app-side">
                {/* {/*BEGIN .side-content */}
                <div className="side-content ">
                    {/* BEGIN .user-profile */}
                    <div className="user-profile">
                        <img src="images/user.png" className="profile-thumb" alt="User Thumb" />
                        <h6 className="profile-name">Yuki Hayashi</h6>
                        <ul className="profile-actions">
                            <li>
                                <a href="#">
                                    <i className="icon-social-skype"></i>
                                    <span className="count-label red"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="icon-social-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="login.html">
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
                                <NavLink to="/" aria-expanded="false" exact={true}>
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
                                <a href="#" aria-expanded="false">
                                    <span className="has-icon">
                                        <i className="icon-chart-area-outline"></i>
                                    </span>
                                    <span className="nav-title">History</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" aria-expanded="false">
                                    <span className="has-icon">
                                        <i className="icon-flash-outline"></i>
                                    </span>
                                    <span className="nav-title">Payment Request</span>
                                </a>
                            </li>
                            <li>
                                <a href="/logout/" className="log-out" aria-expanded="false">
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
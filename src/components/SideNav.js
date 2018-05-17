import React from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import baseApi from '../components/App';
import 'tether';
import 'bootstrap';
import 'metismenu';
import 'onoffcanvas';
import { Icon } from 'react-icons-kit';
import { ic_laptop } from 'react-icons-kit/md/ic_laptop';
import { user } from 'react-icons-kit/icomoon/user';
import { ic_show_chart } from 'react-icons-kit/md/ic_show_chart';

export default class SideNav extends React.Component {

    logOut = (e) => {
        e.preventDefault();
        axios.delete(baseApi + '/api/session',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    sessionStorage.setItem('isLoggedIn', false);
                    window.location.href = '/';
                }
            })
            .catch( (error) => {
                console.log(error);
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
                        <h6 className="profile-name">{/*localStorage.getItem('email').substr(0, localStorage.getItem('email').indexOf('@'))*/}</h6>
                    </div>
                    {/* END .user-profile */}
                    {/* BEGIN .side-nav */}
                    <nav className="side-nav">
                        {/* BEGIN: side-nav-content */}
                        <ul className="unifyMenu" id="unifyMenu">
                            <li>
                                <NavLink to="/" exact={true}>
                                    <span className="has-icon">
                                        <div style={{width: 21, height: 21}}>
                                            <Icon size={'100%'} icon={ ic_laptop }/>
                                        </div>
                                    </span>
                                    <span className="nav-title">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" exact={true}>
                                    <span className="has-icon">
                                        <div style={{width: 21, height: 21}}>
                                            <Icon size={'100%'} icon={ user }/>
                                        </div>
                                    </span>
                                    <span className="nav-title">Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/history" exact={true}>
                                    <span className="has-icon">
                                        <div style={{width: 21, height: 21}}>
                                            <Icon size={'100%'} icon={ ic_show_chart }/>
                                        </div>
                                    </span>
                                    <span className="nav-title">Withdrawals</span>
                                </NavLink>
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
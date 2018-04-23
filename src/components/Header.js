import React from 'react';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';

const style1 = {
    width: '87%'
};

const style2 = {
    width: '65%'
};

const style3 = {
    width: '42%'
};

const Header = () => (
    <div className="app-header">
        <div className="container-fluid">
            <div className="row gutters">
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-4">
                    <a className="mini-nav-btn" id="app-side-mini-toggler">
                        <i className="icon-menu5"></i>
                    </a>
                    <a data-toggle="onoffcanvas" className="onoffcanvas-toggler" aria-expanded="false">
                        <i className="icon-chevron-thin-right"></i>
                    </a>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-4">
                    <a href="/" className="logo">
                        <img src="images/login-logo.png" alt="Prile Admin Dashboard" />
                    </a>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-4">
                    <ul className="header-actions">
                        <li className="dropdown">
                            <a href="#" id="userSettings" className="user-settings" data-toggle="dropdown" aria-haspopup="true">
                                <img className="avatar" src="images/user.png" alt="User Thumb" />
                                <span className="user-name">{/*localStorage.getItem('email').substr(0, localStorage.getItem('email').indexOf('@'))*/}</span>
                                <i className="icon-chevron-small-down"></i>
                            </a>
                            <div className="dropdown-menu lg dropdown-menu-right" aria-labelledby="userSettings">
                                <ul className="user-settings-list">
                                    <li>
                                        <NavLink to="/profile">
                                            <div className="icon">
                                                <i className="icon-account_circle"></i>
                                            </div>
                                            <p>Profile</p>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/history">
                                            <div className="icon yellow">
                                                <i className="icon-schedule"></i>
                                            </div>
                                            <p>History</p>
                                        </NavLink>
                                    </li>
                                </ul>
                                <div className="logout-btn">
                                    <a href="/logout" className="btn btn-primary log-out">Logout</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

$(function () {
    $('.side-nav .unifyMenu').metisMenu({ toggle: true });

    $('#app-side-hoverable-toggler').on('click', function () {
        $('.app-side').toggleClass('is-hoverable');
        $(undefined).children('i.fa').toggleClass('fa-angle-right fa-angle-left');
    });

    $('#app-side-mini-toggler').on('click', function () {
        $('.app-side').toggleClass('is-mini');
        $("#app-side-mini-toggler i").toggleClass('icon-sort icon-menu5');
    });

    $('#onoffcanvas-nav').on('click', function () {
        $('.app-side').toggleClass('left-toggle');
        $('.app-main').toggleClass('left-toggle');
        $("#onoffcanvas-nav i").toggleClass('icon-sort icon-menu5');
    });
    
    $('.onoffcanvas-toggler').on('click', function () {
        $('.app-side').toggleClass('is-open');
        $(".onoffcanvas-toggler i").toggleClass('icon-chevron-thin-left icon-chevron-thin-right');
    });

    localStorage.setItem('email', 'r.batsenkokarma@gmail.com');
    localStorage.setItem('password', 'Prile');
});

export default Header;
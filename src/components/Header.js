import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_exit_to_app } from 'react-icons-kit/md/ic_exit_to_app';
import { thinLeft } from 'react-icons-kit/entypo/thinLeft';
import { thinRight } from 'react-icons-kit/entypo/thinRight';
import { ic_menu } from 'react-icons-kit/md/ic_menu';

const style1 = {
    width: '87%'
};

const style2 = {
    width: '65%'
};

const style3 = {
    width: '42%'
};

const logOut = (e) => {
    e.preventDefault();
    axios.delete('/session',
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

const Header = () => (
    <div className="app-header">
        <div className="container-fluid">
            <div className="row gutters">
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-4">
                    <a className="mini-nav-btn" id="app-side-mini-toggler">
                        <div style={{width: 24, height: 26, color: '#007ae1'}}>
                            <Icon size={'100%'} icon={ ic_menu }/>
                        </div>
                    </a>
                    <a data-toggle="onoffcanvas" className="onoffcanvas-toggler" aria-expanded="false">
                        <div style={{width: 24, height: 24}}>
                            <Icon size={'100%'} icon={ thinRight }/>
                        </div>
                    </a>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-4">
                    <a href="/" className="logo">
                        <img src="images/login-logo.png" alt="Prile Admin Dashboard" />
                    </a>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-3 col-4">
                    <ul className="header-actions">
                        <li>
                            <a href="/logout" onClick={logOut}>
                                <div style={{width: 24, height: 24}}>
                                    <Icon size={'100%'} icon={ ic_exit_to_app }/>
                                </div>
                            </a>
                            {/*
                            <div className="logout-btn">
                                <a href="/logout" className="btn btn-primary log-out">Logout</a>
                            </div>
                            */}
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
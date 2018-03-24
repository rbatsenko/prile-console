import React from 'react';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';
import InnerHeader from './InnerHeader';
import InnerProfile from './InnerProfile';
import $ from 'jquery';

export default class Profile extends React.Component {

    render() {
        return (
            <div className="app-container">
                <SideNav />
                <div className="app-main">
                    <InnerHeader />
                    <InnerProfile />
                </div>
            </div>
        );
    }

};
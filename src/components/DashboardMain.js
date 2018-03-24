import React from 'react';
import SideNav from './SideNav';
import InnerHeader from './InnerHeader';
import InnerMain from './InnerMain';
import $ from 'jquery';

export default class DashboardMain extends React.Component {

    render() {
        return (
            <div className="app-container">
                <SideNav />
                <div className="app-main">
                    <InnerHeader />
                    <InnerMain />
                </div>
            </div>
        );
    }

};
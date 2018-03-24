import React from 'react';
import InnerHeader from './InnerHeader';
import InnerMain from './InnerMain';
import $ from 'jquery';

export default class DashboardMain extends React.Component {

    componentDidMount() {
        $('#unifyMenu li').each( function(i) {
            if ( $(this).find('a').hasClass('active') ) {
                $(this).addClass('active selected current-page');
            } else {
                $(this).removeClass('active selected current-page');
            }
        });
    }

    render() {
        return (
            <div className="app-main">
                <InnerHeader />
                <InnerMain />
            </div>
        );
    }

};
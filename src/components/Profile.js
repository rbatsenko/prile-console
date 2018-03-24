import React from 'react';
import InnerHeader from './InnerHeader';
import InnerProfile from './InnerProfile';
import $ from 'jquery';

export default class Profile extends React.Component {

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
                <InnerProfile />
            </div>
        );
    }

};
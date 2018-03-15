import React from 'react';
import $ from 'jquery';

const Loader = () => (
    <div id="loading-wrapper">
        <div id="loader">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
            <div className="line4"></div>
            <div className="line5"></div>
            <div className="line6"></div>
        </div>
    </div>
);

$(function() {
	$("#loading-wrapper").fadeOut(2000);
});

export default Loader;
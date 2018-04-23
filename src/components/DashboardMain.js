import React from 'react';
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
            <div className="main-content">
                {/* Row start */}
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Overview</div>
                            <div className="card-body">
                                {/* Row start */}
                                <div className="row gutters">
                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                                        <h6 className="card-title mt-0">Visitors</h6>
                                        <div className="chartist custom-one">
                                            <div className="line-chart"></div>
                                        </div>
                                        <div className="download-details">
                                            <p>21<sup>%</sup> more visitors than last month</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                                        <div className="monthly-avg">
                                            <h6>Monthly Average</h6>
                                            <div className="avg-block">
                                                <h4 className="avg-total text-secondary">9500</h4>
                                                <h6 className="avg-label">
                                                    Shares
                                                </h6>
                                            </div>
                                            <div className="avg-block">
                                                <h4 className="avg-total text-primary">500</h4>
                                                <h6 className="avg-label">
                                                    Cash
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                                        <h6 className="card-title mt-0">Mining</h6>
                                        <div className="chartist custom-two">
                                            <div className="line-chart2"></div>
                                        </div>
                                        <div className="download-details">
                                            <p>15<sup>%</sup> more sales than last month</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Row end */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Row end */}
                {/* Row start */}
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Mining</div>
                            <div className="card-body">
                                <div className="clearfix">
                                    <div className="btn-group custom-btn-group float-right" role="group">
                                        <button type="button" className="btn btn-outline-primary btn-sm btn-rounded">Today</button>
                                        <button type="button" className="btn btn-outline-primary btn-sm btn-rounded">Yesterday</button>
                                        <button type="button" className="btn btn-outline-primary btn-sm btn-rounded">Last week</button>
                                        <button type="button" className="btn btn-outline-secondary btn-sm btn-rounded">Last Month</button>
                                    </div>
                                </div>
                                <div className="chartist custom-two">
                                    <div className="custom-area-chart4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Row end */}
            </div>
        );
    }

};
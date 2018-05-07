import React from 'react';
import $ from 'jquery';
import { getSites } from '../utils/ApiFunctions';
import axios from 'axios';

export default class DashboardMain extends React.Component {

    componentDidMount() {

        axios.get('http://www.prile.io/api/accounts/current',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    const listOfSites = response.data.sites;
                    this.setState( () => ({ sites: listOfSites }));
                }
            })
            .catch( (error) => {
                console.log(error);
            });

        axios.get('http://www.prile.io/api/finance/cash',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    $('.monero-amount').text(response.data.moneroAmount);
                }
            })
            .catch( (error) => {
                console.log(error);
            });

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
                            <div className="card-header">Cash</div>
                            <div className="card-body">
                                {/* Row start */}
                                <div className="row gutters">
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 d-flex align-items-center">
                                        <h4 className="monero-amount"></h4>
                                    </div>
                                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 right-actions">
                                        <button className="btn btn-primary float-right" title="Payment Request">
                                            <span>Payment Request</span><i className="icon-download4"></i>
                                        </button>
                                    </div>
                                </div>
                                {/* Row end */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Overview</div>
                            <div className="card-body">
                                {/* Row start */}
                                <div className="row gutters">
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
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
                                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12">
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
            </div>
        );
    }

};
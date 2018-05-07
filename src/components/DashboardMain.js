import React from 'react';
import $ from 'jquery';
import { getSites } from '../utils/ApiFunctions';
import axios from 'axios';
import c3 from 'c3';

export default class DashboardMain extends React.Component {

    state = {
        sites: [],
        general: [],
        sitesStats: []
    }

    SitesList = () => {

        const sites = this.state.sites;
        const sitesList = sites.map((site, index) =>
            <button type="button" className="btn btn-outline-primary btn-block" key={index}>{site.description}</button>
        );
        return (
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <button type="button" className="btn btn-primary btn-block">General</button>
                {sitesList}
            </div>
        );
    }

    generalTable = () => {
        const general = this.state.general;
        
        return (
            <table id="generalTable" className="table table-bordered m-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Last Month</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Prile Tokens</th>
                        <td>{general.tokensActMonth}</td>
                        <td>{general.tokensTotal}</td>
                    </tr>
                    <tr>
                        <th scope="row">Prile Power</th>
                        <td>{general.powerActMonth}</td>
                        <td>{general.powerTotal}</td>
                    </tr>
                    <tr>
                        <th scope="row">% AdBlock Entries</th>
                        <td>{general.adblockPercentActMonth}</td>
                        <td>{general.adblockPercentTotal}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    componentDidMount() {

        axios.get('http://www.prile.io/api/accounts/current',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    const listOfSites = response.data.sites;
                    this.setState( () => ({ sites: listOfSites }));
                    console.log(this.state);
                }
            })
            .catch( (error) => {
                console.log(error);
            });

        axios.get('http://www.prile.io/api/accounts/current/dashboardStats',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    const general = response.data.general;
                    const sites = response.data.sites;
                    this.setState( () => ({ 
                        general: general, 
                        sitesStats: sites 
                    }));
                    console.log(this.state);
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
                    $('.modal-body').text(response.data.moneroAmount);
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

        var chart2 = c3.generate({
            bindto: '#graph',
            padding: {
                top: 0,
                left: 30,
                right: 0,
                bottom: 0
            },
            /*axis: {
                y: {
                    tick: {
                      values: [0, 1, 2]
                    }
                  }
            },*/
            data: {
                columns: [
                    ['data1', /*this.state.general.tokenChart.month*/],
                    ['data2', 0, 1, 2, 2],
                ],
                types: {
                    data1: 'line',
                    data2: 'line'
                },
                names: {
                    data1: 'Prile Tokens',
                    data2: 'Prile Power'
                },
                colors: {
                    data1: '#007ae1',
                    data2: '#ff5661'
                },
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
                                        <button className="btn btn-primary float-right" title="Payment Request" data-toggle="modal" data-target="#exampleModal">
                                            <span>Payment Request</span><i className="icon-download4"></i>
                                        </button>
										
										<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="modal-header">
														<h5 className="modal-title" id="exampleModalLabel">Payment Request</h5>
														<button type="button" className="close" data-dismiss="modal" aria-label="Close">
															<span aria-hidden="true">×</span>
														</button>
													</div>
													<div className="modal-body"></div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
														<button type="button" className="btn btn-primary">Withdraw</button>
													</div>
												</div>
											</div>
										</div>
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
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                                        <this.generalTable/>
                                    </div>
                                    <this.SitesList/>
                                </div>
                                {/* Row end */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gutters">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Statistics</div>
                            <div className="card-body">
                                <div id="graph" className="chart-height"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Row end */}
            </div>
        );
    }

};
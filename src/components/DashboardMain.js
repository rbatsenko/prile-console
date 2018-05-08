import React from 'react';
import $ from 'jquery';
import { getSites } from '../utils/ApiFunctions';
import axios from 'axios';
import c3 from 'c3';
import dateFormat from 'dateformat';

export default class DashboardMain extends React.Component {

    state = {
        sites: [],
        general: [],
        sitesStats: [],
        dataChoice: 'general',
        activeGraph: 'month'
    }

    SitesButtons = () => {

        const sites = this.state.sites;
        const sitesButtons = sites.map((site, index) =>
            <button type="button" className="btn btn-outline-primary btn-block" key={index} onClick={ (e) => { this.activeBtn(e); this.dataSwitch(e); } } data-site={site.siteId}>{site.description}</button>
        );
        return (
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <button type="button" className="btn btn-outline-primary btn-block active" onClick={ (e) => { this.activeBtn(e); this.dataSwitch(e); } } data-site={'general'}>General</button>
                {sitesButtons}
            </div>
        );
    }

    GeneralTable = () => {
        const general = this.state.general;
        
        return (
            <table id="generalTable" className="table general-table table-bordered m-0">
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

    /*---------------Charts------------------*/

    getDateArray = (start, end) => {
        let arr = new Array();
        let dt = new Date(start);
        while (dt <= end) {
            arr.push(dateFormat(dt, "dd.mm.yyyy"));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    lastWeek = () => {
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        let endDate = new Date();
        
        let dateArr = this.getDateArray(startDate, endDate);
        dateArr.unshift('x');
        return dateArr;
    }

    buildWeekChart = (dataChoice) => {

        let weekTokenArr, weekPowerArr;
        if (dataChoice == 'general') {
            weekTokenArr = this.state[dataChoice].tokenChart.month;
            weekPowerArr = this.state[dataChoice].powerChart.month;
        } else {
            weekTokenArr = this.state.sitesStats[dataChoice].tokenChart.month;
            weekPowerArr = this.state.sitesStats[dataChoice].powerChart.month;
        }

        let chart2 = c3.generate({
            bindto: '#graph',
            padding: {
                top: 30,
                left: 50,
                right: 30,
                bottom: 0
            },
            data: {
                x: 'x',
                xFormat: '%d.%m.%Y',
                columns: [
                    this.lastWeek(),
                    weekTokenArr,
                    weekPowerArr
                ],
                types: {
                    data1: 'spline',
                    data2: 'spline'
                },
                names: {
                    data1: 'Prile Tokens',
                    data2: 'Prile Power'
                },
                colors: {
                    data1: '#007ae1',
                    data2: '#ff5661'
                },
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d.%m.%Y'
                    }
                }
            }
        });

        this.setState(() => ({ activeGraph: 'week' }));
        console.log(this.state);
    }

    lastMonth = () => {
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        let endDate = new Date();
        
        let dateArr = this.getDateArray(startDate, endDate);
        dateArr.unshift('x');
        return dateArr;
    }

    buildMonthChart = (dataChoice) => {

        let monthTokenArr, monthPowerArr;
        if (dataChoice == 'general') {
            monthTokenArr = this.state[dataChoice].tokenChart.month;
            monthPowerArr = this.state[dataChoice].powerChart.month;
        } else {
            monthTokenArr = this.state.sitesStats[dataChoice].tokenChart.month;
            monthPowerArr = this.state.sitesStats[dataChoice].powerChart.month;
        }

        let chart2 = c3.generate({
            bindto: '#graph',
            padding: {
                top: 30,
                left: 50,
                right: 30,
                bottom: 0
            },
            data: {
                x: 'x',
                xFormat: '%d.%m.%Y',
                columns: [
                    this.lastMonth(),
                    monthTokenArr,
                    monthPowerArr
                ],
                types: {
                    data1: 'spline',
                    data2: 'spline'
                },
                names: {
                    data1: 'Prile Tokens',
                    data2: 'Prile Power'
                },
                colors: {
                    data1: '#007ae1',
                    data2: '#ff5661'
                },
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d.%m.%Y'
                    }
                }
            }
        });

        this.setState(() => ({ activeGraph: 'month' }));
        console.log(this.state);
    }

    lastYear = () => {
        let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let currentMonth = (new Date()).getMonth() + 1;
        let year = monthNames.slice(currentMonth).concat(monthNames.slice(0, currentMonth));
        return year;
    }

    buildYearChart = (dataChoice) => {

        let yearTokenArr, yearPowerArr;
        if (dataChoice == 'general') {
            yearTokenArr = this.state[dataChoice].tokenChart.year;
            yearPowerArr = this.state[dataChoice].powerChart.year;
        } else {
            yearTokenArr = this.state.sitesStats[dataChoice].tokenChart.year;
            yearPowerArr = this.state.sitesStats[dataChoice].powerChart.year;
        }
        
        let chart2 = c3.generate({
            bindto: '#graph',
            padding: {
                top: 30,
                left: 50,
                right: 30,
                bottom: 0
            },
            data: {
                columns: [
                    yearTokenArr,
                    yearPowerArr
                ],
                types: {
                    data1: 'spline',
                    data2: 'spline'
                },
                names: {
                    data1: 'Prile Tokens',
                    data2: 'Prile Power'
                },
                colors: {
                    data1: '#007ae1',
                    data2: '#ff5661'
                },
            },
            axis: {
                x: {
                    type: 'category',
                    categories: this.lastYear()
                }
            }
        });

        this.setState(() => ({ activeGraph: 'year' }));
        console.log(this.state);
    }

    activeBtn = (e) => {
        $(e.target).parent().find('button').removeClass('active');
        e.target.className += ' active';
    }

    dataSwitch = (e) => {
        let site = $(e.target).attr('data-site');
        this.setState( () => ({ dataChoice: site }));
        if (this.state.activeGraph == 'week') {
            this.buildWeekChart(site);
        } else if (this.state.activeGraph == 'month') {
            this.buildMonthChart(site);
        } else if (this.state.activeGraph == 'year') {
            this.buildYearChart(site);
        }
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
                    let sites = response.data.sites;
                    console.log(sites[Object.keys(sites)[0]]);
                    general.tokenChart.week.reverse().unshift('data1');
                    general.powerChart.week.reverse().unshift('data2');
                    general.tokenChart.month.reverse().unshift('data1');
                    general.powerChart.month.reverse().unshift('data2');
                    general.tokenChart.year.reverse().unshift('data1');
                    general.powerChart.year.reverse().unshift('data2');

                    let i;
                    for (i = 0; i < Object.keys(sites).length; i++) {
                        sites[Object.keys(sites)[i]].tokenChart.week.reverse().unshift('data1');
                        sites[Object.keys(sites)[i]].tokenChart.month.reverse().unshift('data1');
                        sites[Object.keys(sites)[i]].tokenChart.year.reverse().unshift('data1');
                    }
                    for (i = 0; i < Object.keys(sites).length; i++) {
                        sites[Object.keys(sites)[i]].powerChart.week.reverse().unshift('data2');
                        sites[Object.keys(sites)[i]].powerChart.month.reverse().unshift('data2');
                        sites[Object.keys(sites)[i]].powerChart.year.reverse().unshift('data2');
                    }

                    this.setState( () => ({ 
                        general: general, 
                        sitesStats: sites
                    }));
                    this.buildMonthChart(this.state.dataChoice);
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
                                <div className="row gutters overview">
                                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                                        <this.GeneralTable/>
                                    </div>
                                    <this.SitesButtons/>
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
                                <div className="clearfix">
                                    <div className="btn-group custom-btn-group float-right graph-buttons" role="group">
                                        <button type="button" className="btn btn-outline-primary btn-sm btn-rounded" onClick={ (e) => { this.activeBtn(e); this.buildWeekChart(this.state.dataChoice) } }>Last Week</button>
                                        <button type="button" className="btn btn-outline-primary btn-sm btn-rounded active" onClick={ (e) => { this.activeBtn(e); this.buildMonthChart(this.state.dataChoice) } }>Last Month</button>
                                        <button type="button" className="btn btn-outline-primary btn-sm btn-rounded" onClick={ (e) => { this.activeBtn(e); this.buildYearChart(this.state.dataChoice) } }>Last Year</button>
                                    </div>
                                </div>
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
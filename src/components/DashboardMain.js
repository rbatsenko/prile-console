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
        activeGraph: 'month',
        moneroAmount: 0,
        withdrawalAvailable: false
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
        let monthTokens, monthPower, monthAd, totalTokens, totalPower, totalAd;
        if (this.state.dataChoice == 'general') {
            monthTokens = this.state[this.state.dataChoice].tokensActMonth;
            monthPower = this.state[this.state.dataChoice].powerActMonth;
            monthAd = this.state[this.state.dataChoice].adblockPercentActMonth;
            totalTokens = this.state[this.state.dataChoice].tokensTotal;
            totalPower = this.state[this.state.dataChoice].powerTotal;
            totalAd = this.state[this.state.dataChoice].adblockPercentTotal;
        } else {
            monthTokens = this.state.sitesStats[this.state.dataChoice].tokensActMonth;
            monthPower = this.state.sitesStats[this.state.dataChoice].powerActMonth;
            monthAd = this.state.sitesStats[this.state.dataChoice].adblockPercentActMonth;
            totalTokens = this.state.sitesStats[this.state.dataChoice].tokensTotal;
            totalPower = this.state.sitesStats[this.state.dataChoice].powerTotal;
            totalAd = this.state.sitesStats[this.state.dataChoice].adblockPercentTotal;
        }
        
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
                        <td>{monthTokens}</td>
                        <td>{totalTokens}</td>
                    </tr>
                    <tr>
                        <th scope="row">Prile Power</th>
                        <td>{monthPower}</td>
                        <td>{totalPower}</td>
                    </tr>
                    <tr>
                        <th scope="row">% AdBlock Entries</th>
                        <td>{monthAd}</td>
                        <td>{totalAd}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    /*---------------Charts------------------*/

    //helper for building date range array
    getDateArray = (start, end) => {
        let arr = new Array();
        let dt = new Date(start);
        while (dt <= end) {
            arr.push(dateFormat(dt, "dd.mm.yyyy"));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    getHoursArray = (hour) => {
        let i,j;
        let arr = [];

        for (i = hour; i <= 24; i++) {
            arr.push(i + ':00');
        }
        for (j = 1; j < hour; j++) {
            arr.push(j + ':00');
        }

        arr = arr.concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr);
        return arr;
    }

    lastWeek = () => {
        let startHour = new Date();
        startHour = startHour.getHours();
        
        let dateArr = this.getHoursArray(startHour);
        return dateArr;
    }

    buildWeekChart = (dataChoice) => {

        let weekTokenArr, weekPowerArr;
        if (dataChoice == 'general') {
            weekTokenArr = this.state[dataChoice].tokenChart.week;
            weekPowerArr = this.state[dataChoice].powerChart.week;
        } else {
            weekTokenArr = this.state.sitesStats[dataChoice].tokenChart.week;
            weekPowerArr = this.state.sitesStats[dataChoice].powerChart.week;
        }

        //X axis shown points fix
        c3.chart.internal.fn.categoryName = function (i) {
            var config = this.config, categoryIndex = Math.ceil(i);
            return i < config.axis_x_categories.length ? config.axis_x_categories[categoryIndex] : i;
        };

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
            point: {
                show: false
            },
            axis: {
                x: {
                    type: 'category',
                    categories: this.lastWeek(),
                    tick: {
                        count: 24,
                        rotate: -30,
                        multiline: false
                    }
                }
            }
        });

        this.setState(() => ({ activeGraph: 'week' }));
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
            point: {
                show: false
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
            point: {
                show: false
            },
            axis: {
                x: {
                    type: 'category',
                    categories: this.lastYear()
                }
            }
        });

        this.setState(() => ({ activeGraph: 'year' }));
    }

    //Switching all buttons active style
    activeBtn = (e) => {
        $(e.target).parent().find('button').removeClass('active');
        e.target.className += ' active';
    }

    //Switching between Websites data and rebuilding graphs
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

    moneroWithdraw = () => {
        if (this.state.withdrawalAvailable) {
            /*
            axios.post('http://www.prile.io/api/finance/withdrawals',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 201) {
                    this.setState(() => ({ 
                        moneroAmount: 0,
                        withdrawalAvailable: false
                    }));
                }
            })
            .catch( (error) => {
                console.log(error);
            });*/
            console.log("Perfect! Your money are on the way to your bank account!");
        } else {
            console.log("Withdrawal is not available for your account. Please try again later.");
        }
    }

    componentDidMount() {

        this.lastWeek();

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

        axios.get('http://www.prile.io/api/accounts/current/dashboardStats',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    const general = response.data.general;
                    let sites = response.data.sites;

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
                    this.setState(() => ({ 
                        moneroAmount: response.data.moneroAmount.toFixed(5),
                        withdrawalAvailable: response.data.withdrawalAvailable
                    }));
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
                                        <h4 className="monero-amount">{this.state.moneroAmount}</h4>
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
													<div className="modal-body">{this.state.moneroAmount}</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
														<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={ this.moneroWithdraw }>Withdraw</button>
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
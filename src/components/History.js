import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import dateFormat from 'dateformat';

export default class History extends React.Component {

    componentDidMount() {

        const user = {
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password')
        }

        axios.get('http://www.prile.io/api/finance/withdrawals',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(function (response) {
                if (response.status == 200) {
                    let date = new Date(response.data[0].executionTime);

                    $.each(response.data, function(i, entry) {
                        const date = new Date(entry.executionTime);
                        var row = "<tr>" + "<td>" + dateFormat(date, "dd.mm.yyyy") + "</td>" + "<td>" + entry.moneroAmount.toFixed(5) + "</td>" + "</tr>"
                        $(row).appendTo("#withdrawals-history tbody");
                    });
                }
            })
            .catch(function (error) {
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
                <div className="row gutters">
                    <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">History</div>
                            <div className="card-body">
                                <table id="withdrawals-history" className="withdrawals-history table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount Withdrawn, $</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import dateFormat from 'dateformat';

export default class History extends React.Component {

    state = {
        history: []
    }

    HistoryTable = () => {
        let history = this.state.history;
        let historyTable = history.map((entry, index) =>
            <tr key={index}>
                <td>{!(entry.executionTime == null) ? dateFormat(entry.executionTime, "dd.mm.yyyy") : dateFormat(entry.orderTime, "dd.mm.yyyy")}</td>
                <td>{!(entry.moneroAmount == null) ? entry.moneroAmount.toFixed(5) : <p className="font-italic">Waiting for approval</p>}</td>
            </tr>
        );
        return (
            <tbody>
                {historyTable}
            </tbody>
        );
    }

    componentDidMount() {

        axios.get('/finance/withdrawals',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {

                    this.setState(() => ({ history: response.data }));
                    $('.app-wrap').css('opacity', '1');

                } else if (response.status == 401) {
                    window.location = '/login';
                }
            })
            .catch((error) => {
                //window.location = '/login';
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
                                {this.state.history.length ? (
                                <table id="withdrawals-history" className="withdrawals-history table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount Withdrawn, P</th>
                                        </tr>
                                    </thead>
                                    <this.HistoryTable />
                                </table>
                                ) : (
                                    <p>No history yet...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};
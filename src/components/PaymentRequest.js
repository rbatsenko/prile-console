import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PaymentRequest extends React.Component {

    withdraw() {
        axios.post('http://www.prile.io/api/finance/withdrawals',
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                //console.log(response);
                if (response.status == 200) {
                    console.log('Congrats! You have money!');
                } else {
                    localStorage.setItem('error', 'Please try another credentials!');
                    window.location.href = 'http://prile.karma-dev.pro/login';
                }
            })
            .catch((error) => {
                //console.log(error);
            });
    }

    componentDidMount() {

        getCash();

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
                        <div className="card payment-request">
                            <div className="card-header">Payment Request</div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="monthly-avg plain">
                                        <h6>Available amount to withdraw</h6>
                                        <div className="avg-block">
                                            <h4 className="avg-total text-primary">$7,160</h4>
                                        </div>
                                    </div>
                                    <input type="hidden" name="amount" value="100"/>
                                </div>
                                <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Withdraw</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};
import React from 'react';
import { Link } from 'react-router-dom';

export default class PaymentRequest extends React.Component {

    render() {
        return (
            <div className="profile">Payment Request <Link to="/">Go home</Link></div>
        );
    }

};
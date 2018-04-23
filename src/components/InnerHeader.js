import React from 'react';
import { NavLink } from 'react-router-dom';

const InnerHeader = () => (
    <header className="main-heading">
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                    <div className="page-icon">
                        <i className="icon-laptop_windows"></i>
                    </div>
                    <div className="page-title">
                        <h5>Dashboard</h5>
                        <h6 className="sub-heading">Welcome to Prile Admin Dashboard</h6>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="right-actions">
                        <NavLink to="/payment-request" className="btn btn-primary float-right" title="Payment Request">
                            <span>Payment Request</span><i className="icon-download4"></i>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default InnerHeader;
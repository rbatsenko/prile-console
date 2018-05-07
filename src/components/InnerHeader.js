import React from 'react';
import { NavLink } from 'react-router-dom';

const InnerHeader = () => (
    <header className="main-heading">
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="page-icon">
                        <i className="icon-laptop_windows"></i>
                    </div>
                    <div className="page-title">
                        <h5>Dashboard</h5>
                        <h6 className="sub-heading">Welcome to Prile Admin Dashboard</h6>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default InnerHeader;
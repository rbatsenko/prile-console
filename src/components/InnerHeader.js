import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_laptop } from 'react-icons-kit/md/ic_laptop';

const InnerHeader = () => (
    <header className="main-heading">
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="page-icon">
                        <div style={{width: 24, height: 24, color: '#007ae1', margin: '9px 6px 9px 0'}}>
                            <Icon size={'100%'} icon={ ic_laptop }/>
                        </div>
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
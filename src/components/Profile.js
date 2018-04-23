import React from 'react';
import $ from 'jquery';
import axios from 'axios';

export default class Profile extends React.Component {

    state = {
        email: '',
        password: '',
        monero: '',
        sites: []
    }

    SitesList = () => {

        const sites = this.state.sites;
        const sitesList = sites.map((site, index) =>

        <div id={"site-" + index} className="card-single-website" key={index}>
            <label htmlFor={"site-desc-" + index} className={"site-desc-label-"+ index}>{site.description}</label>
            <div className="input-group">
                <span className="input-group-addon" id={"basic-addon" + index}>Description</span>
                <input type="text" id={"site-desc-"+ index} defaultValue={site.description} className="form-control" aria-label="Description" aria-describedby={"basic-addon" + index} />
                <span className="input-group-btn">
                    <button id={"update-site-desc-" + index} className="btn btn-primary" type="button">Save</button>
                </span>
            </div>
            <div className="input-group">
                <span className="input-group-addon">Website ID</span>
                <input type="text" id={"site-id-" + index} defaultValue={site.siteId} className="form-control" readOnly={true} />
                <span className="input-group-btn">
                    <button 
                        id={"copy-site-id-" + index}
                        className="btn btn-primary copy-site-id-btn" 
                        type="button" 
                        onClick={this.copyToClipboard} 
                        role="button" 
                        data-toggle="tooltip" 
                        data-placement="bottom"
                        data-original-title="Please click the button to copy your Site ID to clipboard"
                        >
                            Copy to clipboard
                        </button>
                </span>
            </div>
        </div>

        );
        return (
            <div className="card-body card-websites">
                {sitesList}
            </div>
        );
    }

    profileUpdate() {
        const profile = {
            email: '',
            www: ''
        }
    }

    copyToClipboard(e) {
        $(e.target).parent().parent().find('input').select();
        document.execCommand("Copy");
        e.target.dataset.originalTitle = "Your Site ID is succesfully copied to clipboard!";
        alert('Your Site ID is succesfully copied to clipboard!');
    }

    updateSiteDesc(e) {
        //$(e.target)

        axios.post('http://www.prile.io/api/accounts/current/sites', {
                description: user.siema,
                siteId: user.password
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                //console.log(response);
                if (response.status == '200') {
                    
                } else {
                    //localStorage.setItem('error', 'Please try another credentials!');
                    //window.location.href = 'http://prile.karma-dev.pro/login';
                }
            })
            .catch((error) => {
                //console.log(error);
            });
    }

    componentDidMount() {

        const user = {
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password')
        }

        axios.get('http://www.prile.io/api/accounts/current',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    console.log(response);
                    $('#profile-email').val(response.data.email);
                    $('#monero-account').val(response.data.moneroAcc);
                    const listOfSites = response.data.sites;
                    this.setState( () => ({ sites: listOfSites }));
                    console.log(this.state);
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

        $( () => {
            $('.copy-site-id-btn').tooltip();
        });
        
    }

    render() {
        return (
            <div className="main-content">
                <div className="row gutters">
                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Profile</div>
                            <div className="card-body">
                                <label htmlFor="profile-email">Email address</label>
                                <div className="input-group form-group">
                                    <input type="text" id="profile-email" className="form-control" placeholder="name@example.com" aria-label="Email address" readOnly={true} />
                                    <span className="input-group-btn">
                                        {/*<button id="update-email" className="btn btn-primary" type="button">Save</button>*/}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="old-password">Password</label>
                                    <div className="row gutters">
                                        <div className="col">
                                            <input type="text" className="form-control" id="old-password" placeholder="Old password" />
                                        </div>
                                        <div className="col">
                                            <div className="input-group form-group">
                                                <input type="text" id="new-password" className="form-control" placeholder="New password" aria-label="New password"/>
                                                <span className="input-group-btn">
                                                    <button id="update-password" className="btn btn-primary" type="button">Save</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="monero-account">Monero account</label>
                                <div className="input-group form-group">
                                    <input type="text" id="monero-account" className="form-control" placeholder="Monero account number" aria-label="Monero account number"/>
                                    <span className="input-group-btn">
                                        <button id="update-monero" className="btn btn-primary" type="button">Save</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gutters">
                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Your websites</div>
                            <this.SitesList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};
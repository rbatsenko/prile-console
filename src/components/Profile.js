import React from 'react';
import $ from 'jquery';
import axios from 'axios';

export default class Profile extends React.Component {

    state = {
        passwordChangeActive: false,
        passwordOld: '',
        passwordNew1: '',
        passwordNew2: '',
        email: '',
        monero: '',
        sites: []
    }

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.clearPasswordFields = this.clearPasswordFields.bind(this);
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
    
    activateChangePassword(e) {
        console.log('activateChangePassword');
        this.setState(() => ({ passwordChangeActive: true }));
        this.clearPasswordFields();
    }

    cancelChangePassword(e) {
        console.log('cancelChangePassword');
        this.setState(() => ({ passwordChangeActive: false }));
        this.clearPasswordFields();
    }

    clearPasswordFields() {
        this.setState(() => ({ passwordOld: '' }));
        this.setState(() => ({ passwordNew1: '' }));
        this.setState(() => ({ passwordNew2: '' }));
    }

    changePassword(e) {
        console.log('changePassword ' + this.state.passwordOld + " " + this.state.passwordNew1 + " " + this.state.passwordNew2);
        // TODO impl
    }

    handleChangePasswordOld(e) {
        this.setState({ passwordOld: e.target.value });
    }

    handleChangePasswordNew1(e) {
        this.setState({ passwordNew1: e.target.value });
    }

    handleChangePasswordNew2(e) {
        this.setState({ passwordNew2: e.target.value });
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

                                    {!this.state.passwordChangeActive ? (
                                        <div className="row gutters" >
                                            <div className="col">
                                                <div className="input-group">
                                                    <input type="password" className="form-control" placeholder="••••••••••" aria-label="Password" readOnly={true}  />
                                                    <span className="input-group-btn">
                                                        <button id="change-password" className="btn btn-primary" type="button" onClick={ this.activateChangePassword.bind(this) }>Change</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="row gutters" >
                                            <div className="col">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Old password"
                                                    aria-label="Old password"
                                                    onChange={ this.handleChangePasswordOld.bind(this) } />
                                            </div>
                                            <div className="col" style={{flexGrow: 2.2}}>
                                                <div className="input-group form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="New password"
                                                        aria-label="New password"
                                                        onChange={ this.handleChangePasswordNew1.bind(this) } />
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Re-enter new password"
                                                        aria-label="Re-enter new password"
                                                        onChange={ this.handleChangePasswordNew2.bind(this)} />
                                                    <span className="input-group-btn">
                                                        <button id="update-password" className="btn btn-primary" type="button" onClick={ this.changePassword.bind(this) }>Save</button>
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="input-group-btn">
                                                    <button className="btn btn-dark btn-sep" type="button" onClick={ this.cancelChangePassword.bind(this) }>Cancel</button>
                                                </span>
                                            </div>
                                        </div>
                                    )}
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
import React from 'react';
import $ from 'jquery';
import axios from 'axios';

export default class Profile extends React.Component {

    state = {
        passwordChangeActive: false,
        passwordOld: '',
        passwordNew1: '',
        passwordNew2: '',
        email: sessionStorage.getItem('email'),
        moneroChangeActive: false,
        moneroOld: '',
        moneroNew: '',
        sites: [],
        newSiteDesc: '',
        newSiteDescError: ''
    }

    constructor(props) {
        super(props);
    }

    SitesList = () => {

        const sites = this.state.sites;
        const sitesList = sites.map((site, index) =>

        <div id={"site-" + index} className="card-single-website" key={index}>
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

    profileUpdate = () => {
        const profile = {
            email: '',
            www: ''
        }
    }
    
    activateChangePassword = (e) => {
        console.log('activateChangePassword');
        this.setState(() => ({ passwordChangeActive: true }));
        this.clearPasswordFields();
    }

    cancelChangePassword = (e) => {
        console.log('cancelChangePassword');
        this.setState(() => ({ passwordChangeActive: false }));
        this.clearPasswordFields();
    }

    clearPasswordFields = () => {
        this.setState(() => ({ passwordOld: '' }));
        this.setState(() => ({ passwordNew1: '' }));
        this.setState(() => ({ passwordNew2: '' }));
    }

    changePassword = (e) => {
        console.log('changePassword ' + this.state.passwordOld + " " + this.state.passwordNew1 + " " + this.state.passwordNew2);
        // TODO impl
    }

    handleChangePasswordOld = (e) => {
        this.setState({ passwordOld: e.target.value });
    }

    handleChangePasswordNew1 = (e) => {
        this.setState({ passwordNew1: e.target.value });
    }

    handleChangePasswordNew2 = (e) => {
        this.setState({ passwordNew2: e.target.value });
    }

    activateChangeMonero = (e) => {
        console.log('activateChangeMonero');
        this.setState(() => ({ moneroChangeActive: true }));
        this.clearMoneroFields();
    }

    cancelChangeMonero = (e) => {
        console.log('cancelChangeMonero');
        this.setState(() => ({ moneroChangeActive: false }));
        this.clearMoneroFields();
    }

    clearMoneroFields = () => {
        this.setState((prevState) => ({ moneroOld: prevState.moneroOld }));
        this.setState(() => ({ moneroNew: '' }));
    }

    changeMonero = (e) => {
        console.log('changeMonero ' + this.state.passwordOld + " " + this.state.moneroNew);
        // TODO impl
    }

    handleChangeMoneroOld = (e) => {
        this.setState({ moneroOld: e.target.value });
    }

    handleChangeMoneroNew = (e) => {
        this.setState({ moneroNew: e.target.value });
    }

    copyToClipboard = (e) => {
        $(e.target).parent().parent().find('input').select();
        document.execCommand("Copy");
        e.target.dataset.originalTitle = "Your Site ID is succesfully copied to clipboard!";
        alert('Your Site ID is succesfully copied to clipboard!');
    }

    updateSiteDesc = (e) => {
        //$(e.target)

        axios.post('http://www.prile.io/api/accounts', {
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

    handleNewSiteDesc = (e) => {
        this.setState({ newSiteDesc: e.target.value });
        this.setState({ newSiteDescError: '' });
    }

    addWebsite = () => {
        if ( this.state.newSiteDesc.length > 0 ) {
            console.log('elo');
        /*
        axios.post('http://www.prile.io/api/accounts/current/sites', {
                description: this.state.newSiteDesc
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                if (response.status == '200') {
                    axios.get('http://www.prile.io/api/accounts/current',
                        {
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then( (response) => {
                            if (response.status == 200) {
                                const listOfSites = response.data.sites;
                                this.setState( () => ({ 
                                    sites: listOfSites
                                }));
                            }
                        })
                        .catch( (error) => {
                            console.log(error);
                        });
                } else {
                    //localStorage.setItem('error', 'Please try another credentials!');
                    //window.location.href = 'http://prile.karma-dev.pro/login';
                }
            })
            .catch((error) => {
                //console.log(error);
            });*/
        } else {
            this.setState({ newSiteDescError: 'Please fill out the Description field!' });
        }
    }

    componentDidMount() {

        axios.get('http://www.prile.io/api/accounts/current',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    let moneroAcc = response.data.moneroAcc;
                    const listOfSites = response.data.sites;
                    this.setState( () => ({ 
                        sites: listOfSites,
                        moneroOld: moneroAcc
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
                                    <input type="text" id="profile-email" className="form-control" placeholder={this.state.email} aria-label="Email address" readOnly={true} />
                                    <span className="input-group-btn">
                                        {/*<button id="update-email" className="btn btn-primary" type="button">Save</button>*/}
                                    </span>
                                </div>
                                <div className="form-group form-password-group">
                                    <label htmlFor="old-password">Password</label>

                                    {!this.state.passwordChangeActive ? (
                                        <div className="row gutters" >
                                            <div className="col">
                                                <div className="input-group password-group">
                                                    <input type="password" className="form-control" placeholder="••••••••••" aria-label="Password" readOnly={true}  />
                                                    <span className="input-group-btn">
                                                        <button id="change-password" className="btn btn-primary" type="button" onClick={ this.activateChangePassword }>Change</button>
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
                                                    onChange={ this.handleChangePasswordOld } />
                                            </div>
                                            <div className="col" style={{flexGrow: 2.2}}>
                                                <div className="input-group form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="New password"
                                                        aria-label="New password"
                                                        onChange={ this.handleChangePasswordNew1 } />
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Repeat new password"
                                                        aria-label="Repeat new password"
                                                        onChange={ this.handleChangePasswordNew2 } />
                                                    <span className="input-group-btn">
                                                        <button id="update-password" className="btn btn-primary" type="button" onClick={ this.changePassword }>Save</button>
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="input-group-btn">
                                                    <button className="btn btn-dark btn-sep" type="button" onClick={ this.cancelChangePassword }>Cancel</button>
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="monero-account">Monero account</label>
                                {!this.state.moneroChangeActive ? (
                                        <div className="row gutters" >
                                            <div className="col">
                                                <div className="input-group change-monero-group">
                                                    <input type="text" className="form-control" placeholder={this.state.moneroOld} aria-label="Password" readOnly={true}  />
                                                    <span className="input-group-btn">
                                                        <button id="change-monero" className="btn btn-primary" type="button" onClick={ this.activateChangeMonero }>Change</button>
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
                                                    placeholder="Password"
                                                    aria-label="Password"
                                                    onChange={ this.handleChangePasswordOld } />
                                            </div>
                                            <div className="col">
                                                <div className="input-group form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="New monero"
                                                        aria-label="New monero"
                                                        onChange={ this.handleChangeMoneroNew } />
                                                    <span className="input-group-btn">
                                                        <button id="update-monero" className="btn btn-primary" type="button" onClick={ this.changeMonero }>Save</button>
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="input-group-btn">
                                                    <button className="btn btn-dark btn-sep" type="button" onClick={ this.cancelChangeMonero }>Cancel</button>
                                                </span>
                                            </div>
                                        </div>
                                    )}
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
                <div className="row gutters">
                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Add website</div>
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col">
                                        <div className="input-group form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Description"
                                                aria-label="Description"
                                                onChange={ this.handleNewSiteDesc } />
                                            <span className="input-group-btn">
                                                <button id="add-website" className="btn btn-primary" type="button" onClick={ this.addWebsite }>Add</button>
                                            </span>
                                        </div>
                                        <p className="mb-0 text-secondary input-error">{this.state.newSiteDescError}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};
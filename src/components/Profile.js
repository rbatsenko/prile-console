import React from 'react';
import $ from 'jquery';
import axios from 'axios';

export default class Profile extends React.Component {

    state = {
        passwordChangeActive: false,
        passwordError: '',
        passwordOld: '',
        passwordNew1: '',
        passwordNew2: '',
        email: sessionStorage.getItem('email'),
        moneroChangeActive: false,
        moneroError: '',
        moneroAcc: '',
        moneroOld: '',
        moneroNew: '',
        sites: [],
        userHasSites: false,
        newSiteDesc: '',
        siteDescChangeId: '',
        changeSiteDescError: '',
        newSiteDescError: '',
        copySuccess: ''
    }

    constructor(props) {
        super(props);
    }

    SitesList = () => {
        let sites = this.state.sites;
        let sitesList = sites.map((site, index, e) =>

        <div id={"site-" + index} className="card-single-website" key={index}>
            <div className="input-group">
                <span className="input-group-addon" id={"basic-addon" + index}>Description</span>
                <input type="text" id={"site-desc-"+ index} data-site-id={site.siteId} defaultValue={site.description} onChange={ (e) => {this.handleChangeSiteDesc(e)}} className="form-control" aria-label="Description" aria-describedby={"basic-addon" + index} />
                <span className="input-group-btn">
                    <button 
                        id={"update-site-desc-" + index} 
                        className="btn btn-primary"
                        onClick={ (e) => { this.updateSiteDesc(e) }}
                        type="button"
                        >
                        Save
                    </button>
                </span>
                <p className="mb-0 text-secondary input-error">{this.state.changeSiteDescError}</p>
            </div>
            <div className="input-group">
                <span className="input-group-addon">Website ID</span>
                <input type="text" id={"site-id-" + index} defaultValue={site.siteId} className="form-control site-id-input" readOnly={true} />
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
                        Copy
                    </button>
                </span>
                <p className="mb-0 text-success input-error copy-success">{this.state.copySuccess}</p>
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
        this.setState(() => ({ passwordChangeActive: true }));
        this.clearPasswordFields();
    }

    cancelChangePassword = (e) => {
        this.setState(() => ({ passwordChangeActive: false }));
        this.clearPasswordFields();
    }

    clearPasswordFields = () => {
        this.setState(() => ({ passwordOld: '' }));
        this.setState(() => ({ passwordNew1: '' }));
        this.setState(() => ({ passwordNew2: '' }));
    }

    handleChangePasswordOld = (e) => {
        this.setState({ 
            passwordOld: e.target.value,
            moneroError: ''
        });
    }

    handleChangePasswordNew1 = (e) => {
        this.setState({ passwordNew1: e.target.value });
    }

    handleChangePasswordNew2 = (e) => {
        this.setState({ passwordNew2: e.target.value });
    }

    handlePasswordRepeat = (e) => {
        if (this.state.passwordNew1 != e.target.value) {
            this.setState({ passwordError: "Your passwords don't match!" });
            $(e.target).parent().find('input').addClass('focus-red');
            $('.password-error').removeClass('text-success');
        } else {
            this.setState({ passwordError: '' });
            $(e.target).parent().find('input').removeClass('focus-red');
        }
    }

    changePassword = (e) => {
        let passOld = this.state.passwordOld;
        let passNew = this.state.passwordNew1;

        if (passNew === this.state.passwordNew2) {
            axios.put('/accounts/current/password', {
                newPassword: passNew,
                oldPassword: passOld
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                if (response.status == '200') {
                    this.setState(() => ({
                        passwordError: "You've succesfully changed your password, please use the new one in the future!"
                    }));
                    this.cancelChangePassword();
                    $('.password-error').addClass('text-success');
                    setTimeout( () => {
                        this.setState({ passwordError: '' });
                        $('.password-error').removeClass('text-success');
                    }, 5000);
                } else {
                    //localStorage.setItem('error', 'Please try another credentials!');
                    //window.location.href = 'http://prile.karma-dev.pro/login';
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            console.log('Password confirmation ERROR');
        }
    }

    activateChangeMonero = (e) => {
        this.setState(() => ({ moneroChangeActive: true }));
        this.clearMoneroFields();
    }

    cancelChangeMonero = (e) => {
        this.setState(() => ({ moneroChangeActive: false }));
        this.clearMoneroFields();
    }

    clearMoneroFields = () => {
        this.setState(() => ({ moneroOld: '' }));
        this.setState(() => ({ moneroNew: '' }));
        this.setState(() => ({ moneroError: ''}));
    }

    handleChangeMoneroNew = (e) => {
        let moneroFormat = /^4([0-9]|[A-B])([0-9A-Za-z]){93}$/;
        let moneroNew = e.target.value;
        let testMonero = moneroFormat.test(moneroNew);
        
        if (testMonero) {
            this.setState({ 
                moneroNew: moneroNew,
                moneroError: ''
            });
            $(e.target).removeClass('focus-red');
        } else if (!e.target.value) {
            this.setState({ moneroError: '' });
            $(e.target).removeClass('focus-red');
        } else {
            this.setState({ moneroError: 'Wrong format for monero account number!'});
            $(e.target).addClass('focus-red');
        }
    }

    changeMonero = (e) => {
        let moneroNew = this.state.moneroNew;
        let password = this.state.passwordOld;

        axios.post('/accounts/current/moneroAccToBeConfirmed', {
            moneroAcc: moneroNew,
            password: password
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
        )
        .then((response) => {
            if (response.status == '200') {
                if (response.data.status == 'INCORRECT_PASSWORD') {
                    this.setState({ moneroError: 'Wrong password! Please try again!'});
                } else {
                    this.cancelChangeMonero();
                    this.setState({ moneroError: 'Success! Please find an email link for your new monero number confirmation in your inbox!'});
                    $('.monero-error').addClass('text-success');
                    setTimeout( () => {
                        this.setState({ moneroError: ''});
                        $('.monero-error').removeClass('text-success');
                    }, 5000);
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
        
    }

    copyToClipboard = (e) => {
        $(e.target).parent().parent().find('input').select();
        document.execCommand("Copy");
        let siteId = $(e.target).parent().siblings('input').val();
        console.log(siteId);
        this.setState({ copySuccess: "Your site ID is copied to clipboard!" });
        $('input[value=' + siteId + ']').siblings('.input-error').addClass('visible');
        setTimeout( () => {
            this.setState({ copySuccess: ''});
            $('input[value=' + siteId + ']').siblings('.input-error').removeClass('visible');
        }, 5000);
    }

    handleChangeSiteDesc = (e) => {
        this.setState({ siteDescChangeNewDesc: e.target.value });
        this.setState({ siteDescChangeId: e.target.getAttribute('data-site-id') });
        if (!e.target.value.length) {
            this.setState({ changeSiteDescError: 'Please fill out the Description field!' });
            $(e.target).siblings('.input-error').addClass('visible');
            $(e.target).addClass('focus-red');
        } else {
            this.setState({ changeSiteDescError: ''});
            $(e.target).siblings('.input-error').removeClass('visible');
            $(e.target).removeClass('focus-red');
        }
    }

    updateSiteDesc = () => {
        
        let siteDesc = this.state.siteDescChangeNewDesc;
        let siteId = this.state.siteDescChangeId;

        if (siteDesc.length > 0) {
            axios.put('/accounts/current/sites', {
                description: siteDesc,
                siteId: siteId
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                //console.log(response);
                if (response.status == '200') {
                    this.setState({ changeSiteDescError: "You've successfully changed site description!" });
                    $('input[data-site-id=' + siteId + ']').siblings('.input-error').addClass('visible text-success');
                    setTimeout( () => {
                        this.setState({ changeSiteDescError: ''});
                        $('input[data-site-id=' + siteId + ']').siblings('.input-error').removeClass('visible text-success');
                    }, 5000);
                } else {
                    //localStorage.setItem('error', 'Please try another credentials!');
                    //window.location.href = 'http://prile.karma-dev.pro/login';
                }
            })
            .catch((error) => {
                //console.log(error);
            });
        } else {
            this.setState({ changeSiteDescError: "Please fill out the description field!" });
        }
    }

    handleNewSiteDesc = (e) => {
        this.setState({ newSiteDesc: e.target.value });
        this.setState({ newSiteDescError: '' });
        $(e.target).removeClass('focus-red');
    }

    addWebsite = (e) => {
        if ( this.state.newSiteDesc.length > 0 ) {
        
        axios.post('/accounts/current/sites', {
                description: this.state.newSiteDesc
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                if (response.status == '200') {
                    axios.get('/accounts/current/sites',
                        {
                            headers: { 'Content-Type': 'application/json' }
                        })
                        .then( (response) => {
                            if (response.status == 200) {
                                let listOfSites = response.data;
                                this.setState((prevState, props) => ({ sites: listOfSites }));
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
            });
        } else {
            this.setState({ newSiteDescError: 'Please fill out the Description field!' });
            $(e.target).parent().siblings('input').addClass('focus-red').focus();
        }
    }

    componentDidMount() {

        axios.get('/accounts/current',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    let moneroAcc = response.data.moneroAcc;
                    const listOfSites = response.data.sites;
                    this.setState( () => ({ 
                        sites: listOfSites,
                        moneroAcc: moneroAcc 
                    }));
                    if (listOfSites.length > 0) {
                        this.setState( () => ({ userHasSites: true }));
                    };

                    $('.app-wrap').css('opacity', '1');
                } else if (response.status == 401) {
                    window.location = '/login';
                }
            })
            .catch( (error) => {
                window.location = '/login';
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
            <div className="main-content profile">
                <div className="row gutters">
                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Profile</div>
                            <div className="card-body">
                                <label htmlFor="profile-email">Email address</label>
                                <div className="input-group form-group email-group">
                                    <input type="text" id="profile-email" className="form-control" placeholder={this.state.email} aria-label="Email address" readOnly={true} />
                                    {/*<span className="input-group-btn">
                                        <button id="change-email" className="btn btn-primary" type="button">Change</button>
                                    </span>*/}
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
                                                    <p className="mb-0 text-secondary input-error password-error">{this.state.passwordError}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="row gutters" >
                                            <div className="col-3">
                                                <input
                                                    type="password"
                                                    className="form-control single-input"
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
                                                        onChange={ (e) => {
                                                            this.handleChangePasswordNew2(e);
                                                            this.handlePasswordRepeat(e);
                                                        } } />
                                                    <span className="input-group-btn">
                                                        <button id="update-password" className="btn btn-primary" type="button" onClick={ this.changePassword }>Save</button>
                                                    </span>
                                                    <p className="mb-0 text-secondary input-error password-error">{this.state.passwordError}</p>
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
                                                    <input type="text" className="form-control" placeholder={this.state.moneroAcc} aria-label="Password" readOnly={true}  />
                                                    <span className="input-group-btn">
                                                        <button id="change-monero" className="btn btn-primary" type="button" onClick={ this.activateChangeMonero }>Change</button>
                                                    </span>
                                                    <p className="mb-0 text-secondary input-error monero-error">{this.state.moneroError}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="row gutters" >
                                            <div className="col-3">
                                                <input
                                                    type="password"
                                                    className="form-control single-input"
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
                                                    <p className="mb-0 text-secondary input-error monero-error">{this.state.moneroError}</p>
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
                { this.state.userHasSites && (
                <div className="row gutters">
                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">Your websites</div>
                            {this.state.sites.length && <this.SitesList />}
                        </div>
                    </div>
                </div>
                )}
                <div className="row gutters">
                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
                        <div className="card add-website-card">
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
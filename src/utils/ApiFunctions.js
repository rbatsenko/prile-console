import axios from 'axios';
import $ from 'jquery';

//Session Controller************************************************

export const logIn = (email, password) => {
    axios.post('http://www.prile.io/api/session', {
                email: email,
                password: password
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                if (response.status == 200) {
                    const newState = true;
                    return newState;
                } else {
                    localStorage.setItem('error', 'Please try another credentials!');
                    window.location.href = 'http://prile.karma-dev.pro/login';
                }
            })
            .catch((error) => {
                //console.log(error);
            });
    return true;
}

export const logOut = (e) => {
    e.preventDefault();
    axios.delete('http://www.prile.io/api/session', {
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            if (response.status == 200) {
                this.setState(() => ({ isLoggedIn: false }));
                window.location.href = 'http://prile.karma-dev.pro/login';
            }
        })
        .catch((error) => {
            //console.log(error);
        });
}

//Account Controller************************************************

export const getSites = () => {
    axios.get('http://www.prile.io/api/accounts/current',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then( (response) => {
                if (response.status == 200) {
                    //console.log(response);
                    //$('#profile-email').val(response.data.email);
                    //$('#monero-account').val(response.data.moneroAcc);
                    const listOfSites = response.data.sites;
                    //console.log(listOfSites);
                    return listOfSites;
                }
            })
            .catch( (error) => {
                console.log(error);
            });
}

//Finance Controller************************************************

export const getCash = () => {
    axios.get('http://www.prile.io/api/finance/cash',
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(function (response) {
                if (response.status == 200) {
                    return response.data.moneroAmount;
                    $('.avg-total').text(response.data.moneroAmount);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
}

//Shares Controller************************************************
import React from 'react';
import $ from 'jquery';
import axios from 'axios';

export default class Confirmation extends React.Component {

    componentDidMount() {
        $('.app-wrap').css('opacity', '0');
        $('body').css('background', 'white');
        $('#app').hide();
        /*$('.prile-loader').addClass('active');
        setTimeout( () => {
            $('.prile-loader').addClass('visible');
            setTimeout( () => {
                $('.prile-loader').addClass('animation');
            }, 500);
        }, 1000);*/

        let path = window.location.href.split( '/' );

        if (path.includes('confirm')) {
            //Email Confirmation
            axios.put('/accounts/actions/emailConfirmation', {
                    confirmationPhrase: path[8],
                    email: path[6]
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
                )
                .then((response) => {
                    if (response.data.status == 'OK') {
                        window.location.href = '/account/success/';
                    } else if (response.data.status == 'ALREADY_ACTIVE') {
                        window.location.href = '/account/already-active/';
                    } else {
                        window.location.href = '/account/error/';
                    }
                })
                .catch((error) => {
                    window.location.href = '/account/error/';
                });
        } else if (path.includes('resetPassword')) {
            //Password reset
            sessionStorage.setItem('email', path[6]);
            sessionStorage.setItem('phrase', path[8]);
            window.location.href = '/password/set-new/';
        } else if (path.includes('moneroAccChangeConfirm')) {
            //Monero Change Confirmation
            axios.post('/accounts/actions/moneroAccChangeConfirmation', {
                confirmationPhrase: path[7],
                email: path[5]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                if (response.status == 200) {
                    window.location.href = '/monero/success/';
                } else {
                    window.location.href = '/monero/error/';
                }
            })
            .catch((error) => {
                window.location.href = '/monero/error/';
            });
        }
    }
    
    render() {
        return (
            <div></div>
        );
    }
}
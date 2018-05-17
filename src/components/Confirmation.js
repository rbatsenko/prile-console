import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import baseApi from '../components/App';

const Confirmation = () => {
    $('.app-wrap').css('opacity', '0');
    $('body').css('background', 'white');
    $('#app').hide();
    $('.prile-loader').addClass('active');
    setTimeout( () => {
        $('.prile-loader').addClass('visible');
        setTimeout( () => {
            $('.prile-loader').addClass('animation');
        }, 500);
    }, 1000);

    let path = window.location.pathname.split( '/' );
    console.log(path);

    axios.put(baseApi + '/accounts/actions/emailConfirmation', {
                confirmationPhrase: path[5],
                email: path[3]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
            )
            .then((response) => {
                console.log(response);
                if (response.status == '200') {
                    window.location.href = '/success';
                } else {
                    console.log('Error!');
                    window.location.href = '/error';
                }
            })
            .catch((error) => {
                console.log(error);
                window.location.href = '/error';
            });

    return null;
}

export default Confirmation;
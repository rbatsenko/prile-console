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
        console.log(path);

        axios.put('/accounts/actions/emailConfirmation', {
<<<<<<< HEAD
                    confirmationPhrase: path[8],
                    email: path[6]
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
    }
    
=======
                confirmationPhrase: path[8],
                email: path[6]
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
    }

>>>>>>> eafe543f496b6cc5e4dca8c0a5b381cd96c88486
    render() {
        return (
            <div></div>
        );
    }
}
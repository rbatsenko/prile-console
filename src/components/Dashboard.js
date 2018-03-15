import React from 'react';
import Loader from './Loader';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';

export default class Dashboard extends React.Component {

    render() {
        return (
            <div className="app-wrap">
                <Loader />
                <Header />
                <Container />
                <Footer />
            </div>
        );
    }

};
import React from 'react';
import { Link } from 'react-router-dom';

export default class History extends React.Component {

    render() {
        return (
            <div className="profile">History <Link to="/">Go home</Link></div>
        );
    }

};
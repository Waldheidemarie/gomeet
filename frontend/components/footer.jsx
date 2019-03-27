import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <div>
        <Link to='/create'>Start a new group</Link>
        <div>
            <h4>Your Acount</h4>
            <Link to='/register'>Sign up</Link>
            <Link to='/login'>Log in</Link>
        </div>

        <div>
            <h4>Follow us</h4>
            
            <link rel="stylesheet" href="https://twitter.com/polinavulakh"/>
            <link rel="stylesheet" href="https://github.com/pvulakh" />
            <link rel="stylesheet" href="https://www.linkedin.com/in/polinavulakh/"/>
            <link rel="stylesheet" href=""/>
        </div>
    </div>
);

export default Footer;
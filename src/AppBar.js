import React from 'react'
import { Link, useParams } from 'react-router-dom';
import logo from './img/site/1610956010.png'
export default function AppBar(props) {
    const address = props.drizzleState.accounts[0]
    return (
        <div>
            <img src={logo}></img>GoldSeek
            AppBar{'      '}

            <Link to="HowItWorks">How It Works</Link>{'   '}
            <Link to="HowToGetStarted">How To Get Started</Link>{'   '}
            {address}
            

        </div>
    )
}

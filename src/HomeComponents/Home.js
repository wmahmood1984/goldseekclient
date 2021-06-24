import React from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Home(props) {
    const {referrer} = useParams()
    return (
        <div>
            <h1> Gold Seek 2.0</h1>
            {referrer? <Link to={`/main/:${referrer}`}>ENTER in APP</Link> : <Link to="/main">ENTER in APP</Link>}


        </div>
    )
}

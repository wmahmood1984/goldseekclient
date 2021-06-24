import React from 'react'
import { Link, useParams } from 'react-router-dom';

export default function AppBar() {
    return (
        <div>
            AppBar{'      '}

            <Link to="HowItWorks">How It Works</Link>
        </div>
    )
}

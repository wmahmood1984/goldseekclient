import React from 'react'
import GoldSeek from './contracts/GoldSeek3.json'

export default function Footer() {
    return (
        <div>
            <p>Contract address<a>{GoldSeek.networks["97"].address}</a></p>
        </div>
    )
}

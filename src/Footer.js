import React from 'react'
import GoldSeek from './contracts/GoldSeek3.json'
import logo from './img/site/1610956028.png'

export default function Footer() {
    return (
        <div>
            <div>
                <img src={logo}></img>
            </div>
            <p>Contract address<a>{GoldSeek.networks["97"].address}</a></p>
            <p>Copyright ©SEEK GOLD 2021. All rights reserved.</p>
        </div>
    )
}

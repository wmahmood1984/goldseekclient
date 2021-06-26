import React from 'react'
import metaMask from '../img/MetaMask.png'
import transaction from '../img/Transaction.jpg'
import p2p from '../img/peerTopeer.png'
import handHold from '../img/hand-holding-gold-coin-icon-cartoon-style-vector-14445205.jpg'
import DollarBill from '../img/DollarBill.jpg'

export default function HowToGetStarted() {
    return (
        <div style={{margin:"200px"}}>
            <h1>How To Get Started</h1>
            <div style={{border:"solid 1px green"}}>
                <h3>Fund your Metamask Wallet</h3>
                <p>Add EThereum to your wallet and make sure you leave enough extra to cover the transaction fees.</p>
                <img style={{width:"50px", height:"50px"}} src={metaMask}></img>
            </div>


            <div style={{border:"solid 1px red"}}>
                <h3>Unlock your wallett</h3>
                <p>allow the smart contract to interact with your metamask wallet. When prompted click the connect button to connect your wallet to the smart contract.</p>
                <img style={{width:"50px", height:"50px"}} src={transaction}></img>
            </div>

            <div style={{border:"solid 1px blue"}}>
                <h3>BUY Seek Gold Credits</h3>
                <p>Once your account is connected buy Seek Gold Credits to start earning real time dividends.</p>
                <img style={{width:"50px", height:"50px"}} src={p2p}></img>
            </div>

            <div style={{border:"solid 1px green"}}>
                <h3>Hold Seek Gold</h3>
                <p>Accumulate real time dividends and wait for the sell price to increase to more than your buy price. You can then sell some for profit and hold the rest to keep earning real time dividends consistently.</p>
                <img style={{width:"50px", height:"50px"}} src={handHold}></img>
            </div>

            <div style={{border:"solid 1px red"}}>
                <h3>Share to Seek Gold</h3>
                <p>hare the program with others using your referral link. You will receive 7% Instant Commission for direct referrals purchases and 3% Indirect commission when they refer someone who makes a purchase! There are NO FEES when you withdraw referral commissions!</p>
                <img style={{width:"50px", height:"50px"}} src={DollarBill}></img>
            </div>
        </div>
    )
}

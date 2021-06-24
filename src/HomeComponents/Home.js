import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import logo from '../img/site/1610956010.png'

export default function Home(props) {
    const [dataKey, setdataKey] = useState()
    
    useEffect(()=>{
        const { drizzle,drizzleState } = props;
    
        const contract = drizzle.contracts.GoldSeek3;
        const address = drizzleState.accounts[0]
        // let drizzle know we want to watch the `myString` method
          const dataKey = contract.methods["_holderBalances"].cacheCall(address);
        // save the `dataKey` to local component state for later reference
  
        setdataKey(dataKey)
    },[])


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const balance = GoldSeek3._holderBalances[dataKey];

    const {referrer} = useParams()
    return (
        <div>
            <h1> Real Time Ethereum Dividends That Pay YOU Consistent Passive Income</h1>
            <p>protected by the blockchain, Seek Gold allows you 24 Hour Access To YOUR Ethereum Anytime You wish!</p>
            {referrer? <Link to={`/main/:${referrer}`}>ENTER NOW</Link> : <Link to="/main">ENTER NOW</Link>}

            <h2>What Is Seek Gold?</h2>
            <p>Seek Gold is a global financial sharing and support community and part of the Seek Rewards/Seek Coin Ecosystem.Seek Gold was developed to provide anyone across the globe a way to create a dependable, virtually no risk way to create passive income while retaining 100% control over their Ethereum. We reward members who share the contract with othersand the members who choose to simply collect dividends with no requirements whatsoever. Many members will use the dividends created through Seek Gold to invest in Seek Coin and Seek Rewards to create additional passive daily income. We invite you to join us and start creating real time Ethereum Dividends TODAY!</p>
            <div>
                <h3>Real Time Dividends</h3>
                <p>You get paid real time dividends when depositors buy, sell and transfer Seek Gold. The fee to buy Seek Gold is 17%. You will see 17?ducted immediately along with commissions and the platform fee. As soon as you deposit,10% is distributed immediately to all Seek Gold Holders including you. When you sell 7% is released to all Seek Gold Holders as well.The process of handling all funds including the distribution of Ethereum is completely managed by the immutable smart contract. There is no company, ceo or entity to run off with your money.</p>
            </div>

            <div>
                <h3>How Much Can I Earn by Depositing Ethereum?</h3>
                <p>You can earn Ethereum passively in three ways. 1) When people buy and sell Seek Gold YOU earn dividends in real time. 2) As the volume of people buying and selling increases the price to buy and sell Seek Gold will also rise. By monitoring the price periodically you can pick the perfect time to sell at a price h igher than you purchased for to receive increased profits! 3) As the price of Ethereum Rises so does the value of your Seek Gold! You get to benefit from all the appreciation of Ethereum on top of the other two profit streams. Most important is you ALWAYS retain instant access to all of your Ethereum at anytime at!</p>
            </div>

            <div>
                <h3>Is my Ethereum Safe?</h3>
                <p>Your Ethereum is as safe as it would be in your own crypto wallet because it is literally on the blockchain. Not only can you withdraw your dividends at anytime you also have the opportunity to redeposit your dividends for future growth. Your funds are never locked up, you can withdraw dividends and can cash out all or part of your Seek Gold at any time. With Seek Gold YOU are in 100% control over your Ethereum at all times!</p>
            </div>

            <div>
                <img src={logo}></img>
                <h1>SeekGold</h1>
                <p>Connected Wallet balance in ETH: {balance && balance.value/1000000000000000000}</p>
                <p>Connected Wallet balance in USD: ${balance && balance.value/1000000000000000000*props.price}</p>

            </div>

        </div>
    )
}

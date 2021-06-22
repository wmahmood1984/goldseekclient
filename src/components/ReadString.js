import React, { useEffect, useState } from 'react'

export default function ReadString(props) {

    const [dataKey, setdataKey] = useState()
    const [dataKey1, setdataKey1] = useState()

    const [dataKey3, setdataKey3] = useState()
    const [dataKey4, setdataKey4] = useState()
    const [dataKey5, setdataKey5] = useState()
    
    useEffect(()=>{
        const { drizzle,drizzleState } = props;
    
        const contract = drizzle.contracts.GoldSeek3;
        const address = drizzleState.accounts[0]
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["tokenPriceInitial_"].cacheCall();
 
        const dataKey1 = contract.methods["_holderBalances"].cacheCall(address);
     
        const dataKey3 = contract.methods["dividendBalance"].cacheCall(address);
        const dataKey4 = contract.methods["ReferralBalance"].cacheCall(address);
        const dataKey5 = contract.methods["TotalEthStaked"].cacheCall();
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
        setdataKey1(dataKey1)

        setdataKey3(dataKey3)
        setdataKey4(dataKey4)
        setdataKey5(dataKey5)
    },[])


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const tokenPriceInitial_ = GoldSeek3.tokenPriceInitial_[dataKey];
  const totalethStacked = GoldSeek3.TotalEthStaked[dataKey5];
  const balance = GoldSeek3._holderBalances[dataKey1];
 
  const dividendBalance = GoldSeek3.dividendBalance[dataKey3];
  const referralBalance = GoldSeek3.ReferralBalance[dataKey4];


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 7);
}

function numberWithCommas2(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 6);
}
  
    return (
        <div>
            <div>Total Client Capital in Eth: {totalethStacked && totalethStacked.value/1000000000000000000}</div>
            <div>Total Client Capital in Dollar: {totalethStacked && totalethStacked.value*props.price/1000000000000000000}</div>
            <p><strong>Ethereum Credit</strong>  <br/> Your ethereum Credits Value in ETH: {balance && numberWithCommas(balance.value/1000000000000000000) }
              <br/> Your ethereum Credits Value in USD: {balance && numberWithCommas(balance.value/1000000000000000000*props.price) }</p>
            {/* <p>Your Dividend Earnings Value: ETH : {dividendBalance && numberWithCommas2(dividendBalance.value/1000000000000000000) }</p>
            <p>Your ReferralBalance Balance  is ETH : {referralBalance && numberWithCommas2(referralBalance.value/1000000000000000000) }</p> */}
        </div>
    )
}


// Hello read string 
// <p>Initial Token price is : {tokenPriceInitial_ && tokenPriceInitial_.value/100000000000}</p>
// <p>Current Token price is : {rate && rate.value/100000000000}</p>
// <p>Your <strong>Token Balance</strong>  is : {balance && numberWithCommas(balance.value/1000000000000000000) }</p>
// <p>Your <strong>Dividend Balance</strong>  is : {dividendBalance && numberWithCommas2(dividendBalance.value/1000000000000000000) }</p>
// <p>Your <strong>ReferralBalance Balance</strong>  is : {referralBalance && numberWithCommas2(referralBalance.value/1000000000000000000) }</p>
import React, { useEffect, useState } from 'react'

export default function ReadString(props) {

    const [dataKey, setdataKey] = useState()
    const [dataKey1, setdataKey1] = useState()
    const [dataKey2, setdataKey2] = useState()
    const [dataKey3, setdataKey3] = useState()
    
    useEffect(()=>{
        const { drizzle,drizzleState } = props;
    
        const contract = drizzle.contracts.GoldSeek3;
        const address = drizzleState.accounts[0]
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["tokenPriceInitial_"].cacheCall();
 
        const dataKey1 = contract.methods["_holderBalances"].cacheCall(address);
        const dataKey2 = contract.methods["ethereumToTokens_"].cacheCall(100000000000);        
        const dataKey3 = contract.methods["dividendBalance"].cacheCall(address);
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
        setdataKey1(dataKey1)
        setdataKey2(dataKey2)
        setdataKey3(dataKey3)
    },[])


    const { GoldSeek3 } = props.drizzleState.contracts;
    console.log("my string ", GoldSeek3)  

  // using the saved `dataKey`, get the variable we're interested in
  const tokenPriceInitial_ = GoldSeek3.tokenPriceInitial_[dataKey];
  const balance = GoldSeek3._holderBalances[dataKey1];
  const rate = GoldSeek3.ethereumToTokens_[dataKey2];
  const dividendBalance = GoldSeek3.dividendBalance[dataKey3];

  console.log("dividend",GoldSeek3.dividendBalance)
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 7);
}

function numberWithCommas2(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 6);
}
  
    return (
        <div>
            Hello read string 
            <p>Initial Token price is : {tokenPriceInitial_ && tokenPriceInitial_.value/100000000000}</p>
            <p>Current Token price is : {rate && rate.value/100000000000}</p>
            <p>Your <strong>Token Balance</strong>  is : {balance && numberWithCommas(balance.value/1000000000000000000) }</p>
            <p>Your <strong>Dividend Balance</strong>  is : {dividendBalance && numberWithCommas2(dividendBalance.value/1000000000000000000) }</p>
        </div>
    )
}

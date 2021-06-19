import React,{useEffect,useState} from 'react'

export default function PersonalEth(props) {
    const [dataKey, setdataKey] = useState()
    const [dataKey1, setdataKey1] = useState()

    const [dataKey2, setdataKey2] = useState()
    
    useEffect(()=>{
        const { drizzle,drizzleState } = props;
    
        const contract = drizzle.contracts.GoldSeek3;
        const address = drizzleState.accounts[0]
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["dividendBalance"].cacheCall(address);
        const dataKey1 = contract.methods["ReferralBalance"].cacheCall(address);
        const dataKey2 = contract.methods["_holderPersonalEth"].cacheCall(address);
   
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
        setdataKey1(dataKey1)
        setdataKey2(dataKey2)

    },[])


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const dividendBalance = GoldSeek3.dividendBalance[dataKey];
  const referralBalance = GoldSeek3.ReferralBalance[dataKey1];
  const _holderPersonalEth = GoldSeek3._holderPersonalEth[dataKey2];


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 7);
}

function numberWithCommas2(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 6);
}

    return (
        <div>
        <p>            Your Dividend balance is {dividendBalance && numberWithCommas(dividendBalance.value/1000000000000000000) }</p><br/>
        <p>            Your referralBalance balance is {referralBalance && numberWithCommas(referralBalance.value/1000000000000000000) }</p><br/>
        <p>     Your personal eth balance is {_holderPersonalEth && numberWithCommas(_holderPersonalEth.value/1000000000000000000) }</p><br/>


 
        </div>
    )
}

import React,{useEffect,useState} from 'react'

export default function PersonalEth(props) {
    const [dataKey, setdataKey] = useState()
    
    useEffect(()=>{
        const { drizzle,drizzleState } = props;
    
        const contract = drizzle.contracts.GoldSeek3;
        const address = drizzleState.accounts[0]
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["_holderPersonalEth"].cacheCall(address);
 
        setdataKey(dataKey)
    },[])


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const _holderPersonalEth = GoldSeek3._holderPersonalEth[dataKey];

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 7);
}

    return (
        <div>
      Your personal eth balance is {_holderPersonalEth && numberWithCommas(_holderPersonalEth.value/1000000000000000000) }
        </div>
    )
}

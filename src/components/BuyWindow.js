import React, { useState, useEffect } from 'react'

export default function BuyWindow(props) {

    const [stackID, setStackID] = useState(null)
    const [ referral, setReferral] = useState()
    const [amount,setAmount] = useState(0)
    const [ showReferral,setShowReferral] = useState(false)

    const [dataKey2, setdataKey2] = useState()
    


    const [dataKey, setdataKey] = useState()
    
    useEffect(()=>{
        const { drizzle,drizzleState } = props;
    
        const contract = drizzle.contracts.GoldSeek3;
        const address = drizzleState.accounts[0]
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["_referrerMapping"].cacheCall(address);
        const dataKey2 = contract.methods["ethereumToTokens_"].cacheCall(drizzle.web3.utils.toWei(amount.toString(),"ether"));   
    
        setdataKey(dataKey)
        setdataKey2(dataKey2)
    },[amount])


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const _referrerMapping = GoldSeek3._referrerMapping[dataKey];
  const rate = GoldSeek3.ethereumToTokens_[dataKey2];
  


 


    const setValue = () => {
        const { drizzle, drizzleState } = props;
        const contract = drizzle.contracts.GoldSeek3;
       
       
        // let drizzle know we want to call the `set` method with `value`
        const stackId = contract.methods.buy.cacheSend(_referrerMapping.value, {
          from: drizzleState.accounts[0],
          value: drizzle.web3.utils.toWei(amount.toString(),"ether")
        })
         
        // save the `stackId` for later reference
        setStackID( stackId );
   
      };


      function showreferralFunction (){
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = props.drizzleState;
        
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[stackID];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
    if(!transactions[txHash]) return null;
    if(!transactions[txHash].receipt) return null;
//console.log("tx hash",transactions[txHash])
    return `your referral hash is https:www.abc.com/${transactions[txHash].receipt.events.Buy.returnValues.buyer}`
      }


      const getTxStatus = () => {
        // get the transaction states from the drizzle state
        const { transactions, transactionStack } = props.drizzleState;
        
        // get the transaction hash using our saved `stackId`
        const txHash = transactionStack[stackID];
    
        // if transaction hash does not exist, don't display anything
        if (!txHash) return null;


        // otherwise, return the transaction status
        return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
      };


     


      function numberWithCommas2(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 7);
    }


      return (
        <div>

        <h3>Buy Ethereum Credits</h3><br/>
        <h3>(10% Dividend Distribution)</h3>         
        <label> Amount of Ethereum <input value={amount} type="value"            
             onChange={({ target }) => {setAmount(target.value)}}/></label><br/>
        <p>You will get <strong>{rate && numberWithCommas2(rate.value/1000000000000000000*75/100)}</strong> amount of tokens based on current price</p>
         <button onClick={setValue}>BUY ETHEREUM CREDITS</button>
           <div>{getTxStatus()}</div>
           <div>{showreferralFunction()}</div>
           {showReferral?`your referral link is : http://www.abc.com/${referral}`:null}

         </div>
      );
}



// <div><h1>This is buy window. </h1>
// {_referrerMapping&&  _referrerMapping =="0x0000000000000000000000000000000000000000"? 
// <h2>your referral is {_referrerMapping && _referrerMapping.value}</h2>:<h2>You dnt have any referral. would you like to give any referrer?
//   <span><button onClick={()=>{setYesRef(true)}}>Yes</button></span>
//   <span><button onClick={()=>{setYesRef(false)}}>No</button></span>
//   </h2>}
//           <label> Enter amount here <input value={amount} type="value"            
//             onChange={({ target }) => setAmount(target.value)}/></label>
  
//             {YesRef? <label> Enter referral here <input value={referralAdd} type="text"            
//             onChange={({ target }) => setReferralAdd(target.value)}/></label>: null}
//             <br/>
           
  
//             <br/>
//           </div>
//         <button onClick={setValue}>Buy</button>
//           <div>{getTxStatus()}</div>
//           {referral? <p1>your referral link is : {`http://www.abc.com/${referral}`}</p1>:null}
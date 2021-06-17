import React, { useState, useEffect } from 'react'

export default function BuyWindow(props) {

    const [stackID, setStackID] = useState(null)
    const [referral,setReferral] = useState()
    const [amount,setAmount] = useState("")
    const [YesRef,setYesRef] = useState(false)
    
    const [referralAdd,setReferralAdd] = useState("")

    const [dataKey, setdataKey] = useState()
    
    useEffect(()=>{
        const { drizzle,drizzleState } = props;
    
        const contract = drizzle.contracts.GoldSeek3;
        const address = drizzleState.accounts[0]
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["_referrerMapping"].cacheCall(address);
 
    
        setdataKey(dataKey)
    },[])


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const _referrerMapping = GoldSeek3._referrerMapping[dataKey];


    const setValue = () => {
        const { drizzle, drizzleState } = props;
        const contract = drizzle.contracts.GoldSeek3;
       
        const { transactions, transactionStack } = props.drizzleState;
        // let drizzle know we want to call the `set` method with `value`
        const stackId = contract.methods.buy.cacheSend(referralAdd? referralAdd: "0x0000000000000000000000000000000000000000", {
          from: drizzleState.accounts[0],
          value: drizzle.web3.utils.toWei(amount)
        })
         
        // save the `stackId` for later reference
        setStackID( stackId );
        showReferral()
      };

      const showReferral = async ()=>{
        const referral = props.drizzleState.accounts[0]
        setInterval(() => {
          setReferral(referral)
          setReferralAdd(null)
        }, 5000);  

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

      console.log("referral",referralAdd)

      return (
        <div>
          <div><h1>This is buy window. </h1>
{_referrerMapping&&  _referrerMapping =="0x0000000000000000000000000000000000000000"? 
<h2>your referral is {_referrerMapping && _referrerMapping.value}</h2>:<h2>You dnt have any referral. would you like to give any referrer?
  <span><button onClick={()=>{setYesRef(true)}}>Yes</button></span>
  <span><button onClick={()=>{setYesRef(false)}}>No</button></span>
  </h2>}
          <label> Enter amount here <input value={amount} type="value"            
            onChange={({ target }) => setAmount(target.value)}/></label>
  
            {YesRef? <label> Enter referral here <input value={referralAdd} type="text"            
            onChange={({ target }) => setReferralAdd(target.value)}/></label>: null}
            <br/>
           
  
            <br/>
          </div>
        <button onClick={setValue}>Buy</button>
          <div>{getTxStatus()}</div>
          {referral? <p1>your referral link is : {`http://www.abc.com/${referral}`}</p1>:null}
         

        </div>
      );
}

import React, { useState } from 'react'

export default function BuyWindow(props) {

    const [stackID, setStackID] = useState(null)
    const [referral,setReferral] = useState()
    const [amount,setAmount] = useState("")
    
    const [referralAdd,setReferralAdd] = useState("")

    const setValue = () => {
        const { drizzle, drizzleState } = props;
        const contract = drizzle.contracts.GoldSeek3;
        console.log("contract",contract)
        const { transactions, transactionStack } = props.drizzleState;
        // let drizzle know we want to call the `set` method with `value`
        const stackId = contract.methods.buy.cacheSend(referralAdd, {
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
        }, 5000);  

      }

      const getTxStatus = () => {
        // get the transaction states from the drizzle state
        const { transactions, transactionStack } = props.drizzleState;
        console.log("transaction",transactions)    
        // get the transaction hash using our saved `stackId`
        const txHash = transactionStack[stackID];
    
        // if transaction hash does not exist, don't display anything
        if (!txHash) return null;

    
        // otherwise, return the transaction status
        return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
      };
    
    
      return (
        <div>
          <div><h1>This is buy window</h1>
          <label> Enter amount here <input value={amount} type="value"            
            onChange={({ target }) => setAmount(target.value)}/></label>
  
            <br/>
            <label> Enter referral here <input value={referralAdd} type="text"            
            onChange={({ target }) => setReferralAdd(target.value)}/></label>
  
            <br/>
          </div>
        <button onClick={setValue}>Buy</button>
          <div>{getTxStatus()}</div>
          {referral? <p1>your referral link is : {`http://www.abc.com/${referral}`}</p1>:null}

        </div>
      );
}

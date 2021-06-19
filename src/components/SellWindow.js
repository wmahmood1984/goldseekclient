import React, { useState, useEffect } from 'react'

export default function BuyWindow(props) {

    const [stackID, setStackID] = useState(null)
 
    const [amount,setAmount] = useState(0)
 
    const [dataKey, setdataKey] = useState()
    
    useEffect(()=>{
        const { drizzle,drizzleState } = props;
    
        const contract = drizzle.contracts.GoldSeek3;
        const address = drizzleState.accounts[0]
        // let drizzle know we want to watch the `myString` method

        const dataKey = contract.methods["ethereumToTokens_"].cacheCall(drizzle.web3.utils.toWei(amount.toString(),"ether"));   
    
        setdataKey(dataKey)

    },[amount])


    const { GoldSeek3 } = props.drizzleState.contracts;
  
  // using the saved `dataKey`, get the variable we're interested in

  const rate = GoldSeek3.ethereumToTokens_[dataKey];
  

 


    const setValue = () => {
        const { drizzle, drizzleState } = props;
        const contract = drizzle.contracts.GoldSeek3;
       
       
        // let drizzle know we want to call the `set` method with `value`
        const stackId = contract.methods.sell.cacheSend(amount, {
          from: drizzleState.accounts[0]
        })
         
        // save the `stackId` for later reference
        setStackID( stackId );
   
      };

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

        <h3>Sell Ethereum Credits</h3><br/>
        <h3>(10% Dividend Distribution)</h3>         
        <label> Amount of Credits <input value={amount} type="value"            
             onChange={({ target }) => {setAmount(target.value)}}/></label><br/>
        <p>You will get <strong>{rate && numberWithCommas2(rate.value*1000000000000000000*93/100)}</strong> amount of Ethers based on current price</p>
         <button onClick={setValue}>Sell ETHEREUM CREDITS</button>
           <div>{getTxStatus()}</div>
 

         </div>
      );
}



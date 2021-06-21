import React, { useState, useEffect } from 'react'

export default function BuyWindow(props) {
  const [success,setCopySuccess] = useState()
    const [textArea,setTextArea] = useState();
    const [text,setText] = useState();
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

    const copyToClipboard =(e) => {
      textArea.select();
      document.execCommand('copy');
      // This is just personal preference.
      // I prefer to not show the whole text area selected.
      e.target.focus();
      setCopySuccess('Copied!' );
    };


      return (
        <div>

        <h3>Buy Ethereum Credits</h3><br/>
        <h3>(10% Dividend Distribution)</h3>         
        <label> Amount of Ethereum <input value={amount} type="value"            
             onChange={({ target }) => {setAmount(target.value)}}/></label><br/>
        <p>You will get <strong>{rate && numberWithCommas2(rate.value/1000000000000000000*75/100)}</strong> amount of tokens based on current price</p>
         <button onClick={setValue}>BUY ETHEREUM CREDITS</button>
           <div>{getTxStatus()}</div>
           {/* <div>{showreferralFunction()}</div> */}
           {
         /* Logical shortcut for only displaying the 
            button if the copy command exists */
         document.queryCommandSupported('copy') &&
          <div>
            <button onClick={copyToClipboard}>Copy</button> 
            {success}
          </div>
        }
        <form>
          <textarea
            ref={(textarea) => setTextArea(textarea)}
            value={showreferralFunction()}
           

          />
        </form>

         </div>
      );
}



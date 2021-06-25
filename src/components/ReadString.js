import React, { useEffect, useState } from 'react'
import SellWindow from './SellWindow'



export default function ReadString(props) {

    const [dataKey, setdataKey] = useState()
    const [dataKey1, setdataKey1] = useState()

    const [dataKey3, setdataKey3] = useState()
    const [dataKey4, setdataKey4] = useState()
    const [dataKey5, setdataKey5] = useState()
    const [dataKey6, setdataKey6] = useState()
    const [dataKey7, setdataKey7] = useState()

    const [success,setCopySuccess] = useState()
    const [textArea,setTextArea] = useState();
    const [amountExceeded, setAmountExceeded] = useState(false)
    const [stackID, setStackID] = useState(null)

    const [amount,setAmount] = useState(0)

    
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
        const dataKey6 = contract.methods["ethereumToTokens_"].cacheCall(drizzle.web3.utils.toWei(amount.toString(),"ether"));
        const dataKey7 = contract.methods["_holderPersonalEth"].cacheCall(address);   
      
 
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
        setdataKey1(dataKey1)

        setdataKey3(dataKey3)
        setdataKey4(dataKey4)
        setdataKey5(dataKey5)
        setdataKey6(dataKey6)
        setdataKey7(dataKey7)
    },[])


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const tokenPriceInitial_ = GoldSeek3.tokenPriceInitial_[dataKey];
  const totalethStacked = GoldSeek3.TotalEthStaked[dataKey5];
  const balance = GoldSeek3._holderBalances[dataKey1];
  const rate = GoldSeek3.ethereumToTokens_[dataKey6];
  const dividendBalance = GoldSeek3.dividendBalance[dataKey3];
  const referralBalance = GoldSeek3.ReferralBalance[dataKey4];
  const _holderPersonalEth = GoldSeek3._holderPersonalEth[dataKey7];

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 7);
}

function numberWithCommas2(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 6);
}


const setValue = () => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.buy.cacheSend(props.referrer, {
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


 



const copyToClipboard =(e) => {
  textArea.select();
  document.execCommand('copy');
  // This is just personal preference.
  // I prefer to not show the whole text area selected.
  e.target.focus();
  setCopySuccess('Copied!' );
};
  


function setChange(amount){
    if(amount<=(balance.value/1000000000000000000)){setAmount(amount)}
    else {setAmountExceeded(true)}
    console.log("excess",amountExceeded)
   }


const setSellValue = () => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.sell.cacheSend(amount, {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setStackID( stackId );

  };


  const withdrawDividend = (amount) => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.withdrawDividend.cacheSend(amount, {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setStackID( stackId );

  };

  const withdrawReferral = (amount) => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.withdrawrReferral.cacheSend(amount, {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setStackID( stackId );

  };

  const withdrawPersonalEth = (amount) => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.withdrawPersonalEth.cacheSend(amount, {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setStackID( stackId );

  };
    return (
        <div>
            <div style={{backgroundColor:"#020C2C", backgroundPosition:"0% 0%", color:"#FFFFFF", fontFamily:"sans-serif", fontSize:"16px", lineHeight:"24px", textDecoration:"none solid rgb(255,255,255)",textAlign:"left", wordSpacing:"0px", height:"220px", width:"1140px", margin:"0 0 24px 0", padding:"200px 0 40px 0"}}>
            <h2>Share Your Referral Link And Get Paid 7% From Your Referrals
            Purchase And 3% From Their Referrals Purchase.</h2>
            <form>
            
            <textarea
            style={{display:"block", height:"48px",width:"760px",border:"1px solid #4E5592", padding:"8px 16px 8px 16px", backgroundPosition:"0% 0%",backgroundColor:"#FFFFFF",color:"#8BA0E1", fontFamily:"sans-serif",fontSize:"20px",lineHeight:"30px",textDecoration:"none solid rgb(139,160,225)"}}
            ref={(textarea) => setTextArea(textarea)}
            value={showreferralFunction()}/>
            </form>
            
            {/* Logical shortcut for only displaying the 
            button if the copy command exists */
            document.queryCommandSupported('copy') &&
                <div style={{display:"inline-flex"}}>
                <button onClick={copyToClipboard}>Copy</button> 
                {success}
                </div>}
             
            </div>
             

            <div style={{display:"block", border:"solid green 1px",  height:"150px", width:"250px",float: 'left'}}>
            <div>Total Client Capital in Eth: {totalethStacked && totalethStacked.value/1000000000000000000}</div>
            <div>Total Client Capital in Dollar: {totalethStacked && totalethStacked.value*props.price/1000000000000000000}</div>
            </div>


            <div style={{display:"block", border:"solid green 1px",  height:"150px", width:"250px",float: 'left'}}>
            <p><strong>Ethereum Credit</strong>  <br/> Your ethereum Credits Value in ETH: {balance && numberWithCommas(balance.value/1000000000000000000) }
              <br/> Your ethereum Credits Value in USD: {balance && numberWithCommas(balance.value/1000000000000000000*props.price) }</p>
            </div>
           
            <div style={{display:"block", border:"solid green 1px",  height:"150px", width:"250px",float: 'left'}}>
            <p>            Your Dividend balance is in ETH is {dividendBalance && numberWithCommas(dividendBalance.value/1000000000000000000) }</p><br/>
            <p>            Your Dividend balance is in USD is ${dividendBalance && numberWithCommas(dividendBalance.value/1000000000000000000*props.price) }</p><br/>
            <p>            Your referralBalance balance in ETH is {referralBalance && numberWithCommas(referralBalance.value/1000000000000000000) }</p><br/>
            <p>            Your referralBalance balance in USD is ${referralBalance && numberWithCommas(referralBalance.value/1000000000000000000*props.price) }</p><br/>

            </div>
        
        
        <div style={{display:"block", border:"solid green 1px",  height:"150px", width:"250px"}}>
             <h3>Buy Ethereum Credits</h3><br/>
            <h3>(10% Dividend Distribution)</h3>         
            <label> Amount of Ethereum <input value={amount} type="value"            
             onChange={({ target }) => {setAmount(target.value)}}/></label><br/>
            <p>You will get <strong>{rate && numberWithCommas2(rate.value/1000000000000000000*75/100)}</strong> amount of tokens based on current price</p>
            <button onClick={setValue}>BUY ETHEREUM CREDITS</button>
            <div>{getTxStatus()}</div>
        </div>
            
         <div style={{display:"block", border:"1px solid green", height:"auto", width:"300px", margin:"auto"}}>
            <h3>Sell Ethereum Credits</h3><br/>
            <h3>(10% Dividend Distribution)</h3>         
            <label> Amount of Credits <input value={amount} type="value"            
            onChange={({ target }) => {setChange(target.value)}}/></label><br/>

            {amountExceeded? <p>You cannot sell more than your balance of {balance && balance.value/1000000000000000000}</p>:
            <p>You will get <strong>{rate && numberWithCommas2(rate.value*1000000000000000000*93/100)}</strong> amount of Ethers based on current price</p>}
            <button disabled={amountExceeded} onClick={setSellValue}>Sell ETHEREUM CREDITS</button>
            <div>{getTxStatus()}</div>
        </div>

        <div style={{display:"block",margin:"20px",border:"solid 1px green", width:"200px", height:"200px",float:"left"}}>
       
        <button onClick={()=>{withdrawDividend(dividendBalance.value)}}>withdraw Dividend</button>
        <button onClick={()=>{withdrawReferral(referralBalance.value)}}>withdraw referral</button>
        <p>     Your personal eth balance in ETH is {_holderPersonalEth && numberWithCommas(_holderPersonalEth.value/1000000000000000000) }</p><br/>
        <p>     Your personal eth balance in USD is ${_holderPersonalEth && numberWithCommas(_holderPersonalEth.value/1000000000000000000*props.price) }</p><br/>
        <button onClick={()=>{withdrawPersonalEth(_holderPersonalEth.value)}}>withdraw PersonaEth</button>
        <br/>
        {getTxStatus()}
 
        </div>


        
        </div>
    )
}


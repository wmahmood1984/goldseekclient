import { number } from 'assert-plus'
import React, { useEffect, useState } from 'react'
import { generatePath } from 'react-router'
import Web3 from 'web3'



export default function ReadString(props) {

    const [dataKey, setdataKey] = useState()
    const [dataKey1, setdataKey1] = useState()

    const [dataKey3, setdataKey3] = useState()
    const [dataKey4, setdataKey4] = useState()
    const [dataKey5, setdataKey5] = useState()
    const [dataKey6, setdataKey6] = useState()
    const [dataKey7, setdataKey7] = useState()
    const [dataKey8, setdataKey8] = useState()
    const [dataKey9, setdataKey9] = useState()

    const [success,setCopySuccess] = useState()
    const [textArea,setTextArea] = useState();
    const [amountExceeded, setAmountExceeded] = useState(false)
    const [stackID, setStackID] = useState(null)
    const [SellstackID, setSellStackID] = useState(null)
    const [PHstackID, setPHstackID] = useState(null)
    const [DivstackID, setDivstackID] = useState(null)
    const [RefstackID, setRefstackID] = useState(null)
    

    const [amount,setAmount] = useState(0)
    const [Puramount,setPurAmount] = useState()
    const [sellAmount,setSellAmount]=useState()
    

    
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
        const dataKey6 = contract.methods["existingPrice"].cacheCall();
        const dataKey7 = contract.methods["_holderPersonalEth"].cacheCall(address);
        const dataKey8 = contract.methods["ethereumToTokens_"].cacheCall(stringFunction(sellAmount));
        const dataKey9 = contract.methods["ethereumToTokens_"].cacheCall(stringFunction(100000000000));   
      
 
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
        setdataKey1(dataKey1)

        setdataKey3(dataKey3)
        setdataKey4(dataKey4)
        setdataKey5(dataKey5)
        setdataKey6(dataKey6)
        setdataKey7(dataKey7)
        setdataKey8(dataKey8)
        setdataKey9(dataKey9)



    },[Puramount,sellAmount])

    function stringFunction(amount){
      
        if(amount && amount>0){return props.drizzle.web3.utils.toWei(amount.toString(),"ether")}

        else{return props.drizzle.web3.utils.toWei("0","ether")}
    }


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const tokenPriceInitial_ = GoldSeek3.tokenPriceInitial_[dataKey];
  const totalethStacked = GoldSeek3.TotalEthStaked[dataKey5];
  const balance = GoldSeek3._holderBalances[dataKey1];
  const rate = GoldSeek3.existingPrice[dataKey6];
  const dividendBalance = GoldSeek3.dividendBalance[dataKey3];
  const referralBalance = GoldSeek3.ReferralBalance[dataKey4];
  const _holderPersonalEth = GoldSeek3._holderPersonalEth[dataKey7];
  const _sellRate = GoldSeek3.ethereumToTokens_[dataKey8]
  const GeneralRate = GoldSeek3.ethereumToTokens_[dataKey9]

  console.log("general rate",rate && GoldSeek3.existingPrice)

  function numberWithCommas(x) {
    
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 7);
}

function numberWithCommas2(x) {
    var y = x.toFixed(1)
  return y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice(0, 7);
}






const setValue = () => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.buy.cacheSend(props.referrer, {
      from: drizzleState.accounts[0],
      value: drizzle.web3.utils.toWei(Puramount.toString(),"ether")
    })
     
    // save the `stackId` for later reference
    setStackID( stackId );
    setPurAmount("")

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
return `https://goldseek2.surge.sh/${transactions[txHash].receipt.events.Buy.returnValues.buyer}`
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
    if(amount<=(balance.value)){setSellAmount(amount)}
    else {setAmountExceeded(true)}
    console.log("excess",amountExceeded)
   }


const setSellValue = () => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   var _sell = sellAmount
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.sell.cacheSend(_sell.toString(), {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setSellStackID( stackId );
    setSellAmount("")

  };
 

  const getSellTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = props.drizzleState;
    
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[SellstackID];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;


    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  const getWithdrawTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = props.drizzleState;
    
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[PHstackID];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;


    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };


  const withdrawDividend = (amount) => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.withdrawDividend.cacheSend(amount, {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setDivstackID( stackId );

  };

  const withdrawReferral = (amount) => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.withdrawrReferral.cacheSend(amount, {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setRefstackID( stackId );

  };

  const withdrawPersonalEth = (amount) => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.withdrawPersonalEth.cacheSend(amount, {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setPHstackID( stackId );

  };
    return (
        <div>
            <div style={{backgroundColor:"#020C2C", backgroundPosition:"0% 0%", color:"#FFFFFF", fontFamily:"sans-serif", fontSize:"16px", lineHeight:"24px", textDecoration:"none solid rgb(255,255,255)",textAlign:"center", wordSpacing:"0px", height:"220px", width:"1140px", margin:"200px 0 24px 24px", padding:"20px"}}>
            <h2>Share Your Referral Link And Get Paid 7% From Your Referrals
            Purchase And 3% From Their Referrals Purchase.</h2>
            <div style={{display:"flex", margin:"auto",alignContent:"center",marginLeft:"100px"}}>
            <form>
            
            <textarea
            style={{display:"block", height:"48px",width:"760px",border:"1px solid #4E5592", padding:"8px 16px 8px 16px", backgroundPosition:"0% 0%",backgroundColor:"#FFFFFF",color:"#8BA0E1", fontFamily:"sans-serif",fontSize:"20px",lineHeight:"30px",textDecoration:"none solid rgb(139,160,225)",}}
            ref={(textarea) => setTextArea(textarea)}
            value={showreferralFunction()}/>
            </form>

            {/* Logical shortcut for only displaying the 
            button if the copy command exists */
            document.queryCommandSupported('copy') &&
                <div             >
                <button 
                style={{display:"inline-block", height:"45px",width:"99px",border:"1px solid #FFFFFF", padding:"10px 32px 10px 32px", backgroundPosition:"0% 0%", backgroundColor:"#FFFFFF",color:"#14161A", fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb(20,20,26)", marginLeft:"20px"}}
                onClick={copyToClipboard}>Copy</button> 
                {success}
                </div>}
            </div>
            
            
            
             
            </div>
             
            <div style={{display:"flex"}}>
                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",height:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <h1>${totalethStacked && numberWithCommas2(Number(totalethStacked.value/1000000000000000000*props.price))  }</h1>
                <h3>Total Client Capital</h3> 
                </div>


                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF", minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <h1 style={{margin:"1px"}}>{balance && numberWithCommas(balance.value)  }</h1><br/>
                <h2 style={{margin:"1px"}}>Seek Gold Credits</h2><br/>
                <p style={{margin:"1px"}}> My Seek Gold Credit Value </p>
                <h2>${ rate && balance && (Number(rate.value)*balance.value/1000000000000000000*props.price).toFixed(2) }</h2>
                </div>
           
                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"flex",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <span>
                  <h2>${dividendBalance && numberWithCommas2(dividendBalance.value/1000000000000000000*props.price) }</h2><br/>
                  <p>Your Dividend Earnings Value: {dividendBalance && numberWithCommas(dividendBalance.value/1000000000000000000) } BNB</p>
                  <button onClick={()=>{withdrawDividend(dividendBalance.value)}}>withdraw Dividend</button>
                
                </span>
                <span>
                  <h2>${referralBalance && numberWithCommas2(referralBalance.value/1000000000000000000) }</h2><br/>
                  <p>Your Referral Earnings Value: {referralBalance && numberWithCommas(referralBalance.value/1000000000000000000*props.price) } BNB</p>
                  <button onClick={()=>{withdrawReferral(referralBalance.value)}}>withdraw referral</button>
                </span>
                  </div>
            </div>
            
            
            
            <div style={{display:"flex"}}>

                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <h2 style={{margin:"1px"}}>Buy BNB Credits</h2><br/>
                <h3 style={{margin:"1px"}}>(10% Dividend Distribution)</h3>         
                <label> Amount of BNBs <br/>
                <input value={Puramount} type="value"            
                  onChange={({ target }) => {setPurAmount(target.value)}}/></label><br/>
                <p>You will get { rate && (Puramount*1000000000000000000/Number(rate.value)*.75).toFixed(0) } number of tokens</p>
                <p>Price BNB: {rate&& (Number(rate.value)/1000000000000000000).toFixed(8)}</p>
                <p>Price Dollar: ${rate &&(Number(rate.value)/1000000000000000000*props.price).toFixed(8)}</p>
                <button onClick={setValue}>BUY BNB CREDITS</button>
                <div>{getTxStatus()}</div>
                </div>
            
                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <h2 style={{margin:"1px"}}>Sell BNB Credits</h2><br/>
                {/* <label> Amount of Credits <input value={sellAmount} type="value"            
                onChange={({ target }) => {setChange(target.value)}}/></label><br/>

                {amountExceeded? <p>You cannot sell more than your balance of {balance && balance.value/1000000000000000000}</p>:
                <p>You will get <strong>{_sellRate && numberWithCommas(_sellRate.value*1000000000000000000*93/100)}</strong> amount of Ethers based on current price</p>}
                <button disabled={amountExceeded} onClick={setSellValue}>Sell BNB CREDITS</button>
                <div>{getSellTxStatus()}</div> */}
                <label>Amount of Credits<br/>
                  <input value={sellAmount} type="value" onChange={(e)=>{setChange(e.target.value)}}></input>
                </label>
                {amountExceeded? <p>You cannot sell more than your balance of {balance && balance.value}</p>:
                <p>You will get <strong>{rate && (Number(rate.value)/1000000000000000000*.93*sellAmount).toFixed(4)}</strong> amount of BNBs based on current price</p>}
                <p>Price BNB: {rate&& (Number(rate.value)/1000000000000000000).toFixed(8)}</p>
                <p>Price Dollar: ${rate &&(Number(rate.value)/1000000000000000000*props.price).toFixed(8)}</p>
                <button disabled={amountExceeded} onClick={setSellValue}>Sell BNB CREDITS</button>
                <div>{getSellTxStatus()}</div>
                </div>

                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
              
                
                <p>     Your personal eth balance in BNB is {(_holderPersonalEth && _holderPersonalEth.value/1000000000000000000) }</p><br/>
                <p>     Your personal eth balance in USD is ${(_holderPersonalEth && _holderPersonalEth.value/1000000000000000000*props.price) }</p><br/>
                <button onClick={()=>{withdrawPersonalEth(_holderPersonalEth.value)}}>withdraw PersonaBNBs</button>
                <div>{getWithdrawTxStatus()}</div>
                <br/>


        
                </div>
            </div>


        
        </div>
    )
}


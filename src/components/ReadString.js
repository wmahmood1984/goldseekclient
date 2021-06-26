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
    const [dataKey8, setdataKey8] = useState()

    const [success,setCopySuccess] = useState()
    const [textArea,setTextArea] = useState();
    const [amountExceeded, setAmountExceeded] = useState(false)
    const [stackID, setStackID] = useState(null)
    const [SellstackID, setSellStackID] = useState(null)
    

    const [amount,setAmount] = useState(0)
    const [Puramount,setPurAmount] = useState(0)
    const [sellAmount,setSellAmount]=useState(0)

    
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
        const dataKey6 = contract.methods["ethereumToTokens_"].cacheCall(drizzle.web3.utils.toWei(Puramount.toString(),"ether"));
        const dataKey7 = contract.methods["_holderPersonalEth"].cacheCall(address);
        const dataKey8 = contract.methods["ethereumToTokens_"].cacheCall(drizzle.web3.utils.toWei(sellAmount.toString(),"ether"));   
      
 
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
        setdataKey1(dataKey1)

        setdataKey3(dataKey3)
        setdataKey4(dataKey4)
        setdataKey5(dataKey5)
        setdataKey6(dataKey6)
        setdataKey7(dataKey7)
        setdataKey8(dataKey8)
    },[Puramount,sellAmount])


    const { GoldSeek3 } = props.drizzleState.contracts;
   
  // using the saved `dataKey`, get the variable we're interested in
  const tokenPriceInitial_ = GoldSeek3.tokenPriceInitial_[dataKey];
  const totalethStacked = GoldSeek3.TotalEthStaked[dataKey5];
  const balance = GoldSeek3._holderBalances[dataKey1];
  const rate = GoldSeek3.ethereumToTokens_[dataKey6];
  const dividendBalance = GoldSeek3.dividendBalance[dataKey3];
  const referralBalance = GoldSeek3.ReferralBalance[dataKey4];
  const _holderPersonalEth = GoldSeek3._holderPersonalEth[dataKey7];
  const _sellRate = GoldSeek3.ethereumToTokens_[dataKey8]

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
      value: drizzle.web3.utils.toWei(Puramount.toString(),"ether")
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
    if(amount<=(balance.value/1000000000000000000)){setSellAmount(amount)}
    else {setAmountExceeded(true)}
    console.log("excess",amountExceeded)
   }


const setSellValue = () => {
    const { drizzle, drizzleState } = props;
    const contract = drizzle.contracts.GoldSeek3;
   
   
    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.sell.cacheSend(sellAmount.toString(), {
      from: drizzleState.accounts[0]
    })
     
    // save the `stackId` for later reference
    setSellStackID( stackId );

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
                <h1>${totalethStacked && numberWithCommas2(totalethStacked.value*props.price/1000000000000000000) }</h1>
                <h3>Total Client Capital</h3> 
                </div>


                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF", minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <h1 style={{margin:"1px"}}>{balance && numberWithCommas(balance.value/1000000000000000000) }</h1><br/>
                <h2 style={{margin:"1px"}}>Seek Gold Credits</h2><br/>
                <p style={{margin:"1px"}}> My Seek Gold Credit Value </p>
                <h2>${balance && numberWithCommas(balance.value/1000000000000000000*props.price) }</h2>
                </div>
           
                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"flex",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <span>
                  <h2>${dividendBalance && numberWithCommas(dividendBalance.value/1000000000000000000*props.price) }</h2><br/>
                  <p>Your Dividend Earnings Value: {dividendBalance && numberWithCommas(dividendBalance.value/1000000000000000000) } ETH</p>
                  <button onClick={()=>{withdrawDividend(dividendBalance.value)}}>withdraw Dividend</button>
                
                </span>
                <span>
                  <h2>${referralBalance && numberWithCommas(referralBalance.value/1000000000000000000) }</h2><br/>
                  <p>Your Referral Earnings Value: {referralBalance && numberWithCommas(referralBalance.value/1000000000000000000*props.price) } ETH</p>
                  <button onClick={()=>{withdrawReferral(referralBalance.value)}}>withdraw referral</button>
                </span>
                  </div>
            </div>
            
            
            
            <div style={{display:"flex"}}>

                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <h2 style={{margin:"1px"}}>Buy Ethereum Credits</h2><br/>
                <h3 style={{margin:"1px"}}>(10% Dividend Distribution)</h3>         
                <label> Amount of Ethereum <br/>
                <input value={Puramount} type="value"            
                  onChange={({ target }) => {target.value==null? setPurAmount(0):setPurAmount(target.value)}}/></label><br/>
                <p>You will get <strong>{rate && numberWithCommas2(rate.value/1000000000000000000*75/100)}</strong> amount of tokens based on current price</p>
                <button onClick={setValue}>BUY ETHEREUM CREDITS</button>
                <div>{getTxStatus()}</div>
                </div>
            
                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
                <h2 style={{margin:"1px"}}>Sell Ethereum Credits</h2><br/>
                <label> Amount of Credits <input value={sellAmount} type="value"            
                onChange={({ target }) => {target.value==null? setChange(0):setChange(target.value)}}/></label><br/>

                {amountExceeded? <p>You cannot sell more than your balance of {balance && balance.value/1000000000000000000}</p>:
                <p>You will get <strong>{_sellRate && numberWithCommas2(_sellRate.value*1000000000000000000*93/100)}</strong> amount of Ethers based on current price</p>}
                <button disabled={amountExceeded} onClick={setSellValue}>Sell ETHEREUM CREDITS</button>
                <div>{getSellTxStatus()}</div>
                </div>

                <div style={{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px",textDecoration:"none solid rgb",textAlign:"center",wordSpacing:"0px",backgroundColor:"#020C2c",backgroundPosition:"0% 0%",color:"#FFFFFF",minHeight:"149px",width:"360px",margin:"0 0 24px 0", padding:"30px 0 40px 0",display:"block",transform:"none",transition:"all 0s ease 0s", boxSizing:"border-box",margin:"30px"}}>
              
                
                <p>     Your personal eth balance in ETH is {_holderPersonalEth && numberWithCommas(_holderPersonalEth.value/1000000000000000000) }</p><br/>
                <p>     Your personal eth balance in USD is ${_holderPersonalEth && numberWithCommas(_holderPersonalEth.value/1000000000000000000*props.price) }</p><br/>
                <button onClick={()=>{withdrawPersonalEth(_holderPersonalEth.value)}}>withdraw PersonaEth</button>
                <br/>


        
                </div>
            </div>


        
        </div>
    )
}


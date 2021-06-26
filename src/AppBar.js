import React from 'react'
import { Link, useParams } from 'react-router-dom';
import logo from './img/site/1610956010.png'
const styles = {
    padding: "14px 0 14px 0",
    backgroundColor:"#020C2C", 
    backgroundPosition: "0% 0%",
    color:"#ffffff",            
    height:"87px",
    width:"1349px",
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
                        //  position:"fixed",   
            }



            // marginTop:"-200",
            // 
const boxstyle= {
    display:"block",
    fontFamily:"sans-serif",
    fontSize:"16px",
    color:"#ffffff",
    lineHeight:"24px",
    textDecoration:"none solid rgb(255,255,255)",
    textAlign:"center",
    verticalAlign:"middle",
    wordSpacing:"0px",                
    height:"38px",
    width:"115.4px",
    padding: "6px 12px 6px 12px",
    minHeight:"auto",
    minWidth:"auto",
}

export default function AppBar(props) {
    const address = props.drizzleState.accounts[0]
    return (

        <div style={styles}>
            <div style={{height:"59px",width:"1140px",display:"flex"}}>
            <img style={{height:"43px",width:"285px",display:"block", backgroundPosition:"0% 0%"}} src={logo}></img>
            
            <div style={{height:"59px",width:"855px",display:"flex"}}>
            <Link style={boxstyle} to="HowItWorks">How It Works</Link>{'   '}
            <Link style={boxstyle} to="HowToGetStarted">How To Get Started</Link>{'   '}
            <div style={boxstyle}>{address}</div>
            </div>
            
            </div>
            
            

        </div>
    )
}

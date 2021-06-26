import React from 'react'
import ReadString from './ReadString';
import BuyWindow from './BuyWindow';
import SellWindow from './SellWindow'
import PersonalEth from './PersonalEth';
import { useParams } from 'react-router';

export default function Main(props) {
const {referrer} = useParams()

    return (
        <div>
              
  <ReadString
  drizzle={props.drizzle}
  drizzleState={props.drizzleState}
  price={props.price}
  referrer={referrer? referrer: "0x0000000000000000000000000000000000000000"}
  ></ReadString>
{/* 
  <BuyWindow
  drizzle={props.drizzle}
  drizzleState={props.drizzleState}
  price={props.price}
  referrer={referrer? referrer: "0x0000000000000000000000000000000000000000"}
></BuyWindow> */}
{/* 
<SellWindow
  drizzle={props.drizzle}
  drizzleState={props.drizzleState}
  price={props.price}
></SellWindow> */}

{/* <PersonalEth
  drizzle={props.drizzle}
  drizzleState={props.drizzleState}
  price={props.price}
></PersonalEth> */}


        </div>
    )
}

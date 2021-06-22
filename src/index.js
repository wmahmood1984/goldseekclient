import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


import { Drizzle } from "@drizzle/store";
import GoldSeek3 from "./contracts/GoldSeek3.json";
import { domain } from 'min-document';


const options = {
  contracts: [GoldSeek3],
  events: {
    GoldSeek3: ["Buy"]},
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

// setup drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(
  <React.StrictMode>
<Router>
<App drizzle ={drizzle} />
</Router>
    

   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

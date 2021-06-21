import './App.css';
import { useState, useEffect } from 'react';
import ReadString from './components/ReadString';
import BuyWindow from './components/BuyWindow';
import SellWindow from './components/SellWindow'
import PersonalEth from './components/PersonalEth';
import axios from 'axios'
import Clip from './components/clip';



function App(props) {
  const [loading, setLoading] = useState(true)
  const [drizzleState, setdrizzleState] = useState(null)
  const [price, setPrice] = useState()

  useEffect(() => {

    const { drizzle } = props;
    const unsubscribe = drizzle.store.subscribe(()=>{

//      console.log("this is drizzle", drizzle)
      const drizzleState = drizzle.store.getState();

  //  console.log("this is state", drizzleState)

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        
        setdrizzleState(drizzleState)
        setLoading(false)
        //this.setState({ loading: false, drizzleState });
      }
    })


    axios.get("https://api.pancakeswap.info/api/tokens/0x2170Ed0880ac9A755fd29B2688956BD959F933F8")
        //   // Handle a successful response from the server
           .then(response => {
        //           // Getting a data object from response that contains the necessary data from the server
                   const data = response.data;
                   console.log('data', data.data.price);
                   setPrice(data.data.price)
        //           // Save the unique id that the server gives to our object
                  
           })
        //   // Catch and print errors if any
           .catch(error => console.error('On create student error', error));



    return ()=>{
      unsubscribe()
    }
  }, [])
  if (loading) return "Loading Drizzle...";
console.log("price ",price)  
  return (
    <div className="App">
   
  <ReadString
  drizzle={props.drizzle}
  drizzleState={drizzleState}
  price={price}
  ></ReadString>

  <BuyWindow
  drizzle={props.drizzle}
  drizzleState={drizzleState}
  price={price}
></BuyWindow>

<SellWindow
  drizzle={props.drizzle}
  drizzleState={drizzleState}
  price={price}
></SellWindow>

<PersonalEth
  drizzle={props.drizzle}
  drizzleState={drizzleState}
  price={price}
></PersonalEth>

<Clip></Clip>
    </div>)
}

export default App;

import './App.css';
import { useState, useEffect } from 'react';
import Main from './components/Main';
import axios from 'axios'
import { Routes, Route} from 'react-router'
import Home from './Home'




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


//    axios.get("https://api.pancakeswap.info/api/tokens/0x2170Ed0880ac9A755fd29B2688956BD959F933F8")
    axios.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD")
        //   // Handle a successful response from the server
           .then(response => {
        //           // Getting a data object from response that contains the necessary data from the server
                   const data = response.data;
                   console.log('data', data.RAW.ETH.USD.PRICE);
                   setPrice(data.RAW.ETH.USD.PRICE)
        //           // Save the unique id that the server gives to our object
                  
           })
        //   // Catch and print errors if any
           .catch(error => console.error('On create student error', error));



    return ()=>{
      unsubscribe()
    }
  }, [])

  const XYZ = ()=>{return (<div>hello from xyz</div>)}
  if (loading) return "Loading Drizzle...";
console.log("price ",price)  
  return (
    
    <div className="App">

<Routes >
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="main" element={<Main drizzle={props.drizzle} drizzleState={drizzleState} price={price} ></Main> }></Route>
  <Route path="main/:referrer" element={<Main drizzle={props.drizzle} drizzleState={drizzleState} price={price} ></Main> }></Route>
</Routes>


    </div>)
}

export default App;

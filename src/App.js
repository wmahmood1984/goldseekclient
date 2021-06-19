import './App.css';
import { useState, useEffect } from 'react';
import ReadString from './components/ReadString';
import BuyWindow from './components/BuyWindow';
import SellWindow from './components/SellWindow'



function App(props) {
  const [loading, setLoading] = useState(true)
  const [drizzleState, setdrizzleState] = useState(null)

  useEffect(() => {

    const { drizzle } = props;
    const unsubscribe = drizzle.store.subscribe(()=>{

      console.log("this is drizzle", drizzle)
      const drizzleState = drizzle.store.getState();

    console.log("this is state", drizzleState)

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        
        setdrizzleState(drizzleState)
        setLoading(false)
        //this.setState({ loading: false, drizzleState });
      }
    })

    return ()=>{
      unsubscribe()
    }
  }, [])
  if (loading) return "Loading Drizzle...";
  
  return (
    <div className="App">
   
  <ReadString
  drizzle={props.drizzle}
  drizzleState={drizzleState}
  ></ReadString>

  <BuyWindow
  drizzle={props.drizzle}
  drizzleState={drizzleState}
  ></BuyWindow>

<SellWindow
  drizzle={props.drizzle}
  drizzleState={drizzleState}
></SellWindow>
    </div>)
}

export default App;

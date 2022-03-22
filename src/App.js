import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
import {fetchData} from './store/cart-action'
let firstRender =true;

function App() {
  const cart = useSelector(state=> state.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const notification = useSelector(state => state.ui.notification)
  const sendRequest = async() => {
    //Send state as sending req
    try{
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Sending Request',
        type: 'warning'
      }))
    const res = await fetch('https://redux-http-69846-default-rtdb.firebaseio.com/cartItems.json', {
      method: "PUT",
      body: JSON.stringify(cart)
    })
    const data = await res.json()
    //Send statea as req is successful
    dispatch(uiActions.showNotification({
      open: true,
      message: 'Sent Request to DB successfully',
      type: 'success'
    }))
  }
  catch(err){
    dispatch(uiActions.showNotification({
      open: true,
      message: 'Sending request failed',
      type: 'error'
    }))
  }
  }
  useEffect(()=>{
    if(firstRender){
      firstRender =false;
      return
    }
    dispatch(fetchData())
  },[dispatch])
  useEffect(()=>{
    if(cart.changed){
      sendRequest()
    }
    
  },[cart,dispatch])
  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message}/>}
      {!isLoggedIn && <Auth />}
      {isLoggedIn &&<Layout />}
    </div>
  );
}

export default App;

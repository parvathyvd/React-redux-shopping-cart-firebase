import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchData = () => {
    return async(dispatch) => {
        const fetchHandler = async() =>{
            const res = await fetch('https://redux-http-69846-default-rtdb.firebaseio.com/cartItems.json')
            const data = await res.json()
            return data;
        }
        try{
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData))
        }
        catch(err){
            dispatch(uiActions.showNotification({
              open: true,
              message: 'Sending request failed',
              type: 'error'
            }))
          }
    }
}
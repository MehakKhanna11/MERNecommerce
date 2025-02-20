import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
    const dispatch=useDispatch();
    const { cartItems,total } =useSelector(
      (state: RootState) => state.cartReducer
    );
    const navigate=useNavigate();
    const [shippingInfo,setShippingInfo]=useState({
        address:"",
        city:"",
        state:"",
        country:"",
        pinCode:"",
    });
    const changeHandler=(e:ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        setShippingInfo(prev=>({...prev,[e.target.name]:e.target.value}))

    }
    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      dispatch(saveShippingInfo(shippingInfo));
      try{
        const { data } = await axios.post(
          `${server}/api/v1/payment/create`,
          {
            amount: total,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        navigate("/pay",{state:data.clientSecret});
      }catch(error){
        console.log(error);
        toast.error("Something went wrong")
      }
    }
    useEffect(()=>{
    if(cartItems.length<=0) return navigate("/cart");
    },[cartItems]) 
  return (
    <div className="shipping">
        <button onClick={()=>navigate("/cart")} className="back-btn"><BiArrowBack/></button>
        <form onSubmit={submitHandler}>
            <h1>Shipping Address</h1>
            <input required type="text" placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler} />
            <input required type="text" placeholder="City" name="city" value={shippingInfo.city} onChange={changeHandler} />
            <input required type="text" placeholder="State" name="state" value={shippingInfo.state} onChange={changeHandler} />
            <select name="country" required value={shippingInfo.country} onChange={changeHandler}> 
                <option value="">Choose Country</option>
                <option value="India">India</option>
            </select>
            <input required type="text" placeholder="Pincode" name="pinCode" value={shippingInfo.pinCode} onChange={changeHandler} />
            <button type="submit">Pay Now</button>
        </form>
      
    </div>
  )
}

export default Shipping

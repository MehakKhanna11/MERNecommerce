import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart, applyDiscount, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";
import { RootState, server } from "../redux/store";
// import { RootState } from "@reduxjs/toolkit/query";
// import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, subtotal, tax, shippingCharges, discount, total } =
    useSelector(
      (state: RootState) => state.cartReducer
    );
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const dispatch = useDispatch();
  const incrementHandler = (cartItem: CartItem) => {
    if(cartItem.quantity>=cartItem.stock) return toast.error("Product Out of Stock");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if(cartItem.quantity<=1) return toast.error("Please enter valid quantity");
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity -1  }));
  };
  const removeHandler = (productId:string) => {
    dispatch(removeCartItem(productId));
  };
  useEffect(() => {
    const {token,cancel}=axios.CancelToken.source()
    const timeoutId = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken:token}).then((res)=>{
        dispatch(applyDiscount(res.data.discount))
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
      }).catch(()=>{
        dispatch(applyDiscount(0));
        setIsValidCouponCode(false);
        dispatch(calculatePrice());

      }
      );
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(()=>{
    dispatch(calculatePrice());
  },[cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => {
            return (
              <CartItemCard
                key={idx}
                cartItem={i}
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
              />
            );
          })
        ) : (
          <h1>No Items added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges:₹{shippingCharges}</p>
        <p>Tax:₹{tax}</p>
        <p>
          Discount: <em>- ₹{discount}</em>
        </p>
        <b>Total:₹{total}</b>
        <input
          type="text"
          value={couponCode}
          placeholder="Discount Coupon"
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>{" "}
            </span>
          ) : (
            <span className="red">
              Invalid Coupon Code <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;

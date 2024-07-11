import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import  { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const { data,isLoading,isError } = useLatestProductsQuery("");
  const dispatch=useDispatch();
  if(isError){
    toast.error("Cannot fetch Latest Products");
  }
  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock<1) return toast.error("Product OUT OF STOCK");
    else{
      dispatch(addToCart(cartItem));
      toast.success("Product added to Cart")
    }
  };
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products{" "}
        <Link className="findmore" to="/search">
          More
        </Link>{" "}
      </h1>

      <main>
        {isLoading?<Skeleton width="80vw"/>:  data?.products.map((i) => (
          <ProductCard
            key={i._id}
            productId={i._id}
            name={i.name}
            price={i.price}
            stock={i.stock}
            photo={i.photo}
            handler={addToCartHandler}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;

import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
import { server } from "../redux/store";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler:(cartItem: CartItem) => string | undefined;
};

const ProductCard =({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductsProps) => {
  // const photoUrl=photo.split("\\")[1];
  return (
    <div className="product-card">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>{price}</span>
      <div>
        <button onClick={()=>handler({productId,photo,name,price,stock,quantity:1})}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/Loader";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
const Search = () => {
  const {data:categoriesResponse,isLoading:loadingCategories,isError,error}=useCategoriesQuery("")
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const dispatch=useDispatch();
  const addToCartHandler=(cartItem:CartItem)=>{
    if(cartItem.stock<1) return toast.error("Product OUT OF STOCK");
    else{
      dispatch(addToCart(cartItem));
      toast.success("Product added to Cart")
    }
  };

  if(isError){
    toast.error((error as CustomError).data.message);
  }  
  const {isLoading:productLoading,data:searchedData,isError:productIsError,error:productError}=useSearchProductsQuery({search,sort,category,page,price:maxPrice});
  if(productIsError){
    toast.error((productError as CustomError).data.message);
  }
  const isPrevPage = page > 1;
  const isNextPage = page < searchedData?.totalPage!;
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to high)</option>
            <option value="dsc">Price (High to low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price:{maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {
              !loadingCategories && categoriesResponse?.categories.map((i)=>(
            <option value={i} key={i}>{i}</option>
              ))
            }

          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search by name..." value={search} onChange={((e)=>setSearch(e.target.value))}/>
        {
          productLoading?<Skeleton length={10}/>:(
            <div className="search-product-list">
            {
              searchedData?.products.map((i)=>(
            <ProductCard key={i._id} productId={i._id} stock={i.stock} name={i.name} price={i.price} photo={i.photo}  handler={addToCartHandler} />
              ))
            } 
          </div>
          )
        }

        {searchedData && searchedData?.totalPage >= 1 &&
            (<article>
            <button disabled={!isPrevPage} onClick={()=>setPage((prev)=>prev - 1)}>Prev</button>
            <span>{page} of {searchedData.totalPage}</span>
            <button disabled={!isNextPage} onClick={()=>setPage((prev)=>prev + 1)}>Next</button>
          </article>)
        }
      </main>
    </div>
  );
};

export default Search;

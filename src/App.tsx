import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userApi";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/not-found";


const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping=lazy(()=>import("./pages/Shipping"));
const Login=lazy(()=>import("./pages/Login"));
const Orders=lazy(()=>import("./pages/Orders"));
const OrderDetails=lazy(()=>import("./pages/OrderDetails"));
const Checkout=lazy(()=>import("./pages/Checkout"));






//importing admin routes
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

function App() {
  const dispatch=useDispatch();
  const {user,loading}=useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        const data=await getUser(user.uid);
        dispatch(userExist(data.user));
      }
      else{
        dispatch(userNotExist());
      }
    })
  },[]);
  return loading?<Loader />:(
    <Router>
    <Header user={user}/>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Search />} path="/search" />
        <Route element={<Cart />} path="/cart" />

        <Route element={<ProtectedRoute isAuthenticated={user?false:true}><Login /></ProtectedRoute>} path="/login" />


        {/*logged in wale routes*/}
        <Route element={<ProtectedRoute isAuthenticated={user?true:false}/>}>
        <Route element={<Shipping />} path="/shipping" />
        <Route element={<Orders/>} path="/orders" />
        <Route element={<OrderDetails/>} path="/order/:id" />
        <Route element={<Checkout />} path="/pay" />
        </Route>


        <Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role==="admin"?true:false}/>}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/product" element={<Products />} />
        <Route path="/admin/customer" element={<Customers />} />
        <Route path="/admin/transaction" element={<Transaction />} />
        {/* Charts */}
        <Route path="/admin/chart/bar" element={<Barcharts />} />
        <Route path="/admin/chart/pie" element={<Piecharts />} />
        <Route path="/admin/chart/line" element={<Linecharts />} />
        {/* Apps */}
        <Route path="/admin/app/coupon" element={<Coupon />} />
        <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
        <Route path="/admin/app/toss" element={<Toss />} />

        {/* Management */}
        <Route path="/admin/product/new" element={<NewProduct />} />

        <Route path="/admin/product/:id" element={<ProductManagement />} />

        <Route
          path="/admin/transaction/:id"
          element={<TransactionManagement />}
        />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Suspense>
    <Toaster position="top-center"/>
  </Router>


  );
}

export default App;

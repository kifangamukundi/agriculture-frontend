import { Fragment } from "react";
import Layout from "./components/layout/Layout";
import "./App.css";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";

// CRUD routes for Products
import NewProduct from "./pages/product/NewProduct"; 
import ViewProduct from "./pages/product/ViewProduct";
import EditProduct from "./pages/product/EditProduct";
import ProductList from "./pages/product/ProductList";

// CRUD routes for Categories
import NewCategory from "./pages/category/NewCategory";
import ViewCategory from "./pages/category/ViewCategory";
import EditCategory from "./pages/category/EditCategory";
import CategoryList from "./pages/category/CategoryList";

// import Login from "./pages/login/Login";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";

function App() {
  // const admin = useSelector((state) => state.user.currentUser.roles["ROLE_ADMIN"]);
  const isLoggedIn = useSelector((state) => state?.users?.currentUser?.accessToken);
  return (
    <Router>
      <Routes>
        <Fragment>
          <Route exact path="/Login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/Register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
        </Fragment>
        <Route exact path="/" element={<Landing />} />
        
        <Fragment>
          {isLoggedIn ? (
            <Route element={<Layout />} >
              <Route exact path="/DashBoard" element={<Home />} />
              <Route exact path="/users" element={<UserList />} />
              <Route exact path="/user/:userId" element={<User />} />
              <Route exact path="/newUser" element={<NewUser />} />
              <Route exact path="/NewProduct" element={<NewProduct />} />
              <Route exact path="/ViewProduct/:productId" element={<ViewProduct />} />
              <Route exact path="/EditProduct/:productId" element={<EditProduct />} />
              <Route exact path="/ProductList" element={<ProductList />} />
    
              {/* Categories */}
              <Route exact path="/NewCategory" element={<NewCategory />} />
              <Route exact path="/ViewCategory/:categoryId" element={<ViewCategory />} />
              <Route exact path="/EditCategory/:categoryId" element={<EditCategory />} />
              <Route exact path="/CategoryList" element={<CategoryList />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/Login" replace />} />
          )}
        </Fragment>
        

      </Routes>
    </Router>
  );
}

export default App;

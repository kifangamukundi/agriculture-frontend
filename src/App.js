import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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

import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  // const admin = useSelector((state) => state.user.currentUser.roles["ROLE_ADMIN"]);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>

              <Route path="/NewProduct">
                <NewProduct />
              </Route>
              <Route path="/ViewProduct/:productId">
                <ViewProduct />
              </Route>
              <Route path="/EditProduct/:productId">
                <EditProduct />
              </Route>
              <Route path="/ProductList">
                <ProductList />
              </Route>

              {/* Categories */}
              <Route path="/NewCategory">
                <NewCategory />
              </Route>
              <Route path="/ViewCategory/:categoryId">
                <ViewCategory />
              </Route>
              <Route path="/EditCategory/:categoryId">
                <EditCategory />
              </Route>
              <Route path="/CategoryList">
                <CategoryList />
              </Route>
              
            </div>
          </>
      </Switch>
    </Router>
  );
}

export default App;

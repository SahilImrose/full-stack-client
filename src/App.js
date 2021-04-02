import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import Header from './components/Header/Header'
import AddProduct from './components/AddProduct/AddProduct'
import Checkout from './components/Checkout/Checkout';
import ManageProduct from './components/ManageProduct/ManageProduct';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Order from './components/Order/Order';
export const UserContext = createContext();
const App = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
            <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Router>
                <Header></Header>
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/home"><Home/></Route>
                    <PrivateRoute path="/orders"><Order></Order></PrivateRoute>
                    <PrivateRoute path="/admin/manageProduct"><ManageProduct/></PrivateRoute>
                    <PrivateRoute path="/admin/addProduct"><AddProduct/></PrivateRoute>
                    <Route path="/login"><Login></Login></Route>
                    <PrivateRoute path='/checkOut/:_id'><Checkout/></PrivateRoute>
                    <Route path="*"><NotFound/></Route>
                </Switch>
            </Router>
            </UserContext.Provider>
    );
};

export default App;
import Product from './pages/Product';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Success from './pages/Success';

// import {
//   BrowserRouter as Router,
//   Switch ,
//   Route,
// } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />{' '}
      {/* If user is logged in, then redirect to home page, else go to login page */}
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />{' '}
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default App;

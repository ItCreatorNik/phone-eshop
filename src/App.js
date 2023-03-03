import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { NotFound } from './components/notFound/NotFound';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Reset } from './pages/auth/Reset';
import { Cart } from './pages/cart/Cart';
import { Home } from './pages/Home/Home';
import { User } from './pages/user/User';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/user" element={<User />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

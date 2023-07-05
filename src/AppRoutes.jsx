import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './user/userPages/Home';

import { globalContext } from './context/globalContext';

import Restaurant from './user/userPages/Restaurant';
import Product from './user/userPages/Product';
import RestaurantDashboard from './admin/adminPages/RestaurantDashboard';
import RestaurantOrders from './admin/adminPages/RestaurantOrders';
import AdminHeader from './admin/adminComponents/AdminHeader';
import AdminFooter from './admin/adminComponents/AdminFooter';
import Header from './user/userComponents/Header';
import Main from './user/userComponents/Main';
import Footer from './user/userComponents/Footer';
import Login from './user/userPages/Login';
import RestaurantMenu from './admin/adminPages/RestaurantMenu';
import RestaurantSettings from './admin/adminPages/RestaurantSettings';
import Page404 from './user/userPages/Page404';
import AccountSettings from './user/userPages/AccountSettings';
import Cart from './user/userPages/Cart';
import Checkout from './user/userPages/Checkout';
import UserOrders from './user/userPages/UserOrders';
import Order from './user/userPages/Order';
import Restaurants from './user/userPages/Restaurants';
import Forgotpassword from './user/userPages/ForgotPassword';
import SignUp from './user/userPages/SignUp';
import PersonalDetails from './user/userComponents/SignUp/PersonalDetails';
import RestaurantPromotions from './admin/adminPages/RestaurantPromotions';
import RestaurantCustomers from './admin/adminPages/RestaurantCustomers';
import UserDetails from './admin/adminComponents/RestaurantCustomers/UserDetails';
import { cartContext, avatarContext } from './context/globalContext';
import { TOKEN_KEY } from './services/apiServices';
import { useCheckToken } from './services/token';
import Deals from './user/userPages/Deals';
import useGeolocation from './hooks/useGeolocation';
import { geolocationContext } from './context/globalContext';
export default function AppRoutes({ isToken }) {
  const [cartLen, setCartLen] = useState(0);
  const [avatarUser, setAvatarUser] = useState(null);
  const { city, setCity } = useGeolocation();
  return (
    <>
      <globalContext.Provider value={{ isToken }}>
        <geolocationContext.Provider value={{ city, setCity }}>
          <cartContext.Provider value={{ cartLen, setCartLen }}>
            <avatarContext.Provider value={{ avatarUser, setAvatarUser }}>
              {/* TODO: pass global values in value obj */}
              <BrowserRouter>
                <div className='wrapper'>
                  <Routes>
                    <Route path='/admin/*' element={<AdminHeader />} />

                    <Route path='/*' element={<Header />} />
                    <Route path='/login/*' element={<div />} />
                    <Route path='/recoverpassword/*' element={<div />} />
                    <Route path='/signup/*' element={<div />} />
                  </Routes>

                  <Main>
                    <Routes>
                      {/* ----------ALL USERS ROUTES------------ */}
                      <Route path='/' element={<Home />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/recoverpassword' element={<Forgotpassword />} />
                      <Route path='/signup/*' element={<SignUp />} />

                      {/* <Route path='/personal' element={<PersonalDetails />} />
                <Route path='/personal' element={<PersonalDetails />} /> */}
                      {isToken && (
                        <>
                          <Route path='/user/account/*' element={<AccountSettings />} />
                          <Route path='/user/cart/*' element={<Cart />} />
                          <Route path='/user/checkout/' element={<Checkout />} />
                          <Route path='/user/orders' element={<UserOrders />} />
                          <Route path='/user/order/:id' element={<Order />} />
                        </>
                      )}
                      <Route path='/deals' element={<Deals />} />
                      <Route path='/restaurant/' element={<Restaurants />} />
                      <Route path='/restaurant/:id' element={<Restaurant />} />
                      <Route path='/restaurant/product/:id' element={<Product />} />

                      {/* ----------ALL ADMIN ROUTES------------ */}
                      <Route path='/admin/restaurant/dashboard' element={<RestaurantDashboard />} />
                      <Route path='/admin/restaurant/orders' element={<RestaurantOrders />} />
                      <Route path='/admin/restaurant/menu' element={<RestaurantMenu />} />
                      <Route path='/admin/restaurant/settings/*' element={<RestaurantSettings />} />
                      <Route path='/admin/restaurant/promotions' element={<RestaurantPromotions />} />
                      <Route path='/admin/restaurant/customers' element={<RestaurantCustomers />} />
                      <Route path='/admin/restaurant/customers/:userId' element={<UserDetails />} />
                      <Route path='/*' element={<Page404 />} />
                    </Routes>
                  </Main>
                  <Routes>
                    <Route path='/*' element={<Footer />} />
                    <Route path='/admin/*' element={<AdminFooter />} />
                    <Route path='/login/*' element={<div />} />
                    <Route path='/recoverpassword/*' element={<div />} />
                    <Route path='/signup/*' element={<div />} />
                  </Routes>
                </div>
              </BrowserRouter>
            </avatarContext.Provider>
          </cartContext.Provider>
        </geolocationContext.Provider>
      </globalContext.Provider>
    </>
  );
}

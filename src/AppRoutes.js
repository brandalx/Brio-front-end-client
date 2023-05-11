import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

export default function AppRoutes() {
  return (
    <>
      <globalContext.Provider value={{}}>
        {/* TODO: pass global values in value obj */}
        <BrowserRouter>
          <div className='wrapper'>
            <Routes>
              <Route path='/admin/*' element={<AdminHeader />} />

              <Route path='/*' element={<Header />} />
              <Route path='/login/*' element={<div />} />
            </Routes>
            <Main>
              <Routes>
                {/* ----------ALL USERS ROUTES------------ */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />

                <Route path='/restaurant' element={<Restaurant />} />
                <Route path='/restaurant/product' element={<Product />} />
                {/* ----------ALL ADMIN ROUTES------------ */}
                <Route path='/admin/' element={<RestaurantDashboard />} />
                <Route path='/admin/restaurant/orders' element={<RestaurantOrders />} />
                <Route path='/admin/restaurant/orders' element={<RestaurantOrders />} />
                <Route path='/admin/restaurant/menu' element={<RestaurantMenu />} />
                <Route path='/admin/restaurant/settings/*' element={<RestaurantSettings />} />
                <Route path='/*' element={<Page404 />} />
              </Routes>
            </Main>
            <Routes>
              <Route path='/*' element={<Footer />} />
              <Route path='/admin/*' element={<AdminFooter />} />
              <Route path='/login/*' element={<div />} />
            </Routes>
          </div>
        </BrowserRouter>
      </globalContext.Provider>
    </>
  );
}

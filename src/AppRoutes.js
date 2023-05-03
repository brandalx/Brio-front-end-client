import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import Footer from './components/Footer';
import Main from './components/Main';
import Header from './components/Header';
import { globalContext } from './context/globalContext';
import Navbar from './components/Navbar';
import Restaurant from './pages/Restaurant';
import Product from './pages/Product';

export default function AppRoutes() {
  return (
    <>
      <globalContext.Provider value={{}}>
        {/* TODO: pass global values in value obj */}
        <BrowserRouter>
          <div className='wrapper'>
            <Header>
              {' '}
              <Navbar />{' '}
            </Header>

            <Main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/restaurant' element={<Restaurant />} />
                <Route path='/restaurant/product' element={<Product />} />
                <Route path='/*' element={<Page404 />} />
              </Routes>
            </Main>

            <Footer />
          </div>
        </BrowserRouter>
      </globalContext.Provider>
    </>
  );
}

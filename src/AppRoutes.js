import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import Footer from './components/Footer';
import Main from './components/Main';
import Header from './components/Header';

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <div className='wrapper'>
          <Header />

          <Main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/*' element={<Page404 />} />
            </Routes>
          </Main>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

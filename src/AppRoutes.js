import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Page404 from './pages/Page404';

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

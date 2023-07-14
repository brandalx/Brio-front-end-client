import React, { useEffect, useState } from 'react';
import RestaurantOrdersList from '../adminComponents/RestaurantOrders/RestaurantOrdersList';
import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../services/apiServices';
import jwtDecode from 'jwt-decode';
export default function RestaurantOrders() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate, token]);

  return <RestaurantOrdersList />;
}

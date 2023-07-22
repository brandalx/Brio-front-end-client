import React, { useEffect, useState } from 'react';
import RestaurantCustomersList from '../adminComponents/RestaurantCustomers/RestaurantCustomersList';
import { useNavigate } from 'react-router-dom';
import { useCheckToken } from '../../services/token';
import { TOKEN_KEY } from '../../services/apiServices';
import jwtDecode from 'jwt-decode';
export default function RestaurantCustomers() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate, token]);

  return <RestaurantCustomersList />;
}

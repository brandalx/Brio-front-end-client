import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../services/apiServices';
import jwtDecode from 'jwt-decode';

export default function AdminFooter() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (e) {
      console.log(e);
    }

    if (decodedToken && decodedToken.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate, token]);

  return <footer className='page-header'></footer>;
}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../services/apiServices';
import jwtDecode from 'jwt-decode';
import { Box } from '@chakra-ui/react';

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

  return (
    <footer>
      <Box
        bg={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.white')}
        className='page-header'
      ></Box>
    </footer>
  );
}

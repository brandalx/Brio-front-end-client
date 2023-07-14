import React, { useEffect, useState } from 'react';
import PromotionsHeader from '../adminComponents/RestaurantPromotions/PromotionsHeader';
import PromotionBlocks from '../adminComponents/RestaurantPromotions/PromotionBlocks';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCheckToken } from '../../services/token';
import { TOKEN_KEY } from '../../services/apiServices';
import jwtDecode from 'jwt-decode';

export default function RestaurantPromotions() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // New state variable
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    } else {
      setIsAdmin(true); // Only set to true if user is admin
    }
  }, [navigate, token]);

  // Don't render rest of the component until we've confirmed the user's role
  if (isAdmin === null) {
    return null;
  }

  return (
    <Box>
      <PromotionsHeader active={active} setActive={setActive} />
      <PromotionBlocks active={active} />
    </Box>
  );
}

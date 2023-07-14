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
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);
  const [active, setActive] = useState('Active');

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <Box>
      <PromotionsHeader active={active} setActive={setActive} />
      <PromotionBlocks active={active} />
    </Box>
  );
}

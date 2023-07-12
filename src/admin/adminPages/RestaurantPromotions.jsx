import React, { useState } from 'react';
import PromotionsHeader from '../adminComponents/RestaurantPromotions/PromotionsHeader';
import PromotionBlocks from '../adminComponents/RestaurantPromotions/PromotionBlocks';
import { Box } from '@chakra-ui/react';

export default function RestaurantPromotions() {
  const [active, setActive] = useState('Active');

  return (
    <Box>
      <PromotionsHeader active={active} setActive={setActive} />
      <PromotionBlocks active={active} />
    </Box>
  );
}

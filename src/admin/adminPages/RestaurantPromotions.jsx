import React from 'react';
import PromotionsHeader from "../adminComponents/RestaurantPromotions/PromotionsHeader";
import PromotionBlocks from "../adminComponents/RestaurantPromotions/PromotionBlocks";
import {Box} from "@chakra-ui/react";
export default function RestaurantPromotions() {
    return (
     <Box>
         <PromotionsHeader />
         <PromotionBlocks/>
     </Box>
    )
}

import { Avatar } from '@chakra-ui/avatar';

import { Box, Text } from '@chakra-ui/layout';
import React from 'react';

export default function MealCard({ image, title, amount, price }) {
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center' mt={4}>
      <Box display='flex' alignItems='center'>
        <Box>
          <Avatar py='2px' borderRadius='xl' size='md' me={2} name='Prosper Otemuyiwa' src={image} />{' '}
        </Box>{' '}
        <Box display='flex' flexDir='column'>
          <Text fontSize='2xs' fontWeight='bold' color='neutral.black'>
            {title}
          </Text>
          <Text fontSize='3xs' color='neutral.grayDark'>
            {amount} orders
          </Text>
        </Box>
      </Box>
      <Text fontWeight='bold' fontSize='2xs' color='primary.default'>
        ${price}
      </Text>
    </Box>
  );
}

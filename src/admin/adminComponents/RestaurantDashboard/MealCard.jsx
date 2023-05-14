import { Avatar } from '@chakra-ui/avatar';

import { Box, Text } from '@chakra-ui/layout';
import React from 'react';

export default function MealCard() {
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center' mt={4}>
      <Box display='flex' alignItems='center'>
        <Box>
          <Avatar
            py='2px'
            borderRadius='xl'
            size='md'
            me={2}
            name='Prosper Otemuyiwa'
            src='https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg'
          />{' '}
        </Box>{' '}
        <Box display='flex' flexDir='column'>
          <Text fontSize='2xs' fontWeight='bold' color='neutral.black'>
            Nigiri set
          </Text>
          <Text fontSize='3xs' color='neutral.grayDark'>
            362 Orders
          </Text>
        </Box>
      </Box>
      <Text fontWeight='bold' fontSize='2xs' color='primary.default'>
        $16.80
      </Text>
    </Box>
  );
}

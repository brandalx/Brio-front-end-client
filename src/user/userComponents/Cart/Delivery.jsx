import { Box, Text, Button } from '@chakra-ui/react';
import React from 'react';

import AdressCard from '../AccountSettingsPage/AdressCard';
export default function Delivery({ item }) {
  return (
    <Box py={4}>
      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
        Select your shipping adress
      </Text>
      <Box>
        {item &&
          item.map((item, index) => {
            return <AdressCard key={index} item={item} index={index} />;
          })}
      </Box>
      <Button
        w='100%'
        background='primary.light'
        fontSize='2xs'
        fontWeight='bold'
        variant='solid'
        color='primary.default'
        borderWidth='1px'
        borderColor='primary.light'
        _hover={{
          background: 'primary.default',
          color: 'neutral.white',
          borderWidth: '1px',
          borderColor: 'primary.default'
        }}
        py={5}
      >
        Add new shipping address
      </Button>
    </Box>
  );
}

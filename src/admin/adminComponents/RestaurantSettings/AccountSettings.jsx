import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function AccountSettings() {
  return (
    <Box>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Account
      </Text>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Restaurant information
        </Text>
        <Box>Avatar here</Box>
        <Box>Restaurant input here</Box>
        <Box>Notifications here</Box>
        <Box>Buttons log out etc here</Box>
      </Box>
    </Box>
  );
}

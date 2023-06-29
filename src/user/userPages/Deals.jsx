import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
import DealsBlocks from '../userComponents/Deals/DealsBlocks';
export default function Deals() {
  return (
    <Container maxW='1110px'>
      <Box py='25px'>
        <Text ms={4} fontWeight='semibold' color='neutral.black' fontSize='sm'>
          All deals
        </Text>
        <Box py={15}>
          <DealsBlocks />
        </Box>
      </Box>
    </Container>
  );
}

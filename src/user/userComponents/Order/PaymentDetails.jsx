import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function PaymentDetails() {
  return (
    <Box>
      <Text fontSize='xs' fontWeight='bold' color='neutral.black'></Text>
      <Box>Card will be here</Box>
      <Box>
        <Flex my={4} justifyContent='space-between'>
          <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
            Subtotal
          </Text>
          <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
            $
          </Text>
        </Flex>
        <Flex my={4} justifyContent='space-between'>
          <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
            Shipping
          </Text>
          <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
            $
          </Text>
        </Flex>
        <Flex my={4} justifyContent='space-between'>
          <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
            Total (tax incl.)
          </Text>
          <Text fontWeight='bold' fontSize='2xs' color='primary.default'>
            $
          </Text>
        </Flex>
        <Link to='/user/checkout'>
          <Button
            w='100%'
            background='primary.default'
            fontSize='2xs'
            fontWeight='bold'
            variant='solid'
            color='neutral.white'
            borderWidth='1px'
            borderColor='primary.default'
            _hover={{
              background: 'neutral.white',
              color: 'primary.default',
              borderWidth: '1px',
              borderColor: 'primary.default'
            }}
            py={5}
          >
            Proceed to checkout
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

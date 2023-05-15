import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function Summary() {
  return (
    <>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Payment summary
        </Text>

        <Box>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Subtotal
            </Text>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
              $129.40
            </Text>
          </Flex>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Shipping
            </Text>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
              $20.00
            </Text>
          </Flex>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Total (tax incl.)
            </Text>
            <Text fontWeight='bold' fontSize='2xs' color='primary.default'>
              $149.40
            </Text>
          </Flex>
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
        </Box>
      </Box>
    </>
  );
}

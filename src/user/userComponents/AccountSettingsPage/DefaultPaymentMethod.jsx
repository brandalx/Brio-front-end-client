import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

export default function DefaultPaymentMethod() {
  return (
    <>
      <Box
        _hover={{
          cursor: 'pointer',
          transition: 'all 0.3s',
          bg: 'primary.light',
          borderColor: 'primary.light'
        }}
        _active={{
          cursor: 'pointer',
          transition: 'all 0.3s',
          bg: 'primary.light',
          borderColor: 'primary.default'
        }}
        borderRadius='16px'
        mb='12px'
        p='30px'
        transition='all 0.3s'
        borderWidth='1px'
        bg='neutral.white'
      >
        <Flex justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box>
              <Heading color='primary.default' fontSize='2xs' fontWeight='bold'>
                Default - Cash
              </Heading>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

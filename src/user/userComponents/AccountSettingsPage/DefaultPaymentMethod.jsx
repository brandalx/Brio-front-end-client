import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';

export default function DefaultPaymentMethod({ cash, selectCard, defaultmethod }) {
  return (
    <>
      <Box zIndex='0' data-aos='fade-up' h='100%'>
        <Box
          h='100%'
          onClick={() => {
            selectCard('cash');
          }}
          _hover={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: 'primary.light',
            borderColor: defaultmethod ? 'primary.default' : 'primary.light'
          }}
          _active={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: 'primary.light',
            borderColor: 'primary.default'
          }}
          borderColor={defaultmethod ? 'primary.default' : 'BlackAlpha 200'}
          borderRadius='16px'
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
            <Box>
              <Image maxH='45px' w='auto' src={cash} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

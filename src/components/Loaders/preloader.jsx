import { PropagateLoader } from 'react-spinners';
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Logo from '../../assets/svg/Logo';
export default function Preloader({ loading, colorss = 'white' }) {
  if (!loading) return null;

  return (
    <div
      style={{
        background: colorss,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box>
          <Box>
            <Flex alignItems='center' justifyContent='center'>
              {' '}
              <Logo />
              <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2px'>
                Brio
              </Text>
            </Flex>
            <Text fontSize='1xs' mb={2} fontWeight='extrabold' color='primary.default'>
              Bringing food really on-time ✨
            </Text>
          </Box>{' '}
        </Box>
        <PropagateLoader color='#4E60FF' />
      </div>
    </div>
  );
}

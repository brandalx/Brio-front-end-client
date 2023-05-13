import React from 'react';
import { Box, Button, Flex, Text, VisuallyHidden, chakra } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';

export default function Page404() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='90vh'>
      <Box
        textAlign='center'
        w='50%' // set width to 50%
      >
        <Box>
          <Box>
            <Flex alignItems='center' justifyContent='center'>
              {' '}
              <Logo />
              <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='1'>
                Brio
              </Text>
            </Flex>
          </Box>{' '}
        </Box>

        <Text fontSize='2xl' fontWeight='extrabold' color='primary.default'>
          404
        </Text>
        <Text fontSize='sm' fontWeight='BOLD' color='neutral.grayDark'>
          Sorry! This Page is not created yet...
        </Text>
        <Link to='/'>
          <Button
            mt={5}
            px={5}
            borderRadius={100}
            background='primary.default'
            fontWeight='bold'
            variant='solid'
            color='neutral.white'
            borderWidth='1px'
            borderColor='neutral.white'
            _hover={{
              background: 'neutral.white',
              color: 'primary.default',
              borderWidth: '1px',
              borderColor: 'primary.default'
            }}
            py={5}
          >
            Back to home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

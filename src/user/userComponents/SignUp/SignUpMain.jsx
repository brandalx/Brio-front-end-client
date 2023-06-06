import { Box, Button, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import SignUpOptionsArr from './SignUpOptions';
import { Link } from 'react-router-dom';

export default function SignUpMain() {
  const [option, setOption] = useState();
  return (
    <Box>
      <Box>
        <Box>
          <Text fontSize='2xl' fontWeight='bold' color='neutral.black'>
            Sign Up
          </Text>
          <Text fontSize='2xs' color='neutral.grayDark'>
            Register to create your restaurant or personal account.
          </Text>
        </Box>
        <Box mt='40px'>
          <Stack spacing={4}>
            <Box>
              <SignUpOptionsArr setOption={setOption} option={option} />
            </Box>
            <Stack spacing={10}>
              <Link to={option}>
                <Button
                  isDisabled={!option ? true : false}
                  w='100%'
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
                  Continue
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

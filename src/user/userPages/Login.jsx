import {
  Box,
  Center,
  Container,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Checkbox,
  Button,
  Flex,
  chakra,
  VisuallyHidden,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/logo';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Login() {
  return (
    <>
      <header>
        <Container maxW='1110px'>
          <Box px={{ base: 2, sm: 4 }} py={6}>
            <Flex alignItems='center'>
              <chakra.a href='/' title='Homepage' display='flex' alignItems='center'>
                <Link to='/'>
                  {' '}
                  <Logo />
                </Link>
                <VisuallyHidden>Brio</VisuallyHidden>
              </chakra.a>
              <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                <Link to='/'> Brio</Link>
              </Text>
            </Flex>
          </Box>
        </Container>
      </header>
      <Box h='100vh'>
        <Center h='100%'>
          <Container maxW='1110px'>
            <Box>
              <Box>
                <Text fontSize='2xl' fontWeight='bold' color='neutral.black'>
                  Login
                </Text>
                <Text fontSize='2xs' color='neutral.grayDark'>
                  Sign in with your data that you entered during your registration.
                </Text>
              </Box>
              <Box>
                <Stack spacing={4}>
                  <FormControl id='email'>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' />
                  </FormControl>
                  <FormControl id='password'>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' placeholder='name@example.com' />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                      <Checkbox>Kepp me logged in</Checkbox>
                    </Stack>
                    <Button background='primary.default'>Login</Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Center>
      </Box>
    </>
  );
}

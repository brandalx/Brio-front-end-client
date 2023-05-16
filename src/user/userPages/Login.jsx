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
  InputRightElement,
  Grid,
  GridItem
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/logo';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Login() {
  return (
    <>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={0}>
        <Container maxW='550px'>
          <GridItem w='100%' h='100vh'>
            <Flex h='100%' w='100' justifyContent='center'>
              <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
                <Box py={6}>
                  <Flex>
                    <Box title='Homepage' display='flex' alignItems='center'>
                      <Link to='/'>
                        {' '}
                        <Logo />
                      </Link>
                      <VisuallyHidden>Brio</VisuallyHidden>
                    </Box>
                    <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                      <Link to='/'> Brio</Link>
                    </Text>
                  </Flex>
                </Box>

                <Box>
                  <Box>
                    <Text fontSize='2xl' fontWeight='bold' color='neutral.black'>
                      Login
                    </Text>
                    <Text fontSize='2xs' color='neutral.grayDark'>
                      Sign in with your data that you entered during your registration.
                    </Text>
                  </Box>
                  <Box mt='40px'>
                    <Stack spacing={4}>
                      <FormControl id='email'>
                        <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                          Email
                        </FormLabel>

                        <Input
                          type='email'
                          background='neutral.white'
                          _placeholder={{ color: 'neutral.gray' }}
                          borderRadius='8px'
                          fontSize='2xs'
                          placeholder='name@example.com'
                        />
                      </FormControl>
                      <FormControl id='password'>
                        <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                          Password
                        </FormLabel>

                        <Input
                          type='password'
                          background='neutral.white'
                          _placeholder={{ color: 'neutral.gray' }}
                          borderRadius='8px'
                          fontSize='2xs'
                          placeholder='min. 8 characters'
                        />
                      </FormControl>
                      <Stack spacing={10}>
                        <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                          <Flex alignItems='center'>
                            <Checkbox mr='2'>
                              <Text color='neutral.black' fontSize='2xs'>
                                Keep me logged in
                              </Text>
                            </Checkbox>
                          </Flex>
                        </Stack>
                        <Link to='/'>
                          <Button
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
                            Login
                          </Button>
                        </Link>
                        <Text
                          textAlign='center'
                          fontSize='2xs'
                          fontWeight='bold'
                          as='span'
                          color='primary.default'
                          _hover={{ textDecor: 'underline', cursor: 'pointer' }}
                        >
                          Forgot password
                        </Text>{' '}
                      </Stack>
                    </Stack>
                  </Box>
                </Box>

                <Box textAlign='center' py={6}>
                  <Text>
                    Don’t have an account?{' '}
                    <Link to='/#'>
                      {' '}
                      <Text
                        fontSize='2xs'
                        fontWeight='bold'
                        as='span'
                        color='primary.default'
                        _hover={{ textDecor: 'underline' }}
                      >
                        Sign up
                      </Text>{' '}
                    </Link>
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
        </Container>
        <GridItem
          display={{ base: 'none', md: 'inline-flex' }}
          w='100%'
          bg='linear-gradient(to right, #B2D1FF, #697BFF)'
          h='100vh'
        ></GridItem>
      </Grid>
    </>
  );
}

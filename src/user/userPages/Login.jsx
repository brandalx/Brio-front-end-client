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
  GridItem,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';
import { AiOutlineSearch } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { API_URL, TOKEN_KEY, handleApiMethod } from '../../services/apiServices';

import render1 from '../../assets/images/render7.jpg';

import jwtDecode from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClickShow = () => setShow(!show);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    handleLogin(_bodyData);
  };
  const isValid = () => email.length > 5 && password.length > 5;

  const toast = useToast();
  const handleLogin = async (_bodyData) => {
    try {
      // const url = API_URL + "/videos/"+params["id"];
      const url = API_URL + '/users/login';
      _bodyData.email = _bodyData.email.toLowerCase();
      console.log(_bodyData);
      const data = await handleApiMethod(url, 'POST', _bodyData);
      if (data.token) {
        toast({
          title: 'Successful login.',
          description: 'Welcome to brio!.',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        localStorage.setItem(TOKEN_KEY, data.token);
        const tempDecodedToken = jwtDecode(data.token);
        if (tempDecodedToken.role === 'ADMIN') {
          window.location.href = '/admin/restaurant/dashboard';
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error trying to log in.',
        description: 'Error when trying to log in. Check your data and try again',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };
  return (
    <>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={0}>
        <Container maxW='550px'>
          <GridItem w='100%' h='100vh' data-aos='fade-up'>
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
                    <form onSubmit={handleSubmit(onSubForm)}>
                      <Stack spacing={4}></Stack>
                      <FormControl id='email' isInvalid={errors.email}>
                        <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                          Email
                        </FormLabel>

                        <Input
                          id='email'
                          {...register('email', {
                            required: { value: true, message: 'This field is required' },
                            minLength: { value: 6, message: 'Minimum length should be 6' }
                          })}
                          type='email'
                          background='neutral.white'
                          _placeholder={{ color: 'neutral.gray' }}
                          borderRadius='8px'
                          fontSize='2xs'
                          placeholder='name@example.com'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                          {errors.email && errors.email.message}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl id='password' isInvalid={errors.password}>
                        <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                          Password
                        </FormLabel>
                        <InputGroup>
                          <Input
                            type={show ? 'text' : 'password'}
                            {...register('password', {
                              required: { value: true, message: 'This field is required' },
                              minLength: { value: 6, message: 'Minimum length should be 6' }
                            })}
                            id='password'
                            background='neutral.white'
                            _placeholder={{ color: 'neutral.gray' }}
                            borderRadius='8px'
                            fontSize='2xs'
                            placeholder='min. 8 characters'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {password.length > 0 && (
                            <InputRightElement me={2}>
                              <Button h='1.75rem' size='2xs' onClick={handleClickShow}>
                                {show ? (
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      className='icon icon-tabler icon-tabler-eye'
                                      width={18}
                                      height={18}
                                      viewBox='0 0 24 24'
                                      strokeWidth={2}
                                      stroke='#4E60FF'
                                      fill='none'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                    >
                                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                      <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                                      <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
                                    </svg>
                                  </span>
                                ) : (
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      className='icon icon-tabler icon-tabler-eye-off'
                                      width={18}
                                      height={18}
                                      viewBox='0 0 24 24'
                                      strokeWidth={2}
                                      stroke='#C7C8D2'
                                      fill='none'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                    >
                                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                      <path d='M10.585 10.587a2 2 0 0 0 2.829 2.828' />
                                      <path d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87' />
                                      <path d='M3 3l18 18' />
                                    </svg>
                                  </span>
                                )}
                              </Button>
                            </InputRightElement>
                          )}
                        </InputGroup>

                        <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                          {errors.password && errors.password.message}
                        </FormErrorMessage>
                      </FormControl>
                      <Stack spacing={10}>
                        <Stack
                          mt={2}
                          direction={{ base: 'column', sm: 'row' }}
                          align={'start'}
                          justify={'space-between'}
                        >
                          {/* <Flex alignItems='center'>
                            <Checkbox mr='2'>
                              <Text color='neutral.black' fontSize='2xs'>
                                Keep me logged in
                              </Text>
                            </Checkbox>
                          </Flex> */}
                        </Stack>

                        <Button
                          isDisabled={!isValid()}
                          type='submit'
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

                        <Link to='/recoverpassword'>
                          <Box display='flex' justifyItems='center'>
                            <Text
                              w='100%'
                              mx='auto'
                              textAlign='center'
                              fontSize='2xs'
                              fontWeight='bold'
                              as='span'
                              color='primary.default'
                              _hover={{ textDecor: 'underline', cursor: 'pointer' }}
                            >
                              Forgot password
                            </Text>{' '}
                          </Box>
                        </Link>
                      </Stack>
                    </form>
                  </Box>
                </Box>

                <Box textAlign='center' py={6}>
                  <Text>
                    Don’t have an account?{' '}
                    <Link to='/signup'>
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
                  <Link to='/'>
                    <FormLabel
                      cursor='pointer'
                      textDecor='underline'
                      textAlign='center'
                      fontWeight='semibold'
                      fontSize='3xs'
                      color='neutral.grayDark'
                      mb={0}
                    >
                      Back to home
                    </FormLabel>
                  </Link>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
        </Container>
        <GridItem
          data-aos='fade-left'
          backgroundImage={render1}
          backgroundRepeat='no-repeat'
          backgroundSize='cover'
          backgroundPosition='center'
          display={{ base: 'none', md: 'inline-flex' }}
          w='100%'
          // bg='linear-gradient(to right, #B2D1FF, #697BFF)'
          h='100vh'
        ></GridItem>
      </Grid>
    </>
  );
}

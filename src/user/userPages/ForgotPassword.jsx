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
  Icon,
  useToast,
  FormErrorMessage
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';
import render1 from '../../assets/images/render8.jpg';

import { AiOutlineSearch } from 'react-icons/ai';
import { FaChevronLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import RecoverPassword from '../userComponents/ForgotPassword/RecoverPassword';
import { API_URL, TOKEN_KEY, handleApiMethod } from '../../services/apiServices';
import Code from '../userComponents/ForgotPassword/Code';
import Preloader from '../../components/Loaders/preloader';

export default function ForgotPassword() {
  const [recoverData, setRecoverData] = useState();
  let [codeData, setCodeData] = useState('');
  let [tokenData1, setTokenData1] = useState();
  let [tokenData2, setTokenData2] = useState();
  const toast = useToast();
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const imagesrc =
    'http://cdn.mcauto-images-production.sendgrid.net/27548861a3bba7f7/960bec92-ae6e-4946-99af-34de5bcd508b/4393x3391.png';
  const image = new Image();
  useEffect(() => {
    image.src = imagesrc;
    image.onload = () => {
      setImageLoaded(true);
      setLoading(false);
    };
    return () => {
      image.onload = null;
    };
  }, []);

  // const [state, handleSubmit] = useForm('xpzeyzgq');
  useEffect(() => {
    setRecoverData({
      token: null,
      code: null
    });
  }, []);
  const handleUserSendRecoverRequest = async (_bodyData) => {
    // console.log(_bodyData);
    try {
      const url = API_URL + '/users/recoverrequest';
      const data = await handleApiMethod(url, 'POST', _bodyData);
      if (data.msg === true) {
        setRecoverData({
          token: data.token,
          code: null
        });
        // console.log(data.token);

        navigate('code');
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error when checking your info',
        description: 'Make sure the provided data is correct and try again',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };
  const handleUserSendRecoverCode = async (_bodyData) => {
    // console.log(_bodyData);
    try {
      const url = API_URL + '/users/recoverrequestcheck';
      let finalBody = {
        token: recoverData.token,
        code: _bodyData.code
      };
      const data = await handleApiMethod(url, 'POST', finalBody);
      if (data.msg === true) {
        setRecoverData({
          token: data.token,
          code: codeData
        });

        // console.log(data.token, codeData);
        navigate('recover');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.err && error.response.data.err.expiredAt) {
        toast({
          title: 'Code time expired',
          description: `Please try again.`,
          status: 'warning',
          duration: 9000,
          isClosable: true
        });
        navigate('/recoverpassword');
      } else {
        toast({
          title: 'Code you provided is incorrect',
          description: 'Make sure the provided code is correct and try again',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  const handleUserSendRecoverChange = async (_bodyData) => {
    try {
      let finalBody = {
        token: recoverData.token,
        code: recoverData.code,
        password: _bodyData.password,
        confirmpassword: _bodyData.confirmpassword
      };
      const url = API_URL + '/users/recoverrequestdata';
      const data = await handleApiMethod(url, 'POST', finalBody);
      if (data.token) {
        toast({
          title: 'Password recovered.',
          description: "We've recovered your password.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });

        localStorage.setItem(TOKEN_KEY, data.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.err && error.response.data.err.expiredAt) {
        toast({
          title: 'Code time expired',
          description: `Please try again.`,
          status: 'warning',
          duration: 9000,
          isClosable: true
        });
        navigate('/recoverpassword');
      } else {
        toast({
          title: 'Error when recovering your password',
          description: 'Please try again',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
        navigate('/recoverpassword');
      }
    }
  };

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    if (isSubmitting) {
      // console.log('isSubmitting');
    }
    if (!isSubmitting) {
      // console.log('isNOTSubmitting');
    }
  }, [isSubmitting]);
  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    handleUserSendRecoverRequest(_bodyData);
  };

  //   <Route
  //   path='/personal'
  //   element={<PersonalDetails setMainBody={setMainBody} mainBody={mainBody} type={option2} />}
  // />

  return (
    <>
      {isLoading ? (
        <Preloader colorss={localStorage.getItem('colormode') === 'dark' ? '#2B2B43' : 'white'} loading={isLoading} />
      ) : (
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
                  <Routes>
                    <Route
                      path='/'
                      element={
                        <Box data-aos='fade-up'>
                          <Box pb={10} w='100%' display='flex' justifyItems='flex-startx'>
                            <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
                              <Flex alignItems='center'>
                                <Icon
                                  color={() =>
                                    localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black'
                                  }
                                  as={FaChevronLeft}
                                  mr={1}
                                  boxSize={4}
                                />
                                <Text color='neutral.black' fontSize='xs'>
                                  <Link to='/login'> Back to login</Link>
                                </Text>
                              </Flex>
                            </Button>
                          </Box>
                          <Box>
                            <Text fontSize='xl' fontWeight='extrabold' color='neutral.black'>
                              Forgot Password
                            </Text>
                            <Text fontSize='2xs' color='neutral.grayDark'>
                              Enter the email associated with your account.
                            </Text>
                          </Box>
                          <Box mt='20px'>
                            <form onSubmit={handleSubmit(onSubForm)}>
                              <Stack spacing={4}>
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
                                    color={() =>
                                      localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black'
                                    }
                                    borderRadius='8px'
                                    fontSize='2xs'
                                    placeholder='name@example.com'
                                  />
                                  <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                                    {errors.email && errors.email.message}
                                  </FormErrorMessage>
                                </FormControl>

                                <Stack spacing={10}>
                                  <Button
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
                                    Continue
                                  </Button>
                                </Stack>
                              </Stack>
                            </form>
                          </Box>
                        </Box>
                      }
                    />
                    <Route
                      path='/recover'
                      element={<RecoverPassword handleUserSendRecoverChange={handleUserSendRecoverChange} />}
                    />
                    <Route
                      path='/code'
                      element={
                        <Code
                          handleUserSendRecoverCode={handleUserSendRecoverCode}
                          codeData={codeData}
                          setCodeData={setCodeData}
                        />
                      }
                    />
                  </Routes>
                  <Box textAlign='center' py={6}>
                    <Text
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                    >
                      Do you have any questions?
                      <Link to='/#'>
                        {' '}
                        <Text
                          fontSize='2xs'
                          fontWeight='bold'
                          as='span'
                          color='primary.default'
                          _hover={{ textDecor: 'underline' }}
                        >
                          FAQ
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
            display={{ base: 'none', md: 'inline-flex' }}
            w='100%'
            backgroundImage={isImageLoaded ? `url(${imagesrc})` : ''}
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundPosition='center'
            data-aos='fade-left'
            // bg='linear-gradient(to right, #B2D1FF, #697BFF)'
            h='100vh'
          ></GridItem>
        </Grid>
      )}
    </>
  );
}

import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Button,
  Flex,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { API_URL, handleApiMethod } from '../../../services/apiServices';

export default function PersonalDetails({ type, setMainBody, mainBody }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [show, setShow] = useState(false);
  const handleClickShow = () => setShow(!show);

  const [show2, setShow2] = useState(false);
  const handleClickShow2 = () => setShow2(!show2);
  const [isUnique, setIsUnique] = useState(true);
  const toast = useToast();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({ mode: 'onChange' });
  const email = watch('email', '');

  const isValid = () =>
    email.length > 5 && password.length > 5 && confirmPassword.length > 5 && password === confirmPassword;
  const handleCheckUnique = async (_emailData) => {
    try {
      const url = API_URL + '/users/checkemail';
      const data = await handleApiMethod(url, 'POST', { email: _emailData });
      if (data.true) {
        setIsUnique(true);
        return true;
      } else if (data.false) {
        setIsUnique(false);
        toast({
          title: 'Such email already exist',
          description: 'Please provide another email address.',
          status: 'warning',
          duration: 3000,
          isClosable: true
        });
        return false;
      }
    } catch (error) {
      setIsUnique(false);
      toast({
        title: 'Such email already exist',
        description: 'Please provide another email address.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return false;
    }
  };

  const onSubForm = async (_bodyData) => {
    const isEmailUnique = await handleCheckUnique(_bodyData.email);
    if (isEmailUnique) {
      setMainBody((prevState) => ({
        ...prevState,
        firstname: _bodyData.firstname,
        lastname: _bodyData.lastname,
        email: _bodyData.email,
        password: _bodyData.password,
        confirmpassword: _bodyData.confirmpassword
      }));
      navigate('/signup/personal/info');
    }
  };

  return (
    <>
      <Flex h='100%' w='100' justifyContent='center' data-aos='fade-left'>
        <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
          <Box></Box>

          <Box>
            <Box>
              <Text fontSize='xl' fontWeight='bold' color='neutral.black'>
                Personal details
              </Text>
              <Text fontSize='2xs' color='neutral.grayDark'>
                Enter your data that you will use for entering.
              </Text>
            </Box>
            <form onSubmit={handleSubmit(onSubForm)}>
              <Box mt='20px'>
                <Stack spacing={4}>
                  <FormControl id='firstname' isInvalid={errors.firstname}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      First name
                    </FormLabel>

                    <Input
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      id='firstname'
                      {...register('firstname', {
                        required: { value: true, message: 'This field is required' },
                        minLength: { value: 2, message: 'Minimum length should be 2' },
                        pattern: {
                          value: /^[A-Za-z]+$/,
                          message: 'This field should only contain alphabetic characters'
                        }
                      })}
                      required
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='John'
                    />
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {errors.firstname && errors.firstname.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='lastname' isInvalid={errors.lastname}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Last name
                    </FormLabel>

                    <Input
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      {...register('lastname', {
                        required: { value: true, message: 'This field is required' },
                        pattern: {
                          value: /^[A-Za-z]+$/,
                          message: 'This field should only contain alphabetic characters'
                        },
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      required
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Doe'
                    />
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {errors.lastname && errors.lastname.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='email' isInvalid={errors.email}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Email
                    </FormLabel>
                    <Input
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      {...register('email', {
                        required: { value: true, message: 'This field is required' },
                        minLength: { value: 6, message: 'Minimum length should be 6' }
                      })}
                      type='email'
                      background={isUnique ? 'neutral.white' : 'error.default'}
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='name@example.com'
                      onBlur={() => {
                        console.log(email);
                        handleCheckUnique(email);
                      }}
                    />

                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {!isUnique
                        ? 'Email is already exist'
                        : errors.email && errors.email.message
                        ? errors.email.message
                        : ''}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='password' isInvalid={errors.password}>
                    <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                      Password
                    </FormLabel>

                    <InputGroup>
                      <Input
                        color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                        id='password'
                        {...register('password', {
                          required: { value: true, message: 'This field is required' },
                          minLength: { value: 2, message: 'Minimum length should be 2' }
                        })}
                        type={show ? 'text' : 'password'}
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
                  <FormControl id='confirmpassword' isInvalid={errors.confirmpassword}>
                    <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                      Confirm Password
                    </FormLabel>

                    <InputGroup>
                      <Input
                        color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                        type={show2 ? 'text' : 'password'}
                        id='confirmpassword'
                        {...register('confirmpassword', {
                          required: { value: true, message: 'This field is required' },
                          minLength: { value: 2, message: 'Minimum length should be 2' }
                        })}
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='min. 8 characters'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />

                      {confirmPassword.length > 0 && (
                        <InputRightElement me={2}>
                          <Button h='1.75rem' size='2xs' onClick={handleClickShow2}>
                            {show2 ? (
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
                      {errors.confirmpassword && errors.confirmpassword.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10}>
                    <Box>
                      <Button
                        type='submit'
                        isDisabled={!isValid()}
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

                      <Link to='/signup'>
                        <Button
                          w='100%'
                          fontWeight='bold'
                          color='neutral.gray'
                          _hover={{
                            color: 'primary.default'
                          }}
                          py={5}
                        >
                          Back
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </form>
          </Box>

          <Box></Box>
        </Flex>
      </Flex>
    </>
  );
}

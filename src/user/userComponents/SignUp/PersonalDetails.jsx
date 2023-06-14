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
  FormErrorMessage
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/svg/Logo';
import { AiOutlineSearch } from 'react-icons/ai';
import AdditionalInfo from './AdditionalInfo';
import { useForm } from 'react-hook-form';
export default function PersonalDetails({ type, setMainBody, mainBody }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const isValid = () =>
    email.length > 5 && password.length > 5 && confirmPassword.length > 5 && password === confirmPassword;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    setMainBody((prevState) => ({
      ...prevState,
      firstname: _bodyData.firstname,
      lastname: _bodyData.lastname,
      email: _bodyData.email,
      password: _bodyData.password,
      confirmpassword: _bodyData.confirmpassword
    }));
    navigate('/signup/personal/info');
  };
  return (
    <>
      <Flex h='100%' w='100' justifyContent='center'>
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
                      id='firstname'
                      {...register('firstname', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      required
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='John'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.firstname && errors.firstname.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='lastname' isInvalid={errors.lastname}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Last name
                    </FormLabel>

                    <Input
                      {...register('lastname', {
                        required: true,
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
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.lastname && errors.lastname.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='email' isInvalid={errors.email}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Email
                    </FormLabel>

                    <Input
                      {...register('email', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
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
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='password' isInvalid={errors.password}>
                    <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                      Password
                    </FormLabel>

                    <Input
                      id='password'
                      {...register('password', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='password'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='min. 8 characters'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl id='confirmpassword' isInvalid={errors.confirmpassword}>
                    <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                      Confirm Password
                    </FormLabel>

                    <Input
                      id='confirmpassword'
                      {...register('confirmpassword', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='password'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='min. 8 characters'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
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

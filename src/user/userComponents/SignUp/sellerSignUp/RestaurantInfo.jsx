import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Checkbox,
  Button,
  Flex,
  FormErrorMessage
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function RestaurantInfo({ mainBody, setMainBody }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (_bodyData) => {
    setMainBody((prevState) => ({
      ...prevState,
      title: _bodyData.title,
      address: _bodyData.address,
      location: _bodyData.location,
      email: _bodyData.email,
      description: _bodyData.description,
      company: _bodyData.company
    }));
    navigate('/signup/restaurant/info/confirmation');
  };
  return (
    <>
      <Flex h='100%' w='100' justifyContent='center'>
        <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
          <Box></Box>
          <form onSubmit={handleSubmit(onSubForm)}>
            <Box>
              <Box>
                <Text fontSize='xl' fontWeight='bold' color='neutral.black'>
                  Restaurant info
                </Text>
                <Text fontSize='2xs' color='neutral.grayDark'>
                  Enter your additional information
                </Text>
              </Box>
              <Box mt='20px'>
                <Stack spacing={4}>
                  <FormControl id='title' isInvalid={errors.title}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Title
                    </FormLabel>
                    <Input
                      id='title'
                      {...register('title', {})}
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Title'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.title && errors.title.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='address' isInvalid={errors.address}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Address
                    </FormLabel>
                    <Input
                      id='address'
                      {...register('address', {
                        required: 'Address is required',
                        minLength: { value: 5, message: 'Minimum length should be 5' }
                      })}
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Address'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.address && errors.address.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='location' isInvalid={errors.location}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Location
                    </FormLabel>
                    <Input
                      id='location'
                      {...register('location', {
                        required: 'Location is required',
                        minLength: { value: 5, message: 'Minimum length should be 5' }
                      })}
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Location'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.location && errors.location.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl id='company' isInvalid={errors.company}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Company
                    </FormLabel>
                    <Input
                      id='company'
                      {...register('company', {})}
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Company'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.company && errors.company.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl id='email' isInvalid={errors.email}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Email
                    </FormLabel>
                    <Input
                      id='email'
                      type='email'
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                      })}
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Email'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl id='description' isInvalid={errors.description}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Description
                    </FormLabel>
                    <Input
                      id='description'
                      {...register('description', {
                        required: 'Description is required',
                        minLength: { value: 10, message: 'Minimum length should be 10' }
                      })}
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Description'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.description && errors.description.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Stack spacing={10}>
                    <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                      <Flex alignItems='center'>
                        <Checkbox mr='2'>
                          <Text color='neutral.black' fontSize='2xs'>
                            Turn on 2 factor authentication
                          </Text>
                        </Checkbox>
                      </Flex>
                    </Stack>
                    <Box>
                      <Button
                        type='submit'
                        isDisabled={false}
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

                      <Button
                        onClick={handleGoBack}
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
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </form>
          <Box textAlign='center'></Box>
        </Flex>
      </Flex>
    </>
  );
}

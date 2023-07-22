import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Skeleton,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';

import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Security() {
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const password = useRef({});

  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setArr(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues
  } = useForm();

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    handlePostUser(_bodyData);
  };

  const toast = useToast();
  const handlePostUser = async (_bodyData) => {
    try {
      const url = API_URL + '/users/security';
      const data = await handleApiMethod(url, 'PUT', _bodyData);
      console.log(data);
      if (data.modifiedCount) {
        toast({
          title: 'User data successfully updated.',
          description: 'We have updated your info.',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error when updating your info',
        description: `Error when updating your info. ${error.response.data.err}. Please, try again`,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Box data-aos='fade-up'>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Security
        </Text>
        <form onSubmit={handleSubmit(onSubForm)}>
          <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
            {/* <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
        
              Phone number
            </Text>
            <Box pt={5}>
              <Flex justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} alignItems='flex-end'>
                <Box w={{ base: '100%', md: 'initial' }}>
                  <FormControl id='number'>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Phone number
                    </FormLabel>

                    <Skeleton borderRadius='16px' isLoaded={!loading}>
                      <Input
                        type='phone'
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='3xs'
                        defaultValue={!loading && arr.phone}
                        placeholder='+123456789'
                      />
                    </Skeleton>
                  </FormControl>
                </Box>

                <Button
                  mt={{ base: '10px', md: '0px' }}
                  w={{ base: '100%', md: 'initial' }}
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
                  Turn on
                </Button> 
              </Flex>
            </Box>
 */}

            {/* <Box pt={10}> */}
            <Box>
              <Text mb='16px' fontSize='xs' fontWeight='bold' color='neutral.black'>
                Change password
              </Text>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={6}>
                <GridItem w='100%'>
                  <FormControl id='previouspassword'>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Current password
                    </FormLabel>
                    <Input
                      isInvalid={errors.previouspassword}
                      {...register('previouspassword', {
                        required: { value: true, message: 'This field is required' },
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='password'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Enter current password'
                    />{' '}
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {errors.previouspassword && errors.previouspassword.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem w='100%'>
                  <FormControl id='password'>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      New password
                    </FormLabel>

                    <Input
                      isInvalid={errors.password}
                      {...register('password', {
                        required: { value: true, message: 'This field is required' },
                        minLength: { value: 8, message: 'Password must have at least 8 characters' }
                      })}
                      type='password'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.ray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Enter new password'
                    />
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem w='100%'>
                  <FormControl id='confirmpassword'>
                    <FormLabel
                      fontWeight='semibold'
                      placeholder='+1(217) 555-0113'
                      fontSize='3xs'
                      color='neutral.grayDark'
                    >
                      Confirm new password
                    </FormLabel>

                    <Input
                      isInvalid={errors.confirmpassword}
                      {...register('confirmpassword', {
                        required: { value: true, message: 'This field is required' },
                        minLength: { value: 2, message: 'Minimum length should be 2' },
                        validate: (value) => value === getValues('password') || 'The passwords do not match'
                      })}
                      type='password'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Confirm new password'
                    />
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {errors.confirmpassword && errors.confirmpassword.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>
            <Box pt={5} display='flex' justifyContent='flex-end'>
              <Button
                type='submit'
                w={{ base: '100%', md: 'initial' }}
                background='neutral.white'
                fontSize='2xs'
                fontWeight='bold'
                variant='solid'
                color='primary.default'
                borderWidth='1px'
                borderColor='primary.default'
                _hover={{
                  background: 'primary.default',
                  color: 'neutral.white',
                  borderWidth: '1px',
                  borderColor: 'primary.default'
                }}
                py={5}
                me='20px'
              >
                Change data
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}

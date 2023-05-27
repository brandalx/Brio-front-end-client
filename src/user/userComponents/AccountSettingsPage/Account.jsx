import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Divider,
  Skeleton,
  Avatar,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';
import { useForm } from 'react-hook-form';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [arr, setAr] = useState([]);

  const handleUserData = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';
    try {
      const data = await handleApiGet(url);
      setAr(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    handleUserDataPut(_bodyData);
  };
  const toast = useToast();
  const handleUserDataPut = async (_bodyData) => {
    try {
      // const url = API_URL + "/videos/"+params["id"];
      const url = API_URL + '/users/6464085ed67f7b944b642799/putuserdata';
      const data = await handleApiMethod(url, 'PUT', _bodyData);
      if (data.acknowledged === true) {
        toast({
          title: 'Account info updated.',
          description: "We've updated your account info.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        handleUserData();
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data && error.response.data.err && error.response.data.err.code === 11000) {
        toast({
          title: 'Such email already exists',
          description: `Error when updating your account info. The email you provided already exists in the system.`,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when updating your info',
          description: 'Error when updating your account info.',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <Box>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Account
      </Text>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Personal information
        </Text>
        <Box pt={5}>
          <Skeleton borderRadius='16px' isLoaded={!loading} minHeight='20px' my={2} w='50%'>
            <Text fontSize='md' fontWeight='black' color='neutral.darkGray'>
              {!loading && `${arr.firstname} ${arr.lastname}`}
            </Text>
          </Skeleton>
          <Flex alignItems='center'>
            <Skeleton borderRadius='16px' isLoaded={!loading} me={4}>
              <Box borderWidth='2px' borderColor='primary.default' me='20px' borderRadius='12px'>
                <Avatar
                  borderRadius='10px'
                  boxSize='80px'
                  objectFit='cover'
                  src={arr.avatar || ''}
                  name={`${arr.firstname} ${arr.lastname}`}
                />
              </Box>
            </Skeleton>
            <Button
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
              Change
            </Button>
            <Button
              borderColor='neutral.white'
              borderWidth='1px'
              _hover={{
                background: 'error.default',
                color: 'neutral.white',
                borderWidth: '1px',
                borderColor: 'error.default'
              }}
              fontSize='2xs'
              color='neutral.gray'
              fontWeight='bold'
              variant='ghost'
              py={5}
              me='20px'
            >
              Remove
            </Button>
          </Flex>
        </Box>

        <form onSubmit={handleSubmit(onSubForm)}>
          <Box pt={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr ' }} gap={6}>
              <GridItem w='100%'>
                <FormControl id='firstname' isInvalid={errors.firstname}>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    First name
                  </FormLabel>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Input
                      id='firstname'
                      {...register('firstname', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      // defaultValue={!loading && arr.firstname}
                      placeholder='First name'
                    />{' '}
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.firstname && errors.firstname.message}
                    </FormErrorMessage>
                  </Skeleton>
                </FormControl>
              </GridItem>

              <GridItem w='100%'>
                <FormControl id='lastname' isInvalid={errors.lastname}>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Last name
                  </FormLabel>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Input
                      id='lastname'
                      {...register('lastname', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      // defaultValue={!loading && arr.lastname}
                      placeholder='Last name'
                    />{' '}
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.lastname && errors.lastname.message}
                    </FormErrorMessage>
                  </Skeleton>
                </FormControl>
              </GridItem>

              <GridItem w='100%'>
                <FormControl id='email' isInvalid={errors.email}>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Email
                  </FormLabel>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Input
                      id='email'
                      {...register('email', {
                        required: true,

                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Enter valid email' },

                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='email'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      // defaultValue={!loading && arr.email}
                      placeholder='example@gmail.com'
                    />{' '}
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </Skeleton>
                </FormControl>
              </GridItem>

              <GridItem w='100%'>
                <FormControl id='phone' isInvalid={errors.phone}>
                  <FormLabel
                    fontWeight='semibold'
                    placeholder='+1(217) 555-0113'
                    fontSize='3xs'
                    color='neutral.grayDark'
                  >
                    Phone number
                  </FormLabel>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Input
                      id='phone'
                      {...register('phone', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='phone'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      // defaultValue={!loading && arr.phone}
                      placeholder='+123456789'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.phone && errors.phone.message}
                    </FormErrorMessage>
                  </Skeleton>
                </FormControl>
              </GridItem>
            </Grid>
          </Box>

          <Box pt={5}>
            <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
              Email notifications
            </Text>
            <Grid mt={4} templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={{ base: 4, md: 6 }}>
              <GridItem w='100%'>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Flex alignItems='center'>
                    <Checkbox mr='2'>
                      <Text color='neutral.black' fontSize='2xs'>
                        New deals
                      </Text>
                    </Checkbox>
                  </Flex>
                </Stack>
                <Stack mt={4} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Flex alignItems='center'>
                    <Checkbox iconColor='neutral.white' mr='2'>
                      <Text color='neutral.black' fontSize='2xs'>
                        Password changes
                      </Text>
                    </Checkbox>
                  </Flex>
                </Stack>
              </GridItem>

              <GridItem w='100%'>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Flex alignItems='center'>
                    <Checkbox mr='2'>
                      <Text color='neutral.black' fontSize='2xs'>
                        New restaurants
                      </Text>
                    </Checkbox>
                  </Flex>
                </Stack>
              </GridItem>
              <GridItem w='100%'>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Flex alignItems='center'>
                    <Checkbox mr='2'>
                      <Text color='neutral.black' fontSize='2xs'>
                        Special offers
                      </Text>
                    </Checkbox>
                  </Flex>
                </Stack>
              </GridItem>
              <GridItem w='100%'>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Flex alignItems='center'>
                    <Checkbox mr='2'>
                      <Text color='neutral.black' fontSize='2xs'>
                        Order statuses
                      </Text>
                    </Checkbox>
                  </Flex>
                </Stack>
              </GridItem>
              <GridItem w='100%'>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Flex alignItems='center'>
                    <Checkbox mr='2'>
                      <Text color='neutral.black' fontSize='2xs'>
                        Newsletter
                      </Text>
                    </Checkbox>
                  </Flex>
                </Stack>
              </GridItem>
            </Grid>
          </Box>
          <Divider pt={8} />
          <Box pt={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={6}>
              <GridItem w='100%'>
                <Button
                  w={{ base: '100%', md: 'initial' }}
                  background='neutral.white'
                  fontSize='2xs'
                  fontWeight='bold'
                  variant='solid'
                  color='error.default'
                  borderWidth='1px'
                  borderColor='error.default'
                  _hover={{
                    background: 'error.default',
                    color: 'neutral.white',
                    borderWidth: '1px',
                    borderColor: 'error.default'
                  }}
                  py={5}
                  me='20px'
                >
                  Log out
                </Button>
              </GridItem>

              <GridItem w='100%'>
                <Flex flexDirection={{ base: 'row' }}>
                  <Button
                    w={{ base: '50%', md: 'initial' }}
                    background='neutral.white'
                    fontSize='2xs'
                    fontWeight='bold'
                    variant='solid'
                    color='neutral.gray'
                    borderWidth='1px'
                    borderColor='neutral.gray'
                    _hover={{
                      background: 'error.default',
                      color: 'neutral.white',
                      borderWidth: '1px',
                      borderColor: 'error.default'
                    }}
                    py={5}
                    me='20px'
                  >
                    Discard changes
                  </Button>
                  <Button
                    isLoading={isSubmitting}
                    type='submit'
                    w={{ base: '50%', md: 'initial' }}
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
                    Save changes
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

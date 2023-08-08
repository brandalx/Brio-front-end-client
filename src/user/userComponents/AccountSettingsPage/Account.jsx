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
  useToast,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  ButtonGroup
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { API_URL, TOKEN_KEY, handleApiDelete, handleApiGet, handleApiMethod } from '../../../services/apiServices';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { avatarContext } from '../../../context/globalContext';
import { Popover } from '@chakra-ui/react';
function Greeting() {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour >= 0 && currentHour < 6) {
    greeting = 'Good night';
  } else if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good day';
  } else {
    greeting = 'Good evening';
  }

  return <Text>{greeting}, </Text>;
}
export default function Account() {
  const { avatarUser, setAvatarUser } = useContext(avatarContext);
  const [loading, setLoading] = useState(true);
  const [arr, setAr] = useState([]);
  const [reload, setReload] = useState(0);
  const initRef = useRef();

  const removeAvatar = async () => {
    try {
      const url = API_URL + '/users/user/avatar/remove';
      let data = await handleApiDelete(url);
      if (data.msg) {
        toast({
          title: 'Avatar was removed',
          description: "We've removed your avatar.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        handleUserData();
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error while removing your avatar',
        description: `Probably you avatar does not exist.`,
        status: 'warning',
        duration: 9000,
        isClosable: true
      });
    }
  };

  const handleUserData = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setAr(data);
      // console.log(data);
      setAvatarUser(API_URL + '/' + data.avatar + '?t=' + reload);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    handleUserDataPut(_bodyData);
  };
  const toast = useToast();
  const handleUserDataPut = async (_bodyData) => {
    try {
      // const url = API_URL + "/videos/"+params["id"];
      const url = API_URL + '/users/putuserdata';
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
        clearValues();
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

  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem('location');
    navigate('/login');
    toast({
      title: 'Logged out.',
      description: 'Successfuly logged out!',
      status: 'success',
      duration: 9000,
      isClosable: true
    });
  };

  useEffect(() => {
    handleUserData();
  }, [reload, avatarUser]);

  const clearValues = () => {
    setValue('firstname', '');
    setValue('lastname', '');
    setValue('email', '');
    setValue('phone', '');
  };
  // todo: finish uploda and add refs
  const uploadRef = useRef();

  const onSubUpload = (e) => {
    e.preventDefault();

    handleUploadAvatar();
  };

  const handleClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleUploadAvatar = async () => {
    // console.log(uploadRef.current.files);
    if (uploadRef.current.files[0]) {
      try {
        const fdata = new FormData();

        fdata.append('myFile', uploadRef.current.files[0]);
        const url = API_URL + '/users/user/avatar';

        const resp = await axios({
          method: 'POST',
          url: url,
          data: fdata,
          headers: {
            'x-api-key': localStorage[TOKEN_KEY]
          }
        });
        // console.log(resp.data);
        if (resp.data.excludedPath) {
          toast({
            title: 'Profile image updated.',
            description: 'Profile image successfuly updeted!',
            status: 'success',
            duration: 9000,
            isClosable: true
          });
        }

        setReload(reload + 1);
      } catch (err) {
        console.log(err);
        toast({
          title: 'Error when updating your profile image',
          description: 'Error when updating your profile image. Try upload different file',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };
  return (
    <Box data-aos='fade-up'>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Account
      </Text>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Personal information
        </Text>
        <Box pt={5}>
          <Skeleton borderRadius='16px' isLoaded={!loading} minHeight='20px' my={2} w='50%'>
            <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark' mb={0}>
              <span>{Greeting()}</span>
            </FormLabel>

            <Text
              fontSize='md'
              fontWeight='black'
              color={localStorage.getItem('colormode') === 'dark' ? 'black' : 'neutral.grayDark'}
            >
              {!loading && `${arr.firstname} ${arr.lastname}`}
            </Text>
          </Skeleton>
          <Flex alignItems='center'>
            <Skeleton borderRadius='16px' isLoaded={!loading} me={4}>
              <Box borderRadius='100px' borderWidth='2px' borderColor='primary.default' me='20px'>
                <Avatar
                  borderRadius='100px'
                  boxSize='80px'
                  objectFit='cover'
                  src={avatarUser || ''}
                  name={`${arr.firstname} ${arr.lastname}`}
                />
              </Box>
            </Skeleton>
            <form onSubmit={onSubUpload}>
              <Input ref={uploadRef} type='file' hidden onChange={handleUploadAvatar} />
              <Button
                onClick={handleClick}
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
                {!loading && arr.avatar != '' ? 'Change' : 'Upload'}
              </Button>
            </form>
            {!loading && arr.avatar && arr.avatar != '' && (
              <form>
                <Box>
                  <Popover>
                    {({ isOpen, onClose }) => (
                      <>
                        <PopoverTrigger>
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
                            Remove
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>Are you sure you want to remove your avatar?</PopoverBody>
                          <ButtonGroup size='sm'>
                            <Button
                              w={{ base: '50%', md: 'initial' }}
                              background='error.default'
                              fontWeight='bold'
                              variant='solid'
                              fontSize='2xs'
                              color='neutral.white'
                              borderWidth='1px'
                              borderColor='neutral.white'
                              _hover={{
                                background: 'neutral.white',
                                color: 'primary.default',
                                borderWidth: '1px',
                                borderColor: 'error.default'
                              }}
                              onClick={() => removeAvatar()}
                              py={3}
                            >
                              Yes
                            </Button>
                            <Button
                              ref={initRef}
                              fontSize='2xs'
                              me={2}
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
                              onClick={onClose}
                              py={3}
                            >
                              Cancel
                            </Button>
                          </ButtonGroup>
                        </PopoverContent>
                      </>
                    )}
                  </Popover>
                </Box>
              </form>
            )}
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
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      id='firstname'
                      {...register('firstname', {
                        required: { value: true, message: 'This field is required' },
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
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
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
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      id='lastname'
                      {...register('lastname', {
                        required: { value: true, message: 'This field is required' },

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
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
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
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      id='email'
                      {...register('email', {
                        required: { value: true, message: 'This field is required' },

                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Enter valid email' },

                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='email'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      // defaultValue={!loading && arr.email}
                      placeholder={arr._id && arr.email}
                    />{' '}
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
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
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      id='phone'
                      {...register('phone', {
                        required: { value: true, message: 'This field is required' },

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
                    <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                      {errors.phone && errors.phone.message}
                    </FormErrorMessage>
                  </Skeleton>
                </FormControl>
              </GridItem>
            </Grid>
          </Box>

          {/* <Box pt={5}>
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
          </Box> */}
          <Divider pt={8} />
          <Box pt={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={6}>
              <GridItem w='100%'>
                <Button
                  onClick={() => onLogOut()}
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
                    onClick={() => clearValues()}
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

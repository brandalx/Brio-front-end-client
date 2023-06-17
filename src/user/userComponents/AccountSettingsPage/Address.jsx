import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Skeleton,
  useToast,
  FormErrorMessage
} from '@chakra-ui/react';
import AdressCard from './AdressCard';
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';
import { useForm } from 'react-hook-form';

export default function Adress() {
  const [isEditTrue, setIsEditTrue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [addressArr, setAddressArr] = useState([]);
  const [targetIndex, setTargetIndex] = useState();

  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setArr(data);
      console.log(data);

      const address = data.address.map((item) => ({
        country: item.country,
        state: item.state,
        city: item.city,
        address1: item.address1,
        address2: item.address2,
        _id: item._id
      }));

      setAddressArr(address);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue
  } = useForm();

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    handleUserAddressPost(_bodyData);
  };

  const onSubForm2 = (_bodyData) => {
    console.log(_bodyData);
    handleUserAddressUpdate(_bodyData);
  };

  const toast = useToast();
  const handleUserAddressPost = async (_bodyData) => {
    try {
      // const url = API_URL + "/videos/"+params["id"];
      const url = API_URL + '/users/postuseraddress';
      const data = await handleApiMethod(url, 'POST', _bodyData);
      if (data.msg === true) {
        toast({
          title: 'New Address added.',
          description: "We've added your new address.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });

        handleApi();
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Address already exists') {
        toast({
          title: 'Duplicated address',
          description: `Error when adding new address - such address already exist.`,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when adding new address',
          description: 'Error when adding new address',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  // const updateAddress = (newAddressData) => {
  //   setAddressArr((prevCardsArr) => [...prevCardsArr, newAddressData]);
  // };

  useEffect(() => {
    handleApi();
  }, []);

  const handleUserAddressDelete = async (_bodyData, warning) => {
    try {
      const _bodyDataFinal = {
        addressToDelete: _bodyData
      };

      console.log(_bodyDataFinal);

      const url = API_URL + '/users/address/delete';
      const data = await handleApiMethod(url, 'DELETE', _bodyDataFinal);
      if (data.msg === true && warning === true) {
        toast({
          title: 'Error when adding address',
          description: 'Sorry this address cannot be used',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Address was deleted.',
          description: "We've deleted this address.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      }

      handleApi();
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Address does not exist') {
        toast({
          title: 'Address does not exist',
          description: `Error when removing address - such address does not exist.`,
          status: 'warning',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when removing address',
          description: 'Error when removing selected address',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
      handleApi();
    }
  };

  const handleUserAddressUpdate = async (_bodyData) => {
    try {
      const _bodyDataFinal = {
        country: _bodyData.country,
        state: _bodyData.state,
        city: _bodyData.city,
        address1: _bodyData.address1,
        address2: _bodyData.address2,
        _id: targetIndex
      };

      console.log(_bodyDataFinal);

      const url = API_URL + '/users/address/edit';
      const data = await handleApiMethod(url, 'PUT', _bodyDataFinal);
      if (data.msg === true) {
        toast({
          title: 'Address updated',
          description: 'We successfuly updated your address',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      }

      handleApi();
      setIsEditTrue(false);
      clearValues();
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Address does not exist') {
        toast({
          title: 'Address does not exist',
          description: `Error when removing address - such address does not exist.`,
          status: 'warning',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when removing address',
          description: 'Error when removing selected address',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
      handleApi();
    }
  };

  useEffect(() => {
    if (isEditTrue === true) {
      //will be passed here
      const addressToEdit = addressArr.find((item) => item._id === targetIndex);

      setValue('country', addressToEdit.country);
      setValue('state', addressToEdit.state);
      setValue('city', addressToEdit.city);
      setValue('address1', addressToEdit.address1);
      setValue('address2', addressToEdit.address2);
    }
  }, [isEditTrue]);

  const clearValues = () => {
    setIsEditTrue(false);
    setValue('country', '');
    setValue('state', '');
    setValue('city', '');
    setValue('address1', '');
    setValue('address2', '');
  };

  return (
    <>
      <Box>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Address
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Existing shipping addresses
          </Text>
          <Skeleton minH='100px' borderRadius='16px' isLoaded={!loading}>
            <Box pt={5}>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr ' }} gap={6}>
                {!loading &&
                  addressArr.map((item, index) => {
                    return (
                      <AdressCard
                        setTargetIndex={setTargetIndex}
                        setIsEditTrue={setIsEditTrue}
                        handleUserAddressDelete={handleUserAddressDelete}
                        key={index}
                        item={item}
                        index={index}
                      />
                    );
                  })}
                {addressArr.length === 0 && (
                  <Text fontSize='2xs' fontWeight='bold' color='neutral.gray' py=''>
                    No addresses added yet
                  </Text>
                )}
              </Grid>
            </Box>
          </Skeleton>
          <form onSubmit={handleSubmit(onSubForm)}>
            <Box pt={5}>
              <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
                New shipping address
              </Text>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={6}>
                <GridItem w='100%'>
                  <FormControl id='country' isInvalid={errors.country}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Country
                    </FormLabel>

                    <Input
                      id='country'
                      {...register('country', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Enter country'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.country && errors.country.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem w='100%'>
                  <FormControl id='state' isInvalid={errors.state}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      State
                    </FormLabel>

                    <Input
                      {...register('state', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Enter state'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.firstname && errors.state.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem w='100%'>
                  <FormControl id='city' isInvalid={errors.city}>
                    <FormLabel
                      fontWeight='semibold'
                      placeholder='+1(217) 555-0113'
                      fontSize='3xs'
                      color='neutral.grayDark'
                    >
                      City
                    </FormLabel>

                    <Input
                      {...register('city', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Enter city'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.city && errors.city.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>
            <Box pt={5}>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr ' }} gap={6}>
                <GridItem w='100%'>
                  <FormControl id='adress1' isInvalid={errors.address1}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Address line 1
                    </FormLabel>

                    <Input
                      {...register('address1', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Enter address'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.address1 && errors.address1.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem w='100%'>
                  <FormControl id='adress2' isInvalid={errors.address2}>
                    <FormLabel
                      fontWeight='semibold'
                      placeholder='+1(217) 555-0113'
                      fontSize='3xs'
                      color='neutral.grayDark'
                    >
                      Address line 2
                    </FormLabel>

                    <Input
                      {...register('address2', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      type='text'
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='Enter address (optional)'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.address2 && errors.address2.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            <Box pt={5} display='flex' justifyContent='flex-end'>
              {isEditTrue && (
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
                  onClick={() => {
                    setIsEditTrue(false);
                    clearValues();
                  }}
                >
                  Cancel edit
                </Button>
              )}
              {!isEditTrue ? (
                <Button
                  type='submit'
                  isLoading={isSubmitting}
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
                  Add new address
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit(onSubForm2)} // Pass the function reference directly to onClick
                  isLoading={isSubmitting}
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
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

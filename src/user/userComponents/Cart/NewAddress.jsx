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
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';
import { useForm } from 'react-hook-form';

export default function NewAddress({ SetAddressArrSend, addressArrSend, handleUserAddressPost }) {
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [addressArr, setAddressArr] = useState([]);

  const handleApi = async () => {
    const url = API_URL + '/users/info';
    try {
      const data = await handleApiGet(url);
      setArr(data);
      // console.log(data);

      const address = data.address.map((item) => ({
        country: item.country,
        state: item.state,
        city: item.city,
        address1: item.address1,
        address2: item.address2
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
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubForm = async (_bodyData) => {
    // console.log(_bodyData);
    await handleUserAddressPost(_bodyData);
    updateAddress(_bodyData);
  };

  useEffect(() => {
    handleApi();
  }, []);

  const updateAddress = (newAddressData) => {
    SetAddressArrSend((prevCardsArr) => [...prevCardsArr, newAddressData]);
  };

  return (
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
              <FormErrorMessage p={0} mt={2} fontSize='3xs'>
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
              <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                {errors.firstname && errors.state.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w='100%'>
            <FormControl id='city' isInvalid={errors.city}>
              <FormLabel fontWeight='semibold' placeholder='+1(217) 555-0113' fontSize='3xs' color='neutral.grayDark'>
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
              <FormErrorMessage p={0} mt={2} fontSize='3xs'>
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
              <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                {errors.address1 && errors.address1.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem w='100%'>
            <FormControl id='adress2' isInvalid={errors.address2}>
              <FormLabel fontWeight='semibold' placeholder='+1(217) 555-0113' fontSize='3xs' color='neutral.grayDark'>
                Address line 2
              </FormLabel>

              <Input
                {...register('address2', {
                  required: false,
                  minLength: { value: 2, message: 'Minimum length should be 2' }
                })}
                type='text'
                background='neutral.white'
                _placeholder={{ color: 'neutral.gray' }}
                borderRadius='8px'
                fontSize='2xs'
                placeholder='Enter address (optional)'
              />
              <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                {errors.address2 && errors.address2.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>
      </Box>

      <Box pt={5} display='flex' justifyContent='flex-end'>
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
      </Box>
    </form>
  );
}

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
import AddressReducers from '../../../user/userComponents/reducers/AddressReducers';

export default function Adress() {
  const {
    isEditTrue,
    setIsEditTrue,
    loading,
    arr,
    setArr,
    addressArr,
    setAddressArr,
    targetIndex,
    setTargetIndex,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    setValue,
    onSubForm,
    onSubForm2,
    handleUserAddressPost,
    handleUserAddressUpdate,
    handleApi,
    clearValues,
    handleUserAddressDelete
  } = AddressReducers();

  return (
    <>
      <Box data-aos='fade-up'>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Address
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Existing shipping addresses
          </Text>
          <Skeleton minH='100px' borderRadius='16px' isLoaded={!loading}>
            <Box pt={5}>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr ' }} gap={4}>
                {!loading &&
                  addressArr.map((item, index) => {
                    return (
                      <AdressCard
                        setTargetIndex={setTargetIndex}
                        setIsEditTrue={setIsEditTrue}
                        handleUserAddressDelete={handleUserAddressDelete}
                        key={index}
                        item={item}
                        index={addressArr.length - 1 - index}
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
                        required: { value: true, message: 'This field is required' },
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
                        required: { value: true, message: 'This field is required' },
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
                      {errors.state && errors.state.message}
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
                        required: { value: true, message: 'This field is required' },
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
                        required: { value: true, message: 'This field is required' },
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
                        required: { value: false, message: 'Fill the field' },
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

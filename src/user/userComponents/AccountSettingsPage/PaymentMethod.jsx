import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Select, Skeleton, Text } from '@chakra-ui/react';

import PaymentCard from './PaymentCard';
import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import NewPaymentMethod from '../Checkout/NewPaymentMethod';
import CardsReducers from '../reducers/CardsReducers';
import DefaultPaymentMethod from './DefaultPaymentMethod';
import DefaultPaymentMethod111 from './DefaultPaymentMethod';
import cash from '../../../assets/images/cash.png';
export default function PaymentMethod() {
  const [arr, setArr] = useState([]);

  const updateCreditCard = (newCardData) => {
    setCardsArr((prevCardsArr) => [...prevCardsArr, newCardData]);
  };

  const {
    loading,
    setLoading,
    isEditTrue,
    setIsEditTrue,
    cardsArr,
    setCardsArr,
    handleApi,
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
    clearValues,

    handleUserAddressDelete
  } = CardsReducers();

  useEffect(() => {
    handleApi();
  }, []);

  return (
    <>
      <Box data-aos='fade-up'>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Payment method
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Connected payment methods
          </Text>
          <Box pt={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr ' }} gap={4}>
              {cardsArr.length === 0 ? (
                <>
                  <Text fontSize='2xs' fontWeight='bold' color='neutral.gray' py=''>
                    No connected payments yet
                  </Text>
                </>
              ) : (
                !loading &&
                cardsArr.map((item, index) => (
                  <PaymentCard
                    setTargetIndex={setTargetIndex}
                    handleUserAddressDelete={handleUserAddressDelete}
                    key={index}
                    item={item}
                    index={cardsArr.length - 1 - index}
                  />
                ))
              )}
              <DefaultPaymentMethod cash={cash} />
            </Grid>
            {loading && (
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr ' }} gap={2}>
                <GridItem minH='150px' w='100%'>
                  <Skeleton minH='150px' w='100%' borderRadius='16px' isLoaded={!loading} />
                </GridItem>
                <GridItem minH='150px' w='100%'>
                  <Skeleton minH='150px' w='100%' borderRadius='16px' isLoaded={!loading} />
                </GridItem>
                <GridItem minH='150px' w='100%'>
                  <Skeleton minH='150px' w='100%' borderRadius='16px' isLoaded={!loading} />
                </GridItem>
              </Grid>
            )}
          </Box>
          <NewPaymentMethod
            handleApi={handleApi}
            clearValues={clearValues}
            setIsEditTrue={setIsEditTrue}
            isEditTrue={isEditTrue}
            onSubForm2={onSubForm2}
            updateCreditCard={updateCreditCard}
          />
        </Box>
      </Box>
    </>
  );
}

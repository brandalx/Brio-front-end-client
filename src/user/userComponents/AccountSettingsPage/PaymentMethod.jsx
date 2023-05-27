import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Select, Skeleton, Text } from '@chakra-ui/react';

import PaymentCard from './PaymentCard';
import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import NewPaymentMethod from '../Checkout/NewPaymentMethod';
export default function PaymentMethod() {
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [cardsArr, setCardsArr] = useState([]);

  const handleApi = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';
    try {
      const data = await handleApiGet(url);
      setArr(data);
      console.log(data);

      const cards = data.creditdata.map((card) => ({
        cardNumber: card.cardNumber,
        cardType: card.cardType,
        cardholder: card.cardholder,
        expirationDate: card.expirationDate,
        paymentMethod: card.paymentMethod,
        securityCode: card.securityCode
      }));

      setCardsArr(cards);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateCreditCard = (newCardData) => {
    setCardsArr((prevCardsArr) => [...prevCardsArr, newCardData]);
  };

  useEffect(() => {
    handleApi();
  }, []);

  return (
    <>
      <Box>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Payment method
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Connected payment methods
          </Text>
          <Box pt={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr ' }} gap={2}>
              {!loading &&
                cardsArr.map((item, index) => {
                  return <PaymentCard key={index} item={item} />;
                })}
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
          <NewPaymentMethod updateCreditCard={updateCreditCard} />
        </Box>
      </Box>
    </>
  );
}

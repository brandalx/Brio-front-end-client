import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Select, Skeleton, Text } from '@chakra-ui/react';

import PaymentCard from './PaymentCard';
import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
import { API_URL, handelApiGet } from '../../../services/apiServices';
export default function PaymentMethod() {
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [cardsArr, setCardsArr] = useState([]);

  const handleApi = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';
    try {
      const data = await handelApiGet(url);
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
          <Box pt={5}>
            <Text mb='16px' fontSize='xs' fontWeight='bold' color='neutral.black'>
              New payment method
            </Text>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={6}>
              <GridItem w='100%'>
                <FormControl id='number'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Card number
                  </FormLabel>

                  <Input
                    type='password'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='XXXX - XXXX - XXXX - XXXX'
                  />
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl id='exp'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Expiration
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='MM / YYYY'
                  />
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl id='cvc'>
                  <FormLabel
                    fontWeight='semibold'
                    placeholder='+1(217) 555-0113'
                    fontSize='3xs'
                    color='neutral.grayDark'
                  >
                    CVC
                  </FormLabel>

                  <Input
                    type='password'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='XXX'
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
          <Box pt={5}>
            <Grid templateColumns='repeat(1, 1fr)' gap={4}>
              <GridItem w='100%'>
                <FormControl id='cardholder'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Cardholder
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Enter name on card'
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>

          <Box pt={5} mb={3}>
            <Grid templateColumns='repeat(1, 1fr)' gap={4}>
              <GridItem w='100%'>
                <FormControl>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Card type
                  </FormLabel>
                  <Select required fontSize='2xs' placeholder='Select country' id='cardtype' defaultValue={'visa'}>
                    <option value={'visa'}>Visa</option>
                    <option value={'mastercard'}>Master Card</option>
                  </Select>
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
              Add new payment method
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

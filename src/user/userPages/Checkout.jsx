import { Box, Text, Icon, Button, Flex, Container, GridItem, Grid, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import PaymentCard from '../userComponents/AccountSettingsPage/PaymentCard';

import visa from '../../assets/images/visa.png';
import mastercard from '../../assets/images/mastercard.png';
import PaymentSummary from '../userComponents/Checkout/PaymentSummary';
import NewPaymentMethod from '../userComponents/Checkout/NewPaymentMethod';
import { API_URL, handleApiGet } from '../../services/apiServices';
export default function Checkout() {
  const [switcher, setSwitcher] = useState(true);

  const [loading, setLoading] = useState(true);
  const [arr, setAr] = useState([]);
  const [cardsArr, setCardsArr] = useState([]);
  const disabledOptions = true;
  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setAr(data);
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
      console.log(data);
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
        <Container maxW='1110px' py={10}>
          <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
            <Flex alignItems='center'>
              <Icon as={FaChevronLeft} color='neutral.grayDark' mr={1} boxSize={4} />
              <Text color='neutral.grayDark' fontSize='2xs'>
                <Link to='/user/cart'> Back to cart</Link>
              </Text>
            </Flex>
          </Button>
          <Box my={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '4fr 1fr' }} gap={2}>
              <GridItem w='100%'>
                <Box>
                  <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
                    <Box ms={2} mb={4}>
                      <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                        Select payment method
                      </Text>
                    </Box>

                    <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr  1fr ' }} gap={2}>
                      {!loading &&
                        cardsArr.map((item, index) => {
                          return (
                            <PaymentCard disabledOptions={disabledOptions} loading={loading} key={index} item={item} />
                          );
                        })}

                      <GridItem w='100%'>
                        <Skeleton borderRadius='16px' isLoaded={!loading}>
                          <Box
                            h={{ base: 'initial', lg: '130px' }}
                            onClick={() => setSwitcher(false)}
                            _hover={{
                              cursor: 'pointer',
                              transition: 'all 0.3s',

                              borderColor: 'primary.default'
                            }}
                            _active={{
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              bg: 'primary.light',
                              borderColor: 'primary.default'
                            }}
                            borderRadius='16px'
                            mb='12px'
                            p='25px'
                            transition='all 0.3s'
                            borderWidth='1px'
                            bg='neutral.white'
                          >
                            <Flex justifyContent='center' alignItems='center'>
                              <Box display='flex' flexDirection='column' justifyItems='center' alignItems='center'>
                                <Box
                                  w='24px'
                                  h='24px'
                                  transition='all 0.3s'
                                  borderWidth='1px'
                                  bg='primary.lightest'
                                  _hover={{
                                    bg: 'primary.light',
                                    borderColor: 'primary.default',
                                    transition: 'all 0.3s'
                                  }}
                                  color='black'
                                  borderRadius='full'
                                  position='relative'
                                  display='flex'
                                  alignItems='center'
                                  justifyContent='center'
                                >
                                  +
                                </Box>
                                <Text
                                  mt={4}
                                  fontWeight='bold'
                                  textAlign='center'
                                  fontSize='2xs'
                                  color='neutral.grayDark'
                                >
                                  New payment methods
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                        </Skeleton>
                      </GridItem>
                      <Link to='/user/account/payment'>
                        <Text
                          pt={2}
                          textAlign='center'
                          textDecoration='underline'
                          fontWeight='semibold'
                          fontSize='3xs'
                          color='neutral.gray'
                        >
                          Manage all your payment methods here
                        </Text>
                      </Link>
                      {loading && (
                        <GridItem w='100%'>
                          <Skeleton h='110px' borderRadius='16px' isLoaded={!loading}></Skeleton>
                        </GridItem>
                      )}
                      {loading && (
                        <GridItem w='100%' mt={{ base: 4, lg: 0 }}>
                          <Skeleton h='110px' borderRadius='16px' isLoaded={!loading}></Skeleton>
                        </GridItem>
                      )}
                    </Grid>
                    <Skeleton borderRadius='16px' isLoaded={!loading}>
                      <Box>
                        <NewPaymentMethod switcher={switcher} updateCreditCard={updateCreditCard} />
                      </Box>
                    </Skeleton>
                  </Box>
                </Box>
              </GridItem>
              <GridItem w='100%'>
                <PaymentSummary item={arr} loading={loading} />
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

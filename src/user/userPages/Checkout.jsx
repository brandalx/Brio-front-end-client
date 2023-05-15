import {
  Box,
  Text,
  Icon,
  Button,
  Flex,
  Container,
  Image,
  GridItem,
  Grid,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Divider
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import PaymentCard from '../userComponents/AccountSettingsPage/PaymentCard';

import visa from '../../assets/images/visa.png';
import mastercard from '../../assets/images/mastercard.png';
import PaymentSummary from '../userComponents/Checkout/PaymentSummary';
import NewPaymentMethod from '../userComponents/Checkout/NewPaymentMethod';
export default function Checkout() {
  let arr = [
    {
      number: '**** **** **** 4629',
      expiration: '10/23',
      cardholder: 'Jane Robertson',
      cardtype: mastercard
    },
    {
      number: '**** **** **** 6789',
      expiration: '05/24',
      cardholder: 'John Smith',
      cardtype: visa
    },
    {
      number: '**** **** **** 1234',
      expiration: '12/25',
      cardholder: 'Sarah Johnson',
      cardtype: mastercard
    },
    {
      number: '**** **** **** 9876',
      expiration: '03/26',
      cardholder: 'Michael Davis',
      cardtype: visa
    },
    {
      number: '**** **** **** 5555',
      expiration: '08/27',
      cardholder: 'Emily Thompson',
      cardtype: visa
    }
  ];
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
                      {arr.map((item, index) => {
                        return <PaymentCard key={index} item={item} />;
                      })}
                      <GridItem w='100%'>
                        <Box
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
                              <Text mt={4} fontWeight='bold' textAlign='center' fontSize='2xs' color='neutral.grayDark'>
                                New payment methods
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      </GridItem>
                    </Grid>
                    <Box>
                      <NewPaymentMethod />
                    </Box>
                  </Box>
                </Box>
              </GridItem>
              <GridItem w='100%'>
                <PaymentSummary />
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

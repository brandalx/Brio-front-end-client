import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';

import PaymentCard from './PaymentCard';
import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
export default function PaymentMethod() {
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
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Payment method
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Connected payment methods
          </Text>
          <Box pt={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr ' }} gap={6}>
              {arr.map((item, index) => {
                return <PaymentCard key={index} item={item} />;
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import React from 'react';
import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Text } from '@chakra-ui/react';

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
                    type='text'
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
                    type='text'
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
          <Box pt={5} display='flex' justifyContent='flex-end'>
            <Button
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

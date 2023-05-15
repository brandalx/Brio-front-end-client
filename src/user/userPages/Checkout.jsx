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
                      <Box ms={2} mb={4} mt={10}>
                        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                          New payment method
                        </Text>
                        <Box mt={4}>
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
                          <Box pt={5} display='flex' justifyContent='flex-end' w='100%'>
                            <Flex
                              w='100%'
                              justifyContent='space-between'
                              alignItems={{ base: 'initial', md: 'center' }}
                              flexDirection={{ base: 'column', md: 'row' }}
                            >
                              <Stack
                                h='100%'
                                mt={4}
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                              >
                                <Flex alignItems='center'>
                                  <Checkbox iconColor='neutral.white' mr='2'>
                                    <Text color='neutral.black' fontSize='2xs'>
                                      Save this payment method
                                    </Text>
                                  </Checkbox>
                                </Flex>
                              </Stack>
                              <Button
                                mt={{ base: '20px', md: '0px' }}
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
                            </Flex>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
              <GridItem w='100%'>
                <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
                  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                    Payment summary
                  </Text>
                  <Box>
                    <FormControl id='coupon' mt={4}>
                      <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                        Coupon code
                      </FormLabel>

                      <Input
                        type='text'
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='Enter coupon code'
                      />
                    </FormControl>
                    <FormControl id='tip' mt={4}>
                      <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                        Tips
                      </FormLabel>

                      <Input
                        type='text'
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='$'
                      />
                    </FormControl>
                  </Box>
                  <Divider my={8} />
                  <Box>
                    <Flex justifyContent='space-between'>
                      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                        Subtotal
                      </Text>
                      <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                        $129.40
                      </Text>
                    </Flex>
                    <Flex my={4} justifyContent='space-between'>
                      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                        Shipping
                      </Text>
                      <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                        $20.00
                      </Text>
                    </Flex>
                    <Flex my={4} justifyContent='space-between'>
                      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                        Tips
                      </Text>
                      <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                        $5.00
                      </Text>
                    </Flex>
                    <Flex my={4} justifyContent='space-between'>
                      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                        Discount (coupon)
                      </Text>
                      <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                        $0.00
                      </Text>
                    </Flex>
                    <Flex my={4} justifyContent='space-between'>
                      <Text fontWeight='semibold' fontSize='2xs' color='neutral.black'>
                        Total (tax incl.)
                      </Text>
                      <Text fontWeight='bold' fontSize='2xs' color='primary.default'>
                        $149.40
                      </Text>
                    </Flex>
                    <Link to='/user/checkout'>
                      <Button
                        w='100%'
                        background='primary.default'
                        fontSize='2xs'
                        fontWeight='bold'
                        variant='solid'
                        color='neutral.white'
                        borderWidth='1px'
                        borderColor='primary.default'
                        _hover={{
                          background: 'neutral.white',
                          color: 'primary.default',
                          borderWidth: '1px',
                          borderColor: 'primary.default'
                        }}
                        py={5}
                      >
                        Submit order
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

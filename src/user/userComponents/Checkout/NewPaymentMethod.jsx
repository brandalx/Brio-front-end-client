import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';
import React from 'react';

export default function NewPaymentMethod() {
  return (
    <>
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
                <FormLabel fontWeight='semibold' placeholder='+1(217) 555-0113' fontSize='3xs' color='neutral.grayDark'>
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
    </>
  );
}

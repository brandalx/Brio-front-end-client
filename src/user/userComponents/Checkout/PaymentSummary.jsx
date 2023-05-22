import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function PaymentSummary({ item, loading }) {
  return (
    <>
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
            <InputGroup>
              <InputLeftElement pointerEvents='none' fontSize='2xs' color='neutral.gray'>
                {' '}
                $
              </InputLeftElement>
              <Input
                type='text'
                background='neutral.white'
                _placeholder={{ color: 'neutral.gray' }}
                borderRadius='8px'
                fontSize='2xs'
                placeholder='Enter tip amount'
              />
            </InputGroup>
          </FormControl>
        </Box>
        <Divider my={8} />
        <Box>
          <Flex justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Subtotal
            </Text>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
              ${!loading && item.orders[0].paymentSummary.subtotal}
            </Text>
          </Flex>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Shipping
            </Text>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
              ${!loading && item.orders[0].paymentSummary.shipping}
            </Text>
          </Flex>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Tips
            </Text>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
              ${!loading && item.orders[0].paymentSummary.tips}
            </Text>
          </Flex>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Discount (coupon)
            </Text>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
              ${!loading && item.orders[0].paymentSummary.discount}
            </Text>
          </Flex>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='2xs' color='neutral.black'>
              Total (tax incl.)
            </Text>
            <Text fontWeight='bold' fontSize='2xs' color='primary.default'>
              ${!loading && item.orders[0].paymentSummary.totalAmount}
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
    </>
  );
}

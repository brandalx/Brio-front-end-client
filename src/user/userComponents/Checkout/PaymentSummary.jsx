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
  Skeleton,
  Text,
  useToast
} from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';

import { cartContext } from '../../../context/globalContext';

export default function PaymentSummary({ item, loading, finalCheckoutBody }) {
  const { cartLen, setCartLen } = useContext(cartContext);
  const [tipValue, setTipValue] = useState(0);
  const tipref = useRef(null);
  const handleTipChange = () => {
    const value = tipref.current.value ? tipref.current.value : 0;
    setTipValue(value);
  };
  const navigate = useNavigate();
  const toast = useToast();
  const handleOrderPost = async (_bodyData) => {
    console.log(_bodyData);
    try {
      let preTipValue = Number(tipValue);
      _bodyData.checkoutBodyData.userdata.paymentSummary.tips = preTipValue;
      const url = API_URL + '/orders/createorder';
      const data = await handleApiMethod(url, 'POST', _bodyData);
      if (data.msg === true) {
        toast({
          title: 'Order placed!',
          description: 'Your food is on the way!',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        setCartLen(0);

        const ordersurl = API_URL + '/orders/user/single';
        const neworderdata = await handleApiGet(ordersurl);
        const idorder = neworderdata[neworderdata.length - 1]._id;
        navigate('/user/order/' + idorder);
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Order already exists') {
        toast({
          title: 'Duplicated orders',
          description: `Error when placing new order - such order already exist.`,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when placing new order',
          description: 'Error when placing new order. Please, try again',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  return (
    <>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' data-aos='fade-up'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Payment summary
        </Text>
        <Box>
          {/*
          <Skeleton borderRadius='16px' isLoaded={!loading}>
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
          </Skeleton>

  */}
          <Skeleton borderRadius='16px' isLoaded={!loading}>
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
                  ref={tipref}
                  onChange={handleTipChange}
                  type='number'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Enter tip amount'
                />
              </InputGroup>
            </FormControl>
          </Skeleton>
        </Box>
        <Divider my={8} />
        <Box>
          <Skeleton borderRadius='16px' isLoaded={!loading}>
            <Flex justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                Subtotal
              </Text>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                ${!loading && item.subtotal}
              </Text>
            </Flex>
          </Skeleton>
          <Skeleton borderRadius='16px' isLoaded={!loading}>
            <Flex my={4} justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                Shipping
              </Text>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                ${!loading && item.shipping}
              </Text>
            </Flex>
          </Skeleton>
          <Skeleton borderRadius='16px' isLoaded={!loading}>
            <Flex my={4} justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                Tips
              </Text>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                {/* ${!loading && item.orders[0].paymentSummary.tips} */}${tipValue}
              </Text>
            </Flex>
          </Skeleton>

          {/* <Skeleton borderRadius='16px' isLoaded={!loading}>
            <Flex my={4} justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                Discount (coupon)
              </Text>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                 ${!loading && item.orders[0].paymentSummary.discount} 
                discount
              </Text>
            </Flex>
          </Skeleton> */}

          <Skeleton borderRadius='16px' isLoaded={!loading}>
            <Flex my={4} justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='2xs' color='neutral.black'>
                Total (tax incl.)
              </Text>
              <Text fontWeight='bold' fontSize='2xs' color='primary.default'>
                ${!loading && item.totalAmount}
              </Text>
            </Flex>
          </Skeleton>
          <Link to='/user/checkout'>
            <Button
              onClick={() => handleOrderPost(finalCheckoutBody)}
              isDisabled={finalCheckoutBody.checkoutBodyData.userdata.selectedPaymentMethod ? false : true}
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
              {finalCheckoutBody.checkoutBodyData.userdata.selectedPaymentMethod ? (
                <> Submit order</>
              ) : (
                <> Select payment method</>
              )}
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

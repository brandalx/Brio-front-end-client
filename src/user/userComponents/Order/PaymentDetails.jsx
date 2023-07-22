import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PaymentCard from '../AccountSettingsPage/PaymentCard';
import { API_URL } from '../../../services/apiServices';
import DefaultPaymentMethod from '../AccountSettingsPage/DefaultPaymentMethod';
import cash from '../../../assets/images/cash.png';
export default function PaymentDetails({ item, orders, userArr }) {
  const [disabledOptions, setDisabledOptions] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const definePaymentMwthod = () => {
    let cardId = item.userdata.selectedPaymentMethod;
    userArr.creditdata.map((item, index) => {
      if (item._id === cardId) {
        setPaymentMethod(userArr.creditdata[index]);
      }
    });
  };
  useEffect(() => {
    if (item && item.userdata) {
      definePaymentMwthod();
    }
  }, []);
  // console.log(orders);
  // console.log(item);
  return (
    <>
      {item && item.userdata && item.userdata.paymentSummary && (
        <Box>
          <Text mb={4} fontSize='xs' fontWeight='bold' color='neutral.black'>
            Payment details
          </Text>
          <Box>
            {paymentMethod != 'cash' && <PaymentCard item={paymentMethod} disabledOptions={true} />}
            {paymentMethod === 'cash' && <DefaultPaymentMethod cash={cash} />}
          </Box>
          <Box>
            <Flex my={4} justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                Subtotal
              </Text>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                $ {item.userdata.paymentSummary.subtotal}
              </Text>
            </Flex>
            <Flex my={4} justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                Shipping
              </Text>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                $ {item.userdata.paymentSummary.shipping}
              </Text>
            </Flex>
            <Flex my={4} justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                Tips
              </Text>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>
                $ {item.userdata.paymentSummary.tips}
              </Text>
            </Flex>
            <Flex my={4} justifyContent='space-between'>
              <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
                Total (tax incl.)
              </Text>
              <Text fontWeight='bold' fontSize='2xs' color='primary.default'>
                $ {item.userdata.paymentSummary.totalAmount}
              </Text>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}

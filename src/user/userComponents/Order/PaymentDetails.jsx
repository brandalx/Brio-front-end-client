import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PaymentCard from '../AccountSettingsPage/PaymentCard';

export default function PaymentDetails({ item, orders }) {
  const [disabledOptions, setDisabledOptions] = useState(true);
  console.log(orders);
  return (
    <Box>
      <Text mb={4} fontSize='xs' fontWeight='bold' color='neutral.black'>
        Payment details
      </Text>
      <Box>
        <PaymentCard
          disabledOptions={disabledOptions}
          item={{
            cardNumber: '1234 5678 9012 3456',
            expirationDate: '12/24',
            cardholder: 'John Doe',
            cardType: 'visa'
          }}
        />
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
  );
}

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Summary({ item, loading, blankCart, setBlankCart, checkoutBody }) {
  const [blankSummary, setBlankSummary] = useState(false);
  useEffect(() => {
    console.log(item);
    if (item.length === 0) {
      setBlankSummary(true);
    }
  });
  return (
    <>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Payment summary
        </Text>

        <Box>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Subtotal
            </Text>
            {/* prettier-ignore */}
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>$
  {!blankSummary?( <>0</>) : (!loading && item.orders[0].paymentSummary.subtotal)}
</Text>
          </Flex>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Shipping
            </Text>
            {/* prettier-ignore */}
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.black'>$
            {!blankSummary?( <>0</>) : (!loading && item.orders[0].paymentSummary.shipping)}
            </Text>
          </Flex>
          <Flex my={4} justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
              Total (tax incl.)
            </Text>
            {/* prettier-ignore */}
            <Text fontWeight='bold' fontSize='2xs' color='primary.default'>$
            {!blankSummary?( <>0</>) : (!loading && item.orders[0].paymentSummary.totalAmount)}            
            </Text>
          </Flex>
          <Link to='/user/checkout' state={{ checkoutBodyData: checkoutBody }}>
            <Button
              isDisabled={checkoutBody.userdata.selectedAddress ? false : true}
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
              Proceed to checkout
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

import { Box, Text, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AdressCard from '../AccountSettingsPage/AdressCard';
import NewPaymentMethod from '../Checkout/NewPaymentMethod';
import NewAddress from './NewAddress';

export default function Delivery({ item }) {
  const [shown, isShown] = useState(false);
  const [AddressArrSend, SetAddressArrSend] = useState([]);
  const [combinedAddresses, setCombinedAddresses] = useState(item); // added this state variable

  useEffect(() => {
    // update combinedAddresses whenever AddressArrSend changes
    setCombinedAddresses((prevAddresses) => [...prevAddresses, ...AddressArrSend]);
  }, [AddressArrSend]);

  return (
    <Box py={4}>
      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
        Select your shipping adress
      </Text>
      <Box>
        {combinedAddresses &&
          combinedAddresses.map((item, index) => {
            return <AdressCard key={index} item={item} index={index} />;
          })}
      </Box>
      <Button
        onClick={() => {
          isShown(shown ? false : true);
        }}
        w='100%'
        background='primary.light'
        fontSize='2xs'
        fontWeight='bold'
        variant='solid'
        color='primary.default'
        borderWidth='1px'
        borderColor='primary.light'
        _hover={{
          background: 'primary.default',
          color: 'neutral.white',
          borderWidth: '1px',
          borderColor: 'primary.default'
        }}
        py={5}
      >
        {shown ? <Box>Hide</Box> : <Box>Add new shipping address</Box>}
      </Button>

      {shown && <NewAddress SetAddressArrSend={SetAddressArrSend} AddressArrSend={AddressArrSend} />}
    </Box>
  );
}

import { Box, Text, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import AdressCard from '../AccountSettingsPage/AdressCard';
import NewPaymentMethod from '../Checkout/NewPaymentMethod';
import NewAddress from './NewAddress';
import AddressReducers from '../reducers/addressReducers';
import { Link } from 'react-router-dom';

export default function Delivery({ item, setCheckoutBody, setPickupLocation }) {
  const [shown, isShown] = useState(false);
  const [AddressArrSend, SetAddressArrSend] = useState([]);
  const [combinedAddresses, setCombinedAddresses] = useState(item);
  const [onitemselected, setOnitemselected] = useState(false);
  const [addressId, setAddressId] = useState();
  const disabledOptions = true;

  useEffect(() => {
    setCombinedAddresses(item);
  }, [item]);
  //fix bug with click on item selected
  const selectCard = (cardId) => {
    setAddressId(cardId);
    console.log(cardId);
    setOnitemselected(false);

    combinedAddresses.map((item) => {
      if (item._id === cardId) {
        setOnitemselected(true);
        setCheckoutBody((prevState) => ({
          ...prevState,
          userdata: {
            ...prevState.userdata,
            selectedAddress: cardId
          }
        }));
        setPickupLocation(false);
      }
    });
  };

  const {
    isEditTrue,
    setIsEditTrue,
    loading,
    arr,
    setArr,
    addressArr,
    setAddressArr,
    targetIndex,
    setTargetIndex,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    setValue,
    onSubForm,
    onSubForm2,
    handleUserAddressPost,
    handleUserAddressUpdate,
    handleApi,
    clearValues,
    handleUserAddressDelete
  } = AddressReducers();

  return (
    <Box py={4}>
      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
        Select your shipping adress
      </Text>
      <Box>
        {combinedAddresses &&
          combinedAddresses.map((item, index) => {
            const isSelected = addressId === item._id;
            return (
              <AdressCard
                onitemselected={isSelected}
                selectCard={selectCard}
                disabledOptions={disabledOptions}
                setTargetIndex={setTargetIndex}
                setIsEditTrue={setIsEditTrue}
                handleUserAddressDelete={handleUserAddressDelete}
                key={index}
                item={item}
                index={index}
              />
            );
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
      <Link to='/user/account/address'>
        <Text
          pt={2}
          textAlign='center'
          textDecoration='underline'
          fontWeight='semibold'
          fontSize='3xs'
          color='neutral.gray'
        >
          Manage all your addresses here
        </Text>
      </Link>
      {shown && (
        <NewAddress
          handleUserAddressDelete={handleUserAddressDelete}
          handleUserAddressPost={handleUserAddressPost}
          SetAddressArrSend={SetAddressArrSend}
          AddressArrSend={AddressArrSend}
        />
      )}
    </Box>
  );
}

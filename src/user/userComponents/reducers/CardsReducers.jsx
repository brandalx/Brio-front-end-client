import { useEffect, useState } from 'react';
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';
import { useForm } from 'react-hook-form';

import { useToast } from '@chakra-ui/react';
const CardsReducers = () => {
  const [isEditTrue, setIsEditTrue] = useState(false);

  const [arr, setArr] = useState([]);
  const [addressArr, setAddressArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetIndex, setTargetIndex] = useState();
  const [cardsArr, setCardsArr] = useState([]);
  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setArr(data);
      // console.log(data);

      const cards = data.creditdata.map((card) => ({
        cardNumber: card.cardNumber,
        cardType: card.cardType,
        cardholder: card.cardholder,
        expirationDate: card.expirationDate,
        paymentMethod: card.paymentMethod,
        securityCode: card.securityCode,
        _id: card._id
      }));

      setCardsArr(cards);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue
  } = useForm();

  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    handleUserAddressPost(_bodyData);
  };

  const onSubForm2 = (_bodyData) => {
    // console.log(_bodyData);
    handleUserAddressUpdate(_bodyData);
  };
  const handleUserAddressUpdate = async (_bodyData) => {
    try {
      const _bodyDataFinal = {
        cardNumber: _bodyData.cardNumber,
        expirationDate: _bodyData.expirationDate,
        securityCode: _bodyData.securityCode,
        cardType: _bodyData.cardType,
        cardholder: _bodyData.cardholder,
        _id: targetIndex
      };

      // console.log(_bodyDataFinal);

      const url = API_URL + '/users/card/edit';
      const data = await handleApiMethod(url, 'PUT', _bodyDataFinal);
      if (data.msg === true) {
        toast({
          title: 'Card updated',
          description: 'We successfully updated your card',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      }

      handleApi();
      setIsEditTrue(false);
      clearValues();
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Card does not exist') {
        toast({
          title: 'Card does not exist',
          description: `Error when removing card - such card does not exist.`,
          status: 'warning',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when removing card',
          description: 'Error when removing selected card',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
      handleApi();
    }
  };
  const clearValues = () => {
    setIsEditTrue(false);
    setValue('cardNumber', '');
    setValue('expirationDate', '');
    setValue('securityCode', '');
    setValue('cardholder', '');
    setValue('cardType', '');
  };
  const toast = useToast();
  const handleUserAddressPost = async (_bodyData) => {
    try {
      const url = API_URL + '/users/postuseraddress';
      const data = await handleApiMethod(url, 'POST', _bodyData);
      if (data.msg === true) {
        toast({
          title: 'New card added.',
          description: "We've added your new card.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });

        handleApi();
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Card already exists') {
        toast({
          title: 'Duplicated cards',
          description: `Error when adding new card - such card already exist.`,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when card new address',
          description: 'Error when card new address',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  // Other functions and useEffect hooks

  useEffect(() => {
    handleApi();
  }, []);

  useEffect(() => {
    if (isEditTrue === true) {
      //will be passed here
      const addressToEdit = addressArr.find((item) => item._id === targetIndex);

      setValue('cardNumber', addressToEdit.cardNumber);
      setValue('expirationDate', addressToEdit.expirationDate);
      setValue('securityCode', addressToEdit.securityCode);
      setValue('cardholder', addressToEdit.cardholder);
      setValue('cardType', addressToEdit.cardType);
    }
  }, [isEditTrue]);

  const handleUserAddressDelete = async (_bodyData, warning) => {
    try {
      const _bodyDataFinal = {
        cardToDelete: _bodyData
      };

      // console.log(_bodyDataFinal);

      const url = API_URL + '/users/card/delete';
      const data = await handleApiMethod(url, 'DELETE', _bodyDataFinal);
      if (data.msg === true && warning === true) {
        toast({
          title: 'Error when adding card',
          description: 'Sorry this card cannot be used',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Card was deleted.',
          description: "We've deleted this card.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      }

      handleApi();
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Card does not exist') {
        toast({
          title: 'Card does not exist',
          description: `Error when removing card - such card does not exist.`,
          status: 'warning',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when removing card',
          description: 'Error when removing selected card',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
      handleApi();
    }
  };

  return {
    loading,
    setLoading,
    cardsArr,
    setCardsArr,
    handleApi,
    handleUserAddressUpdate,
    clearValues,
    isEditTrue,
    setIsEditTrue,
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
    handleUserAddressDelete,
    onSubForm,
    onSubForm2,
    handleUserAddressPost
  };
};

export default CardsReducers;

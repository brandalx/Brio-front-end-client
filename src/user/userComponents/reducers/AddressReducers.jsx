import { useEffect, useState } from 'react';
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';
import { useForm } from 'react-hook-form';

import { useToast } from '@chakra-ui/react';
const AddressReducers = () => {
  const [isEditTrue, setIsEditTrue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [addressArr, setAddressArr] = useState([]);
  const [targetIndex, setTargetIndex] = useState();

  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setArr(data);
      console.log(data);

      const address = data.address.map((item) => ({
        country: item.country,
        state: item.state,
        city: item.city,
        address1: item.address1,
        address2: item.address2,
        _id: item._id
      }));

      setAddressArr(address);
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
    console.log(_bodyData);
    handleUserAddressPost(_bodyData);
  };

  const onSubForm2 = (_bodyData) => {
    console.log(_bodyData);
    handleUserAddressUpdate(_bodyData);
  };
  const handleUserAddressUpdate = async (_bodyData) => {
    try {
      const _bodyDataFinal = {
        country: _bodyData.country,
        state: _bodyData.state,
        city: _bodyData.city,
        address1: _bodyData.address1,
        address2: _bodyData.address2,
        _id: targetIndex
      };

      console.log(_bodyDataFinal);

      const url = API_URL + '/users/address/edit';
      const data = await handleApiMethod(url, 'PUT', _bodyDataFinal);
      if (data.msg === true) {
        toast({
          title: 'Address updated',
          description: 'We successfully updated your address',
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

      if (error.response.data.err === 'Address does not exist') {
        toast({
          title: 'Address does not exist',
          description: `Error when removing address - such address does not exist.`,
          status: 'warning',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when removing address',
          description: 'Error when removing selected address',
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
    setValue('country', '');
    setValue('state', '');
    setValue('city', '');
    setValue('address1', '');
    setValue('address2', '');
  };
  const toast = useToast();
  const handleUserAddressPost = async (_bodyData) => {
    try {
      const url = API_URL + '/users/postuseraddress';
      const data = await handleApiMethod(url, 'POST', _bodyData);
      if (data.msg === true) {
        toast({
          title: 'New Address added.',
          description: "We've added your new address.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });

        handleApi();
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Address already exists') {
        toast({
          title: 'Duplicated address',
          description: `Error when adding new address - such address already exist.`,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when adding new address',
          description: 'Error when adding new address',
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
      setValue('country', addressToEdit.country);
      setValue('state', addressToEdit.state);
      setValue('city', addressToEdit.city);
      setValue('address1', addressToEdit.address1);
      setValue('address2', addressToEdit.address2);
    }
  }, [isEditTrue]);

  const handleUserAddressDelete = async (_bodyData, warning) => {
    try {
      const _bodyDataFinal = {
        addressToDelete: _bodyData
      };

      console.log(_bodyDataFinal);

      const url = API_URL + '/users/address/delete';
      const data = await handleApiMethod(url, 'DELETE', _bodyDataFinal);
      if (data.msg === true && warning === true) {
        toast({
          title: 'Error when adding address',
          description: 'Sorry this address cannot be used',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Address was deleted.',
          description: "We've deleted this address.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      }

      handleApi();
    } catch (error) {
      console.log(error);

      if (error.response.data.err === 'Address does not exist') {
        toast({
          title: 'Address does not exist',
          description: `Error when removing address - such address does not exist.`,
          status: 'warning',
          duration: 9000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Error when removing address',
          description: 'Error when removing selected address',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
      handleApi();
    }
  };

  // Return the state variables and functions you want to use in the component that will use this reducer
  return {
    clearValues,
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
    handleUserAddressDelete,
    onSubForm,
    onSubForm2,
    handleUserAddressPost,
    handleApi
    // ... add other functions and variables as needed
  };
};

export default AddressReducers;

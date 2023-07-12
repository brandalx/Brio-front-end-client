import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../services/apiServices';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function ModalCreatePromotion({ isOpen, onOpen, onClose, stateOfPromotion }) {
  const { control, handleSubmit, reset } = useForm();
  const [isLilMob] = useMediaQuery('(max-width: 350px)');
  const [product, setProduct] = useState('');
  const [image, setImage] = useState(null);
  const [days, setDays] = useState([]);
  const arrDaysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  const fetchRestaurantData = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const adminResponse = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token
        }
      });

      const restaurantResponse = await axios.get(`${API_URL}/restaurants/${adminResponse.data.restaurant}`, {
        headers: {
          'x-api-key': token
        }
      });

      setRestaurantId(adminResponse.data.restaurant);
      setRestaurantName(restaurantResponse.data.title);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const dayMapper = {
    SUN: 'Sunday',
    MON: 'Monday',
    TUE: 'Tuesday',
    WED: 'Wednesday',
    THU: 'Thursday',
    FRI: 'Friday',
    SAT: 'Saturday'
  };

  const addDays = (day) => {
    if (!days.includes(dayMapper[day])) {
      setDays((prevDays) => [...prevDays, dayMapper[day]]);
    }
    console.log(days);
  };

  useEffect(() => {
    console.log(days);
  }, [days]);

  const formatDate = (date) => {
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    console.log(year + ' ' + month + ' ' + day);
    return [year, month, day].join('-');
  };

  const createPromotion = async (discountDetails, startDate, endDate, image) => {
    const payload = new FormData();
    payload.append('discountDetails', discountDetails);
    payload.append('startDate', startDate);
    payload.append('endDate', endDate);
    payload.append('restaurantRef', restaurantId);
    payload.append('image', image);
    payload.append('discountDays', days);
    payload.append('restaurantName', restaurantName);
    try {
      const token = localStorage.getItem('x-api-key');

      const response = await fetch(API_URL + '/admin/promotions', {
        method: 'POST',
        headers: {
          'x-api-key': token
        },
        body: payload
      });
      if (!response.ok) {
        throw new Error('Failed to create promotion');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('An error occurred while creating the promotion: ' + error.message);
    }
  };

  const handlePublishPromotion = async (data) => {
    console.log('Submitting Data:', data); // log data here
    const { discountDetails, startDate, endDate, image, discountDays, restaurantName, restaurantRef } = data;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    console.log(startDateObj + ' ' + endDateObj);

    if (startDateObj > endDateObj) {
      console.error('End date cannot be before start date.');
      return;
    }
    try {
      const newPromotion = await createPromotion(
        discountDetails,
        formatDate(startDateObj), // Convert to YYYY-MM-DD string before sending
        formatDate(endDateObj), // Convert to YYYY-MM-DD string before sending
        image,
        restaurantName,
        restaurantRef,
        discountDays
      );

      // Add the new product to the list of products
      setProduct((prevPromotion) => [
        ...prevPromotion,
        { ...newPromotion } // Add the amount field to the new product
      ]);
      // If successful, close the modal
      onClose();
    } catch (error) {
      console.error('An error occurred while publishing the category:', error);
    }
  };

  const onSubmit = (data) => {
    console.log('Form Data That i Got and wanna see:', data);

    handlePublishPromotion({
      ...data,
      discountDetails: data.discountDetails,
      startDate: data.startDate,
      endDate: data.endDate,
      image: data.image,
      restaurantName: restaurantName, // from state
      restaurantRef: restaurantId, // from state
      discountDays: days // from state, not data
    });
    console.log(data);
    console.log(data.endDate);
    console.log(data.startDate);
    console.log(data.restaurantRef);
    console.log(data.discountDetails);
    console.log(data.restaurantName);
    console.log(data.days);
    reset();
    setDays([]);
  };

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Modal
      size={isLilMob ? 'full' : 'xl'}
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      zIndex='9999999'
    >
      <ModalOverlay
        width='100%'
        sx={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '10',
          bg: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
      <ModalContent
        position='relative'
        boxSizing='content-box'
        width={['100%', '100%', '100%', '540px']}
        maxW='96%'
        MaxH='568px'
      >
        <ModalCloseButton />
        <ModalBody overflow='auto'>
          <Heading fontSize='sm' fontWeight='semibold' color='neutral.black'>
            Create meal item
          </Heading>
          <Box display='flex' gap={6}>
            <Box display='flex' flexDirection='column'>
              <Text mb='6px' fontSize='3xs' color='neutral.grayDark'>
                Promotion image
              </Text>
              <Box
                flexWrap='wrap'
                position='relative'
                height='88px'
                width={isLilMob ? '65px' : '88px'}
                maxW='88px'
                maxH='88px'
              >
                <Image
                  width='100%'
                  height='100%'
                  borderRadius='20px'
                  src={
                    image ||
                    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  }
                  objectFit='cover'
                  objectPosition='center'
                />
              </Box>
            </Box>
            <Box
              display='flex'
              flexDirection={isLilMob ? 'column-reverse' : ''}
              justifyContent={isLilMob ? 'center' : ''}
              alignItems='center'
              gap={6}
            >
              <Box>
                <label htmlFor='imageUpload' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Button
                    cursor='pointer'
                    _hover={{
                      background: 'primary.default',
                      color: 'neutral.white',
                      borderWidth: '1px',
                      borderColor: 'primary.default'
                    }}
                    w='84px'
                    h='44px'
                    border='1px'
                    borderColor='primary.default'
                    color='primary.default'
                    as='span'
                  >
                    Change
                  </Button>
                  <Input
                    id='imageUpload'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </Box>

              <Text color='neutral.gray' fontWeight='bold'>
                Remove
              </Text>
            </Box>
          </Box>
          <Box gap='32px' display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='column' gap={3}>
              <InputGroup mt='20px' display='flex' flexDirection='column'>
                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                  Discount details
                </Text>
                <Controller
                  control={control}
                  name='discountDetails'
                  defaultValue=''
                  render={({ field }) => (
                    <Input {...field} color='neutral.gray' fontSize='2xs' type='text' placeholder='Enter meal name' />
                  )}
                />
              </InputGroup>
              <InputGroup mt='20px' display='flex' flexDirection='column'>
                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                  Dates
                </Text>
                <InputGroup mt='20px' display='flex' flexDirection='column'>
                  <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                    Start Date
                  </Text>
                  <Controller
                    control={control}
                    name='startDate'
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        {...field}
                        color='neutral.gray'
                        fontSize='2xs'
                        placeholder='Select start date'
                        type='date'
                      />
                    )}
                  />
                </InputGroup>
                <InputGroup mt='20px' display='flex' flexDirection='column'>
                  <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                    End Date
                  </Text>
                  <Controller
                    control={control}
                    name='endDate'
                    defaultValue=''
                    render={({ field }) => (
                      <Input {...field} color='neutral.gray' fontSize='2xs' placeholder='Select end date' type='date' />
                    )}
                  />
                </InputGroup>
              </InputGroup>

              <Box>
                {arrDaysOfTheWeek.map((day, i) => {
                  return (
                    <Button
                      key={i}
                      border='1px'
                      color='neutral.gray'
                      marginRight='12px'
                      borderRadius='16px'
                      onClick={() => addDays(day)}
                    >
                      {day}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter display='flex' justifyContent={isLilMob ? 'center' : 'end'}>
          <Button
            p='20px'
            h='20px'
            border='1px'
            borderColor='neutral.gray'
            color='neutral.gray'
            colorScheme='blue'
            mr={3}
            onClick={onClose}
            _hover={{
              background: 'error.default',
              color: 'neutral.white',
              borderWidth: '1px',
              borderColor: 'error.default'
            }}
          >
            Cancel
          </Button>
          <Button
            _hover={{
              background: 'primary.default',
              color: 'neutral.white',
              borderWidth: '1px',
              borderColor: 'primary.default'
            }}
            color='primary.default'
            p='20px'
            border='1px'
            borderColor='primary.default'
            onClick={handleSubmit(onSubmit)}
          >
            Publish meal item
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

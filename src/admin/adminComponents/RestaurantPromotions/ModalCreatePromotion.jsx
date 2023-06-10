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
import React, { useState } from 'react';
import { API_URL } from '../../../services/apiServices';

export default function ModalCreatePromotion({ isOpen, onOpen, onClose }) {
  const { control, handleSubmit, reset } = useForm();
  const [isLilMob] = useMediaQuery('(max-width: 350px)');
  const [product, setProduct] = useState('');
  const [image, setImage] = useState(null);
  const [chosenButton, setChosenButton] = useState();
  const arrDaysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const createPromotion = async (discountDetails, availableDate, restaurantName, image, discountDays) => {
    const payload = {
      discountDetails: discountDetails,
      availableDate: availableDate,
      restaurantName: restaurantName,
      image: image,
      discountDays: discountDays
    };

    try {
      const response = await fetch(API_URL + '/admin/promotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
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
    const { discountDetails, availableDate, restaurantName, image, discountDays } = data;

    try {
      const newPromotion = await createPromotion(discountDetails, availableDate, restaurantName, image, discountDays);
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
    handlePublishPromotion(data);
    reset(); // Reset the form values after submission
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
                  Name
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
                <Controller
                  control={control}
                  name='availableDate'
                  defaultValue=''
                  render={({ field }) => (
                    <Input
                      {...field}
                      color='neutral.gray'
                      fontSize='2xs'
                      placeholder='Select exact date or date range'
                      type='date'
                    />
                  )}
                />
              </InputGroup>
              <Box>
                {arrDaysOfTheWeek.map((day, i) => {
                  return (
                    <Button key={i} border='1px' color='neutral.gray' marginRight='12px' borderRadius='16px'>
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

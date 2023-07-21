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
import Select from 'react-select';
import { components } from 'react-select';
import { useToast } from '@chakra-ui/react';

export default function ModalCreatePromotion({ isOpen, onOpen, onClose, stateOfPromotion }) {
  const { control, handleSubmit, reset } = useForm();
  const [isLilMob] = useMediaQuery('(max-width: 350px)');
  const [product, setProduct] = useState('');
  const [image, setImage] = useState(null);
  const [days, setDays] = useState([]);
  const [productsOfRestaurant, setProductsOfRestaurant] = useState([]);
  const arrDaysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const toast = useToast();

  const fetchProductData = async (productId) => {
    try {
      const token = localStorage.getItem('x-api-key');
      const response = await axios.get(`${API_URL}/products/${productId}`, {
        headers: {
          'x-api-key': token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

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

      const productIds = restaurantResponse.data.products;
      const productPromises = productIds.map((productId) => fetchProductData(productId));
      const products = await Promise.all(productPromises);

      setProductsOfRestaurant(products);
      console.log('Products: ', products);
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

  const createPromotion = async (discountDetails, startDate, endDate, image, discountPercent, discountProducts) => {
    const token = localStorage.getItem('x-api-key');
    const newPromotionStartDate = new Date(startDate).getTime();
    for (let productId of discountProducts) {
      const promotions = await axios.get(`${API_URL}/admin/promotions`, {
        headers: {
          'x-api-key': token
        }
      });
      for (let promotion of promotions.data) {
        const promotionStartDate = new Date(promotion.startDate).getTime();
        const promotionEndDate = new Date(promotion.endDate).getTime();
        const newPromotionEndDate = new Date(endDate).getTime();
        if (
          promotion.discountProducts.includes(productId) &&
          promotionEndDate >= newPromotionStartDate &&
          promotionStartDate <= newPromotionEndDate
        ) {
          throw new Error(`Product ${productId} is already participating in another active or scheduled promotion`);
        }
      }
    }

    // Создаем новую акцию, если все проверки пройдены
    const payload = {
      discountDetails,
      startDate,
      endDate,
      restaurantRef: restaurantId,
      image,
      discountPercent,
      discountProducts,
      discountDays: days,
      restaurantName
    };

    try {
      const token = localStorage.getItem('x-api-key');
      const response = await axios.post(`${API_URL}/admin/promotions`, payload, {
        headers: {
          'x-api-key': token
        }
      });

      if (!response.data) {
        throw new Error('Failed to create promotion');
      }

      return response.data;
    } catch (error) {
      throw new Error('An error occurred while creating the promotion: ' + error.message);
    }
  };

  const handlePublishPromotion = async (data) => {
    console.log('Submitting Data:', data);
    const { discountDetails, startDate, endDate, image, discountPercent, discountProducts } = data;

    const productIds = discountProducts ? discountProducts.map((product) => product.id) : [];

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj > endDateObj) {
      console.error('End date cannot be before start date.');
      return;
    }
    try {
      const newPromotion = await createPromotion(
        discountDetails,
        formatDate(startDateObj),
        formatDate(endDateObj),
        image,
        discountPercent,
        productIds
      );

      setProduct((prevPromotion) => [...prevPromotion, { ...newPromotion }]);
      onClose();

      // Toast for successful promotion creation
      toast({
        title: 'Promotion Created',
        description: 'The promotion has been successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      console.error('An error occurred while publishing the category:', error);

      // Toast for failed promotion creation
      toast({
        title: 'Promotion Creation Failed',
        description: `An error occurred while creating the promotion: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
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
      discountPercent: data.discountPercent,
      discountProducts: data.discountProducts,
      restaurantName: restaurantName,
      restaurantRef: restaurantId,
      discountDays: days
    });
    reset();
    setDays([]);
  };

  const options = productsOfRestaurant.map((product) => ({
    id: product._id,
    title: product.title,
    price: product.price,
    image: product.image,
    data: product
  }));

  const CustomOption = ({ data, ...props }) => (
    <components.Option {...props}>
      <Image
        borderRadius='8px'
        src={(data.image && data.image[0]) || ''}
        alt={data.title}
        width='150px'
        height='125px'
      />
      <Box>{data.title}</Box>
      <Box>${data.price}</Box>
    </components.Option>
  );

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
                    product.image ||
                    'https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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
                  Discount percent
                </Text>
                <Controller
                  control={control}
                  name='discountPercent'
                  defaultValue=''
                  render={({ field }) => (
                    <Input
                      {...field}
                      color='neutral.gray'
                      fontSize='2xs'
                      type='text'
                      placeholder='Enter discount percent'
                    />
                  )}
                />
              </InputGroup>
              <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                Select products
              </Text>
              <Controller
                control={control}
                name='discountProducts'
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    isMulti
                    getOptionValue={(option) => option.id} // ensure correct option value is used
                    getOptionLabel={(option) => option.title} // ensure correct label is used
                    components={{
                      Option: CustomOption
                    }}
                    onChange={(selectedOptions) => {
                      // Update 'discountProducts' field
                      field.onChange(selectedOptions || []);
                      setSelectedProducts(selectedOptions || []); // Also update selectedProducts state
                    }}
                  />
                )}
              />
              <InputGroup mt='20px' display='flex' flexDirection='column'>
                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                  Discount products
                </Text>
                <Box>
                  {selectedProducts.map((product) => (
                    <Text key={product.id}>{product.title}</Text>
                  ))}
                </Box>
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
                {arrDaysOfTheWeek.map((day) => {
                  return (
                    <Button
                      key={day} // unique key prop added here
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

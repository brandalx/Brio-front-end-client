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
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import '../../../css/global.css';
import { API_URL } from '../../../services/apiServices';
import jwtDecode from 'jwt-decode';
export default function ModalRestaurantMenu({ categoryName, categoryId, isOpen, onOpen, onClose }) {
  const { control, handleSubmit, reset } = useForm();
  const [isLilMob] = useMediaQuery('(max-width: 350px)');
  const [product, setProduct] = useState('');
  const [image, setImage] = useState(null);
  const [categoryIDs, setCategoryIDs] = useState({});
  const toast = useToast();

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const { _id } = jwtDecode(token);

      const response = await fetch(`${API_URL}/users/${_id}`, {
        method: 'GET',
        headers: {
          'x-api-key': token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('An error occurred while fetching the admin data: ' + error.message);
    }
  };
  const updateRestaurant = async (restaurantId, productId) => {
    const token = localStorage.getItem('x-api-key');

    try {
      const response = await fetch(`${API_URL}/admin/restaurants/${restaurantId}`, {
        method: 'PATCH',
        headers: {
          'x-api-key': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ $push: { products: productId } })
      });

      if (!response.ok) {
        throw new Error('Failed to update restaurant');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred while updating the restaurant: ', error);
    }
  };

  const createProduct = async (items, price, title, description, ingredients, nutritionals, restaurantRef) => {
    const payload = {
      title: title,
      description: description,
      image: items,
      price: price,
      ingredients: ingredients,
      nutritionals: nutritionals,
      categoryName: categoryName,
      restaurantRef: restaurantRef,
      categoryId: categoryId
    };

    try {
      const token = localStorage.getItem('x-api-key');

      const response = await fetch(API_URL + '/admin/products', {
        method: 'POST',
        headers: {
          'x-api-key': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();

      // Display the toast here, before the function ends
      toast({
        title: 'Product created.',
        description: 'The product has been successfully created.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      return data;
    } catch (error) {
      console.error('Error creating product:', error);

      // Display the error toast here
      toast({
        title: 'An error occurred.',
        description: 'Unable to create product.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  const handlePublishProduct = async (data) => {
    // Удалите adminId из параметров функции
    const {
      price,
      title,
      description,
      ingredients: ingredientsStr,
      nutritionals: nutritionalsStr,
      items: image
    } = data;

    const ingredients = ingredientsStr.split(',').map((ingredient) => ingredient.trim());
    const nutritionals = nutritionalsStr.split(',').map((nutritional) => nutritional.trim());

    try {
      const adminData = await fetchAdminData(); // Удалите adminId из параметров функции
      const restaurantRef = adminData.restaurant;

      const newProduct = await createProduct(
        image,
        price,
        title,
        description,
        ingredients,
        nutritionals,
        restaurantRef,
        categoryId
      );

      await updateCategory(categoryId, newProduct._id);

      try {
        const token = localStorage.getItem('x-api-key');

        if (!categoryId || !newProduct._id) {
          console.error('Missing categoryId or newProduct._id');
          return;
        }

        await fetch(`${API_URL}/admin/categories/${categoryId}/add-product/${newProduct._id}`, {
          method: 'PATCH',
          headers: {
            'x-api-key': token,
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        console.error('An error occurred while adding the product to the category:', err);
      }

      await updateRestaurant(restaurantRef, newProduct._id);

      setProduct((prevProducts) => [...prevProducts, { ...newProduct }]);
      onClose();
    } catch (error) {
      console.error('An error occurred while publishing the product:', error);
    }
  };

  const updateCategory = async (categoryId, productId) => {
    const token = localStorage.getItem('x-api-key');

    try {
      const response = await fetch(`${API_URL}/admin/categories/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'x-api-key': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ $push: { products: productId } })
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred while updating the category: ', error);
    }
  };

  const onSubmit = (data) => {
    handlePublishProduct(data);
    reset();
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
                Meal image
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
                  src={image || 'https://cdn.pixabay.com/photo/2023/04/26/16/57/flower-7952897_960_720.jpg'}
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
            <Box display='flex' flexDirection='row' gap={3}>
              <InputGroup mt='20px' display='flex' flexDirection='column'>
                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                  Name
                </Text>
                <Controller
                  control={control}
                  name='title'
                  rules={{ required: true }}
                  defaultValue=''
                  render={({ field }) => (
                    <Input {...field} color='neutral.gray' fontSize='2xs' type='text' placeholder='Enter meal name' />
                  )}
                />
              </InputGroup>
              <InputGroup mt='20px' display='flex' flexDirection='column'>
                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                  Price
                </Text>
                <Controller
                  control={control}
                  name='price'
                  defaultValue=''
                  render={({ field }) => (
                    <Input
                      {...field}
                      color='neutral.gray'
                      fontSize='2xs'
                      placeholder='Enter meal price'
                      type='number'
                    />
                  )}
                />
              </InputGroup>
            </Box>
            <Box display='flex' flexDirection='row' gap={3}>
              <InputGroup mt='20px' display='flex' flexDirection='column'>
                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                  Description
                </Text>
                <Controller
                  control={control}
                  name='description'
                  defaultValue=''
                  render={({ field }) => (
                    <Input
                      {...field}
                      color='neutral.gray'
                      fontSize='2xs'
                      type='text'
                      placeholder='Enter meal description'
                    />
                  )}
                />
              </InputGroup>
            </Box>
            <Box display='flex' flexDirection='row' gap={3}>
              <InputGroup display='flex' flexDirection='column'>
                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                  Ingredients
                </Text>
                <Controller
                  control={control}
                  name='ingredients'
                  defaultValue=''
                  render={({ field }) => (
                    <Input
                      {...field}
                      color='neutral.gray'
                      fontSize='2xs'
                      placeholder='Enter meal ingredients'
                      type='text'
                    />
                  )}
                />
              </InputGroup>
              <InputGroup display='flex' flexDirection='column'>
                <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                  Nutritional value
                </Text>
                <Controller
                  control={control}
                  name='nutritionals'
                  defaultValue=''
                  render={({ field }) => (
                    <Input
                      {...field}
                      color='neutral.gray'
                      fontSize='2xs'
                      placeholder='Enter meal nutritional value'
                      type='text'
                    />
                  )}
                />
              </InputGroup>
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
            onClick={() => handleSubmit(onSubmit)()}
          >
            Publish meal item
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import AddPlus from '../../../assets/svg/AddPlus';
import { API_URL, handleApiPost, handleApiGet } from '../../../services/apiServices';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function ModalNewCategory({ fetchCategories, setCategories }) {
  const [isLilMob] = useMediaQuery('(max-width: 350px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryName, setCategoryName] = useState('');
  const [restaurantId, setRestaurantId] = useState(null);
  const toast = useToast();

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token
        }
      });

      setRestaurantId(response.data.restaurant);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const createNewCategory = async (name, items) => {
    const amount = 0;
    const token = localStorage.getItem('x-api-key');
    return await handleApiPost(
      API_URL + '/admin/categories',
      {
        restaurantId,
        categoryName: name,
        items,
        amount
      },
      { 'x-api-key': token }
    );
  };

  const fetchCategoriesForRestaurant = async () => {
    const token = localStorage.getItem('x-api-key');
    try {
      const response = await axios.get(`${API_URL}/admin/categories`, {
        params: {
          restaurantRef: restaurantId
        },
        headers: {
          'x-api-key': token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const checkCategoryName = async (name) => {
    const categories = await fetchCategoriesForRestaurant();
    const existingCategory = categories.find((category) => category.name === name);
    return existingCategory != null;
  };

  const handlePublishCategory = async () => {
    const newItemsId = [];

    if (!restaurantId || !Array.isArray(newItemsId)) {
      console.error('The restaurant ID is not set or the items is not an array');
      return;
    }

    // await the checkCategoryName function
    if (await checkCategoryName(categoryName)) {
      toast({
        title: 'Category already exists.',
        description: 'A category with this name already exists. Please choose a different name.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      return;
    }

    try {
      const newCategory = await createNewCategory(categoryName, newItemsId);
      setCategories((prevCategories) => [...prevCategories, { ...newCategory, amount: 0 }]);
      onClose();

      toast({
        title: 'Category successfully created.',
        description: 'The category was created successfully.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (error) {
      console.error('Probably this category already exists:', error);

      toast({
        title: 'Error creating category.',
        description: 'Probably this category already exists.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdmin();
      fetchCategoriesForRestaurant();
    }
  }, [isOpen]);

  return (
    <>
      <Button onClick={onOpen} width='100%' display='flex' flexDirection='column' h='70px'>
        <AddPlus />
        <Text color={localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black'} mt='6px'>
          New category
        </Text>
      </Button>

      <Modal
        size={isLilMob ? 'full' : 'xl'}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        zIndex='9999999'
      >
        <ModalOverlay />
        <ModalContent
          position='relative'
          boxSizing='content-box'
          width={['100%', '100%', '100%', '540px']}
          maxW='96%'
          maxH='568px'
        >
          <ModalCloseButton />
          <ModalBody overflow='auto'>
            <Heading fontSize='sm' fontWeight='semibold' color='neutral.black'>
              Create new category
            </Heading>
            <Box gap='32px' display='flex' flexDirection='column'>
              <Box display='flex' flexDirection='row' gap={3}>
                <InputGroup mt='20px' display='flex' flexDirection='column'>
                  <Text fontSize='3xs' fontWeight='semibold' color='neutral.black'>
                    Category name
                  </Text>
                  <Input
                    color='neutral.gray'
                    fontSize='2xs'
                    type='text'
                    placeholder='Enter category name'
                    name='categoryName'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
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
              onClick={() => onClose()}
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
              onClick={handlePublishCategory}
            >
              Publish new category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

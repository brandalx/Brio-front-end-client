import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  GridItem,
  Heading,
  Text,
  useMediaQuery,
  useDisclosure,
  Skeleton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import '../../../css/global.css';
import AddPlus from '../../../assets/svg/AddPlus';

import ModalRestaurantMenu from './ModalRestaurantMenu';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import ModalNewCategory from './ModalNewCategory';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import TrashBox from '../../../assets/svg/TrashBox';
import { useToast } from '@chakra-ui/react';

export default function CategoryMenu({ selectedCategory, onCategoryChange, categoryCounts }) {
  const [loading, setLoading] = useState(true);
  const [isTablet] = useMediaQuery('(max-width: 992px)');
  const [isMobile] = useMediaQuery('(max-width: 576px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [restaurantId, setRestaurantId] = useState();
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const toast = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const onCloseAlert = () => setIsAlertOpen(false);
  const cancelRef = useRef();

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

      setRestaurantId(adminResponse.data.restaurant);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  useEffect(() => {
    if (restaurantId) {
      fetchCategories();
    }
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    try {
      const response = await handleApiGet(API_URL + '/admin/restaurants');
      return response;
    } catch (error) {
      console.error('Error while getting restaurant:', error);
      throw error;
    }
  };

  const fetchCategories = async () => {
    try {
      const restaurants = await fetchRestaurant();
      let allCategories = [];
      for (let restaurant of restaurants) {
        if (
          restaurant &&
          restaurant.categories &&
          restaurant.categories.length > 0 &&
          restaurant._id === restaurantId
        ) {
          const response = await Promise.all(
            restaurant.categories.map((id) => handleApiGet(`${API_URL}/admin/categories/${id.toString()}`))
          );

          const filteredCategories = response.filter((category) => category.restaurantRef === restaurantId);
          const updatedCategories = filteredCategories.map((category) => ({
            ...category,
            products: Array.from(new Set(category.products))
          }));
          allCategories = [...allCategories, ...updatedCategories];
        }
      }
      setCategories(allCategories);
      setLoading(false);
      setIsCategorySelected(false);
      return allCategories;
    } catch (error) {
      console.error('err:', error);
    }
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category.categoryName, restaurantId);
    setSelectedItem(category._id);
    setIsCategorySelected(true);
  };

  const deleteCategory = async (id) => {
    const token = localStorage.getItem('x-api-key');
    try {
      // fetch the category to delete, to get its products
      const categoryResponse = await axios.get(`${API_URL}/admin/categories/${id}`, {
        headers: {
          'x-api-key': token
        }
      });

      await axios.delete(`${API_URL}/admin/categories/${id}`, {
        headers: {
          'x-api-key': token
        }
      });

      // remove products from restaurant
      await removeProductsFromRestaurant(categoryResponse.data.products);

      // If successful, update the categories state and show a toast
      fetchCategories();
      toast({
        title: 'Category deleted.',
        description: 'The category has been successfully deleted.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to delete category.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  const removeProductsFromRestaurant = async (productIds) => {
    const token = localStorage.getItem('x-api-key');
    try {
      await axios.put(
        `${API_URL}/admin/restaurants/${restaurantId}`,
        {
          operation: 'remove',
          products: productIds
        },
        {
          headers: {
            'x-api-key': token
          }
        }
      );
    } catch (error) {
      console.error('Error removing products from restaurant:', error);
    }
  };

  if (!restaurantId) {
    return null;
  }

  const handleDeleteCategory = (id) => {
    deleteCategory(id);
    onCloseAlert();
  };
  return (
    <GridItem width='100%' overflow='hidden' colSpan={4}>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Category menu
      </Text>
      {loading ? (
        <Skeleton minH='150px' maxH='300px' borderRadius='16px' />
      ) : (
        <Box w='100%' display='flex' flexDirection='column'>
          {categories &&
            categories.length > 0 &&
            categories.map((element) => (
              <Box
                position='relative' // add this line
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='start'
                key={element._id}
                ml={isMobile ? 0 : isTablet ? '8px' : 0}
                mr={isMobile ? 0 : isTablet ? '8px' : 0}
                width={isMobile ? '100%' : isTablet ? '98%' : '100%'}
                mb='12px'
                p='10px'
                border='2px'
                borderRadius='16px'
                cursor='pointer'
                bg={selectedItem === element._id ? 'primary.light' : 'white'}
                color={
                  localStorage.getItem('colormode') === 'dark'
                    ? selectedItem === element._id
                      ? 'primary.default'
                      : 'neutral.black'
                    : 'neutral.black'
                }
                borderColor={selectedItem === element._id ? 'primary.default' : 'neutral.grayLightest'}
                _hover={{
                  borderColor: 'primary.default',
                  transition: '450ms',
                  bg: 'primary.light',
                  color: localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.black'
                }}
                onClick={() => handleCategoryClick(element)}
                maxH='72px'
              >
                <Heading fontSize='2xs' fontWeight='bold'>
                  {element.categoryName.length > 0 ? element.categoryName : 'N/A'}
                </Heading>

                <Text fontSize='13px' mt='6px' fontWeight='regular' color='neutral.grayDark'>
                  {element.products.length || 0}
                </Text>
                <Button
                  onClick={() => {
                    setIsAlertOpen(true);
                    setSelectedId(element._id);
                  }}
                  position='absolute'
                  top={2}
                  right={2}
                >
                  <TrashBox />
                </Button>
              </Box>
            ))}
        </Box>
      )}

      <AlertDialog isOpen={isAlertOpen} leastDestructiveRef={cancelRef} onClose={onCloseAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this category? All the products in this category will be deleted. This
              action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => handleDeleteCategory(selectedId)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Divider mt='21px' />
      <Box width='100%' gap='4' mt='20px' display='flex' justifyContent='space-between'>
        <Box width='100%' px='5px' border='1px solid #EDEEF2' borderRadius='16px' display='flex' flexDirection='column'>
          <ModalNewCategory
            fetchCategories={fetchCategories}
            setCategories={setCategories}
            width='100%'
            display='flex'
            flexDirection='column'
            h='70px'
          />
        </Box>
        <Box width='100%' border='1px solid #EDEEF2' borderRadius='16px'>
          <Button
            onClick={onOpen}
            width='100%'
            display='flex'
            flexDirection='column'
            h='70px'
            isDisabled={!isCategorySelected}
          >
            <AddPlus />
            <Text mt='6px'>New meal</Text>
          </Button>
        </Box>
      </Box>
      <ModalRestaurantMenu
        categoryName={selectedCategory}
        categoryId={selectedItem}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </GridItem>
  );
}

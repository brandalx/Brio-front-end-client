import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  GridItem,
  Heading,
  Text,
  useMediaQuery,
  useDisclosure,
  Skeleton
} from '@chakra-ui/react';
import '../../../css/global.css';
import AddPlus from '../../../assets/svg/AddPlus';
import theme from '../../../utils/theme';
import ModalRestaurantMenu from './ModalRestaurantMenu';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import ModalNewCategory from './ModalNewCategory';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function CategoryMenu({ selectedCategory, onCategoryChange, categoryCounts }) {
  const [loading, setLoading] = useState(true);
  const [isTablet] = useMediaQuery('(max-width: 992px)');
  const [isMobile] = useMediaQuery('(max-width: 576px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [restaurantId, setRestaurantId] = useState();

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
      console.error('Error fetching restaurant data:', error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  useEffect(() => {
    console.log(restaurantId);
    if (restaurantId) {
      fetchCategories();
    }
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    try {
      const response = await handleApiGet(API_URL + '/admin/restaurants');
      return response;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw error;
    }
  };

  const fetchCategories = async () => {
    try {
      const restaurants = await fetchRestaurant();
      let allCategories = [];
      for (let restaurant of restaurants) {
        if (restaurant && restaurant.categories && restaurant.categories.length > 0) {
          const response = await Promise.all(
            restaurant.categories.map((id) => handleApiGet(`${API_URL}/admin/categories/${id.toString()}`))
          );
          allCategories = [...allCategories, ...response];
        }
      }
      setCategories(allCategories);
      setLoading(false);
      // Set the selected category as soon as the categories are fetched
      if (allCategories.length > 0) {
        const initialCategory = allCategories[0];
        // Make sure that products for this category are loaded
        if (categoryCounts[initialCategory.categoryName] && categoryCounts[initialCategory.categoryName] > 0) {
          onCategoryChange(initialCategory.categoryName);
          setSelectedItem(initialCategory._id);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch products based on the selectedCategory
  }, [selectedCategory]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleCategoryClick = (category) => {
    onCategoryChange(category.categoryName);
    setSelectedItem(category._id);
  };

  if (!restaurantId) {
    return null; // Если restaurantId не определено, возвращаем null для скрытия компонента
  }
  return (
    <GridItem width='100%' overflow='hidden' colSpan={4}>
      <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'>
        Category menu
      </Text>
      {loading ? (
        <Skeleton minH='150px' maxH='300px' borderRadius='16px' />
      ) : (
        <Box w='100%' display='flex' flexDirection='column'>
          {categories.map((element) => (
            <Box
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
              bg={selectedItem === element._id ? theme.colors.primary.light : 'white'}
              borderColor={
                selectedItem === element._id ? theme.colors.primary.default : theme.colors.neutral.grayLightest
              }
              _hover={{
                borderColor: theme.colors.primary.default,
                transition: '450ms',
                bg: theme.colors.primary.light
              }}
              onClick={() => handleCategoryClick(element)}
              maxH='72px'
            >
              <Heading fontSize='2xs' fontWeight='bold' color='neutral.black'>
                {element.categoryName.length > 0 ? element.categoryName : 'N/A'}
              </Heading>
              <Text fontSize='13px' mt='6px' fontWeight='regular' color='neutral.grayDark'>
                {categoryCounts[element.categoryName] || 0}
              </Text>
            </Box>
          ))}
        </Box>
      )}

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
          <Button onClick={onOpen} width='100%' display='flex' flexDirection='column' h='70px'>
            <AddPlus />
            <Text mt='6px'>New meal item</Text>
          </Button>
        </Box>
      </Box>
      <ModalRestaurantMenu categoryName={selectedCategory} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </GridItem>
  );
}

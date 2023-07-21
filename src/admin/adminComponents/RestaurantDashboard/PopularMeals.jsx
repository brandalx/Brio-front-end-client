import { Avatar } from '@chakra-ui/avatar';
import { Box, GridItem, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import MealCard from './MealCard';
import { Button } from '@chakra-ui/button';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function PopularMeals() {
  const [mealArray, setMealArray] = useState([]);
  const [restaurantId, setRestaurantId] = useState();
  const [showAll, setShowAll] = useState(false);

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

  const fetchOrders = async () => {
    try {
      const ordersResponse = await handleApiGet(`${API_URL}/orders`);
      const productsResponse = await handleApiGet(`${API_URL}/products`);

      const relevantOrders = ordersResponse.filter((order) => order.ordersdata.restaurants.includes(restaurantId));

      const restaurantProducts = productsResponse.filter((product) => product.restaurantId === restaurantId);

      const productsCount = {};

      // Count how many times each product has been ordered
      relevantOrders.forEach((order) => {
        order.ordersdata.products.forEach((product) => {
          if (product.restaurantId === restaurantId) {
            productsCount[product.productId] = (productsCount[product.productId] || 0) + product.amount;
          }
        });
      });

      // Ensure all products are in the productsCount object
      restaurantProducts.forEach((product) => {
        if (!productsCount[product._id]) {
          productsCount[product._id] = 0;
        }
      });

      const sortedProductIds = Object.keys(productsCount).sort((a, b) => productsCount[b] - productsCount[a]);
      const productIdsToShow = showAll ? sortedProductIds : sortedProductIds.slice(0, 3);

      console.log('All product ids: ', sortedProductIds); // Debug: print all product ids
      console.log('Product ids to show: ', productIdsToShow); // Debug: print product ids to show

      const topProducts = await Promise.allSettled(
        productIdsToShow.map((productId) => axios.get(`${API_URL}/products/${productId}`))
      );

      setMealArray(
        topProducts
          .filter((result) => result.status === 'fulfilled') // Filter out any failed promises
          .map((result, index) => ({
            image: result.value.data.image,
            title: result.value.data.title,
            amount: productsCount[sortedProductIds[index]],
            price: result.value.data.price
          }))
      );
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchOrders();
    }
  }, [restaurantId, showAll]);

  return (
    <GridItem w='100%'>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Popular meals
        </Text>
        <Box mt={4}>
          {mealArray.map((item, index) => {
            return (
              <MealCard key={index} image={item.image} title={item.title} amount={item.amount} price={item.price} />
            );
          })}
        </Box>
        <Button
          onClick={() => setShowAll(!showAll)}
          mx='auto'
          mt={4}
          w='100%'
          background='neutral.white'
          fontSize='2xs'
          fontWeight='bold'
          variant='solid'
          color='neutral.gray'
          borderWidth='1px'
          borderColor='neutral.gray'
          _hover={{
            background: 'primary.default',
            color: 'neutral.white',
            borderWidth: '1px',
            borderColor: 'primary.default'
          }}
          py={5}
        >
          {showAll ? 'Show less meals' : 'Show all meals'}
        </Button>
      </Box>
    </GridItem>
  );
}

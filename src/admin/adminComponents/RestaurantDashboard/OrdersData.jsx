import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import Notification from '../../../assets/svg/Notification';
import OrdersRecived from '../../../assets/svg/OrdersRecived';
import OrdersDelivered from '../../../assets/svg/OrdersDelivered';
import Revenue from '../../../assets/svg/Revenue';
import axios from 'axios';
import { API_URL } from '../../../services/apiServices';
import jwtDecode from 'jwt-decode';

export default function OrdersData({ setCurrentType, ordersRecived, ordersDelivered, orderRevenue }) {
  const [orders, setOrders] = useState(0);
  const [receivedOrders, setReceivedOrder] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [restaurantId, setRestaurantId] = useState();
  const [selectedType, setSelectedType] = useState('ordersRecived');

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

  const fetchOrders = async () => {
    let orderCount = 0;
    let orderReceivedCount = 0;
    let revenueCount = 0;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    try {
      const token = localStorage.getItem('x-api-key');
      const response = await axios.get(`${API_URL}/orders`, {
        headers: {
          'x-api-key': token
        }
      });

      if (response.status === 200) {
        response.data.forEach((order) => {
          const orderDate = new Date(order.creationDate);
          const orderDateStr = orderDate.toISOString().split('T')[0];

          if (
            order.ordersdata.restaurants.includes(restaurantId) &&
            order.userdata.status === 'Placed' &&
            orderDateStr === todayStr
          ) {
            orderCount++;
          }

          if (
            order.ordersdata.restaurants.includes(restaurantId) &&
            order.userdata.status === 'Completed' &&
            orderDateStr === todayStr
          ) {
            orderReceivedCount++;
          }

          if (orderDateStr === todayStr && order.userdata.status === 'Completed') {
            order.ordersdata.products.forEach((product) => {
              if (product.restaurantId === restaurantId) {
                revenueCount += product.priceItem;
              }
            });
          }
        });

        setOrders(orderCount);
        setReceivedOrder(orderReceivedCount);
        setRevenue(revenueCount);
      } else {
        console.error('Error fetching orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orders, ordersRecived, revenue, restaurantId]);

  useEffect(() => {
    fetchRestaurantData();
  }, []);
  ///////

  return (
    <Grid templateColumns={{ base: '1fr ', md: '1fr 1fr 1fr ' }} gap={{ base: 2, md: 6 }}>
      <GridItem w='100%'>
        <Box
          _hover={{ cursor: 'pointer', transition: 'all 0.3s', bg: 'secondary.light', borderColor: 'secondary.light' }}
          _active={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: 'secondary.light',
            borderColor: 'secondary.default'
          }}
          borderRadius='16px'
          mb='12px'
          p='0px'
          transition='all 0.3s'
          borderWidth='1px'
          bg='neutral.white'
          onClick={() => setCurrentType('ordersRecived')}
        >
          <Flex alignItems='center'>
            <Box me={4} p={3} borderRadius={12}>
              <Box
                ml='4px'
                bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'secondary.light')}
                color='black'
                px={'8px'}
                py={'7.5px'}
                borderRadius='16px'
                position='relative'
              >
                <Box p='6px'>
                  <OrdersRecived />
                </Box>
              </Box>
            </Box>
            <Box>
              <Heading
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark')}
                fontSize='2xs'
                fontWeight='bold'
              >
                {orders}
              </Heading>

              <Text
                fontSize='3xs'
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark')}
              >
                Orders received
              </Text>
            </Box>
          </Flex>
        </Box>
      </GridItem>
      <GridItem w='100%'>
        <Box
          onClick={() => setCurrentType('ordersDelivered')}
          _hover={{ cursor: 'pointer', transition: 'all 0.3s', bg: 'tertiary.light', borderColor: 'tertiary.light' }}
          _active={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: 'tertiary.light',
            borderColor: 'tertiary.default'
          }}
          borderRadius='16px'
          mb='12px'
          p='0px'
          transition='all 0.3s'
          borderWidth='1px'
          bg='neutral.white'
        >
          <Flex alignItems='center'>
            <Box me={4} p={3} borderRadius={12}>
              <Box
                ml='4px'
                bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'tertiary.light')}
                color='black'
                px={'8px'}
                py={'7.5px'}
                borderRadius='16px'
                position='relative'
              >
                <Box p='6px'>
                  <OrdersDelivered />
                </Box>
              </Box>
            </Box>
            <Box>
              <Heading
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark')}
                fontSize='2xs'
                fontWeight='bold'
              >
                {receivedOrders}
              </Heading>
              <Text
                fontSize='3xs'
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark')}
              >
                Orders delivered
              </Text>
            </Box>
          </Flex>
        </Box>
      </GridItem>
      <GridItem w='100%'>
        <Box
          onClick={() => setCurrentType('orderRevenue')}
          _hover={{ cursor: 'pointer', transition: 'all 0.3s', bg: 'primary.light', borderColor: 'primary.light' }}
          _active={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: 'primary.light',
            borderColor: 'primary.default'
          }}
          borderRadius='16px'
          mb='12px'
          p='0px'
          transition='all 0.3s'
          borderWidth='1px'
          bg='neutral.white'
        >
          <Flex alignItems='center'>
            <Box me={4} p={3} borderRadius={12}>
              <Box
                ml='4px'
                bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.light')}
                color='black'
                px={'8px'}
                py={'7.5px'}
                borderRadius='16px'
                position='relative'
              >
                <Box p='6px'>
                  <Revenue />
                </Box>
              </Box>
            </Box>
            <Box>
              <Heading
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark')}
                fontSize='2xs'
                fontWeight='bold'
              >
                ${revenue}
              </Heading>
              <Text
                fontSize='3xs'
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark')}
              >
                Revenue today
              </Text>
            </Box>
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  );
}

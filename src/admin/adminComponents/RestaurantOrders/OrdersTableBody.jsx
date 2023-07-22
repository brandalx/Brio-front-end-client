import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Tbody,
  Td,
  Tr,
  useMediaQuery
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Status from '../../../assets/svg/Status';
import ThreeDots from '../../../assets/svg/ThreeDots';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function OrdersTableBody() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [ordersOfUsers, setOrdersOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [userId, setUserId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantProducts, setRestaurantProducts] = useState([]);
  const [relevantOrders, setRelevantOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userArr, setUserArr] = useState([]);
  const [usersArr, setUsersArr] = useState([]);

  let handleUsersPublicData = async (_commentsdata) => {
    try {
      if (_commentsdata.length > 0) {
        let allUsers = [];
        const response = await Promise.all(
          _commentsdata.map((item) => handleApiGet(`${API_URL}/users/info/public/user/${item._id.toString()}`))
        );
        allUsers = [...allUsers, ...response];
        setUsersArr(allUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserApi = async () => {
    const url2 = API_URL + '/users/getAllUsers';
    try {
      const data2 = await handleApiGet(url2);
      if (Array.isArray(data2)) {
        setUserArr(data2);
        await handleUsersPublicData(data2);
      } else {
        console.error('Data from API is not an array:', data2);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let getUserName = (userid) => {
    try {
      if (Array.isArray(usersArr)) {
        const user = usersArr.find((item) => item._id === userid);
        if (user) {
          return user.firstname + ' ' + user.lastname;
        }
      }
      return '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  let getUserAvatar = (userid) => {
    try {
      const user = userArr.find((item) => item._id === userid);
      if (user) {
        // check if user exists
        if (user.avatar) {
          // check if avatar exists
          let stringAvatar = API_URL + (API_URL.endsWith('/') ? '' : '/') + user.avatar;
          // console.log(`Avatar URL for user ${userid}: `, stringAvatar);
          return stringAvatar;
        } else {
          // console.log(`No avatar found for user ${userid}`);
        }
      } else {
        console.log(`No user found for ID ${userid}`);
      }
      return '';
    } catch (error) {
      console.log('Error in getUserAvatar: ', error);
      return '';
    }
  };

  const fetchProductData = async (productId) => {
    try {
      const productResponse = await axios.get(`${API_URL}/products/${productId}`);
      return productResponse.data;
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const onClose = () => setIsOpen(false);

  useEffect(() => {
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

        setUserId(userId);
        setRestaurantId(adminResponse.data.restaurant);
        await handleUserApi();
        if (adminResponse.data.restaurant && Array.isArray(adminResponse.data.restaurant.products)) {
          setRestaurantProducts(adminResponse.data.restaurant.products.map((product) => product.$oid));
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, []);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchAll = async () => {
      try {
        const ordersPromise = handleApiGet(API_URL + '/orders/');
        const usersPromise = handleApiGet(API_URL + '/users/getAllUsers');

        const [ordersResponse, usersResponse] = await Promise.all([ordersPromise, usersPromise]);

        if (Array.isArray(ordersResponse)) {
          const filteredOrders = ordersResponse
            .filter((order) => order.ordersdata.restaurants.includes(restaurantId))
            .map((order) => {
              const relevantProducts = order.ordersdata.products.filter(
                (product) => product.restaurantId === restaurantId
              );
              const newOrder = { ...order, ordersdata: { ...order.ordersdata, products: relevantProducts } };
              return newOrder;
            });

          const productIds = new Set(
            filteredOrders.flatMap((order) => order.ordersdata.products.map((product) => product.productId))
          );

          const productPromises = Array.from(productIds).map(fetchProductData);
          const products = await Promise.all(productPromises);

          setProducts(products);

          const ordersWithTotalSpent = filteredOrders.map((order) => {
            const productsCost = order.ordersdata.products.reduce((total, product) => {
              const relatedProduct = products.find(
                (p) => p._id === product.productId && product.restaurantId === restaurantId
              );
              return total + (relatedProduct ? product.priceItem : 0);
            }, 0);

            // Adding the shipping and tips to the total cost of products
            const totalAmount = productsCost.toFixed(2);
            // console.log('Fetched products: ', products);

            // Add the totalAmount to the order object itself
            return { ...order, totalSpent: totalAmount };
          });

          setRelevantOrders(ordersWithTotalSpent);
          // console.log('Filtered orders with total spent: ', ordersWithTotalSpent);
        }

        setOrdersOfUsers(usersResponse);
        // console.log('orders of users: ', ordersOfUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchAll();
  }, [restaurantId]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  if (loading) {
    return (
      <Tbody>
        {[...Array(3)].map((_, index) => (
          <Tr key={index} borderBottom='1px solid' borderColor='#EBF1FE'>
            <Td>
              <Skeleton height='20px' borderRadius='8px' />
            </Td>
            <Td>
              <Skeleton height='20px' borderRadius='8px' />
            </Td>
            <Td>
              <Skeleton height='20px' borderRadius='8px' />
            </Td>
            <Td>
              <Skeleton height='20px' borderRadius='8px' />
            </Td>
            <Td>
              <Skeleton height='20px' borderRadius='8px' />
            </Td>
            <Td>
              <Skeleton height='20px' borderRadius='8px' />
            </Td>
            <Td>
              <Skeleton height='20px' borderRadius='8px' />
            </Td>
          </Tr>
        ))}
      </Tbody>
    );
  }

  return (
    <Tbody>
      {relevantOrders.map((order, index) => {
        const user = ordersOfUsers.find((u) => u._id === order.userRef) || {};
        if (!user || !user.address || !user.address[0]) return null;

        return (
          <Tr key={index} borderBottom='1px solid' borderColor='#EBF1FE'>
            <Td
              pl={isMobile ? '10px' : ''}
              pt='19.5px'
              pb='19.5px'
              fontSize='2xs'
              color='neutral.grayDark'
              textOverflow='ellipsis'
              maxW='100px'
            >
              {order._id.slice(-5)}
            </Td>
            <Td
              justifyContent='start'
              flexDirection='row-reverse'
              display={isTablet ? 'none' : 'flex'}
              alignItems='center'
              pt='19.5px'
              pb='19.5px'
              fontSize='2xs'
              color='neutral.grayDark'
              fontWeight='semibold'
              border='none'
            >
              {user.firstname} {user.lastname}
              <Box mr='12px' w='42px' h='42px'>
                <Avatar size='md' name={getUserName(user._id)} src={getUserAvatar(user._id)} />
              </Box>
            </Td>
            <Td display={isMobile ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {`${user.address[0].address1}`}
            </Td>

            <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {formatDate(order.creationDate)}
            </Td>
            <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {new Date(order.creationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Td>

            <Td
              pr={isMobile ? '0' : ''}
              pl={isMobile ? '5px' : ''}
              pt='10px'
              pb='10px'
              fontSize='2.5xs'
              color='neutral.black'
              fontWeight='semibold'
            >
              <Flex alignItems='center'>
                <Box as='span' me={2}>
                  <Status
                    color={
                      order.userdata.status === 'Completed'
                        ? '#1ABF70'
                        : order.userdata.status === 'In progress'
                        ? '#4E60FF'
                        : order.userdata.status === 'Cancelled'
                        ? '#FF5C60'
                        : order.userdata.status === 'Placed'
                        ? '#22E57A'
                        : 'yellow'
                    }
                  />
                </Box>
                {order.userdata.status}
              </Flex>
            </Td>
            <Td
              pr={isMobile ? '0' : ''}
              pl={isMobile ? '5px' : ''}
              pt='10px'
              pb='10px'
              fontSize='2.5xs'
              color='neutral.black'
              fontWeight='semibold'
              textAlign='center'
            >
              ${order.totalSpent || 0}
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
}

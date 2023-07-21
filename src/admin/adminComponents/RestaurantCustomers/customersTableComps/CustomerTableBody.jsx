import {
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
import Status from '../../../../assets/svg/Status';
import ThreeDots from '../../../../assets/svg/ThreeDots';
import { API_URL, handleApiGet } from '../../../../services/apiServices';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function CustomerTableBody() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [restaurantId, setRestaurantId] = React.useState(null);
  const { userId } = useParams();
  const [isDekstop] = useMediaQuery('(min-width: 1200px)');

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

  const onClose = () => setIsOpen(false);
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('x-api-key');

      const response = await handleApiGet(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token
        }
      });

      if (response && response.orders) {
        const orders = response.orders.filter((order) => order.restaurant.includes(restaurantId));
        let newOrders = [];
        for (let order of orders) {
          let productsFromThisRestaurant = [];
          const responseToOrder = await handleApiGet(`${API_URL}/admin/orders/${order.orderRef}`);

          if (responseToOrder && responseToOrder.ordersdata) {
            console.log('responseToOrder.data: ', responseToOrder.ordersdata);

            console.log('responseToOrder.ordersdata.products: ', responseToOrder.ordersdata.products);
            productsFromThisRestaurant = responseToOrder.ordersdata.products.filter(
              (product) => product.restaurantId === restaurantId
            );
          }
          console.log('productsFromThisRestaurant: ', productsFromThisRestaurant);
          if (productsFromThisRestaurant.length > 0) {
            const totalAmount = productsFromThisRestaurant.reduce((total, product) => total + product.priceItem, 0);
            let newOrder = {
              ...order,
              totalAmountSpent: totalAmount,
              status: responseToOrder.userdata.status
            };
            newOrders.push(newOrder);
          }
        }

        let userWithOrderTotals = { ...response.data, orders: newOrders };
        setUser(userWithOrderTotals);
      } else {
        console.error('Orders not found in user data');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [restaurantId, userId]);

  if (loading) {
    return (
      <Tbody>
        <Tr>
          <Td>
            <Skeleton height='20px' />
          </Td>
          <Td display={isMobile ? 'none' : ''}>
            <Skeleton height='20px' />
          </Td>
          <Td display={isTablet ? 'none' : ''}>
            <Skeleton height='20px' />
          </Td>
          <Td display={isMobile ? 'none' : ''}>
            <Skeleton height='20px' />
          </Td>
          <Td display={isTablet ? 'none' : ''}>
            <Skeleton height='20px' />
          </Td>
          <Td display={isTablet ? 'none' : ''}>
            <Skeleton height='20px' />
          </Td>
        </Tr>
      </Tbody>
    );
  }

  return (
    <Tbody>
      {user &&
        Array.isArray(user.orders) &&
        user.orders.map((order) => (
          <Tr key={order._id} transition='all 0.2s' _hover={{ bg: 'bg', transition: 'all 0.2s', cursor: 'pointer' }}>
            <Td
              pl={isMobile ? '10px' : ''}
              pt='19.5px'
              pb='19.5px'
              fontSize='2xs'
              color='neutral.grayDark'
              maxW='100px'
            >
              {order.orderRef.slice(-5)}
            </Td>
            <Td
              display={{ base: 'none', sm: 'table-cell' }}
              pt='19.5px'
              pb='19.5px'
              fontSize='2xs'
              color='neutral.grayDark'
            >
              {new Date(order.creationDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </Td>
            <Td
              display={{ base: 'none', md: 'table-cell' }}
              pt='19.5px'
              pb='19.5px'
              fontSize='2xs'
              color='neutral.grayDark'
            >
              {new Date(order.creationDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
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
                      order.status === 'Completed'
                        ? '#1ABF70'
                        : order.status === 'In progress'
                        ? '#4E60FF'
                        : order.status === 'Cancelled'
                        ? '#FF5C60'
                        : order.status === 'Placed'
                        ? '#22E57A'
                        : 'yellow'
                    }
                  />
                </Box>
                {order.status}
              </Flex>
            </Td>
            <Td
              pl={isMobile ? '0' : ''}
              pr={isMobile ? '0' : ''}
              textAlign='center'
              pt='10px'
              pb='10px'
              fontSize='2.5xs'
              color='neutral.black'
              fontWeight='semibold'
            >
              ${order.totalAmountSpent}
            </Td>

            <Td
              position={isMobile ? 'relative' : ''}
              right={isMobile ? '10px' : '0'}
              pl={0}
              pr={0}
              pt='10px'
              pb='10px'
              fontSize='2xs'
              fontWeight='bold'
              color='neutral.black'
            >
              <IconButton
                icon={<ThreeDots />}
                onClick={() => {
                  if (order.status === 'Canceled') {
                    setIsOpen(true);
                    setSelectedOrder(order);
                  }
                }}
              />
              <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} zIndex='9999999'>
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
                  <ModalHeader>Order Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>{/* Display order details here */}</ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant='ghost' onClick={() => {}}>
                      Re-Order
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Td>
          </Tr>
        ))}
    </Tbody>
  );
}

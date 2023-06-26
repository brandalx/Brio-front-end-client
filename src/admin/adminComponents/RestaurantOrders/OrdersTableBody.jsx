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

  const onClose = () => setIsOpen(false);

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token // Это где вы устанавливаете заголовок с токеном
        }
      });

      // Проверяем, есть ли у ресторана продукты
      if (response.data.restaurant && Array.isArray(response.data.restaurant.products)) {
        if (Array.isArray(response.data.restaurant.products)) {
          setRestaurantId(response.data.restaurant._id);
          setUserId(userId);
          setRestaurantProducts(response.data.restaurant.products.map((product) => product._id));
          return response.data.restaurant._id; // Возвращаем restaurantId для использования в fetchOrders
        }
      } else {
        throw new Error('Restaurant does not have products or the data structure is different');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await handleApiGet(API_URL + '/orders/');

      if (Array.isArray(response)) {
        console.log(response);

        const filteredOrders = response
          .filter((order) => order.ordersdata.restaurants.includes(restaurantId))
          .map((order) => {
            return {
              ...order,
              ordersdata: {
                ...order.ordersdata,
                products: order.ordersdata.products.filter((product) => restaurantProducts.includes(product.productId))
              }
            };
          })
          .filter((order) => order.ordersdata.products.length > 0);

        setRelevantOrders(filteredOrders);
      } else {
        throw new Error('Response is not an array or the data structure is different');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await handleApiGet(API_URL + '/users/getAllUsers');

      setOrdersOfUsers(response);
      console.log(ordersOfUsers);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    console.log(relevantOrders);
    console.log('relevantOrders');
  }, [relevantOrders]);

  useEffect(() => {
    fetchUsers();
    fetchAdmin().then((restaurantId) => fetchOrders(restaurantId));
  }, []);

  return (
    <Tbody>
      {Array.isArray(relevantOrders) &&
        relevantOrders.map((order, index) => (
          <Tr key={index} borderBottom='1px solid' borderColor='#EBF1FE'>
            <Td
              pl={isMobile ? '10px' : ''}
              pt='19.5px'
              pb='19.5px'
              fontSize='2xs'
              color='neutral.grayDark'
              textOverflow='ellipsis'
              overflow='hidden'
              whiteSpace='nowrap'
              maxW='100px'
            >
              {order.orderId}
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
            >
              {user.firstname} {user.lastname}
              <Box mr='12px' w='42px' h='42px'>
                <Image w='100%' h='100%' borderRadius='full' src={user.avatar} />
              </Box>
            </Td>
            <Td display={isMobile ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {user.address[0].city}
            </Td>

            <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {order.creationDate}
            </Td>
            <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {new Date(order.creationTime).toDateString() +
                ' ' +
                new Date(order.creationTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                        : order.status === 'Canceled'
                        ? '#FF5C60'
                        : order.status === 'Suspended'
                        ? '#FF5C60'
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
              {order.paymentSummary.totalAmount} {/* here's the total amount spent per order */}
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
                    <Button
                      variant='ghost'
                      onClick={() => {
                        /* re-order request logic */
                      }}
                    >
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

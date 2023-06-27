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
  const [usersTotalSpent, setUsersTotalSpent] = useState([]);
  const [products, setProducts] = useState([]);

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

        console.log('User ID:', userId);
        console.log('Admin Response:', adminResponse);

        setUserId(userId);
        setRestaurantId(adminResponse.data.restaurant);

        console.log('Set Restaurant ID:', adminResponse.data.restaurant);

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

        console.log('Orders Response:', ordersResponse);
        console.log('Users Response:', usersResponse);

        if (Array.isArray(ordersResponse)) {
          console.log('Orders Response is an array with length:', ordersResponse.length);

          const filteredOrders = ordersResponse
            .filter((order) => {
              console.log('Checking if restaurant ID exists in order:', order);

              const doesExist = order.ordersdata.restaurants.includes(restaurantId);
              console.log('Does restaurant exist in this order:', doesExist);

              return doesExist;
            })
            .map((order) => {
              console.log('Mapping order:', order);

              const relevantProducts = order.ordersdata.products.filter((product) => {
                console.log('Checking if product belongs to restaurant:', product);

                const doesBelong = product.restaurantId === restaurantId;
                console.log('Does product belong to this restaurant:', doesBelong);

                return doesBelong;
              });

              console.log('Relevant Products:', relevantProducts);

              const newOrder = { ...order, ordersdata: { ...order.ordersdata, products: relevantProducts } };
              console.log('New order:', newOrder);

              return newOrder;
            });

          console.log('Filtered Orders:', filteredOrders);
          setRelevantOrders(filteredOrders);

          const productIds = new Set(
            filteredOrders.flatMap((order) => order.ordersdata.products.map((product) => product.productId))
          );

          const productPromises = Array.from(productIds).map(fetchProductData);
          const products = await Promise.all(productPromises);

          setProducts(products);

          const usersTotalSpent = filteredOrders.reduce((acc, order) => {
            const userId = order.userRef;
            const totalAmount = order.ordersdata.products.reduce((total, product) => {
              const relatedProduct = products.find((p) => p._id === product.productId);
              return total + (relatedProduct ? relatedProduct.price * product.amount : 0);
            }, 0);
            const foundUser = acc.find((user) => user.id === userId);

            if (foundUser) {
              foundUser.totalSpent += totalAmount;
            } else {
              acc.push({ id: userId, totalSpent: totalAmount });
            }

            return acc;
          }, []);

          setUsersTotalSpent(usersTotalSpent);
          console.log('Пользователи и общая потраченная сумма:', usersTotalSpent);
        }

        setOrdersOfUsers(usersResponse);

        console.log('Orders of Users:', ordersOfUsers);
        console.log('Relevant Orders:', relevantOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchAll();
  }, [restaurantId]);

  useEffect(() => {
    console.log('Relevant Orders:', relevantOrders);
  }, [relevantOrders]);

  return (
    <Tbody>
      {Array.isArray(relevantOrders) &&
        relevantOrders.map((order, index) => {
          const user = ordersOfUsers.find((u) => u._id === order.userRef);
          if (!user) return null;

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
                {new Date(order.creationDate).toDateString() +
                  ' ' +
                  new Date(order.creationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                  {order.userdata.status}
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
                {usersTotalSpent.find((user) => user.id === order.userRef)?.totalSpent || 0}
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
          );
        })}
    </Tbody>
  );
}

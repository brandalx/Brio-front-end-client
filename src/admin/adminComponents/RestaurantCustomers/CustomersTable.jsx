import {
  Avatar,
  Box,
  Button,
  IconButton,
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
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';

export default function CustomersTable() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const [isBetween] = useMediaQuery('(min-width: 576px) and (max-width: 600px)');
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [usersArr, setUsersArr] = useState([]);
  const [userArr, setUserArr] = useState([]);
  const [loadingCount, setLoadingCount] = useState(0); // New loading count state variable

  ///////////Avatar logic
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

  useEffect(() => {
    handleUserApi();
  }, []);
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
          return stringAvatar;
        } else {
          console.log(`No avatar found for user ${userid}`);
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

  ////////////

  const OverlayOne = () => <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(3px) hue-rotate(90deg)' />;
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [openModalId, setOpenModalId] = useState(null);
  const handleOpenModal = (userId) => {
    setIsOpen(true);
    setOpenModalId(userId);
  };

  const handleCheckAccount = () => {
    if (openModalId) {
      navigate(`/admin/restaurant/customers/${openModalId}`);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setOpenModalId(null);
  };
  const fetchRestaurantData = async () => {
    setLoadingCount((count) => count + 1); // Increment loading count

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
      // console.log('Restaurant Id has been fetched: ', adminResponse.data.restaurant);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    } finally {
      setLoadingCount((count) => count - 1);
    }
  };

  const fetchUsersData = async () => {
    setLoadingCount((count) => count + 1);

    try {
      const token = localStorage.getItem('x-api-key');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const usersResponse = await axios.get(`${API_URL}/users/getAllUsers`, {
        headers: {
          'x-api-key': token
        }
      });

      const allUsers = usersResponse.data;
      const usersWithOrdersInMyRestaurant = [];

      const usersPromises = allUsers.map(async (user) => {
        let totalSpentInMyRestaurant = 0;
        let hasOrderedInMyRestaurant = false;

        if (user.orders) {
          const ordersPromises = user.orders.map(async (order) => {
            if (order.restaurant.includes(restaurantId)) {
              try {
                const orderResponse = await axios.get(`${API_URL}/orders/${order.orderRef}`, {
                  headers: {
                    'x-api-key': token
                  }
                });
                const orderData = orderResponse.data;
                orderData.ordersdata.products.forEach((product) => {
                  if (product.restaurantId === restaurantId && orderData.userdata.status === 'Completed') {
                    totalSpentInMyRestaurant += product.priceItem;
                    hasOrderedInMyRestaurant = true;
                  }
                });
              } catch (error) {
                if (error.response && error.response.status === 404) {
                  console.log(`Order ${order.orderRef} not found`); // Log the not found order
                } else {
                  throw error;
                }
              }
            }
          });

          await Promise.all(ordersPromises);
        }

        if (hasOrderedInMyRestaurant) {
          user.totalSpent = totalSpentInMyRestaurant;
          usersWithOrdersInMyRestaurant.push(user);
        }
      });

      await Promise.all(usersPromises);

      setUsers(usersWithOrdersInMyRestaurant);
    } catch (error) {
      console.error('Error fetching users data:', error);
    } finally {
      setLoadingCount((count) => count - 1);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [restaurantId]);

  let loading = loadingCount > 0;

  useEffect(() => {
    Promise.all([fetchRestaurantData(), fetchUsersData()]).catch((error) => {
      // console.error('Error fetching data:', error);
      setLoadingCount((count) => count - 1);
    });
  }, [restaurantId]);

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
          <Td display={isTablet ? 'none' : ''}>
            <Skeleton height='20px' />
          </Td>
        </Tr>
      </Tbody>
    );
  }

  return (
    <Tbody>
      {Array.isArray(users) &&
        users.map((user) => {
          const mostRecentOrder = user.orders.reduce((recent, order) => {
            return new Date(recent.creationDate) > new Date(order.creationDate) ? recent : order;
          }, user.orders[0]);

          return (
            <Tr
              key={user._id} // Use user's _id as key instead of order's _id
              transition='all 0.2s'
              _hover={{ bg: 'bg', transition: 'all 0.2s', cursor: 'pointer' }}
            >
              <Td
                justifyContent='start'
                flexDirection='row-reverse'
                display={'flex'}
                alignItems='center'
                pt='19.5px'
                pb='19.5px'
                fontSize='2xs'
                color='neutral.grayDark'
                fontWeight='semibold'
              >
                {user.firstname} {user.lastname}
                <Box mr='12px' w='42px' h='42px'>
                  <Avatar size='md' name={getUserName(user._id)} src={getUserAvatar(user._id)} />
                </Box>
              </Td>
              <Td display={isMobile ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                {user.phone}
              </Td>

              <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                {user.email}
              </Td>
              <Td display={isMobile ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                {mostRecentOrder &&
                  mostRecentOrder.creationDate &&
                  new Date(mostRecentOrder.creationDate).toLocaleDateString('en-US', options)}
              </Td>

              <Td
                display={isTablet ? 'none' : ''}
                pr={isMobile ? '0' : ''}
                pl={isMobile ? '5px' : ''}
                pt='10px'
                pb='10px'
                fontSize='2.5xs'
                color='neutral.grayDark'
              >
                {user.orders.filter((order) => order.restaurant.includes(restaurantId)).length}
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
                ${user.totalSpent.toFixed(2)}
              </Td>

              <Td
                position='relative'
                left={isMobile || isBetween ? '-20px' : '0'}
                pl={0}
                pr={0}
                pt='10px'
                pb='10px'
                fontSize='2xs'
                fontWeight='bold'
                color='neutral.black'
              >
                <IconButton icon={<ThreeDots />} onClick={() => handleOpenModal(user._id)} />
                <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} zIndex='9999999'>
                  {overlay}

                  <ModalContent
                    position='relative'
                    boxSizing='content-box'
                    width={['100%', '100%', '100%', '540px']}
                    maxW='96%'
                    MaxH='568px'
                  >
                    <ModalHeader>Customers details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{/* Display order details here */}</ModalBody>
                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant='ghost' onClick={handleCheckAccount}>
                        Check customers account
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

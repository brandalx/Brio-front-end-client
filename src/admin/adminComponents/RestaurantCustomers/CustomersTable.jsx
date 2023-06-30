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
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';

export default function CustomersTable() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const [isBetween] = useMediaQuery('(min-width: 576px) and (max-width: 600px)');
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
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
      console.log('Restaurant Id has been fetched: ', adminResponse.data.restaurant); // добавлено логирование
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  // Добавим пустой массив в качестве зависимостей для вызова только при первом рендере
  useEffect(() => {
    fetchRestaurantData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (restaurantId) {
        console.log('Fetching users with orders from restaurant: ', restaurantId); // добавлено логирование
        try {
          const usersResponse = await handleApiGet(`${API_URL}/users/getAllUsers`);
          console.log('Fetched all users: ', usersResponse); // добавлено логирование
          const users = usersResponse;

          if (users && Array.isArray(users)) {
            const filteredUsers = users.filter((user) => {
              // Проверяем, есть ли у пользователя заказы из этого ресторана
              return (
                user.orders && user.orders.some((order) => order.restaurant && order.restaurant.includes(restaurantId))
              );
            });

            setUsers(filteredUsers);
            console.log('Filtered users: ', filteredUsers); // добавлено логирование
            setLoading(false);
          } else {
            console.error('Unexpected data structure:', usersResponse);
          }
        } catch (error) {
          console.error('Error fetching orders or users:', error);
        }
      }
    };

    fetchOrders();
  }, [restaurantId]);

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
                  <Avatar w='100%' h='100%' borderRadius='full' src={''} name={user.firstname + ' ' + user.lastname} />
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
                {user.orders.length}
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
                $
                {(user.orders.reduce((sum, order) => {
                  if (order.status !== 'Canceled') {
                    return sum + order.paymentSummary.totalAmount;
                  } else {
                    return sum;
                  }
                }, 0)).toFixed(2)}
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

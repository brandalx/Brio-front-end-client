import {
  Box,
  Flex,
  IconButton,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMediaQuery
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Status from '../../../assets/svg/Status';
import { arrUsers } from '../../adminJSON/adminListOfUsers';
import ThreeDots from '../../../assets/svg/ThreeDots';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import { IoMdArrowForward } from 'react-icons/all';

export default function OrdersTableBody() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [ordersOfUsers, setOrdersOfUsers] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await handleApiGet(API_URL + '/users/getAllUsers');
      setOrdersOfUsers(response);
      console.log(ordersOfUsers);
      console.log(response);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Tbody>
      {Array.isArray(ordersOfUsers) &&
        ordersOfUsers.map((user) => {
          return user.orders.map((order) => {
            return (
              <Tr
                key={order._id}
                transition='all 0.2s'
                _hover={{ bg: 'bg', transition: 'all 0.2s', cursor: 'pointer' }}
              >
                <Td pl={isMobile ? '10px' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
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
                  <Box mr='12px' w='36px' h='36px'>
                    <Image
                      w='100%'
                      h='100%'
                      borderRadius='full'
                      src='https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    />
                  </Box>
                </Td>
                <Td display={isMobile ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                  {user.address[0].city}
                </Td>

                <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                  {order.creationDate}
                </Td>
                <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                  {order.creationTime}
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
                  <ThreeDots />
                </Td>
              </Tr>
            );
          });
        })}
    </Tbody>
  );
}

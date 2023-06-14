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
import { useNavigate, useParams } from 'react-router-dom';

export default function CustomersTable() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [ordersOfUsers, setOrdersOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const [isBetween] = useMediaQuery('(min-width: 576px) and (max-width: 600px)');
  const navigate = useNavigate();

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

  const fetchOrders = async () => {
    try {
      const response = await handleApiGet(API_URL + '/users/getAllUsers');

      setOrdersOfUsers(response);

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
          const mostRecentOrder = user.orders.reduce((recent, order) => {
            return new Date(recent.creationTime) > new Date(order.creationTime) ? recent : order;
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
                  <Image
                    w='100%'
                    h='100%'
                    borderRadius='full'
                    src='https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  />
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
                  mostRecentOrder.creationTime &&
                  new Date(mostRecentOrder.creationTime).toLocaleDateString('en-US', options)}
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
                {user.orders.reduce((sum, order) => {
                  if (order.status !== 'Canceled') {
                    return sum + order.paymentSummary.totalAmount;
                  } else {
                    return sum;
                  }
                }, 0)}
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

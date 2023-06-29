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

export default function CustomerTableBody() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const { userId } = useParams();
  const [isDekstop] = useMediaQuery('(min-width: 1200px)');

  const onClose = () => setIsOpen(false);
  const fetchOrders = async () => {
    try {
      const response = await handleApiGet(`${API_URL}/users/${userId}`);

      setUser(response);

      // setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
              {order._id.slice(-5)}
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
              ${order.paymentSummary.totalAmount}
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

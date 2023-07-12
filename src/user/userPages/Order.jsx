import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  CSSReset,
  Text,
  GridItem,
  VStack,
  Image,
  useMediaQuery,
  Stack,
  Divider,
  Icon,
  Skeleton,
  useToast,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter
} from '@chakra-ui/react';
import { Menu as NewMenu } from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaChevronLeft } from 'react-icons/fa';
import Location from '../../assets/svg/Location';
import ImageGallery from 'react-image-gallery';
import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { API_URL, handleApiGet, handleApiMethod } from '../../services/apiServices';
import Menu from '../userComponents/Order/Menu';
import Pickup from '../userComponents/Cart/Pickup';
import PaymentDetails from '../userComponents/Order/PaymentDetails';
import OrderStatus from '../../assets/svg/OrderStatus';
import colorstatus from '../userComponents/UserOrdrs/colorsObject.json';
import Status from '../../assets/svg/Status';
import Calendar from '../../assets/svg/Calendar';
import Shipping from '../userComponents/Order/Shipping';
import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';
export default function Order() {
  const [placed, setPlaced] = useState(true);
  const [prepared, setPrepared] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userArr, setUserArr] = useState([]);
  const [ordersArr, setOrdersArr] = useState([]);
  const [ordersArr2, setOrdersArr2] = useState([]);
  const [restaurantArr, setRestaurantArr] = useState([]);
  const [addressString, setAddressString] = useState(null);
  const [addressStringToPrint, setAddressStringToPrint] = useState();
  const [isSelf, setIsSelf] = useState(false);

  const handleDefineAddress = (orderitem, useritem, restaurantitem) => {
    let finaladdress = orderitem.userdata.selectedAddress;
    console.log(finaladdress);
    console.log('ok');

    let finaladdressobj = useritem.address.find((address) => address._id === finaladdress);
    if (finaladdressobj) {
      finaladdressobj =
        finaladdressobj.state +
        '%20' +
        finaladdressobj.city +
        '%20' +
        finaladdressobj.address1 +
        '%20' +
        finaladdressobj.address2;
    }

    const restaurantObj = restaurantitem.find((restaurant) => restaurant._id === finaladdress);
    if (restaurantObj) {
      finaladdressobj = restaurantObj.location + ' ' + restaurantObj.address;

      setIsSelf(true);
    }

    let finalstr;

    if (finaladdressobj && finaladdressobj.address && finaladdressobj.address.length > 10) {
      setAddressString(finaladdressobj.address);
      finalstr = finaladdressobj.address.replace(/%20/g, ' ');
    } else {
      finalstr = finaladdressobj.address;
      setAddressStringToPrint(finaladdressobj.replace(/%20/g, ' '));
      setAddressString(finalstr);
    }
  };
  const OverlayOne = () => <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const toast = useToast();
  const handleChangeStatus = async (_orderid, _status) => {
    try {
      const url = API_URL + '/orders/status/change';
      const body = {
        orderId: _orderid,
        orderstatus: _status
      };

      const data = await handleApiMethod(url, 'PUT', body);

      if (data.msg === true) {
        await handleApi();
        toast({
          title: 'Order status changed to ' + _status,
          description: "We've changed order status.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeStatus2 = async (_orderid, _status) => {
    try {
      const url = API_URL + '/orders/status/change';
      const body = {
        orderId: _orderid,
        orderstatus: _status
      };

      const data = await handleApiMethod(url, 'PUT', body);

      if (data.msg === true) {
        await handleApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const params = useParams();
  const handleApi = async () => {
    const userurl = API_URL + '/users/info/user';
    const orderurl = API_URL + '/orders/' + params['id'];
    const orders2url = API_URL + '/orders/user/single';
    try {
      // const data = await handleApiGet(userurl);
      const user = await handleApiGet(userurl);
      const order = await handleApiGet(orderurl);
      console.log(order);
      const restauranturl = API_URL + '/restaurants/';

      console.log(restauranturl);
      const restaurant = await handleApiGet(restauranturl);
      const orders2 = await handleApiGet(orders2url);
      console.log(orders2);
      setOrdersArr2(orders2);
      setUserArr(user);
      setOrdersArr(order);
      setRestaurantArr(restaurant);

      console.log(user);
      console.log(order);
      console.log(restaurant);
      handleDefineAddress(order, user, restaurant);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const findOrder = (orderId) => {
    const order = ordersArr2.find((item) => item._id === orderId);
    if (order) {
      return order.userdata.status;
    } else {
      return 'Status error';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return formattedDate;
  };

  useEffect(() => {
    handleApi();
  }, []);

  const updateState = () => {
    if (placed && !prepared) {
      setPrepared(true);
      handleChangeStatus2(params['id'], 'Prepared');
    } else if (placed && prepared && !delivery) {
      setDelivery(true);
      handleChangeStatus2(params['id'], 'In progress');
    } else if (placed && prepared && delivery && !delivered) {
      setDelivered(true);
      handleChangeStatus2(params['id'], 'Completed');
    }
  };
  //todo: replace with post wehn updating post time and status
  useEffect(() => {
    const timer = setInterval(updateState, 60 * 1000);

    return () => clearInterval(timer);
  }, [placed, prepared, delivery, delivered]);

  const findOrder2 = (orderId) => {
    if (userArr && userArr.orders) {
      const order = userArr.orders.find((item) => item.orderId === orderId);
      if (order) {
        return order;
      } else {
        return 'Status error';
      }
    } else {
      return 'User data not available';
    }
  };

  useEffect(() => {
    const currentOrder = findOrder(params['id']);
    console.log(currentOrder);
    if (userArr._id) {
      if (currentOrder === 'Cancelled' || currentOrder === 'Completed') {
        setPlaced(true);
        setPrepared(true);
        setDelivery(true);
        setDelivered(true);
      } else if (currentOrder === 'Placed') {
        setPlaced(true);
      } else if (currentOrder === 'In progress') {
        setPlaced(true);
        setPrepared(true);
      } else if (currentOrder === 'Delivery') {
        setPlaced(true);
        setPrepared(true);
        setDelivery(true);
      } else if (currentOrder === 'Delivered') {
        setPlaced(true);
        setPrepared(true);
        setDelivery(true);
        setDelivered(true);
      }
    }
  }, [userArr]);
  // todo: post time when each time step update happens
  function formatTime(date) {
    const options = { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleTimeString('en-US', options);
  }

  return (
    <Box>
      {/* some of the data here is still be static and will changed in the future */}
      <Container maxW='1110px'>
        <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
          <Flex alignItems='center'>
            <Icon as={FaChevronLeft} mr={1} boxSize={4} />
            <Text color='neutral.black' fontSize='xs'>
              <Link to='/user/orders'> My orders</Link>
            </Text>
          </Flex>
        </Button>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '2fr 1fr' }} gap={5}>
          <GridItem w='100%'>
            <Box borderRadius='16px' borderWidth='1px' py={{ base: '50px', md: '20px' }} px='10px' my={5}>
              <Flex w='100%' justifyContent='space-between'>
                <Box w='100%'>
                  <Text fontSize={{ base: '14px', md: 'xs' }} fontWeight='bold' color='neutral.black'>
                    Order status
                  </Text>
                  <Box>
                    <Skeleton my={2} minH={loading ? '10px' : '0px'} w='25%' borderRadius='16px' isLoaded={!loading}>
                      {findOrder(params['id']) !== 'Cancelled' ? (
                        <NewMenu>
                          <MenuButton as={Button} p='6px' rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                            Change status
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                setOverlay(<OverlayOne />);
                                onOpen();
                              }}
                              m={0}
                              h='100%'
                              background='neutral.white'
                              variant='solid'
                              color='error.default'
                              _hover={{
                                background: 'error.default',
                                color: 'neutral.white'
                              }}
                              fontWeight='medium'
                            >
                              Cancel order
                            </MenuItem>
                          </MenuList>
                        </NewMenu>
                      ) : (
                        <></>
                      )}
                    </Skeleton>
                  </Box>

                  {/* replace after fetch */}

                  <Box mt={3}>
                    <Skeleton my={2} minH='10px' maxW='45%' borderRadius='16px' isLoaded={!loading}>
                      <Box w='100%' display='flex' alignItems='center'>
                        {' '}
                        {!loading && (
                          <Box as='span' w='10px'>
                            <Status color={(!loading && colorstatus[findOrder(params['id'])]) || 'red'} />
                          </Box>
                        )}
                        <Text ms={{ base: 0, md: 2 }} color='neutral.black' fontSize={{ base: '12px', md: '2xs' }}>
                          {(!loading && findOrder(params['id'])) || 'Undefined'}
                        </Text>
                      </Box>
                    </Skeleton>
                  </Box>
                </Box>
                <Box w='100%' textAlign='end' display='flex' flexDir='column' alignItems='end'>
                  <Skeleton my={5} borderRadius='16px' h='10px' isLoaded={!loading}>
                    <Box>
                      <Box display='flex' alignItems='center'>
                        <Text display={{ base: 'none', md: 'block' }} fontSize='2xs' me={2} color='neutral.gray'>
                          {/* for second release will still static after that will changed to dynamic according on picked address id */}
                          {isSelf ? '(Pickup at)' : '(Delivery to)'}
                        </Text>

                        <Text display={{ base: 'block', md: 'none' }} fontSize='10px' me={2} color='neutral.gray'>
                          {/* for second release will still static after that will changed to dynamic according on picked address id */}
                          {isSelf ? '(Pickup at)' : '(Delivery to)'}
                        </Text>

                        <Text display={{ base: 'none', md: 'block' }} me={2} fontWeight='bold'>
                          {addressStringToPrint && addressStringToPrint}
                        </Text>
                        <Text display={{ base: 'block', md: 'none' }} fontSize='10px' me={2} fontWeight='bold'>
                          {addressStringToPrint && addressStringToPrint}
                        </Text>
                        <Box>
                          <Location />
                        </Box>
                      </Box>
                    </Box>
                  </Skeleton>
                  <Skeleton h='10px' my={2} borderRadius='16px' isLoaded={!loading}>
                    <Box mt={3} display='flex' alignItems='center'>
                      <Text me={2} display={{ base: 'none', md: 'block' }} color='neutral.gray' fontSize='2xs'>
                        {!loading && formatDate(ordersArr.creationDate)}
                      </Text>
                      <Text fontSize='10px' me={2} display={{ base: 'block', md: 'none' }} color='neutral.gray'>
                        {!loading && formatDate(ordersArr.creationDate)}
                      </Text>

                      <Box>
                        <Calendar />
                      </Box>
                    </Box>
                  </Skeleton>
                </Box>
              </Flex>
              <Grid mt={{ base: '50px', md: '40px' }} templateColumns='0.2fr 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr' gap={2}>
                <GridItem w='fit-content'>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Box>
                      <OrderStatus istrue={placed} number={1} />
                    </Box>
                  </Skeleton>
                </GridItem>

                <GridItem w='100%'>
                  <Box h='100%' display='flex' alignItems='center'>
                    <Skeleton w='100%' borderRadius='16px' isLoaded={!loading}>
                      <Divider borderWidth='2px' borderColor={placed && prepared ? '#1ABF70' : 'neutral.gray'} />
                    </Skeleton>
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Box>
                      <OrderStatus istrue={prepared} number={2} />
                    </Box>
                  </Skeleton>
                </GridItem>
                <GridItem w='100%'>
                  <Box h='100%' display='flex' alignItems='center'>
                    <Skeleton w='100%' borderRadius='16px' isLoaded={!loading}>
                      <Divider borderWidth='2px' borderColor={delivery ? '#1ABF70' : 'neutral.gray'} />
                    </Skeleton>{' '}
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Box>
                      <OrderStatus istrue={delivery} number={3} />
                    </Box>
                  </Skeleton>
                </GridItem>
                <GridItem w='100%'>
                  <Box h='100%' display='flex' alignItems='center'>
                    <Skeleton w='100%' borderRadius='16px' isLoaded={!loading}>
                      <Divider borderWidth='2px' borderColor={delivered ? '#1ABF70' : 'neutral.gray'} />
                    </Skeleton>
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Box>
                      <OrderStatus istrue={delivered} number={4} />
                    </Box>
                  </Skeleton>
                </GridItem>
              </Grid>

              <Flex justifyContent='space-between' my={4}>
                <Box>
                  <Skeleton h='20px' borderRadius='16px' isLoaded={!loading}>
                    <Box mt={4}>
                      <Text fontSize={{ base: '10px', md: '2xs' }} color='neutral.black' fontWeight='bold'>
                        Order placed
                      </Text>
                      <Text fontSize={{ base: '10px', md: '3xs' }} color='neutral.black'>
                        {/* todo: checkif order already delivered */}
                        {placed ? formatTime(Date.now()) : ''}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
                <Box>
                  <Skeleton h='20px' borderRadius='16px' isLoaded={!loading}>
                    <Box mt={4}>
                      <Text fontSize={{ base: '10px', md: '2xs' }} color='neutral.black' fontWeight='bold'>
                        Order being prepared
                      </Text>
                      <Text color='neutral.black' fontSize={{ base: '10px', md: '3xs' }}>
                        {prepared ? formatTime(Date.now()) : ''}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
                <Box>
                  <Skeleton h='20px' borderRadius='16px' isLoaded={!loading}>
                    <Box mt={4}>
                      <Text fontSize={{ base: '10px', md: '2xs' }} color='neutral.black' fontWeight='bold'>
                        Out for delivery
                      </Text>
                      <Text color='neutral.black' fontSize={{ base: '10px', md: '3xs' }}>
                        {delivery ? formatTime(Date.now()) : ''}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
                <Box>
                  <Skeleton h='20px' borderRadius='16px' isLoaded={!loading}>
                    <Box mt={4}>
                      <Text fontSize={{ base: '10px', md: '2xs' }} color='neutral.black' fontWeight='bold'>
                        {findOrder(params['id']) === 'Cancelled' ? 'Cancelled' : 'Delivered'}
                      </Text>
                      <Text color='neutral.black' fontSize={{ base: '10px', md: '3xs' }}>
                        {delivered ? formatTime(Date.now()) : ''}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
              </Flex>
            </Box>

            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <Skeleton borderRadius='16px' isLoaded={!loading}>
                <Text fontSize={{ base: '14px', md: 'xs' }} fontWeight='bold' color='neutral.black'>
                  Menu {!loading && ordersArr.ordersdata.products.length} meals
                </Text>
              </Skeleton>

              <Box pt={5}>
                {loading && (
                  <Box>
                    <Skeleton h='60px' borderRadius='16px' isLoaded={!loading} my={2} />
                    <Skeleton h='60px' borderRadius='16px' isLoaded={!loading} my={2} />
                    <Skeleton h='60px' borderRadius='16px' isLoaded={!loading} my={2} />
                  </Box>
                )}
                {!loading &&
                  ordersArr.ordersdata.products.map((item, key) => {
                    return <Menu key={key} item={item} />;
                  })}
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%'>
            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <Text fontSize={{ base: '14px', md: 'xs' }} fontWeight='bold' color='neutral.black'>
                Shipping address
              </Text>
              {!loading && (
                <Shipping userArr={userArr} restaurantArr={restaurantArr} item={ordersArr.userdata.selectedAddress} />
              )}
            </Box>
            <Skeleton minH='250px' borderRadius='16px' isLoaded={!loading}>
              <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
                {!loading && <PaymentDetails userArr={userArr} orders={findOrder(params['id'])} item={ordersArr} />}
              </Box>
            </Skeleton>
          </GridItem>
        </Grid>
      </Container>

      <Box>
        <Modal size='xl' isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton />
              <Text mt={{ base: 8, md: 0 }} fontSize='xs' fontWeight='bold' color='neutral.black' textAlign={'center'}>
                Are you sure you want to cancel this order?
              </Text>
            </ModalHeader>
            <ModalFooter>
              <Box display='flex' justifyContent='center' mx='auto'>
                <Button
                  me={2}
                  onClick={onClose}
                  type='submit'
                  w={{ base: '50%', md: 'initial' }}
                  background='primary.default'
                  fontWeight='bold'
                  variant='solid'
                  color='neutral.white'
                  borderWidth='1px'
                  borderColor='neutral.white'
                  _hover={{
                    background: 'neutral.white',
                    color: 'primary.default',
                    borderWidth: '1px',
                    borderColor: 'primary.default'
                  }}
                  py={5}
                >
                  No
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    handleChangeStatus(params['id'], 'Cancelled');
                  }}
                  w={{ base: '50%', md: 'initial' }}
                  fontSize='2xs'
                  fontWeight='bold'
                  variant='solid'
                  borderWidth='1px'
                  borderColor='error.default'
                  background='error.default'
                  color='neutral.white'
                  _hover={{
                    background: 'neutral.white',
                    color: 'error.default',
                    borderWidth: '1px',
                    borderColor: 'error.default'
                  }}
                  py={5}
                  me='20px'
                >
                  Cancel order
                </Button>
              </Box>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

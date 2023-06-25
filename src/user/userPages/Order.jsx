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
  Skeleton
} from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaChevronLeft } from 'react-icons/fa';
import Location from '../../assets/svg/Location';
import ImageGallery from 'react-image-gallery';
import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { API_URL, handleApiGet } from '../../services/apiServices';
import Menu from '../userComponents/Order/Menu';
import Pickup from '../userComponents/Cart/Pickup';
import PaymentDetails from '../userComponents/Order/PaymentDetails';
import OrderStatus from '../../assets/svg/OrderStatus';
import colorstatus from '../userComponents/UserOrdrs/colorsObject.json';
import Status from '../../assets/svg/Status';
import Calendar from '../../assets/svg/Calendar';
import Shipping from '../userComponents/Order/Shipping';
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
    setAddressString(finaladdressobj.replace(/%20/g, ' '));
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
    } else if (placed && prepared && !delivery) {
      setDelivery(true);
    } else if (placed && prepared && delivery && !delivered) {
      setDelivered(true);
    }
  };

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
    const currentOrder = findOrder2(params['id']);
    if (currentOrder.status === 'Canceled' || currentOrder.status === 'Completed') {
      setPlaced(true);
      setPrepared(true);
      setDelivery(true);
      setDelivered(true);
    } else if (currentOrder.status === 'Placed') {
      setPlaced(true);
    } else if (currentOrder.status === 'Prepared') {
      setPlaced(true);
      setPrepared(true);
    } else if (currentOrder.status === 'Delivery') {
      setPlaced(true);
      setPrepared(true);
      setDelivery(true);
    } else if (currentOrder.status === 'Delivered') {
      setPlaced(true);
      setPrepared(true);
      setDelivery(true);
      setDelivered(true);
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
                  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                    Order status
                  </Text>
                  {/* replace after fetch */}

                  <Box mt={3}>
                    <Skeleton my={2} minH='10px' w='25%' borderRadius='16px' isLoaded={!loading}>
                      <Box display='flex' alignItems='center'>
                        {' '}
                        {!loading && <Status color={(!loading && colorstatus[findOrder(params['id'])]) || 'red'} />}
                        <Text ms={2} color='neutral.black' fontSize='2xs'>
                          {(!loading && findOrder(params['id'])) || 'Undefined'}
                        </Text>
                      </Box>
                    </Skeleton>
                  </Box>
                </Box>
                <Box w='100%' textAlign='end' display='flex' flexDir='column' alignItems='end'>
                  <Skeleton my={5} borderRadius='16px' h='10px' isLoaded={!loading}>
                    <Box display={{ sm: 'none', md: 'block' }}>
                      <Box display='flex' alignItems='center'>
                        <Text me={2} color='neutral.gray' fontSize='2xs'>
                          {/* for second release will still static after that will changed to dynamic according on picked address id */}
                          {isSelf ? '(Pickup at)' : '(Delivery to)'}
                        </Text>
                        <Text me={2} fontWeight='bold'>
                          {addressString}
                        </Text>
                        <Box>
                          <Location />
                        </Box>
                      </Box>
                    </Box>
                  </Skeleton>
                  <Skeleton h='10px' my={2} borderRadius='16px' isLoaded={!loading}>
                    <Box mt={3} display='flex' alignItems='center'>
                      <Text me={2} color='neutral.gray' fontSize='2xs'>
                        {!loading && formatDate(ordersArr.creationDate)}
                      </Text>
                      <Box>
                        <Calendar />
                      </Box>
                    </Box>
                  </Skeleton>
                </Box>
              </Flex>
              <Grid mt={5} templateColumns='0.2fr 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr' gap={2}>
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
                      <Divider borderWidth='2px' borderColor={placed ? '#1ABF70' : 'neutral.gray'} />
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
                      <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                        Order placed
                      </Text>
                      <Text color='neutral.black' fontSize='3xs'>
                        {/* todo: checkif order already delivered */}
                        {placed ? formatTime(Date.now()) : ''}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
                <Box>
                  <Skeleton h='20px' borderRadius='16px' isLoaded={!loading}>
                    <Box mt={4}>
                      <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                        Order being prepared
                      </Text>
                      <Text color='neutral.black' fontSize='3xs'>
                        {prepared ? formatTime(Date.now()) : ''}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
                <Box>
                  <Skeleton h='20px' borderRadius='16px' isLoaded={!loading}>
                    <Box mt={4}>
                      <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                        Out for delivery
                      </Text>
                      <Text color='neutral.black' fontSize='3xs'>
                        {delivery ? formatTime(Date.now()) : ''}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
                <Box>
                  <Skeleton h='20px' borderRadius='16px' isLoaded={!loading}>
                    <Box mt={4}>
                      <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                        Delivered
                      </Text>
                      <Text color='neutral.black' fontSize='3xs'>
                        {delivered ? formatTime(Date.now()) : ''}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
              </Flex>
            </Box>

            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <Skeleton borderRadius='16px' isLoaded={!loading}>
                <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
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
              <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                Shipping address
              </Text>
              {!loading && (
                <Shipping userArr={userArr} restaurantArr={restaurantArr} item={ordersArr.userdata.selectedAddress} />
              )}
            </Box>
            <Skeleton minH='250px' borderRadius='16px' isLoaded={!loading}>
              <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
                {!loading && <PaymentDetails orders={findOrder(params['id'])} item={ordersArr} />}
              </Box>
            </Skeleton>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

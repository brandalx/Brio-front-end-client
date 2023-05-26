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
import { API_URL, handelApiGet } from '../../services/apiServices';
import Menu from '../userComponents/Order/Menu';
import Pickup from '../userComponents/Cart/Pickup';
import PaymentDetails from '../userComponents/Order/PaymentDetails';
import OrderStatus from '../../assets/svg/OrderStatus';
import colorstatus from '../userComponents/UserOrdrs/colorsObject.json';
import Status from '../../assets/svg/Status';
import Calendar from '../../assets/svg/Calendar';
export default function Order() {
  const [placed, setPlaced] = useState(true);
  const [prepared, setPrepared] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userArr, setUserArr] = useState([]);
  const [ordersArr, setOrdersArr] = useState([]);
  const [restaurantArr, setRestaurantArr] = useState([]);
  const params = useParams();
  const handleApi = async () => {
    const userurl = API_URL + '/users/6464085ed67f7b944b642799';
    const orderurl = API_URL + '/orders/' + params['id'];

    try {
      // const data = await handelApiGet(userurl);
      const user = await handelApiGet(userurl);
      const order = await handelApiGet(orderurl);
      const restauranturl = API_URL + '/restaurants/' + order.restaurantRef;
      console.log('here is');
      console.log(restauranturl);
      const restaurant = await handelApiGet(restauranturl);
      setUserArr(user);
      setOrdersArr(order);
      setRestaurantArr(restaurant);
      console.log(user);
      console.log(order);
      console.log(restaurant);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const findOrder = (orderId) => {
    const order = userArr.orders.find((item) => item.orderId === orderId);
    if (order) {
      return order;
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
    if (currentOrder.status === 'Canceled') {
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
            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
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
                        {!loading && <Status color={colorstatus[findOrder(params['id']).status] || 'yellow'} />}
                        <Text ms={2} color='neutral.black' fontSize='2xs'>
                          {!loading && findOrder(params['id']).status}
                        </Text>
                      </Box>
                    </Skeleton>
                  </Box>
                </Box>
                <Box w='100%' textAlign='end' display='flex' flexDir='column' alignItems='end'>
                  <Skeleton my={2} borderRadius='16px' h='10px' isLoaded={!loading}>
                    <Box display='flex' alignItems='center'>
                      <Text me={2} color='neutral.gray' fontSize='2xs'>
                        {/* for second release will still static after that will changed to dynamic according on picked address id */}
                        {!loading && userArr.address[0].city}
                      </Text>

                      <Box>
                        <Location />
                      </Box>
                    </Box>
                  </Skeleton>
                  <Skeleton h='10px' my={2} borderRadius='16px' isLoaded={!loading}>
                    <Box mt={3} display='flex' alignItems='center'>
                      <Text me={2} color='neutral.gray' fontSize='2xs'>
                        {!loading && formatDate(ordersArr.orderedTime)}
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
                  Menu {!loading && ordersArr.products.length} meals
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
                  ordersArr.products.map((item, key) => {
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
                <Pickup
                  item={{
                    location: restaurantArr.location,
                    address: restaurantArr.address
                  }}
                />
              )}
            </Box>
            <Skeleton minH='250px' borderRadius='16px' isLoaded={!loading}>
              <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
                {!loading && <PaymentDetails orders={findOrder(params['id'])} item={userArr} />}
              </Box>
            </Skeleton>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

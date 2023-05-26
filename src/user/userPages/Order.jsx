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
import { Link } from 'react-router-dom';
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
  const handleApi = async () => {
    const userurl = API_URL + '/users/6464085ed67f7b944b642799';
    const orderurl = API_URL + '/orders/64700fceffe3ac434de74548';

    const restauranturl = API_URL + '/restaurants/646677ee6b29f689804a2855';

    try {
      // const data = await handelApiGet(userurl);
      const user = await handelApiGet(userurl);
      const order = await handelApiGet(orderurl);

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
      return order.status;
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

  useEffect(() => {
    const timer = setInterval(updateState, 60 * 1000);

    return () => clearInterval(timer);
  }, [placed, prepared, delivery, delivered]);
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
                  {/* <Status color={colorstatus[item.status] || 'yellow'} /> */}
                  <Box mt={3}>
                    <Box display='flex' alignItems='center'>
                      {' '}
                      <Status color={colorstatus['In progress'] || 'yellow'} />
                      <Text ms={2} color='neutral.black' fontSize='2xs'>
                        {!loading && findOrder('64700fceffe3ac434de74548')}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box w='100%' textAlign='end' display='flex' flexDir='column' alignItems='end'>
                  <Box display='flex' alignItems='center'>
                    <Text me={2} color='neutral.gray' fontSize='2xs'>
                      {/* for second release will still static after that will changed to dynamic according on picked address id */}
                      {!loading && userArr.address[0].city}
                    </Text>
                    <Box>
                      <Location />
                    </Box>
                  </Box>
                  <Box mt={3} display='flex' alignItems='center'>
                    <Text me={2} color='neutral.gray' fontSize='2xs'>
                      {!loading && formatDate(ordersArr.orderedTime)}
                    </Text>
                    <Box>
                      <Calendar />
                    </Box>
                  </Box>
                </Box>
              </Flex>
              <Grid mt={5} templateColumns='0.2fr 1fr 0.2fr 1fr 0.2fr 1fr 0.2fr' gap={2}>
                <GridItem w='fit-content'>
                  <Box>
                    <OrderStatus istrue={placed} number={1} />
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Box h='100%' display='flex' alignItems='center'>
                    <Divider borderWidth='2px' borderColor={placed ? '#1ABF70' : 'neutral.gray'} />
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Box>
                    <OrderStatus istrue={prepared} number={2} />
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Box h='100%' display='flex' alignItems='center'>
                    <Divider borderWidth='2px' borderColor={delivery ? '#1ABF70' : 'neutral.gray'} />
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Box>
                    <OrderStatus istrue={delivery} number={3} />
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Box h='100%' display='flex' alignItems='center'>
                    <Divider borderWidth='2px' borderColor={delivered ? '#1ABF70' : 'neutral.gray'} />
                  </Box>
                </GridItem>
                <GridItem w='100%'>
                  <Box>
                    <OrderStatus istrue={delivered} number={4} />
                  </Box>
                </GridItem>
              </Grid>

              <Flex justifyContent='space-between'>
                <Box>
                  <Box mt={4}>
                    <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                      Order placed
                    </Text>
                    <Text color='neutral.black' fontSize='3xs'>
                      {placed ? formatTime(Date.now()) : ''}
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box mt={4}>
                    <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                      Order being prepared
                    </Text>
                    <Text color='neutral.black' fontSize='3xs'>
                      23:23
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box mt={4}>
                    <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                      Out for delivery
                    </Text>
                    <Text color='neutral.black' fontSize='3xs'>
                      23:39
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <Box mt={4}>
                    <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                      Delivered
                    </Text>
                    <Text color='neutral.black' fontSize='3xs'>
                      23:57 approx
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Box>

            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                Menu 4 meals
              </Text>

              <Box pt={5}>
                <Menu />
                <Menu />
                <Menu />
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%'>
            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                Shipping address
              </Text>
              <Pickup
                item={{
                  location: 'California',
                  address: '3891 Ranchview Dr. Richardson, 62639'
                }}
              />
            </Box>
            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <PaymentDetails />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

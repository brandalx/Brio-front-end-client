import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Tbody,
  Td,
  Tr,
  useMediaQuery
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Status from '../../../assets/svg/Status';
import { arrUsers } from '../../userJSON/ordersList';
import ThreeDots from '../../../assets/svg/ThreeDots';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import colorstatus from './colorsObject.json';
import { Link } from 'react-router-dom';

export default function OrdersTableBody() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');

  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [user, setUser] = useState([]);
  const [orders, setOrders] = useState([]);
  const [restaurantar, setRestaurantar] = useState([]);
  let skeletonarr = [1, 2, 3, 4];
  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    const urlrestaurant = API_URL + '/restaurants';
    const urlorder = API_URL + '/orders/user/single';
    try {
      const data = await handleApiGet(url);
      setUser(data);
      const datarestaurants = await handleApiGet(urlrestaurant);
      data.orders.reverse();
      setArr(data.orders);
      const dataorders = await handleApiGet(urlorder);
      setOrders(dataorders);
      setRestaurantar(datarestaurants);
      console.log(data);
      console.log(datarestaurants);

      console.log(dataorders);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getRestaurantName = (id) => {
    return restaurantar.map((item) => {
      if (item._id === id) {
        console.log(item.title);
        return item.title;
      }
    });
  };

  useEffect(() => {
    handleApi();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return formattedDate;
  };
  const formatTime = (timepass) => {
    const isoString = timepass;
    const date = new Date(isoString);
    const usTime = date.toLocaleTimeString('en-US');
    return usTime;
  };

  const findOrder = (orderid) => {
    const order = orders.find((item) => item._id === orderid);
    return order ? order.userdata.status : undefined;
  };
  return (
    <Tbody>
      {!loading &&
        arr.map((item) => {
          const formattedDate = formatDate(item.creationDate);
          return (
            <Tr key={item._id} transition='all 0.2s' _hover={{ bg: 'bg', transition: 'all 0.2s', cursor: 'pointer' }}>
              <Td pl={isMobile ? '10px' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                {item._id.substring(item._id.length - 6, item._id.length)}
              </Td>
              <Td
                justifyContent='start'
                flexDirection='row-reverse'
                display='flex'
                alignItems='center'
                pt='19.5px'
                pb='19.5px'
                fontSize='2xs'
                color='neutral.grayDark'
                fontWeight='semibold'
              >
                {item.restaurant.length > 0 &&
                  item.restaurant.map((item2, index2) => {
                    return (
                      <Box key={index2} bg='neutral.grayLightest' borderRadius='100px' px={4} py={1} me={2}>
                        {getRestaurantName(item2)}
                      </Box>
                    );
                  })}
              </Td>
              <Td pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                {formattedDate}
              </Td>
              <Td pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
                {formatTime(item.creationDate)}
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
                    <Status color={(orders.length > 0 && colorstatus[findOrder(item.orderRef)]) || 'red'} />
                  </Box>
                  {(orders.length > 0 && findOrder(item.orderRef)) || 'Undefined'}
                </Flex>
              </Td>

              <Td
                transition='all 0.3s'
                _hover={{ color: 'primary.default', transition: 'all 0.3s' }}
                pl={isMobile ? '0' : ''}
                pr={isMobile ? '0' : ''}
                textAlign='center'
                pt='10px'
                pb='10px'
                fontSize='2xs'
                fontWeight='bold'
                color='neutral.black'
              >
                ${item.paymentSummary.totalAmount}
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
                <Menu>
                  <MenuButton
                    _hover={{
                      color: 'neutral.black',
                      borderColor: 'neutral.lightest'
                    }}
                    fontSize='2xs'
                    color='neutral.gray'
                    fontWeight='bold'
                  >
                    <ThreeDots />
                  </MenuButton>

                  <MenuList>
                    {' '}
                    <Link to={'/user/order/' + item._id}>
                      <MenuItem fontWeight='medium'>More info</MenuItem>{' '}
                    </Link>
                    <MenuDivider />
                    <MenuItem
                      m={0}
                      background='neutral.white'
                      variant='solid'
                      color='error.default'
                      _hover={{
                        background: 'error.default',
                        color: 'neutral.white'
                      }}
                      fontWeight='medium'
                    >
                      {' '}
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          );
        })}
      {/*  skeleton */}
      {loading &&
        skeletonarr.map((item, index) => {
          return (
            <Tr key={index}>
              <Td>
                {' '}
                <Skeleton borderRadius='16px' isLoaded={!loading} minH='20px' w='100%'></Skeleton>
              </Td>
              <Td>
                {' '}
                <Skeleton borderRadius='12px' isLoaded={!loading} minH='20px' w='100%'></Skeleton>
              </Td>
              <Td>
                {' '}
                <Skeleton borderRadius='16px' isLoaded={!loading} minH='20px' w='100%'></Skeleton>
              </Td>
              <Td>
                {' '}
                <Skeleton borderRadius='16px' isLoaded={!loading} minH='20px' w='100%'></Skeleton>
              </Td>
              <Td>
                {' '}
                <Skeleton borderRadius='16px' isLoaded={!loading} minH='20px' w='100%'></Skeleton>
              </Td>
              <Td>
                {' '}
                <Skeleton borderRadius='16px' isLoaded={!loading} minH='20px' w='100%'></Skeleton>
              </Td>
            </Tr>
          );
        })}
    </Tbody>
  );
}

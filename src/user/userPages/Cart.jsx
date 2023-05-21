import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, GridItem, Text, Button, Skeleton } from '@chakra-ui/react';
import salad from '../../assets/images/salad.jpg';
import MenuMeal from '../userComponents/Cart/MenuMeal';
import Delivery from '../userComponents/Cart/Delivery';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Pickup from '../userComponents/Cart/Pickup';
import Summary from '../userComponents/Cart/Summary';
import { API_URL, handelApiGet } from '../../services/apiServices';

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [arr, setAr] = useState([]);
  const [cartArr, setCartAr] = useState([]);
  const [mealsArr, setMealsArr] = useState([]);
  const [addressArr, setAddressArr] = useState([]);

  const handleApi = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';
    try {
      const data = await handelApiGet(url);
      setAr(data);

      setAddressArr(data.address);
      handleApiMeals(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleApiMeals = async () => {
    try {
      const url = API_URL + '/users/6464085ed67f7b944b642799/cart';
      const cartData = await handelApiGet(url);
      console.log(cartData.cart);
      setCartAr(cartData.cart);
      let product = await Promise.all(
        cartData.cart.map(async (item) => {
          const products = await handelApiGet(API_URL + '/products/' + item.productId);
          return products;
        })
      );
      setMealsArr(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  let arrMenu = [
    {
      image: salad,
      title: 'Chicken & Ribs Combo',
      desc: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
      price: 16.8
    },
    {
      image: salad,
      title: 'Pepperoni Pizza',
      desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 12.5
    },
    {
      image: salad,
      title: 'Classic Cheeseburger',
      desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: 9.99
    },
    {
      image: salad,
      title: 'Spaghetti Bolognese',
      desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: 14.2
    },
    {
      image: salad,
      title: 'Grilled Ribeye Steak',
      desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      price: 22.75
    }
  ];
  let arrAddress = [
    {
      country: 'USA',
      state: 'New York',
      city: 'New York',
      address1: '4517 Washington Ave.',
      address2: 'Manchester, 11004'
    },
    {
      country: 'USA',
      state: 'New York',
      city: 'New York',
      address1: '123 Broadway',
      address2: 'New York, 10001'
    },
    {
      country: 'USA',
      state: 'New York',
      city: 'Brooklyn',
      address1: '789 Elm Street',
      address2: 'Brooklyn, 11201'
    },
    {
      country: 'USA',
      state: 'New York',
      city: 'Albany',
      address1: '456 Oak Avenue',
      address2: 'Albany, 12207'
    }
  ];
  const location = useLocation();
  const isDeliveryPage = location.pathname === '/user/cart';
  const isPickupPage = location.pathname === '/user/cart/pickup';

  return (
    <Box>
      <Container maxW='1110px'>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          My cart
        </Text>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '2fr 1fr' }} gap={2}>
          <GridItem w='100%'>
            <Box>
              <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
                <Skeleton minH='20px' w='100%' borderRadius='16px' my={2} isLoaded={!loading}>
                  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                    Menu {!loading && mealsArr.length} meals
                  </Text>
                </Skeleton>
                <Skeleton minH='60px' w='100%' borderRadius='16px' isLoaded={!loading}>
                  <Box pt={5}>
                    {!loading &&
                      mealsArr.map((item, index) => (
                        <MenuMeal key={index} item={item} amount={arr.cart[index].productAmount} />
                      ))}
                  </Box>
                </Skeleton>
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%'>
            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
              <Box bg='neutral.grayLightest' p={2} borderRadius='16px'>
                <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                  <GridItem w='100%'>
                    <Link to='/user/cart' w='100%'>
                      <Button
                        borderRadius='14px'
                        w='100%'
                        background={isDeliveryPage ? 'neutral.black' : 'neutral.grayLightest'}
                        fontWeight='bold'
                        variant='solid'
                        color={isDeliveryPage ? 'neutral.white' : 'neutral.black'}
                        borderWidth='1px'
                        borderColor='neutral.grayLightest'
                        _hover={{
                          background: 'neutral.grayLightest',
                          color: 'neutral.black',
                          borderWidth: '1px',
                          borderColor: 'neutral.black'
                        }}
                        py={6}
                      >
                        Delivery
                      </Button>
                    </Link>
                  </GridItem>
                  <GridItem w='100%'>
                    <Link to='/user/cart/pickup' w='100%'>
                      <Button
                        borderRadius='14px'
                        w='100%'
                        background={isPickupPage ? 'neutral.black' : 'neutral.grayLightest'}
                        fontWeight='bold'
                        variant='solid'
                        color={isPickupPage ? 'neutral.white' : 'neutral.black'}
                        borderWidth='1px'
                        borderColor='neutral.grayLightest'
                        _hover={{
                          background: 'neutral.grayLightest',
                          color: 'neutral.black',
                          borderWidth: '1px',
                          borderColor: 'neutral.black'
                        }}
                        py={6}
                      >
                        Pickup
                      </Button>
                    </Link>
                  </GridItem>
                </Grid>
              </Box>
              <Routes>
                <Route
                  path='/'
                  element={
                    <Skeleton my={4} borderRadius='16px' isLoaded={!loading}>
                      <Delivery item={addressArr} />
                    </Skeleton>
                  }
                />
                <Route
                  path='/pickup'
                  element={
                    <Skeleton my={4} borderRadius='16px' isLoaded={!loading}>
                      <Pickup />
                    </Skeleton>
                  }
                />
              </Routes>
            </Box>
            <Box py={4}>
              <Summary />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

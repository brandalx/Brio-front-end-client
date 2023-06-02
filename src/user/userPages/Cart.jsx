import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, GridItem, Text, Button, Skeleton } from '@chakra-ui/react';
import salad from '../../assets/images/salad.jpg';
import MenuMeal from '../userComponents/Cart/MenuMeal';
import Delivery from '../userComponents/Cart/Delivery';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Pickup from '../userComponents/Cart/Pickup';
import Summary from '../userComponents/Cart/Summary';
import { API_URL, handleApiGet } from '../../services/apiServices';

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [arr, setAr] = useState([]);
  const [cartArr, setCartAr] = useState([]);
  const [mealsArr, setMealsArr] = useState([]);
  const [addressArr, setAddressArr] = useState([]);
  const [restaurant, setRestaurant] = useState([]);

  const handleApi = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';
    try {
      const data = await handleApiGet(url);
      setAr(data);

      setAddressArr(data.address);
      handleApiMeals(data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleApiMeals = async () => {
    try {
      const url = API_URL + '/users/6464085ed67f7b944b642799/cart';
      const cartData = await handleApiGet(url);
      console.log(cartData.cart);
      setCartAr(cartData.cart);
      let product = await Promise.all(
        cartData.cart.map(async (item) => {
          const products = await handleApiGet(API_URL + '/products/' + item.productId);
          return products;
        })
      );
      setMealsArr(product);
      console.log(product);
      handleApiRestaurant(product[0].restaurantRef);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApiRestaurant = async (restuarantId) => {
    try {
      const url = API_URL + '/restaurants/' + restuarantId;
      console.log(url);
      const restaurantData = await handleApiGet(url);
      console.log(restaurantData);
      setRestaurant(restaurantData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

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
                      {!loading && (
                        <Box>
                          <Pickup item={restaurant} />
                        </Box>
                      )}
                    </Skeleton>
                  }
                />
              </Routes>
            </Box>
            <Box py={4}>
              <Skeleton my={4} borderRadius='16px' isLoaded={!loading}>
                <Summary loading={loading} item={arr} />
              </Skeleton>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

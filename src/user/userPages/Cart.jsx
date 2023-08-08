import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, GridItem, Text, Button, Skeleton, useStatStyles } from '@chakra-ui/react';
import salad from '../../assets/images/salad.jpg';
import MenuMeal from '../userComponents/Cart/MenuMeal';
import Delivery from '../userComponents/Cart/Delivery';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Pickup from '../userComponents/Cart/Pickup';
import Summary from '../userComponents/Cart/Summary';
import { API_URL, handleApiGet } from '../../services/apiServices';
import Spline from '@splinetool/react-spline';
export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [arr, setAr] = useState([]);
  const [cartArr, setCartAr] = useState([]);
  const [mealsArr, setMealsArr] = useState([]);
  const [addressArr, setAddressArr] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [blankCart, setBlankCart] = useState(false);
  const [preSummary, setPreSummary] = useState([]);
  const [heightchange, setheightchange] = useState(1);
  const [reload2, setReload2] = useState(0);
  const [reload, setReload] = useState(0);
  const [checkoutBody, setCheckoutBody] = useState({
    userdata: {
      selectedAddress: null,
      selectedPaymentMethod: null,
      status: 'Placed',
      paymentSummary: {
        subtotal: null,
        tips: null,
        shipping: null,

        totalAmount: null
      }
    },
    ordersdata: {
      products: [],
      restaurants: []
    }
  });
  const [pickupLocation, setPickupLocation] = useState(false);

  const handleApiPresummary = async () => {
    const url = API_URL + '/users/cart/presummary';
    try {
      const data = await handleApiGet(url);
      setPreSummary(data);

      setCheckoutBody((prevState) => ({
        ...prevState,
        userdata: {
          ...prevState.userdata,
          paymentSummary: {
            subtotal: data.subtotal,
            tips: null,
            shipping: data.shipping,
            totalAmount: data.totalAmount
          }
        }
      }));
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setAr(data);

      setAddressArr(data.address);

      handleApiMeals(data);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getRestaurantId = async (_iddata) => {
    const urlprod = API_URL + '/products/' + _iddata;
    const productdata = await handleApiGet(urlprod);
    return productdata.restaurantRef;
  };
  const handleApiMeals = async (_data) => {
    let id = _data._id;
    try {
      const url = API_URL + `/users/${id}/cart`;
      const cartData = await handleApiGet(url);
      // console.log(cartData.cart);
      setCartAr(cartData.cart);

      const restaurantIds = await Promise.all(cartData.cart.map((item) => getRestaurantId(item.productId)));

      setCheckoutBody((prevState) => ({
        ...prevState,
        ordersdata: {
          products: cartData.cart.map((item, index) => ({
            productId: item.productId,
            amount: item.productAmount,
            restaurantId: restaurantIds[index]
          }))
        }
      }));

      let product = await Promise.all(
        cartData.cart.map(async (item) => {
          const products = await handleApiGet(API_URL + '/products/' + item.productId);
          products.itemCartId = item._id;
          return products;
        })
      );
      setMealsArr(product);
      setCheckoutBody((prevState) => {
        const existingRestaurants = prevState.ordersdata.restaurants || [];
        const newRestaurants = Array.from(new Set(product.map((item) => item.restaurantRef)));
        const updatedRestaurants = [...existingRestaurants, ...newRestaurants];
        return {
          ...prevState,
          ordersdata: {
            ...prevState.ordersdata,
            restaurants: updatedRestaurants
          }
        };
      });
      // console.log(product);
      if (product.length === 0) {
        setLoading(false);
        setBlankCart(true);
      } else {
        handleApiRestaurant(product[0].restaurantRef);
        setBlankCart(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApiRestaurant = async (restuarantId) => {
    try {
      const url = API_URL + '/restaurants/' + restuarantId;
      // console.log(url);
      const restaurantData = await handleApiGet(url);
      // console.log(restaurantData);
      setRestaurant(restaurantData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, [reload]);

  useEffect(() => {
    handleApi();
    handleApiPresummary();
  }, [reload, reload2]);

  const location = useLocation();
  const isDeliveryPage = location.pathname === '/user/cart';
  const isPickupPage = location.pathname === '/user/cart/pickup';

  useEffect(() => {
    console.log(checkoutBody);
  }, [checkoutBody]);

  const onload = () => {
    setheightchange(350);
    setLoading(false);
  };

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
                  <Text
                    fontSize='xs'
                    fontWeight='bold'
                    color='neutral.black'
                    textAlign={!loading && mealsArr.length === 0 && 'center'}
                  >
                    Menu {!loading && mealsArr.length} meals
                  </Text>
                </Skeleton>
                <Skeleton minH='60px' w='100%' borderRadius='16px' isLoaded={!loading}>
                  <Box pt={5}>
                    {!loading &&
                      mealsArr.length > 0 &&
                      arr.cart.length > 0 &&
                      mealsArr.map((item, index) => (
                        <MenuMeal
                          targetId={item.itemCartId}
                          setReload2={setReload2}
                          reload2={reload2}
                          user={arr}
                          setReload={setReload}
                          reload={reload}
                          key={index}
                          item={item}
                          amount={arr.cart[index]?.productAmount} // Use optional chaining to handle undefined objects
                        />
                      ))}
                  </Box>
                </Skeleton>
              </Box>
            </Box>
          </GridItem>
          {blankCart ? (
            <Skeleton minH='60px' w='100%' borderRadius='16px' isLoaded={!loading}>
              <Box borderRadius='16px' borderWidth='1px' py='20px' mb={4}>
                <Box
                  data-aos='fade-up'
                  zIndex='-1'
                  pos='relative'
                  textAlign='center'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  top='50px'
                  my={5}
                >
                  <Text
                    pos='absolute'
                    fontSize={{ base: 'sm', md: 'dm' }}
                    lineHeight={{ base: '20px', md: '60px' }}
                    color='primary.default'
                    fontWeight='black'
                  >
                    No items in cart yet :(
                  </Text>
                </Box>

                <Box h={`${heightchange}px`} w='100%'>
                  <Spline scene='https://draft.spline.design/Cx9jGNyDHd-xYDu8/scene.splinecode' onLoad={onload} />
                </Box>
                {!loading && mealsArr.length === 0 && (
                  <Box my={2} display='flex' justifyContent='center' alignItems='center'>
                    <Link to='/'>
                      <Button
                        textAlign='center'
                        fontSize='xs'
                        background='primary.default'
                        fontWeight='bold'
                        variant='solid'
                        color='neutral.white'
                        borderWidth='1px'
                        borderColor='primary.default'
                        _hover={{
                          background: 'neutral.white',
                          color: 'primary.default',
                          borderWidth: '1px',
                          borderColor: 'primary.default'
                        }}
                        py={5}
                      >
                        {' '}
                        Add your first meal
                      </Button>
                    </Link>
                  </Box>
                )}
              </Box>
            </Skeleton>
          ) : (
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
                          color={
                            isDeliveryPage && localStorage.getItem('colorMode') === 'dark'
                              ? 'neutral.black'
                              : isDeliveryPage
                              ? 'neutral.white'
                              : 'neutral.black'
                          }
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
                          color={
                            isPickupPage && localStorage.getItem('colorMode') === 'dark'
                              ? 'neutral.black'
                              : isPickupPage
                              ? 'neutral.white'
                              : 'neutral.black'
                          }
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
                        {addressArr.length > 0 ? (
                          <Delivery
                            setPickupLocation={setPickupLocation}
                            pickupLocation={pickupLocation}
                            setCheckoutBody={setCheckoutBody}
                            item={addressArr}
                          />
                        ) : (
                          <>
                            <Text fontSize='2xs' fontWeight='bold' color='neutral.gray' py=''>
                              No addresses specified
                            </Text>
                            <Link to='/user/account/address'>
                              <Text textDecoration='underline' fontSize='xs' fontWeight='bold' color='neutral.black'>
                                Add your first address
                              </Text>
                            </Link>
                          </>
                        )}
                      </Skeleton>
                    }
                  />
                  <Route
                    path='/pickup'
                    element={
                      <Skeleton my={4} borderRadius='16px' isLoaded={!loading}>
                        {!loading && (
                          <Box>
                            <Pickup
                              setPickupLocation={setPickupLocation}
                              pickupLocation={pickupLocation}
                              setCheckoutBody={setCheckoutBody}
                              item={restaurant}
                            />
                          </Box>
                        )}
                      </Skeleton>
                    }
                  />
                </Routes>
              </Box>

              <Box py={4}>
                <Skeleton my={4} borderRadius='16px' isLoaded={!loading}>
                  <Summary
                    setBlankCart={setBlankCart}
                    blankCart={blankCart}
                    setCheckoutBody={setCheckoutBody}
                    checkoutBody={checkoutBody}
                    loading={loading}
                    item={preSummary}
                  />
                </Skeleton>
              </Box>
            </GridItem>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
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
  useToast
} from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaChevronLeft } from 'react-icons/fa';

import ImageGallery from 'react-image-gallery';
import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL, handleApiGet, handleApiMethod } from '../../services/apiServices';
import { cartContext } from '../../context/globalContext';
import { useCheckToken } from '../../services/token';
export default function Product() {
  const { cartLen, setCartLen } = useContext(cartContext);
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const thumbnailPosition = isLargerThanMd ? 'left' : 'bottom';
  const params = useParams();
  const [arr, setAr] = useState([]);
  const [productsArr, setProductsAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageArr, setImageArr] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [user, setUser] = useState([]);
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();
  const isTokenExpired = useCheckToken();
  const handleAProductApi = async () => {
    // const url = API_URL + '/products';

    try {
      if (loading === false) {
        setLoading(true);
      }

      const urlprod = API_URL + '/products/' + params['id'];

      const productdata = await handleApiGet(urlprod);
      setAr(productdata);
      console.log(productdata);

      const images = productdata.image.map((item) => ({
        original: item,
        thumbnail: item
      }));

      const urlrestuarant = API_URL + '/restaurants/' + productdata.restaurantRef;
      const data2 = await handleApiGet(urlrestuarant);
      setRestaurant(data2);

      const tempProductArr = [];

      for (const item of data2.products) {
        const url = API_URL + '/products/' + item;
        const datanew = await handleApiGet(url);
        tempProductArr.push(datanew);
      }

      const finalProducts = tempProductArr.filter((item) => item._id !== params['id']);
      setProductsAr(finalProducts);
      setImageArr(images);
      handleUserApi();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleUserApi = async () => {
    try {
      const urluser = API_URL + '/users/info/user';
      const userdata = await handleApiGet(urluser);
      setUser(userdata);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleAProductApi();
    setAmount(1);
  }, [params['id']]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const addMealAmount = () => {
    setAmount(amount + 1);
  };

  const reduceMealAmount = () => {
    if (amount - 1 != 0) {
      setAmount(amount - 1);
    }
  };
  const toast = useToast();
  let postToCart = async (_data) => {
    console.log(_data);
    try {
      let cartObject = {
        productId: _data,
        productAmount: amount
      };
      console.log(cartObject);
      const url = API_URL + `/users/${user._id}/posttocart`;
      const data = await handleApiMethod(url, 'POST', cartObject);

      if (data.msg === true) {
        toast({
          title: 'Product added.',
          description: "We've added this product to your cart.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });

        const urluser = API_URL + '/users/info/user';
        const userdata = await handleApiGet(urluser);
        setUser(userdata);
        setCartLen(userdata.cart.length);
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error when adding this product',
        description: 'Error when this product into your cart',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Box data-aos='fade-up'>
        <Container maxW='1110px' py={10}>
          <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
            <Flex alignItems='center'>
              <Icon as={FaChevronLeft} mr={1} boxSize={4} />
              <Text onClick={() => handleGoBack()} color='neutral.black' fontSize='xs'>
                Back
              </Text>
            </Flex>
          </Button>

          <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: ' 5fr 3fr' }} gap={6}>
            <Skeleton borderRadius='16px' minH='350px' isLoaded={!loading}>
              <GridItem w='100%' h='auto'>
                {!loading && (
                  <ImageGallery
                    items={imageArr}
                    infinite={true}
                    showThumbnails={true}
                    showNav={true}
                    thumbnailPosition={thumbnailPosition}
                    lazyLoad={true}
                    showFullscreenButton={false}
                    useBrowserFullscreen={false}
                    showPlayButton={false}
                    disableThumbnailScroll={false}
                    disableKeyDown={false}
                    disableSwipe={false}
                    disableThumbnailSwipe={false}
                  />
                )}
              </GridItem>
            </Skeleton>
            <GridItem w='100%' h='auto'>
              <Box>
                <Stack>
                  <Skeleton borderRadius='16px' isLoaded={!loading} minH='40px'>
                    <Text mt={2} color='neutral.black' fontSize='md' fontWeight='bold'>
                      {!loading && <>{arr.title}</>}
                    </Text>
                  </Skeleton>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Text color='neutral.gray' fontSize='2xs'>
                      {!loading && <>{arr.description}</>}
                    </Text>
                  </Skeleton>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    {isTokenExpired ? (
                      <Box>
                        <Text my={4} fontWeight='extrabold' color='neutral.black' fontSize='md'>
                          {!loading && <>$ {arr.price}</>}
                        </Text>
                        <Link to='/signup'>
                          <Button
                            w='100%'
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
                            Login or Signup to add product
                          </Button>
                        </Link>
                      </Box>
                    ) : (
                      <Flex justifyContent='space-between' alignItems='center'>
                        <Text fontWeight='extrabold' color='neutral.black' fontSize='md'>
                          {!loading && <>$ {arr.price}</>}
                        </Text>
                        <Box display='flex' alignItems='center'>
                          <Button
                            isDisabled={amount - 1 === 0 ? true : false}
                            onClick={() => reduceMealAmount()}
                            _hover={{ bg: 'red', color: 'white' }}
                            background='neutral.grayLightest'
                            borderRadius='100px'
                            py='10px'
                            px='10px'
                            fontSize='md'
                            color='neutral.gray'
                          >
                            -
                          </Button>

                          <Text color='neutral.gray' fontWeight='bold' px={3}>
                            {amount}
                          </Text>

                          <Button
                            onClick={() => addMealAmount()}
                            _hover={{ bg: 'primary.default', color: 'white' }}
                            background='neutral.grayLightest'
                            borderRadius='100px'
                            py='10px'
                            px='10px'
                            fontSize='md'
                            color='primary.black'
                          >
                            +
                          </Button>
                        </Box>
                        <Button
                          onClick={() => {
                            postToCart(arr._id);
                          }}
                          rightIcon={<Text fontSize='md'>+</Text>}
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
                          Add to cart
                        </Button>
                      </Flex>
                    )}
                  </Skeleton>
                </Stack>
                <Divider py={3} />
                <Box py={5}>
                  <Skeleton borderRadius='16px' isLoaded={!loading} my={2} minH='40px'>
                    <Box py={3}>
                      <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                        {' '}
                        Ingredients
                      </Text>
                      <Text fontSize='2xs' color='neutral.gray'>
                        {!loading &&
                          arr.ingredients.map((item) => {
                            return (
                              <React.Fragment key={item}>
                                {item} <br></br>{' '}
                              </React.Fragment>
                            );
                          })}
                      </Text>
                    </Box>
                  </Skeleton>
                  <Skeleton minH='40px' borderRadius='16px' isLoaded={!loading} my={2}>
                    <Box py={1}>
                      <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                        {' '}
                        Nutritional value
                      </Text>
                      <Text fontSize='2xs' color='neutral.gray'>
                        {!loading &&
                          arr.nutritionals.map((item) => {
                            return (
                              <React.Fragment key={item}>
                                {item} <br></br>{' '}
                              </React.Fragment>
                            );
                          })}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
              </Box>
            </GridItem>
          </Grid>
          <Box py='30px'>
            <Text color='neutral.black' fontWeight='semibold' fontSize='sm'>
              Recommended with
            </Text>
            <Box>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                {!loading &&
                  productsArr.map((item, index) => {
                    return (
                      <Box key={index}>
                        <Skeleton borderRadius='16px' isLoaded={!loading}>
                          <ProductCard
                            _id={item._id}
                            img={item.image}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                          />
                        </Skeleton>
                      </Box>
                    );
                  })}
              </Grid>
              {loading && (
                <Grid
                  mt={4}
                  templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                  gap={4}
                >
                  <GridItem minH='350px'>
                    <Skeleton minH='350px' borderRadius='16px' isLoaded={!loading} />
                  </GridItem>
                  <GridItem minH='350px'>
                    <Skeleton minH='350px' borderRadius='16px' isLoaded={!loading} />
                  </GridItem>
                  <GridItem minH='350px'>
                    <Skeleton minH='350px' borderRadius='16px' isLoaded={!loading} />
                  </GridItem>
                </Grid>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

import { Box, Container, Flex, GridItem, Text, Skeleton, Image, Grid, Button, Divider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { API_URL, handleApiGet } from '../../services/apiServices';
import axios from 'axios';

import Logo from '../../assets/svg/Logo';
import Star from '../../assets/svg/Star';
import { Avatar } from '@chakra-ui/react';
import Like from '../../assets/svg/Like';
import Dislike from '../../assets/svg/Dislike';

export default function Restaurant() {
  const REACT_APP_API_URL = import.meta.env.VITE_APIURL;
  const REACT_APP_opencagedata = import.meta.env.VITE_OPENCAGEDATA;
  const REACT_APP_MAPBOX = import.meta.env.VITE_MAPBOX;
  const REACT_APP_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOXTOKEN;
  const [userRef, setUserRef] = useState();
  const [restaurantArr, setAr] = useState([]);
  const [productArr, setProductAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [comments, setComments] = useState();
  const params = useParams();
  const [usersArr, setUsersArr] = useState();

  const handleRestaurantApi = async () => {
    const url = API_URL + '/restaurants/' + params['id'];

    try {
      setLoading(true);
      const data = await handleApiGet(url);
      setAr(data);
      setComments(data.reviews);
      await handleUsersPublicData(data.reviews);
      await handleProductApi(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleProductApi = async (data) => {
    try {
      setLoading(true);

      const tempProductArr = [];
      console.log('data');
      console.log(data);
      for (const item of data.products) {
        const url = API_URL + '/products/' + item;
        const datanew = await handleApiGet(url);
        tempProductArr.push(datanew);
      }

      setProductAr(tempProductArr);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleRestaurantApi();
  }, []);
  let handleUsersPublicData = async (_commentsdata) => {
    try {
      if (_commentsdata.length > 0) {
        let allUsers = [];
        const response = await Promise.all(
          _commentsdata.map((item) => handleApiGet(`${API_URL}/users/info/public/user/${item.userRef.toString()}`))
        );
        allUsers = [...allUsers, ...response];
        setUsersArr(allUsers);
        console.log(allUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (restaurantArr) {
      handleMapApi();
    }
  }, [restaurantArr]);

  const handleLoadings = () => {
    if (restaurantArr && productArr && address) {
      setLoading(false);
    }
  };
  const [showOops, setShowOops] = useState(false);

  useEffect(() => {
    // Simulate delay for loading the product array
    setTimeout(() => {
      if (!loading && productArr.length === 0) {
        setShowOops(true);
      }
    }, 500); // Adjust the delay time as needed
  }, [loading, productArr]);

  const handleMapApi = async () => {
    try {
      const placeUrl = `${REACT_APP_opencagedata}${restaurantArr.location}%20${restaurantArr.address}&pretty=1`;
      const resp = await axios.get(placeUrl);
      const data = resp.data;
      setAddress(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleLoadings();
  }, [restaurantArr, productArr, address]);

  return (
    <>
      <Box background='bg' py='50px' data-aos='fade-up'>
        <Container maxW='1110px'>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1.3fr 1fr' }} gap={2}>
            <GridItem w='100%' h='100%'>
              <Flex h='100%'>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '0.5fr 1fr' }} gap={4}>
                  <Flex alignItems='center'>
                    <GridItem w='100%'>
                      <Skeleton borderRadius='16px' isLoaded={!loading}>
                        <Image
                          borderWidth='15px'
                          borderColor='neutral.white'
                          borderRadius='16px'
                          src={restaurantArr.image}
                        />
                      </Skeleton>
                    </GridItem>
                  </Flex>
                  <GridItem w='100%'>
                    {' '}
                    <Flex flexDirection='column' justifyContent='center' h='100%'>
                      <Skeleton my={2} borderRadius='16px' isLoaded={!loading}>
                        <Text fontSize='xl' fontWeight='extrabold'>
                          {restaurantArr.title}
                        </Text>
                      </Skeleton>
                      <Skeleton my={2} borderRadius='16px' isLoaded={!loading}>
                        <Text fontSize='2xs'> {restaurantArr.description}</Text>
                      </Skeleton>
                      <Skeleton borderRadius='16px' isLoaded={!loading} my={2}>
                        <Box display='flex'>
                          <Box display='flex' alignItems='center' me={2}>
                            {' '}
                            <AiOutlineClockCircle color='#828282' />
                          </Box>
                          <Text color='neutral.gray' fontSize='3xs'>
                            {!loading && restaurantArr.time} min • $ {!loading && restaurantArr.minprice} min sum
                          </Text>
                        </Box>
                      </Skeleton>
                    </Flex>
                  </GridItem>
                </Grid>
              </Flex>
            </GridItem>
            <GridItem w='100%' h='auto'>
              <Skeleton borderRadius='16px' isLoaded={!loading} minH='200px' my={2}>
                <Flex alignItems='center'>
                  <Box w='100%'>
                    {address?.results?.length > 0 && (
                      <iframe
                        width='100%'
                        src={`${REACT_APP_MAPBOX}&zoomwheel=false#8/${address.results[0].bounds.northeast.lat}/${address.results[0].bounds.northeast.lng}`}
                        title='Monochrome'
                        style={{ borderRadius: '16px', borderWidth: '5px', borderColor: 'white', minHeight: '230px' }}
                      />
                    )}
                  </Box>
                </Flex>
              </Skeleton>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container maxW='1110px' data-aos='fade-up'>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1.3fr 1fr' }} gap={2}>
            <GridItem w='100%' h='100%'>
              <Box py='25px'>
                <Text mb={4} color='neutral.black' fontWeight='semibold' fontSize='sm'>
                  Menu
                </Text>
                <Box>
                  <Grid
                    gridAutoColumns='1fr'
                    gridAutoRows='1fr'
                    templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                    gap={4}
                  >
                    {!loading ? (
                      productArr.length > 0 ? (
                        productArr.map((item, index) => (
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
                        ))
                      ) : showOops ? (
                        <Box minH='300px' py={5} my={5} textAlign='center'>
                          <Flex flexDirection='column' alignItems='center' justifyContent='center' height='100%'>
                            <Box>
                              <Box>
                                <Flex alignItems='center' justifyContent='center'>
                                  <Logo />
                                  <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='1'>
                                    Brio
                                  </Text>
                                </Flex>
                              </Box>
                            </Box>
                            <Box mt={4}>
                              <Text fontSize='2xl' fontWeight='extrabold' color='primary.default'>
                                Ooops
                              </Text>
                              <Text fontSize='sm' fontWeight='bold' color='neutral.grayDark'>
                                Sorry! This Restaurant does not have any products yet...
                              </Text>
                              <Link to='/'>
                                <Button
                                  mt={5}
                                  px={5}
                                  borderRadius={100}
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
                                  Back to home
                                </Button>
                              </Link>
                            </Box>
                          </Flex>
                        </Box>
                      ) : (
                        <>
                          <Skeleton borderRadius='16px' isLoaded={!loading} minH='200px' />
                          <Skeleton borderRadius='16px' isLoaded={!loading} minH='200px' />
                          <Skeleton borderRadius='16px' isLoaded={!loading} minH='200px' />
                        </>
                      )
                    ) : (
                      <>
                        <Skeleton borderRadius='16px' isLoaded={!loading} minH='200px' />
                        <Skeleton borderRadius='16px' isLoaded={!loading} minH='200px' />
                        <Skeleton borderRadius='16px' isLoaded={!loading} minH='200px' />
                      </>
                    )}
                  </Grid>
                </Box>
              </Box>
            </GridItem>
            {!productArr.length <= 0 && (
              <GridItem>
                <Box py='25px'>
                  <Text mb={4} color='neutral.black' fontWeight='semibold' fontSize='sm'>
                    Reviews
                  </Text>

                  <Box
                    w='100%'
                    py={4}
                    bg='neutral.white'
                    border='1px'
                    borderColor='neutral.grayLightest'
                    borderRadius='16px'
                    h='100%'
                    data-aos='fade-up'
                  >
                    <Box>
                      <Box p={4}>
                        <Text color='neutral.black' fontWeight='bold' fontSize='2xs'>
                          Overall rating
                        </Text>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                          <Box display='flex' alignItems='center'>
                            <Text me={2} color='primary.default' fontWeight='semibold' fontSize='sm'>
                              4.2
                            </Text>
                            <Box me={2} display='flex'>
                              <Star color='#4E60FF' />
                              <Star color='#4E60FF' />
                              <Star color='#4E60FF' />
                              <Star color='#4E60FF' />
                              <Star />
                              <Star />
                            </Box>
                            <Text color='neutral.gray' fontWeight='bold' fontSize='10px'>
                              {comments.length} votes
                            </Text>
                          </Box>
                          <Box>
                            <Button
                              background='neutral.white'
                              fontSize='2xs'
                              fontWeight='bold'
                              variant='solid'
                              color='primary.default'
                              borderWidth='1px'
                              borderColor='primary.default'
                              _hover={{
                                background: 'primary.default',
                                color: 'neutral.white',
                                borderWidth: '1px',
                                borderColor: 'primary.default'
                              }}
                              py={5}
                              me='20px'
                            >
                              Leave review
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <Divider w='100%' />
                      <Box p={4} overflowY='scroll' h='750px'>
                        {comments.map((item, index) => {
                          return (
                            <Box my='20px' key={index}>
                              <Box display='flex'>
                                <Box me={4}>
                                  <Avatar size='md' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                                </Box>
                                <Box display='flex' flexDir='column'>
                                  <Box>
                                    <Text color='neutral.black' fontWeight='bold' fontSize='2xs'>
                                      Savannah Miles
                                    </Text>
                                  </Box>
                                  <Box display='flex'>
                                    <Box>
                                      <Box me={2} display='flex'>
                                        <Star color='#4E60FF' />
                                        <Star color='#4E60FF' />
                                        <Star color='#4E60FF' />
                                        <Star color='#4E60FF' />
                                        <Star />
                                        <Star />
                                      </Box>
                                    </Box>
                                    <Box>
                                      {' '}
                                      <Text color='neutral.gray' fontWeight='bold' fontSize='10px'>
                                        {/* 10 days ago */}
                                        {item.datecreated}
                                      </Text>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                              <Box mt={2}>
                                <Text color='neutral.black' fontWeight='regular' fontSize='2xs'>
                                  {item.comment}
                                </Text>
                              </Box>
                              <Box mt={4} display='flex' alignItems='center'>
                                <Box me={6} display='flex' alignItems='center'>
                                  <Like />
                                  <Text color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                                    {item.likes}
                                  </Text>
                                </Box>
                                <Box display='flex' alignItems='center'>
                                  <Dislike />
                                  <Text color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                                    {item.dislikes}
                                  </Text>
                                </Box>
                              </Box>
                              {index === comments.length - 1 ? <></> : <Divider my={4} w='100%' />}
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            )}
            {/* <Avatar size='2xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

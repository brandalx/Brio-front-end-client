import { Box, Container, Flex, GridItem, Text, Skeleton, Image, Grid, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { API_URL, handelApiGet } from '../../services/apiServices';
import axios from 'axios';
import { REACT_API_opencagedata, REACT_APP_MAPBOX } from '../../../env';
import Logo from '../../assets/svg/Logo';

export default function Restaurant() {
  const [restaurantArr, setAr] = useState([]);
  const [productArr, setProductAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);

  const params = useParams();

  const handleRestaurantApi = async () => {
    const url = API_URL + '/restaurants/' + params['id'];

    try {
      setLoading(true);
      const data = await handelApiGet(url);
      setAr(data);
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
        const datanew = await handelApiGet(url);
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
  }, [params]);

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
      const placeUrl = `${REACT_API_opencagedata}${restaurantArr.location}%20${restaurantArr.address}&pretty=1`;
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
      <Box background='bg' py='50px'>
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
                    {address && (
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
        <Container maxW='1110px'>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1.3fr 1fr' }} gap={2}>
            <GridItem w='100%' h='100%'>
              <Box py='25px'>
                <Text color='neutral.black' fontWeight='semibold' fontSize='sm'>
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
          </Grid>
        </Container>
      </Box>
    </>
  );
}

import { Box, Container, Flex, GridItem, Text, Skeleton, Image, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link } from 'react-router-dom';
import { API_URL, handelApiGet } from '../../services/apiServices';
import axios from 'axios';
import { REACT_API_opencagedata, REACT_APP_MAPBOX } from '../../../env';

export default function Restaurant() {
  const [restaurantArr, setAr] = useState([]);
  const [productArr, setProductAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);

  const handleRestaurantApi = async () => {
    const url = API_URL + '/restaurants';

    try {
      setLoading(true);
      const data = await handelApiGet(url);
      setAr(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleProductApi = async () => {
    const url = API_URL + '/products';

    try {
      setLoading(true);
      const data = await handelApiGet(url);
      setProductAr(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleRestaurantApi();
    handleProductApi();
  }, []);

  useEffect(() => {
    if (restaurantArr.length > 0) {
      handleMapApi();
    }
  }, [restaurantArr]);

  const handleMapApi = async () => {
    try {
      const placeUrl = `${REACT_API_opencagedata}${restaurantArr[0].location}%20${restaurantArr[0].address}&pretty=1`;
      const resp = await axios.get(placeUrl);
      const data = resp.data;
      setAddress(data);
      setAddressLoading(false);
    } catch (error) {
      console.log(error);
      setAddressLoading(false);
    }
  };

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
                      <Skeleton borderRadius='16px' isLoaded={!addressLoading}>
                        {!loading && restaurantArr.length > 0 && (
                          <Image
                            borderWidth='15px'
                            borderColor='neutral.white'
                            borderRadius='16px'
                            src={restaurantArr[0].image}
                          />
                        )}
                      </Skeleton>
                    </GridItem>
                  </Flex>
                  <GridItem w='100%'>
                    {' '}
                    <Flex flexDirection='column' justifyContent='center' h='100%'>
                      <Skeleton my={2} borderRadius='16px' isLoaded={!addressLoading}>
                        <Text fontSize='xl' fontWeight='extrabold'>
                          {!loading && restaurantArr.length > 0 && restaurantArr[0].title}
                        </Text>
                      </Skeleton>
                      <Skeleton my={2} borderRadius='16px' isLoaded={!addressLoading}>
                        <Text fontSize='2xs'>
                          {' '}
                          {!loading && restaurantArr.length > 0 && restaurantArr[0].description}
                        </Text>
                      </Skeleton>
                      <Skeleton borderRadius='16px' isLoaded={!addressLoading} my={2}>
                        <Box display='flex'>
                          <Box display='flex' alignItems='center' me={2}>
                            {' '}
                            <AiOutlineClockCircle color='#828282' />
                          </Box>
                          <Text color='neutral.gray' fontSize='3xs'>
                            {!loading && restaurantArr.length > 0 && restaurantArr[0].time} min • ${' '}
                            {!loading && restaurantArr.length > 0 && restaurantArr[0].minprice} min sum
                          </Text>
                        </Box>
                      </Skeleton>
                    </Flex>
                  </GridItem>
                </Grid>
              </Flex>
            </GridItem>
            <GridItem w='100%' h='auto'>
              <Skeleton borderRadius='16px' isLoaded={!addressLoading} minH='200px' my={2}>
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
                    {!loading &&
                      productArr.length > 0 &&
                      productArr.map((item, index) => {
                        return (
                          <Box key={index}>
                            <Link to='/restaurant/product'>
                              <Skeleton borderRadius='16px' isLoaded={!addressLoading}>
                                <ProductCard
                                  img={item.image}
                                  title={item.title}
                                  info={item.description}
                                  price={item.price}
                                />
                              </Skeleton>
                            </Link>
                          </Box>
                        );
                      })}
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

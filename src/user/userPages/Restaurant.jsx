import { Box, Container, Flex, GridItem, Text, Image, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link } from 'react-router-dom';
import { API_URL, handelApiGet } from '../../services/apiServices';

export default function Restaurant() {
  const [restaurantArr, setAr] = useState([]);
  const [productArr, setProductAr] = useState([]);
  const [loading, setLoading] = useState(true);
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
                      {!loading && restaurantArr.length > 0 && (
                        <Image
                          borderWidth='15px'
                          borderColor='neutral.white'
                          borderRadius='16px'
                          src={restaurantArr[0].image}
                        />
                      )}
                    </GridItem>
                  </Flex>
                  <GridItem w='100%'>
                    {' '}
                    <Flex flexDirection='column' justifyContent='center' h='100%'>
                      <Text fontSize='xl' fontWeight='extrabold'>
                        {!loading && restaurantArr.length > 0 && restaurantArr[0].title}
                      </Text>
                      <Text fontSize='2xs'>
                        {' '}
                        {!loading && restaurantArr.length > 0 && restaurantArr[0].description}
                      </Text>

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
                    </Flex>
                  </GridItem>
                </Grid>
              </Flex>
            </GridItem>
            <GridItem w='100%' h='auto'>
              <Flex alignItems='center' h='100%'>
                <Box w='100%'>
                  <iframe
                    title='map'
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10752.024000153444!2d-74.0009056026385!3d40.75063980735163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ae15b2adcb%3A0x7955420634fd7eba!2s${encodeURIComponent(
                      restaurantArr.location
                    )}!5e0!3m2!1sen!2sil!4v1683120634682!5m2!1sen!2sil'`}
                    width='100%'
                    style={{ borderRadius: '16px', borderWidth: '5px', borderColor: 'white', minHeight: '230px' }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  />
                </Box>
              </Flex>
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
                    templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                    gap={4}
                  >
                    {!loading &&
                      productArr.length > 0 &&
                      productArr.map((item, index) => {
                        return (
                          <Box key={index}>
                            <Link to='/restaurant/product'>
                              <ProductCard
                                img={item.image}
                                title={item.title}
                                info={item.description}
                                price={item.price}
                              />
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

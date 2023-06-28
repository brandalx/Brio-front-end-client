import React, { Suspense, useEffect, useState } from 'react';
import { Box, Container, Flex, Text, GridItem, Grid, Image, Skeleton } from '@chakra-ui/react';
import burgertest from '../../assets/images/burgertest.png';
import CategoryPicker from '../userComponents/HomePage/CategoryPicker';
import { API_URL, handleApiGet } from '../../services/apiServices';
import RestaurantCard from '../userComponents/HomePage/RestaurantCard';
import Preloader from '../../components/Loaders/preloader';
import { useCheckToken } from '../../services/token';

import Spline from '@splinetool/react-spline';
import Logo from '../../assets/svg/Logo';
import { Circle } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function Home() {
  // todo: add tag into product into backend model and validation

  const [arr, setAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModel, setloadingModel] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [heightchange, setheightchange] = useState(1);
  const [hovered, setHovered] = useState(false);
  const handleApi = async () => {
    const url = API_URL + '/restaurants';

    try {
      const data = await handleApiGet(url);
      setAr(data);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      setScrollEnabled(false);
    } else {
      document.body.style.overflow = 'auto';
      setScrollEnabled(true);
    }
  }, [loading]);
  const isTokenExpired = useCheckToken();

  useEffect(() => {
    isTokenExpired;
  }, [isTokenExpired]);
  const onload = () => {
    setheightchange(250);
    setLoading(false);
  };

  const handleMouseEnter = () => {
    console.log('Mouse entered');
    setHovered(true);
  };

  const handleMouseLeave = () => {
    console.log('Mouse left');
    setHovered(false);
  };
  return (
    <>
      <Preloader loading={loading} />

      {/* {loading && (
        <Box h='350px' my={4}>
          <Skeleton mx='auto' borderRadius='16px' height='350px' isLoaded={loadingModel} maxW='1100px'></Skeleton>
        </Box>
      )} */}
      <Container maxW='1110px' py={30}>
        <Box borderRadius='16px' py={5} bg='primary.default'>
          <Flex flexDir={{ base: 'column', md: 'row' }} alignItems={{ base: 'none', md: 'center' }}>
            <Box>
              <Text
                backgroundColor='none'
                mt={5}
                ms={5}
                data-aos='fade-up'
                textAlign={{ base: 'center', md: 'start' }}
                fontSize={{ base: 'xl', md: '2xl' }}
                lineHeight={{ base: '20px', md: '45px' }}
                color='white'
                fontWeight='black'
              >
                Brio
              </Text>

              <Text
                mt={2}
                ms={5}
                textAlign={{ base: 'center', md: 'start' }}
                fontSize={{ base: 'sm', md: 'dm' }}
                lineHeight={{ base: '15px', md: '20px' }}
                color='white'
                fontWeight='black'
              >
                Bringing food really on-time
              </Text>

              <Box mt={{ base: 5, md: 4 }} ms={5} textAlign={{ base: 'center', md: 'start' }}>
                <Link to='/signup'>
                  <Button
                    fontSize='xs'
                    fontWeight='bold'
                    variant='solid'
                    color='primary.default'
                    borderWidth='1px'
                    background='neutral.white'
                    borderColor='primary.default'
                    _hover={{
                      background: 'primary.light',
                      color: 'primary.default',
                      borderWidth: '1px',
                      borderColor: 'primary.default'
                    }}
                    py={5}
                  >
                    {' '}
                    Get started
                  </Button>
                </Link>
              </Box>
            </Box>

            <Box borderRadius='16px' h={`${heightchange}px`} w='100%'>
              <Spline scene='https://draft.spline.design/wzcQPaZUf8Lx1H2y/scene.splinecode' onLoad={onload} />
            </Box>
          </Flex>
        </Box>
      </Container>

      <Container maxW='1110px' py={15}>
        <Skeleton borderRadius='16px' height={loading ? '250px' : '0px'} isLoaded={loading} my={loading ? 2 : 0} />
        <Box>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={2}>
            <Skeleton borderRadius='16px' isLoaded={!loading}>
              <GridItem
                style={{ transition: 'all 0.3s' }}
                cursor='pointer'
                w='100%'
                h='auto'
                borderColor='white'
                borderWidth='1px'
                bg='primary.light'
                _hover={{ bg: 'white', borderWidth: '1px', borderColor: 'primary.default', transition: 'all 0.3s' }}
                borderRadius={20}
              >
                <Flex alignItems='center'>
                  <Box w='50%'>
                    <Image src={burgertest} alt='Promotion 1' />
                  </Box>
                  <Box w='50%'>
                    <Text fontSize='sm' color='neutral.black' fontWeight='medium'>
                      All deserts
                    </Text>
                    <Text fontSize='xl' fontWeight='extrabold' color='primary.default'>
                      20% OFF
                    </Text>
                    <Text fontSize='2xs' fontWeight='regular' color='neutral.gray'>
                      Deserty
                    </Text>
                  </Box>
                </Flex>
              </GridItem>
            </Skeleton>
            <Skeleton borderRadius='16px' isLoaded={!loading}>
              <GridItem
                style={{ transition: 'all 0.3s' }}
                cursor='pointer'
                borderRadius={20}
                w='100%'
                h='auto'
                borderColor='white'
                borderWidth='1px'
                bg='primary.light'
                _hover={{ bg: 'white', borderWidth: '1px', borderColor: 'primary.default', transition: 'all 0.3s' }}
              >
                <Flex alignItems='center'>
                  <Box w='50%'>
                    <Image src={burgertest} alt='Promotion 1' />
                  </Box>
                  <Box w='50%'>
                    <Text fontSize='sm' color='neutral.black' fontWeight='medium'>
                      Big Burgers
                    </Text>
                    <Text fontSize='xl' fontWeight='extrabold' color='primary.default'>
                      50% OFF
                    </Text>
                    <Text fontSize='2xs' fontWeight='regular' color='neutral.gray'>
                      Fooddies
                    </Text>
                  </Box>
                </Flex>
              </GridItem>
            </Skeleton>
          </Grid>
        </Box>
        <Box maxW='1110px' my='45px'>
          <Link to='/deals'>
            <Box
              style={{ transition: 'all 0.3s' }}
              cursor='pointer'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              borderRadius='16px'
              py={5}
              borderColor='white'
              borderWidth='1px'
              bg='primary.light'
              _hover={{ bg: 'white', borderWidth: '1px', borderColor: 'primary.default', transition: 'all 0.3s' }}
            >
              <Flex justifyContent='space-between' alignItems={{ base: 'none', md: 'center' }}>
                <Text
                  ms={5}
                  textAlign={{ base: 'center', md: 'start' }}
                  fontSize={{ base: 'sm', md: 'dm' }}
                  lineHeight={{ base: '15px', md: '20px' }}
                  color={hovered ? '#4e60ff' : '#4e60ff'}
                  fontWeight='black'
                >
                  To all deals
                </Text>
                <Box me={5}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-arrow-big-right-filled'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path
                      d='M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z'
                      strokeWidth='0'
                      fill={hovered ? '#4e60ff' : '#4e60ff'}
                    ></path>
                  </svg>
                </Box>
              </Flex>
            </Box>
          </Link>
        </Box>
        <Skeleton borderRadius='16px' isLoaded={!loading} my={4}>
          <Box py={30}>
            <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
              <CategoryPicker emoji='pizza' label='Pizza' />

              <CategoryPicker emoji='hamburger' label='Burger' />
              <CategoryPicker emoji='cut-of-meat' label='   Sushi' />
              <CategoryPicker emoji='sushi' label='Sushi' />
              <CategoryPicker emoji='broccoli' label='Vegan' />
              <CategoryPicker emoji='cupcake' label='  Desserts' />
            </Grid>
          </Box>
        </Skeleton>
        <Box py='25px'>
          <Text mb={5} fontWeight='semibold' color='neutral.black' fontSize='sm'>
            Nearby restaurants
          </Text>

          {!loading && (
            <Box>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                {arr.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Skeleton borderRadius='16px' isLoaded={!loading}>
                        <RestaurantCard
                          _id={item._id}
                          img={item.image}
                          title={item.title}
                          time={item.time}
                          price={item.minprice}
                          badgeData={item.tags}
                        />
                      </Skeleton>
                    </Box>
                  );
                })}
              </Grid>
            </Box>
          )}
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

        <Box py='25px'>
          <Text fontWeight='semibold' color='neutral.black' fontSize='sm'>
            All restaurants
          </Text>
          <Box py={15}>
            <Skeleton borderRadius='16px' isLoaded={!loading}>
              <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
                <CategoryPicker emoji='pizza' label='Pizza' />

                <CategoryPicker emoji='hamburger' label='Burger' />
                <CategoryPicker emoji='cut-of-meat' label='   Sushi' />
                <CategoryPicker emoji='sushi' label='Sushi' />
                <CategoryPicker emoji='broccoli' label='Vegan' />
                <CategoryPicker emoji='cupcake' label='  Desserts' />
              </Grid>
            </Skeleton>
          </Box>
          <Box py={15} display='flex'>
            <Skeleton borderRadius='16px' isLoaded={!loading}>
              <Grid templateColumns={{ base: 'repeat(4, 1fr)', sm: 'repeat(4 1fr)', md: 'repeat(6, 1fr)' }} gap={3}>
                <GridItem h='auto'>
                  <Box
                    data-aos='fade-up'
                    as='button'
                    textAlign='center'
                    bg='neutral.white'
                    border='1px'
                    borderRadius='full'
                    color='neutral.gray'
                    fontWeight='extrabold'
                    fontSize='3xs'
                    px={2}
                    py={1}
                  >
                    DINING OPTIONS
                  </Box>
                </GridItem>
                <GridItem h='auto'>
                  <Box
                    data-aos='fade-up'
                    as='button'
                    textAlign='center'
                    bg='neutral.white'
                    border='1px'
                    borderRadius='full'
                    color='neutral.gray'
                    fontWeight='extrabold'
                    fontSize='3xs'
                    px={2}
                    py={1}
                  >
                    PRICE RANGE
                  </Box>
                </GridItem>
                <GridItem h='auto'>
                  <Box
                    data-aos='fade-up'
                    as='button'
                    textAlign='center'
                    bg='neutral.white'
                    border='1px'
                    borderRadius='full'
                    color='neutral.gray'
                    fontWeight='extrabold'
                    fontSize='3xs'
                    px={2}
                    py={1}
                  >
                    DELIVERY TIME
                  </Box>
                </GridItem>
                <GridItem h='auto'>
                  <Box
                    data-aos='fade-up'
                    as='button'
                    textAlign='center'
                    bg='neutral.white'
                    border='1px'
                    borderRadius='full'
                    color='neutral.gray'
                    fontWeight='extrabold'
                    fontSize='3xs'
                    px={2}
                    py={1}
                  >
                    DINING OPTIONS
                  </Box>
                </GridItem>
                <GridItem h='auto'>
                  <Box
                    data-aos='fade-up'
                    as='button'
                    textAlign='center'
                    bg='neutral.white'
                    border='1px'
                    borderRadius='full'
                    color='neutral.gray'
                    fontWeight='extrabold'
                    fontSize='3xs'
                    px={2}
                    py={1}
                  >
                    PAYMENT METHODS
                  </Box>
                </GridItem>
                <GridItem h='auto'>
                  <Box
                    data-aos='fade-up'
                    as='button'
                    textAlign='center'
                    bg='neutral.white'
                    border='1px'
                    borderRadius='full'
                    color='neutral.gray'
                    fontWeight='extrabold'
                    fontSize='3xs'
                    px={2}
                    py={1}
                  >
                    <Text>LOCATION</Text>
                  </Box>
                </GridItem>
              </Grid>
            </Skeleton>
          </Box>
          <Box py={15}>
            <Skeleton borderRadius='16px' isLoaded={!loading}>
              <Text py={4} color='neutral.grayDark' fontSize='3xs'>
                Found {arr.length} restaurants
              </Text>
            </Skeleton>

            {!loading && (
              <Box>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                  {arr.map((item) => {
                    return (
                      <RestaurantCard
                        key={item._id}
                        _id={item._id}
                        img={item.image}
                        title={item.title}
                        time={item.time}
                        price={item.minprice}
                        badgeData={item.tags}
                      />
                    );
                  })}
                </Grid>
              </Box>
            )}
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
    </>
  );
}

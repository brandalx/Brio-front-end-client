import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Box, Container, Flex, Text, GridItem, Grid, Image, Skeleton } from '@chakra-ui/react';
import burgertest from '../../assets/images/burgertest.png';
import CategoryPicker from '../userComponents/HomePage/CategoryPicker';
import { API_URL, TOKEN_KEY, handleApiGet } from '../../services/apiServices';
import RestaurantCard from '../userComponents/HomePage/RestaurantCard';
import Preloader from '../../components/Loaders/preloader';
import { useCheckToken } from '../../services/token';
import caketest from '../../assets/images/caketest.png';
import Spline from '@splinetool/react-spline';
import Logo from '../../assets/svg/Logo';
import { Circle } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { geolocationContext } from '../../context/globalContext';
import Pickers from '../userComponents/HomePage/Pickers';
import SearchInput from '../userComponents/Search/SearchInput';
import Arrow from '../../assets/svg/Arrow';
function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}
export default function Home() {
  // todo: add tag into product into backend model and validation

  const [arr, setAr] = useState([]);
  const [arr2, setAr2] = useState([]);
  const [keepArr, setKeepArr] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingModel, setloadingModel] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [heightchange, setheightchange] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [sortedArr, setSortedArr] = useState([]);
  const [sortedArr2, setSortedArr2] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [dates, setDates] = useState();
  const { city, setCity, isTrue, setIsTrue } = useContext(geolocationContext);
  let lastPromotions = [];
  const handlePromotions = async () => {
    try {
      const url = API_URL + '/admin/promotions';
      const data = await handleApiGet(url);
      // console.log(data);
      setPromotions(data);

      let tempArr = [];
      // let tempArr2 = [];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let dayName = days[new Date().getDay()]; // get the day of the week
      //for both start and end dates
      // data.forEach((item) => {
      //   let startDate = new Date(item.startDate); // parse startDate into a Date object
      //   let endDate = new Date(item.endDate); // parse endDate into a Date object
      //   if (item.discountDays.includes(dayName) && new Date() >= startDate && new Date() < endDate) {
      //     tempArr.push(item);
      //   }
      // });

      //for only end date
      data.forEach((item) => {
        let startDate = new Date(item.startDate); // parse startDate into a Date object
        let endDate = new Date(item.endDate); // parse endDate into a Date object
        if (item.discountDays.includes(dayName) && new Date() < endDate) {
          tempArr.push(item);
        }
      });

      // let rnd1, rnd2;
      // do {
      //   rnd1 = Math.floor(Math.random() * tempArr.length);
      //   rnd2 = Math.floor(Math.random() * tempArr.length);
      // } while (rnd2 === rnd1 || lastPromotions.includes(rnd1) || lastPromotions.includes(rnd2));

      // tempArr2.push(data[rnd1]);
      // tempArr2.push(data[rnd2]);

      // console.log(tempArr);
      setActivePromotions(tempArr);

      // lastPromotions = [rnd1, rnd2]; // remember the last promotions
    } catch (error) {
      console.log(error);
    }
  };

  const handleApi = async () => {
    const url = API_URL + '/restaurants';

    try {
      const data = await handleApiGet(url);
      let tempArrRest = [];
      data.map((item, index) => {
        if (item.products && item.products.length > 0) {
          tempArrRest.push(item);
        }
      });
      setAr(tempArrRest);

      setKeepArr(tempArrRest);

      handleApiUser();
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleApiUser = async () => {
    const urluser = API_URL + '/users/info/user';

    try {
      const data2 = await handleApiGet(urluser);

      setUser(data2);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSortedByLocation = (_data) => {
    if (typeof city !== 'string' || city.length === 0) {
      console.error('Invalid city value:', city);
      return;
    }

    let prefinalArr = [];
    const cityRegex = new RegExp(city, 'i');

    _data.map((item, index) => {
      // console.log(item.location);
      // console.log(cityRegex);
      if (cityRegex.test(item.location)) {
        prefinalArr.push(item);
      }
    });

    let tempArrRest = [];
    prefinalArr.map((item, index) => {
      if (item.products && item.products.length > 0) {
        tempArrRest.push(item);
      }
    });

    setAr2(tempArrRest);
  };

  useEffect(() => {
    handlePromotions();
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
    // console.log('Mouse entered');
    setHovered(true);
  };

  const handleMouseLeave = () => {
    // console.log('Mouse left');
    setHovered(false);
  };

  useEffect(() => {
    sortByTags2(sortedArr);
  }, [sortedArr]);

  useEffect(() => {
    sortByTags1(sortedArr2);
  }, [sortedArr2]);

  const sortByTags2 = (_info) => {
    if (_info.length === 0) {
      setAr2(keepArr);
    } else {
      const emojis = _info.map((item) => item.emoji); // extract emojis from _info
      let filteredArr = keepArr.filter(
        (item, index) => item.tags.some((tag) => emojis.includes(tag.badgeEmoji)) // check if badgeEmoji is in the emojis array
      );
      setAr2(filteredArr);
    }
  };

  const sortByTags1 = (_info) => {
    if (_info.length === 0) {
      setAr(keepArr);
    } else {
      const emojis = _info.map((item) => item.emoji); // extract emojis from _info
      let filteredArr = keepArr.filter(
        (item, index) => item.tags.some((tag) => emojis.includes(tag.badgeEmoji)) // check if badgeEmoji is in the emojis array
      );
      setAr(filteredArr);
    }
  };

  useEffect(() => {
    if (localStorage[TOKEN_KEY] && sessionStorage['isTrue'] && sessionStorage['location'] && sortedArr) {
      handleSortedByLocation(arr);
    }
  }, [city, setCity, sortedArr]);
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

              {!localStorage[TOKEN_KEY] && (
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
              )}

              {localStorage[TOKEN_KEY] && !loading && (
                <Box mt={{ base: 5, md: 4 }} ms={5} textAlign={{ base: 'center', md: 'start' }}>
                  <Link to='/restaurant'>
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
                      Welcome back, {user.firstname}
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>

            <Box borderRadius='16px' h={`${heightchange}px`} w='100%'>
              <Box className='vibrate-1' display={{ base: 'none', lg: 'block' }} position='relative'>
                <Box position='absolute'>
                  <Text
                    style={{ transform: 'translateX(480px) translateY(-10px)' }}
                    mt={2}
                    ms={5}
                    textAlign={{ base: 'center', md: 'start' }}
                    fontSize={{ base: '2xs', md: '2xs' }}
                    lineHeight={{ base: '15px', md: '20px' }}
                    color='white'
                    fontWeight='black'
                  >
                    Touchable!
                  </Text>

                  <Box style={{ transform: 'translateX(500px) translateY(-80px) scale(0.4)' }}>
                    <Arrow />
                  </Box>
                </Box>
              </Box>
              <Spline scene='https://draft.spline.design/wzcQPaZUf8Lx1H2y/scene.splinecode' onLoad={onload} />
            </Box>
          </Flex>
        </Box>
      </Container>
      <Box pt={15} pb='50px'>
        <SearchInput />
      </Box>
      <Container maxW='1110px' py={15}>
        <Skeleton borderRadius='16px' height={loading ? '250px' : '0px'} isLoaded={loading} my={loading ? 2 : 0} />
        <Box>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={2}>
            {/* <Skeleton borderRadius='16px' isLoaded={!loading}>
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
                {activePromotions.length > 0 && (
                  <Link to={`/restaurant/${activePromotions[index].restaurantRef}`}>
                    <Flex alignItems='center'>
                      <Box w='50%'>
                        <Image src={caketest} alt='Promotion 1' />
                      </Box>
                      <Box w='50%'>
                        <Text fontSize='xs' color='neutral.black' fontWeight='medium'>
                          {activePromotions[0].discountDetails}
                        </Text>
                        <Text fontSize='xl' fontWeight='extrabold' color='primary.default'>
                          {activePromotions[0].discountPercent}% OFF
                        </Text>
                        <Text fontSize='2xs' fontWeight='regular' color='neutral.gray'>
                          at {activePromotions[0].restaurantName}
                        </Text>
                      </Box>
                    </Flex>
                  </Link>
                )}
              </GridItem>
            </Skeleton> */}
            {activePromotions.length > 0 &&
              (() => {
                let randomPromotions = [];
                if (activePromotions.length === 1) {
                  // If there's only one promotion, just use that.
                  randomPromotions = [activePromotions[0]];
                } else {
                  // Generate two unique random indexes
                  let index1 = getRandomIndex(activePromotions.length);
                  let index2 = getRandomIndex(activePromotions.length);
                  while (index1 === index2) {
                    index2 = getRandomIndex(activePromotions.length);
                  }
                  // Create a new array containing the two randomly chosen items
                  randomPromotions = [activePromotions[index1], activePromotions[index2]];
                }

                return randomPromotions.map((item, index) => {
                  // Your original map function here...
                  return (
                    <Skeleton key={index} borderRadius='16px' isLoaded={!loading}>
                      <GridItem
                        style={{ transition: 'all 0.3s' }}
                        cursor='pointer'
                        borderRadius={20}
                        w='100%'
                        h='auto'
                        borderColor='white'
                        borderWidth='1px'
                        bg={index % 2 === 0 ? 'secondary.light' : 'primary.light'}
                        _hover={{
                          bg: 'white',
                          borderWidth: '1px',
                          borderColor: 'primary.default',
                          transition: 'all 0.3s'
                        }}
                      >
                        <Link to={`/restaurant/${item.restaurantRef}`}>
                          <Flex alignItems='center'>
                            <Box w='50%'>
                              <Image src={index % 2 === 0 ? burgertest : caketest} alt='Promotion 1' />
                            </Box>
                            <Box w='50%'>
                              <Text fontSize='xs' color='neutral.black' fontWeight='medium'>
                                {item.discountDetails}
                              </Text>
                              <Text fontSize='xl' fontWeight='extrabold' color='primary.default'>
                                {item.discountPercent}% OFF
                              </Text>
                              <Text fontSize='2xs' fontWeight='regular' color='neutral.gray'>
                                at {item.restaurantName}
                              </Text>
                            </Box>
                          </Flex>
                        </Link>
                      </GridItem>
                    </Skeleton>
                  );
                });
              })()}
          </Grid>
        </Box>
        <Box maxW='1110px' my='45px'>
          <Link to='/deals'>
            <Box
              style={{ transition: 'all 0.3s' }}
              cursor='pointer'
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
        {localStorage[TOKEN_KEY] && sessionStorage['isTrue'] && sessionStorage['location'] && sortedArr && (
          <>
            <Box pt='25px'>
              <Text mb={2} fontWeight='extrabold' color='neutral.black' fontSize='sm'>
                Nearby restaurants at {city}
              </Text>
              <Skeleton borderRadius='16px' isLoaded={!loading}>
                <Text pb={4} color='neutral.grayDark' fontSize='3xs'>
                  Found {arr2.length} restaurants
                </Text>
              </Skeleton>
              {arr2.length === 0 && (
                <Skeleton borderRadius='16px' isLoaded={!loading}>
                  <Box
                    style={{ transition: 'all 0.3s' }}
                    cursor='pointer'
                    borderRadius='16px'
                    py={5}
                    borderColor='white'
                    borderWidth='1px'
                    bg='primary.light'
                    _hover={{ bg: 'white', borderWidth: '1px', borderColor: 'primary.default', transition: 'all 0.3s' }}
                  >
                    <Flex justifyContent='center' alignItems={{ base: 'none', md: 'center' }}>
                      <Text
                        ms={5}
                        textAlign={{ base: 'center', md: 'start' }}
                        fontSize={{ base: 'sm', md: 'dm' }}
                        color={hovered ? '#4e60ff' : '#4e60ff'}
                        fontWeight='black'
                      >
                        Sorry we didn't found restaurants nearby at {city} : (
                      </Text>
                    </Flex>
                  </Box>
                </Skeleton>
              )}

              {!loading && (
                <Box>
                  <Grid
                    templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                    alignItems='stretch'
                    gap={4}
                  >
                    {arr2.map((item, index) => {
                      if (item.products.length > 0) {
                        return (
                          <Box key={index}>
                            <Skeleton borderRadius='16px' isLoaded={!loading}>
                              <RestaurantCard
                                _id={item._id}
                                img={item.image}
                                title={item.title}
                                time={item.time || '10-30'}
                                price={item.minprice || 10}
                                badgeData={item.tags}
                              />
                            </Skeleton>
                          </Box>
                        );
                      }
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
          </>
        )}
        <Box py='25px'>
          <Text fontWeight='extrabold' color='neutral.black' fontSize='sm'>
            All restaurants
          </Text>
          <Skeleton borderRadius='16px' isLoaded={!loading} my='5px'>
            <Pickers setSortedArr={setSortedArr2} sortedArr={sortedArr2} />
          </Skeleton>
          {/* todo: add filters */}
          {/* <Box py={15} display='flex'>
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
          </Box> */}
          <Box py={15}>
            <Skeleton borderRadius='16px' isLoaded={!loading}>
              <Text py={4} color='neutral.grayDark' fontSize='3xs'>
                Found {arr.length} restaurants
              </Text>
            </Skeleton>

            {!loading && (
              <Box>
                <Grid
                  alignItems='stretch'
                  templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                  gap={4}
                >
                  {arr.map((item, index) => {
                    if (item.products && item.products.length > 0) {
                      return (
                        <RestaurantCard
                          key={index}
                          _id={item._id}
                          img={item.image}
                          title={item.title}
                          time={item.time || '10-30'}
                          price={item.minprice || 10}
                          badgeData={item.tags}
                        />
                      );
                    }
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

import {
  Box,
  Container,
  Flex,
  GridItem,
  Text,
  Skeleton,
  Image,
  Grid,
  Button,
  Divider,
  FormLabel,
  FormErrorMessage,
  Textarea,
  useToast,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import noimagerest from '../../assets/images/noimagerest.jpg';

import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL, TOKEN_KEY, handleApiGet, handleApiMethod } from '../../services/apiServices';
import axios from 'axios';

import Logo from '../../assets/svg/Logo';
import Star from '../../assets/svg/Star';
import { Avatar } from '@chakra-ui/react';
import Like from '../../assets/svg/Like';
import Dislike from '../../assets/svg/Dislike';
import { useForm } from 'react-hook-form';
import { FormControl, Input, Select } from '@chakra-ui/react';
import { Popover } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import PickersCategory from '../userComponents/RestaurantPage/PickersCategory';

export default function Restaurant() {
  const REACT_APP_API_URL = import.meta.env.VITE_APIURL;
  const REACT_APP_opencagedata = import.meta.env.VITE_OPENCAGEDATA;
  const REACT_APP_MAPBOX = import.meta.env.VITE_MAPBOX;
  const REACT_APP_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOXTOKEN;
  const [userRef, setUserRef] = useState();
  const [restaurantArr, setAr] = useState([]);
  const [userArr, setUserArr] = useState([]);
  const [productArr, setProductAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [comments, setComments] = useState();
  const [responseFalls, setResponseFalls] = useState(true);
  const [showOops, setShowOops] = useState(false);
  const [categories, SetCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [picked, setIsPicked] = useState(false);
  const [keepArr, setKeepArr] = useState([]);
  const params = useParams();
  const [promotions, setPromotions] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [layout, setLayout] = useState('repeat(2, 1fr)');
  const handleChangeLayout = () => {
    console.log(layout);
    if (layout === 'repeat(2, 1fr)') {
      setLayout('repeat(1, 1fr)');
    } else {
      setLayout('repeat(2, 1fr)');
    }
  };

  const [usersArr, setUsersArr] = useState();

  const handleUserApi = async () => {
    const url2 = API_URL + '/users/info/user';
    const url3 = API_URL + '/categories';
    try {
      const data3 = await handleApiGet(url3);
      handleCategories(data3);
      // console.log(data3);
      const data2 = await handleApiGet(url2);
      // console.log(data2);
      setUserArr(data2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategories = (_data) => {
    let tempArr = [];
    _data.map((item) => {
      if (item.restaurantRef === params['id']) {
        tempArr.push(item);
      }
    });
    SetCategories(tempArr);
    // console.log(tempArr);
  };

  const handleRestaurantApi = async () => {
    const url = API_URL + '/restaurants/' + params['id'];
    try {
      const data = await handleApiGet(url);

      setAr(data);
      let commentsarray = data.reviews;
      commentsarray.reverse();
      setComments(commentsarray);

      await handleUsersPublicData(commentsarray);
      await handleProductApi(data);
      // console.log(data);
      if (data.length === 0) setResponseFalls(false);
      await handleUserApi();
    } catch (error) {
      setResponseFalls(false);
      setLoading(false);
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };
  const handleProductApi = async (data) => {
    try {
      const tempProductArr = [];
      // console.log('data');
      // console.log(data);
      for (const item of data.products) {
        const url = API_URL + '/products/' + item;
        const datanew = await handleApiGet(url);
        tempProductArr.push(datanew);
      }
      if (tempProductArr.length === 0) {
        setShowOops(true);
      }
      // console.log(tempProductArr);
      setProductAr(tempProductArr);
      setKeepArr(tempProductArr);
    } catch (error) {
      setShowOops(true);

      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (picked) {
      let tempArr = [];
      activeCategory.forEach((category) => {
        category.products.forEach((productId) => {
          const matchedProduct = keepArr.find((product) => product._id === productId);
          if (matchedProduct) {
            tempArr.push(matchedProduct);
          }
        });
      });
      setProductAr(tempArr);
    }
  }, [activeCategory, picked, setIsPicked]);

  let getUserName = (userid) => {
    try {
      const user = usersArr.find((item) => item._id === userid);
      if (user) {
        return user.firstname + ' ' + user.lastname;
      }
      return '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  let getUserAvatar = (userid) => {
    try {
      const user = usersArr.find((item) => item._id === userid);
      if (user) {
        let stringAvatar = API_URL + '/' + user.avatar;
        // console.log(stringAvatar);
        return stringAvatar;
      }
      return '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  useEffect(() => {
    handlePromotions();
    handleRestaurantApi();
  }, []);

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
  let handleUsersPublicData = async (_commentsdata) => {
    try {
      if (_commentsdata.length > 0) {
        let allUsers = [];
        const response = await Promise.all(
          _commentsdata.map((item) => handleApiGet(`${API_URL}/users/info/public/user/${item.userRef.toString()}`))
        );
        allUsers = [...allUsers, ...response];
        setUsersArr(allUsers);
        // console.log(allUsers);
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
    if (restaurantArr && productArr && address && keepArr) {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   // Simulate delay for loading the product array
  //   setTimeout(() => {
  //     if ( productArr.length === 0) {
  //       setShowOops(true);
  //     } else {
  //       setShowOops(false);
  //     }
  //   }, 2000); // Adjust the delay time as needed
  // }, [productArr]);

  const handleMapApi = async () => {
    try {
      const placeUrl = `${REACT_APP_opencagedata}${restaurantArr.location}%20${restaurantArr.address}&pretty=1`;
      const resp = await axios.get(placeUrl);
      const data = resp.data;
      setAddress(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleLoadings();
  }, [restaurantArr, productArr, address]);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    handleCommentPost(_bodyData);
  };
  const toast = useToast();
  const handleCommentPost = async (_bodyData) => {
    try {
      const url = API_URL + '/restaurants/comment/add';

      const finalBody = {
        commentRef: params['id'],
        rate: _bodyData.rate,
        comment: _bodyData.comment || null
      };
      const data = await handleApiMethod(url, 'POST', finalBody);

      if (data.msg === true) {
        toast({
          title: 'Your comment added.',
          description: "We've added your comment!.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        clearValues();

        const url2 = API_URL + '/restaurants/' + params['id'];

        const data = await handleApiGet(url2);
        let commentsarray = data.reviews;
        commentsarray.reverse();
        setComments(commentsarray);
        handleUsersPublicData(data.reviews);
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error when adding your comment',
        description: 'Error when adding your comment. Please, try again',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };
  const clearValues = () => {
    setValue('rate', '');
    setValue('comment', '');
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return formattedDate;
  };

  const handleOverallRate = (_commentsdata) => {
    let numarray = [];
    _commentsdata.forEach((item) => {
      if (item.rate != null) {
        numarray.push(item.rate);
      }
    });
    let prefinalrateAmount = numarray.reduce((a, b) => a + b, 0);
    return (prefinalrateAmount / numarray.length).toFixed(2);
  };

  const postLike = async (_body) => {
    try {
      let url = API_URL + '/restaurants/comment/add/like';

      const finalBody = {
        commentId: _body,
        restaurantId: params['id']
      };
      // console.log(finalBody);
      const data = await handleApiMethod(url, 'POST', finalBody);

      const url2 = API_URL + '/restaurants/' + params['id'];

      const data2 = await handleApiGet(url2);
      setComments([]);
      let commentsarray = data2.reviews;
      commentsarray.reverse();
      setComments(commentsarray);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postDislike = async (_body) => {
    try {
      let url = API_URL + '/restaurants/comment/add/dislike';

      const finalBody = {
        commentId: _body,
        restaurantId: params['id']
      };
      // console.log(finalBody);
      const data = await handleApiMethod(url, 'POST', finalBody);

      const url2 = API_URL + '/restaurants/' + params['id'];

      const data2 = await handleApiGet(url2);

      setComments([]);
      let commentsarray = data2.reviews;
      commentsarray.reverse();
      setComments(commentsarray);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const defineUserLike = (_itembody) => {
    if (userArr && comments) {
      const isLike = _itembody.likes.find((item, index) => {
        return item === userArr._id; // you should return the comparison result here
      });

      if (isLike) {
        return <Like color='#4E60FF' fill='#4E60FF' />;
      } else {
        return <Like />;
      }
    }
  };

  const defineUserDisLike = (_itembody) => {
    if (userArr && comments) {
      const isLike = _itembody.dislikes.find((item, index) => {
        return item === userArr._id; // you should return the comparison result here
      });

      if (isLike) {
        return <Dislike color='#4E60FF' fill='#4E60FF' />;
      } else {
        return <Dislike />;
      }
    }
  };
  return (
    <>
      <Box background='bg' py='50px' data-aos='fade-up'>
        <Container maxW='1110px'>
          <Button my={4} _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
            <Flex alignItems='center'>
              <Icon as={FaChevronLeft} mr={1} boxSize={4} />
              <Text onClick={() => handleGoBack()} color='neutral.black' fontSize='xs'>
                Back
              </Text>
            </Flex>
          </Button>

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
                          src={restaurantArr.image ? restaurantArr.image : noimagerest}
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
                            {(!loading && restaurantArr.time) || '10-30'} min • ${' '}
                            {(!loading && restaurantArr.minprice) || 10} min sum
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
                  {!loading && (
                    <Box w='100%'>
                      {address?.results?.length > 0 &&
                      address.results[0].bounds &&
                      address.results[0].bounds.northeast.lng ? (
                        <iframe
                          width='100%'
                          src={`${REACT_APP_MAPBOX}&zoomwheel=false#8/${address.results[0].bounds.northeast.lat}/${address.results[0].bounds.northeast.lng}`}
                          title='Monochrome'
                          style={{ borderRadius: '16px', borderWidth: '5px', borderColor: 'white', minHeight: '230px' }}
                        />
                      ) : (
                        <>
                          <Box>
                            <Text py={4} textAlign='center' fontSize='sm' fontWeight='bold' color='neutral.grayDark'>
                              Sorry, we couldn't find location of this restaurant
                            </Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  )}
                </Flex>
              </Skeleton>
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container maxW='1110px' data-aos='fade-up'>
          {!showOops && (
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1.3fr 1fr' }} gap={2}>
              <GridItem w='100%' h='100%'>
                <Box py='25px'>
                  {loading && keepArr.length === 0 && (
                    <Skeleton my={4} borderRadius='16px' isLoaded={!loading} minH='100px' />
                  )}
                  {!loading && categories && (
                    <Box my={4}>
                      <Text mb={4} color='neutral.black' fontWeight='semibold' fontSize='sm'>
                        Categories
                      </Text>

                      {!loading && categories && (
                        <Box>
                          {categories ? (
                            <>
                              <Box py='10px'>
                                <PickersCategory
                                  categories={categories}
                                  SetCategories={SetCategories}
                                  setActiveCategory={setActiveCategory}
                                  activeCategory={activeCategory}
                                  picked={picked}
                                  setIsPicked={setIsPicked}
                                />
                              </Box>
                            </>
                          ) : (
                            <Text>Restaurant does not have categories</Text>
                          )}
                        </Box>
                      )}
                    </Box>
                  )}

                  {!loading && keepArr.length > 0 && (
                    <>
                      <Box py={2} display='flex' alignItems='center' justifyContent='space-between'>
                        <Text mb={4} color='neutral.black' fontWeight='semibold' fontSize='sm'>
                          Menu
                        </Text>

                        <Box display={{ base: 'none', sm: 'block' }}>
                          <Button
                            rightIcon={
                              layout === 'repeat(2, 1fr)' ? <Text fontSize='md'>-</Text> : <Text fontSize='md'>=</Text>
                            }
                            borderColor='primary.default'
                            border='1px'
                            background='neutral.white'
                            fontWeight='bold'
                            variant='solid'
                            color='primary.default'
                            borderWidth='1px'
                            _hover={{
                              background: 'primary.default',
                              color: 'white',
                              borderWidth: '1px',
                              borderColor: 'primary.default'
                            }}
                            py={5}
                            onClick={() => {
                              handleChangeLayout();
                            }}
                          >
                            Change layout to {layout === 'repeat(2, 1fr)' ? 'list' : 'tiles'}
                          </Button>
                        </Box>
                      </Box>
                    </>
                  )}

                  <Box>
                    {picked ? (
                      <Grid
                        gridAutoColumns='1fr'
                        gridAutoRows='1fr'
                        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                        gap={4}
                      >
                        {!loading ? (
                          keepArr.length > 0 ? (
                            productArr.map((item, index) => {
                              // Find the promotion where the product id is included in its discountProducts
                              let promotion = activePromotions.find((promo) =>
                                promo.discountProducts.includes(item._id)
                              );

                              return (
                                <Box key={index}>
                                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                                    <ProductCard
                                      promotion={promotion || null} // Pass the found promotion. If no promotion is found, it will be null
                                      _id={item._id}
                                      img={item.image}
                                      title={item.title}
                                      description={item.description}
                                      price={item.price}
                                    />
                                  </Skeleton>
                                </Box>
                              );
                            })
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
                    ) : (
                      <Grid
                        transition='all 0.3s'
                        gridAutoColumns='1fr'
                        gridAutoRows='1fr'
                        templateColumns={{ base: 'repeat(1, 1fr)', sm: layout }}
                        gap={4}
                      >
                        {!loading ? (
                          keepArr.length > 0 ? (
                            keepArr.map((item, index) => {
                              // Find the promotion where the product id is included in its discountProducts
                              let promotion = activePromotions.find((promo) =>
                                promo.discountProducts.includes(item._id)
                              );

                              return (
                                <Box transition='all 03.s' data-aos='fade-up' key={index}>
                                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                                    <ProductCard
                                      promotion={promotion || null} // Pass the found promotion. If no promotion is found, it will be null
                                      _id={item._id}
                                      img={item.image}
                                      title={item.title}
                                      description={item.description}
                                      price={item.price}
                                    />
                                  </Skeleton>
                                </Box>
                              );
                            })
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
                    )}
                  </Box>
                </Box>
              </GridItem>

              {loading && (
                <GridItem py='25px'>
                  <Box mb={4} />
                  <Skeleton my={4} borderRadius='16px' isLoaded={!loading} minH='100px' />
                  <Skeleton my={4} borderRadius='16px' isLoaded={!loading} minH='100px' />
                  <Skeleton my={4} borderRadius='16px' isLoaded={!loading} minH='100px' />
                  <Skeleton my={4} borderRadius='16px' isLoaded={!loading} minH='100px' />
                </GridItem>
              )}

              {!keepArr.length <= 0 && (
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
                          <Box
                            display={{ base: 'initial', md: 'flex' }}
                            justifyContent='space-between'
                            alignItems='center'
                          >
                            <Box display='flex' alignItems='center'>
                              <Text me={2} color='primary.default' fontWeight='semibold' fontSize='sm'>
                                {comments && comments.length > 0 ? handleOverallRate(comments) : 0}
                              </Text>
                              <Box me={2} display='flex'>
                                {comments &&
                                  comments.length > 0 &&
                                  [...Array(Math.floor(comments.length > 0 && handleOverallRate(comments)))].map(
                                    (_, i) => <Star key={i} color='#4E60FF' />
                                  )}
                                {comments &&
                                  comments.length > 0 &&
                                  [...Array(5 - Math.floor(comments.length > 0 && handleOverallRate(comments)))].map(
                                    (_, i) => <Star key={i} />
                                  )}
                              </Box>
                              <Text color='neutral.gray' fontWeight='bold' fontSize='10px'>
                                {comments && comments.length} {comments && comments.length === 1 ? 'vote' : 'votes'}
                              </Text>
                            </Box>
                            <Box>
                              {localStorage[TOKEN_KEY] ? (
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
                                  onClick={() => setIsActive(!isActive)}
                                  py={5}
                                  mt={{ base: '8px', md: '0px' }}
                                  me='20px'
                                >
                                  {isActive ? 'Hide review form' : '       Leave review'}
                                </Button>
                              ) : (
                                <Link to='/signup'>
                                  <Text decoration='underline' color='neutral.gray' fontWeight='bold' fontSize='12px'>
                                    Login or Signup to leave a comment
                                  </Text>
                                </Link>
                              )}
                            </Box>
                          </Box>
                        </Box>
                        {isActive ? (
                          <Box>
                            <Divider w='100%' />
                            <Box>
                              <Box p={4}>
                                <form onSubmit={handleSubmit(onSubForm)}>
                                  <Box pt={2} mb={2}>
                                    <Grid templateColumns='repeat(1, 1fr)' gap={4}>
                                      <GridItem w='100%'>
                                        <FormControl isInvalid={errors.comment} id='comment'>
                                          <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                                            Your review
                                          </FormLabel>

                                          <Textarea
                                            {...register('comment', {
                                              required: false,
                                              minLength: { value: 4, message: 'Minimum length should be 4' }
                                            })}
                                            type='text'
                                            background='neutral.white'
                                            _placeholder={{
                                              fontSize: '3xs',
                                              color: 'neutral.gray'
                                            }}
                                            borderRadius='8px'
                                            fontSize='2xs'
                                            placeholder='Add your feedback about this restaurant!'
                                          />
                                          <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                                            {errors.comment && errors.comment.message}
                                          </FormErrorMessage>
                                        </FormControl>
                                        <FormControl mt={2} w='50%' isInvalid={errors.rate} id='rate'>
                                          <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                                            Rating
                                          </FormLabel>

                                          <Input
                                            min='1'
                                            max='5'
                                            {...register('rate', {
                                              required: 'This field is required',
                                              validate: (value) => {
                                                const number = Number(value);
                                                if (isNaN(number)) {
                                                  return 'Please enter a valid number';
                                                } else if (number < 1) {
                                                  return 'Minimum is 1';
                                                } else if (number > 5) {
                                                  return 'Maximum is 5';
                                                }
                                              }
                                            })}
                                            type='number'
                                            background='neutral.white'
                                            _placeholder={{
                                              fontSize: '3xs',
                                              color: 'neutral.gray'
                                            }}
                                            borderRadius='8px'
                                            fontSize='2xs'
                                            placeholder='Rate from 1 to 5'
                                          />
                                          <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                                            {errors.rate && errors.rate.message}
                                          </FormErrorMessage>
                                        </FormControl>
                                      </GridItem>
                                    </Grid>
                                  </Box>
                                  <Box pt={5} display='flex' justifyContent='flex-end' w='100%'>
                                    <Flex
                                      w='100%'
                                      justifyContent='space-between'
                                      alignItems={{ base: 'initial', md: 'center' }}
                                      flexDirection={{ base: 'column', md: 'row' }}
                                    >
                                      <Button
                                        isLoading={isSubmitting}
                                        type='submit'
                                        mt={{ base: '20px', md: '0px' }}
                                        w={{ base: '100%', md: 'initial' }}
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
                                        Add your review
                                      </Button>
                                    </Flex>
                                  </Box>
                                </form>{' '}
                              </Box>
                            </Box>{' '}
                          </Box>
                        ) : (
                          <></>
                        )}
                        <Divider w='100%' />
                        <Box p={4} overflowY='scroll' h={comments && comments.length > 0 ? '750px' : '280'}>
                          {comments && comments.length > 0 ? (
                            <Box>
                              {comments &&
                                comments.map((item, index) => {
                                  return (
                                    <Box my='20px' key={index}>
                                      <Box display='flex'>
                                        <Box me={4}>
                                          <Avatar
                                            size='md'
                                            name={getUserName(item.userRef)}
                                            src={getUserAvatar(item.userRef)}
                                          />
                                        </Box>
                                        <Box display='flex' flexDir='column'>
                                          <Box>
                                            <Text color='neutral.black' fontWeight='bold' fontSize='2xs'>
                                              {/* Savannah Miles */}
                                              {getUserName(item.userRef)}
                                            </Text>
                                          </Box>
                                          <Box display='flex'>
                                            <Box>
                                              <Box me={2} display='flex'>
                                                {comments &&
                                                  [...Array(Math.floor(item.rate))].map((_, i) => (
                                                    <Star key={i} color='#4E60FF' />
                                                  ))}
                                                {comments &&
                                                  [...Array(5 - Math.floor(item.rate))].map((_, i) => <Star key={i} />)}
                                              </Box>
                                            </Box>
                                            <Box>
                                              {' '}
                                              <Text color='neutral.gray' fontWeight='bold' fontSize='10px'>
                                                {/* 10 days ago */}
                                                {formatDate(item.datecreated)}
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
                                          {!localStorage[TOKEN_KEY] ? (
                                            <Popover>
                                              <PopoverTrigger>
                                                <Button>{defineUserLike(item)}</Button>
                                              </PopoverTrigger>
                                              <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader>Login or Signup </PopoverHeader>
                                                <PopoverBody>
                                                  Please, login or signup first to like this comment.
                                                </PopoverBody>
                                                <PopoverFooter>
                                                  <Link to='/login'>
                                                    <Button
                                                      me={2}
                                                      w={{ base: '50%', md: 'initial' }}
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
                                                      py={3}
                                                    >
                                                      Login
                                                    </Button>
                                                  </Link>
                                                  <Link to='/signup'>
                                                    <Button
                                                      w={{ base: '50%', md: 'initial' }}
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
                                                      py={3}
                                                    >
                                                      Signup
                                                    </Button>
                                                  </Link>
                                                </PopoverFooter>
                                              </PopoverContent>
                                            </Popover>
                                          ) : (
                                            <Button
                                              p={2}
                                              _hover={{ transform: 'scale(1.2) rotate(-5deg)' }}
                                              onClick={() => postLike(item._id)}
                                            >
                                              {defineUserLike(item)}
                                            </Button>
                                          )}

                                          <Text color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                                            {item.likes.length}
                                          </Text>
                                        </Box>
                                        <Box display='flex' alignItems='center'>
                                          {!localStorage[TOKEN_KEY] ? (
                                            <Popover>
                                              <PopoverTrigger>
                                                <Button>{defineUserDisLike(item)}</Button>
                                              </PopoverTrigger>
                                              <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader>Login or Signup </PopoverHeader>
                                                <PopoverBody>
                                                  Please, login or signup first to dislike this comment.
                                                </PopoverBody>
                                                <PopoverFooter>
                                                  <Link to='/login'>
                                                    <Button
                                                      me={2}
                                                      w={{ base: '50%', md: 'initial' }}
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
                                                      py={3}
                                                    >
                                                      Login
                                                    </Button>
                                                  </Link>
                                                  <Link to='/signup'>
                                                    <Button
                                                      w={{ base: '50%', md: 'initial' }}
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
                                                      py={3}
                                                    >
                                                      Signup
                                                    </Button>
                                                  </Link>
                                                </PopoverFooter>
                                              </PopoverContent>
                                            </Popover>
                                          ) : (
                                            <Button
                                              _hover={{ transform: 'scale(1.2) rotate(5deg)' }}
                                              p={2}
                                              onClick={() => postDislike(item._id)}
                                            >
                                              {defineUserDisLike(item)}
                                            </Button>
                                          )}

                                          <Text color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                                            {item.dislikes.length}
                                          </Text>
                                        </Box>
                                      </Box>
                                      {index === comments.length - 1 ? <></> : <Divider my={4} w='100%' />}
                                    </Box>
                                  );
                                })}
                            </Box>
                          ) : (
                            <Box>
                              <Text textAlign='center' color='neutral.gray' fontWeight='bold' fontSize='2xs'>
                                No comments yet. Be the first!
                              </Text>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
              )}
              {/* <Avatar size='2xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /> */}
            </Grid>
          )}

          {showOops && (
            <Container maxW='1110px' data-aos='fade-up'>
              <Box>
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
              </Box>
            </Container>
          )}
        </Container>
      </Box>
    </>
  );
}

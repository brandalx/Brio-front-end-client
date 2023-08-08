import { Box, Button, Grid, GridItem, Text, Image, Divider, Skeleton, Badge } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TrashBox from '../../../assets/svg/TrashBox';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import { Link } from 'react-router-dom';
import noimage from '../../../assets/images/noimage.jpg';
export default function Menu({ item }) {
  const [producAr, setProductAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [currentPromotion, setCurrentPromotion] = useState([]);

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
      let promotion = tempArr.find((promo) => promo.discountProducts.includes(item.productId));
      setCurrentPromotion(promotion || null);

      // lastPromotions = [rnd1, rnd2]; // remember the last promotions
    } catch (error) {
      console.log(error);
    }
  };
  const handleApi = async () => {
    const url = API_URL + '/products/' + item.productId;
    // console.log(url);
    try {
      // const data = await handleApiGet(userurl);
      const product = await handleApiGet(url);

      setProductAr(product);

      // console.log(product);
      handlePromotions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  return (
    <>
      <Link to={`/restaurant/product/${item.productId}`}>
        <Box
          cursor='pointer'
          borderRadius='12px'
          p={2}
          data-aos='fade-up'
          transition='all 0.3s'
          _hover={{ bg: 'neutral.grayLightest', transition: 'all 0.3s' }}
        >
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr ' }} gap={4}>
            <GridItem w='100%'>
              <Skeleton borderRadius='16px' isLoaded={!loading}>
                <Box display='flex' alignItems='center'>
                  <Box me={2}>
                    {!loading && (
                      <Image
                        borderRadius='12px'
                        maxH='72px'
                        maxW='72px'
                        src={producAr.image[0] ? producAr.image[0] : noimage}
                        alt='image'
                      />
                    )}
                  </Box>
                  <Box>
                    <Box>
                      <Text
                        fontWeight='bold'
                        color={localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.grayDark'}
                        fontSize='2xs'
                      >
                        {!loading && producAr.title}
                        {currentPromotion && (
                          <Badge ms={2} bg='primary.default' color='white' fontSize='3xs'>
                            {currentPromotion.discountPercent}% off
                          </Badge>
                        )}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        color={localStorage.getItem('colormode') === 'dark' ? 'neutral.grayLight' : 'neutral.grayDark'}
                        fontSize='2xs'
                      >
                        {!loading && producAr.description.split(' ').slice(0, 10).join(' ')}...
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Skeleton>
            </GridItem>
            <GridItem w='100%'>
              <Box
                h='100%'
                display='flex'
                alignItems={{ base: 'flex-end', md: 'center' }}
                alignContent='flex-end'
                justifyContent={{ base: 'center', md: 'flex-end' }}
              >
                <Grid templateColumns='1fr 1fr ' gap={4}>
                  <GridItem w='100%'>
                    {' '}
                    <Box display='flex' alignItems='center'>
                      <Skeleton borderRadius='16px' isLoaded={!loading}>
                        <Text fontSize='2xs' color='neutral.gray' fontWeight='bold' px={3} mt={1}>
                          x {item.amount}
                        </Text>
                      </Skeleton>
                    </Box>
                  </GridItem>
                  <GridItem w='100%' h='100%'>
                    {!loading && (
                      <Box w='100%' display='flex' justifyContent='center'>
                        {' '}
                        <Skeleton borderRadius='16px' isLoaded={!loading}>
                          {currentPromotion ? (
                            <Box display='flex'>
                              <Text fontWeight='extrabold' color='neutral.black' fontSize='xs' p={0} m={0}>
                                ${' '}
                                {(producAr.price * (1 - currentPromotion.discountPercent / 100) * item.amount).toFixed(
                                  2
                                )}
                              </Text>
                            </Box>
                          ) : (
                            <Text fontWeight='extrabold' color='neutral.black' fontSize='xs' p={0} m={0}>
                              $ {(producAr.price * item.amount).toFixed(2)}
                            </Text>
                          )}
                        </Skeleton>
                      </Box>
                    )}
                  </GridItem>
                </Grid>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Link>
      <Divider pt={4} />
    </>
  );
}

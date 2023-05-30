import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Text, GridItem, Grid, Image, Skeleton } from '@chakra-ui/react';
import burgertest from '../../assets/images/burgertest.png';
import CategoryPicker from '../userComponents/HomePage/CategoryPicker';
import { API_URL, handleApiGet } from '../../services/apiServices';
import RestaurantCard from '../userComponents/HomePage/RestaurantCard';
import Preloader from '../../components/Loaders/preloader';
export default function Home() {
  // todo: add tag into product into backend model and validation

  const [arr, setAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const handleApi = async () => {
    const url = API_URL + '/restaurants';

    try {
      const data = await handleApiGet(url);
      setAr(data);
      console.log(data);
      setLoading(false);
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

  return (
    <>
      <Preloader loading={loading} />
      <Container maxW='1110px'>
        <Box>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={2}>
            <Skeleton borderRadius='16px' isLoaded={!loading}>
              <GridItem w='100%' h='auto' bg='primary.light' borderRadius={20}>
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
              <GridItem borderRadius={20} w='100%' h='auto' bg='primary.light'>
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
          <Text fontWeight='semibold' color='neutral.black' fontSize='sm'>
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

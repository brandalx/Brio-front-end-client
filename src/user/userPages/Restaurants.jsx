import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Text, GridItem, Grid, Image, Skeleton } from '@chakra-ui/react';
import burgertest from '../../assets/images/burgertest.png';
import CategoryPicker from '../userComponents/HomePage/CategoryPicker';
import { API_URL, handleApiGet } from '../../services/apiServices';
import RestaurantCard from '../userComponents/HomePage/RestaurantCard';
export default function Restaurants() {
  const [sortedArrFix, setSortedArrFix] = useState([]);

  // todo: add tag into product into backend model and validation

  const [arr, setAr] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <>
      <Container maxW='1110px'>
        <Box py='25px'>
          <Text fontWeight='semibold' color='neutral.black' fontSize='sm'>
            All restaurants
          </Text>
          <Box py={15}>
            <Skeleton borderRadius='16px' isLoaded={!loading}>
              <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
                <CategoryPicker sortedArr={sortedArrFix} setSortedArr={setSortedArrFix} emoji='pizza' label='Pizza' />

                <CategoryPicker
                  sortedArr={sortedArrFix}
                  setSortedArr={setSortedArrFix}
                  emoji='hamburger'
                  label='Burger'
                />
                <CategoryPicker
                  sortedArr={sortedArrFix}
                  setSortedArr={setSortedArrFix}
                  emoji='cut-of-meat'
                  label='   Sushi'
                />
                <CategoryPicker sortedArr={sortedArrFix} setSortedArr={setSortedArrFix} emoji='sushi' label='Sushi' />
                <CategoryPicker
                  sortedArr={sortedArrFix}
                  setSortedArr={setSortedArrFix}
                  emoji='broccoli'
                  label='Vegan'
                />
                <CategoryPicker
                  sortedArr={sortedArrFix}
                  setSortedArr={setSortedArrFix}
                  emoji='cupcake'
                  label='  Desserts'
                />
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

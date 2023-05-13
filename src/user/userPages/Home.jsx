import React from 'react';
import { Box, Container, Flex, Text, GridItem, Grid, Image } from '@chakra-ui/react';
import img1 from '../../assets/images/salad.jpg';
import burgertest from '../../assets/images/burgertest.png';
import CategoryPicker from '../userComponents/HomePage/CategoryPicker';
import RestaurantCard from '../userComponents/HomePage/RestaurantCard';
export default function Home() {
  const badgeData = [
    { badgeTitle: 'Burger', badgeEmoji: 'hamburger' },
    { badgeTitle: 'Sushi', badgeEmoji: 'sushi' }
  ];
  return (
    <>
      <Container maxW='1110px'>
        <Box>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={2}>
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
          </Grid>
        </Box>
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

        <Box py='25px'>
          <Text fontWeight='semibold' color='neutral.black' fontSize='sm'>
            Nearby restaurants
          </Text>
          <Box>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
              <RestaurantCard
                img={img1}
                title='Burgers & Pizza'
                time='40-60 min'
                price='$24 min sum'
                badgeData={badgeData}
              />
              <RestaurantCard
                img={img1}
                title='Burgers & Pizza'
                time='40-60 min'
                price='$24 min sum'
                badgeData={badgeData}
              />
              <RestaurantCard
                img={img1}
                title='Burgers & Pizza'
                time='40-60 min'
                price='$24 min sum'
                badgeData={badgeData}
              />
              <RestaurantCard
                img={img1}
                title='Burgers & Pizza'
                time='40-60 min'
                price='$24 min sum'
                badgeData={badgeData}
              />
              <RestaurantCard
                img={img1}
                title='Burgers & Pizza'
                time='40-60 min'
                price='$24 min sum'
                badgeData={badgeData}
              />
              <RestaurantCard
                img={img1}
                title='Burgers & Pizza'
                time='40-60 min'
                price='$24 min sum'
                badgeData={badgeData}
              />
            </Grid>
          </Box>
        </Box>
        <Box py='25px'>
          <Text fontWeight='semibold' color='neutral.black' fontSize='sm'>
            All restaurants
          </Text>
          <Box py={15}>
            <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
              <CategoryPicker emoji='pizza' label='Pizza' />

              <CategoryPicker emoji='hamburger' label='Burger' />
              <CategoryPicker emoji='cut-of-meat' label='   Sushi' />
              <CategoryPicker emoji='sushi' label='Sushi' />
              <CategoryPicker emoji='broccoli' label='Vegan' />
              <CategoryPicker emoji='cupcake' label='  Desserts' />
            </Grid>
          </Box>
          <Box py={15} display='flex'>
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
          </Box>
          <Box py={15}>
            <Text py={4} color='neutral.grayDark' fontSize='3xs'>
              Found 12 restaurants
            </Text>
            <Box>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                <RestaurantCard
                  img={img1}
                  title='Burgers & Pizza'
                  time='40-60 min'
                  price='$24 min sum'
                  badgeData={badgeData}
                />
                <RestaurantCard
                  img={img1}
                  title='Burgers & Pizza'
                  time='40-60 min'
                  price='$24 min sum'
                  badgeData={badgeData}
                />
                <RestaurantCard
                  img={img1}
                  title='Burgers & Pizza'
                  time='40-60 min'
                  price='$24 min sum'
                  badgeData={badgeData}
                />
                <RestaurantCard
                  img={img1}
                  title='Burgers & Pizza'
                  time='40-60 min'
                  price='$24 min sum'
                  badgeData={badgeData}
                />
                <RestaurantCard
                  img={img1}
                  title='Burgers & Pizza'
                  time='40-60 min'
                  price='$24 min sum'
                  badgeData={badgeData}
                />
                <RestaurantCard
                  img={img1}
                  title='Burgers & Pizza'
                  time='40-60 min'
                  price='$24 min sum'
                  badgeData={badgeData}
                />
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

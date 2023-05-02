import React from 'react';
import { Box, Container, Flex, SimpleGrid, Stack, chakra, Text, GridItem, Grid, Image } from '@chakra-ui/react';
import img1 from '../assets/images/salad.jpg';
import burgertest from '../assets/images/burgertest.png';
import { Link } from 'react-router-dom';
import Emoji from 'react-emojis';
export default function Home() {
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
            <GridItem
              w='100%'
              h='auto'
              borderRadius={16}
              bg='primary.light'
              borderColor='primary.default'
              borderWidth='1px'
              p={2}
            >
              <Box textAlign='center'>
                <Emoji emoji='pizza' size='40' />
                <Text fontSize='2xs' fontWeight='regular' color='primary.default'>
                  Pizza
                </Text>
              </Box>
            </GridItem>
            <GridItem
              w='100%'
              h='auto'
              borderRadius={16}
              bg='neutral.white'
              borderColor='neutral.grayLightest'
              borderWidth='1px'
              p={2}
            >
              <Box textAlign='center'>
                <Emoji emoji='hamburger' size='40' />
                <Text fontSize='2xs' fontWeight='regular' color='primary.gray'>
                  Burger
                </Text>
              </Box>
            </GridItem>
            <GridItem
              w='100%'
              h='auto'
              borderRadius={16}
              bg='neutral.white'
              borderColor='neutral.grayLightest'
              borderWidth='1px'
              p={2}
            >
              <Box textAlign='center'>
                <Emoji emoji='cut-of-meat' size='40' />
                <Text fontSize='2xs' fontWeight='regular' color='primary.gray'>
                  BBQ
                </Text>
              </Box>
            </GridItem>
            <GridItem
              w='100%'
              h='auto'
              borderRadius={16}
              bg='neutral.white'
              borderColor='neutral.grayLightest'
              borderWidth='1px'
              p={2}
            >
              <Box textAlign='center'>
                <Emoji emoji='sushi' size='40' />
                <Text fontSize='2xs' fontWeight='regular' color='primary.gray'>
                  Sushi
                </Text>
              </Box>
            </GridItem>
            <GridItem
              w='100%'
              h='auto'
              borderRadius={16}
              bg='primary.light'
              borderColor='primary.default'
              borderWidth='1px'
              p={2}
            >
              <Box textAlign='center'>
                <Emoji emoji='broccoli' size='40' />
                <Text fontSize='2xs' fontWeight='regular' color='primary.default'>
                  Vegan
                </Text>
              </Box>
            </GridItem>
            <GridItem
              w='100%'
              h='auto'
              borderRadius={16}
              bg='primary.light'
              borderColor='primary.default'
              borderWidth='1px'
              p={2}
            >
              <Box textAlign='center'>
                <Emoji emoji='cupcake' size='40' />
                <Text fontSize='2xs' fontWeight='regular' color='primary.default'>
                  Desserts
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

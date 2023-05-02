import React from 'react';
import { Box, Container, Flex, SimpleGrid, Stack, chakra, Text, GridItem, Grid, Image, Badge } from '@chakra-ui/react';
import img1 from '../assets/images/salad.jpg';
import burgertest from '../assets/images/burgertest.png';
import { Link } from 'react-router-dom';
import Emoji from 'react-emojis';
import { StarIcon } from '@chakra-ui/icons';
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

        <Box>
          <Text color='neutral.black' fontSize='sm'>
            Nearby restaurants
          </Text>
          <Box>
            <Grid templateColumns='repeat(3, 1fr)' gap={3}>
              <GridItem w='100%' h='10' bg='blue.500'>
                <Box bg='neutral.white' border='1px' borderColor='neutral.grayLightest'>
                  <Image src={img1} roundedTop='lg' />

                  <Box p='6'>
                    <Box>
                      <Text color='neutral.black' fontSize='xs' fontWeight='bold'>
                        Royal Sushi House
                      </Text>

                      <Text color='neutral.gray' fontSize='3xs'>
                        30-40 min * $32 min sum
                      </Text>
                      <Badge mt={4} bg='neutral.grayLightest' rounded='full' p={1} px={3}>
                        <Box display='flex'>
                          <Box as='span' display='flex' alignItems='center' me={2}>
                            <Emoji emoji='sushi' size='20' />
                          </Box>
                          <Text color='neutral.grayDark' fontSize='3xs'>
                            Sushi
                          </Text>
                        </Box>
                      </Badge>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

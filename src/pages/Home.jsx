import React from 'react';
import { Box, Container, Flex, SimpleGrid, Stack, chakra, Text, GridItem, Grid, Image } from '@chakra-ui/react';
import img1 from '../assets/images/salad.jpg';
import burgertest from '../assets/images/burgertest.png';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
      <Container maxW='1110px'>
        <Box>
          <Grid templateColumns='repeat(2, 1fr)' gap={1}>
            <GridItem w='100%' h='auto' bg='blue.500'>
              <Flex alignItems='center'>
                <Box w='50%'>
                  <Image src={burgertest} alt='Dan Abramov' />
                </Box>
                <Box w='50%'>text</Box>
              </Flex>
            </GridItem>
            <GridItem w='100%' h='auto' bg='blue.500'>
              <Flex alignItems='center'>
                <Box w='50%'>
                  <Image src={burgertest} alt='Dan Abramov' />
                </Box>
                <Box w='50%'>text</Box>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

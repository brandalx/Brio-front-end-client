import { Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

export default function RestaurantSettings() {
  return (
    <>
      <Container maxW='1110px'>
        <Grid templateColumns={{ sm: 'repeat(4, 1fr)', md: 'repeat(8, 1fr)' }} gap={6}>
          <GridItem colSpan={{ sm: 4, md: 2 }}>part1</GridItem>
          <GridItem colSpan={{ sm: 4, md: 6 }}>part two2</GridItem>
        </Grid>
      </Container>
    </>
  );
}

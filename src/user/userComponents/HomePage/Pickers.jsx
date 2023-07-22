import React, { useEffect } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import CategoryPicker from './CategoryPicker';

export default function Pickers({ sortedArr, setSortedArr }) {
  useEffect(() => {
    console.log(sortedArr);
  }, []);
  return (
    <Box>
      <Box py='10px'>
        <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={4}>
          <CategoryPicker sortedArr={sortedArr} setSortedArr={setSortedArr} emoji='pizza' label='Pizza' />

          <CategoryPicker sortedArr={sortedArr} setSortedArr={setSortedArr} emoji='hamburger' label='Burger' />
          <CategoryPicker sortedArr={sortedArr} setSortedArr={setSortedArr} emoji='cut-of-meat' label='Beef' />
          <CategoryPicker sortedArr={sortedArr} setSortedArr={setSortedArr} emoji='sushi' label='Sushi' />
          <CategoryPicker sortedArr={sortedArr} setSortedArr={setSortedArr} emoji='broccoli' label='Vegan' />
          <CategoryPicker sortedArr={sortedArr} setSortedArr={setSortedArr} emoji='cupcake' label='  Desserts' />
        </Grid>
      </Box>
    </Box>
  );
}

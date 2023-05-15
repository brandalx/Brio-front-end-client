import React from 'react';
import { Box, Container, Grid, GridItem, Text, Divider } from '@chakra-ui/react';

import MenuMeal from '../userComponents/Cart/MenuMeal';

export default function Cart() {
  return (
    <Box>
      <Container maxW='1110px'>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1.3fr 1fr' }} gap={2}>
          <GridItem w='100%'>
            <Box>
              <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
                My cart
              </Text>
              <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
                <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                  Menu 4 meals
                </Text>
                <Box pt={5}>
                  <MenuMeal />
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

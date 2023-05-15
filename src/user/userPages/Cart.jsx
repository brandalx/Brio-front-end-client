import React from 'react';
import { Box, Container, Grid, GridItem, Text, Divider } from '@chakra-ui/react';
import salad from '../../assets/images/salad.jpg';
import MenuMeal from '../userComponents/Cart/MenuMeal';

export default function Cart() {
  let arr = [
    {
      image: salad,
      title: 'Chicken & Ribs Combo',
      desc: 'Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.',
      price: 16.8
    },
    {
      image: salad,
      title: 'Pepperoni Pizza',
      desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      price: 12.5
    },
    {
      image: salad,
      title: 'Classic Cheeseburger',
      desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: 9.99
    },
    {
      image: salad,
      title: 'Spaghetti Bolognese',
      desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: 14.2
    },
    {
      image: salad,
      title: 'Grilled Ribeye Steak',
      desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      price: 22.75
    }
  ];

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
                  {arr.map((item, index) => {
                    return <MenuMeal key={index} item={item} />;
                  })}
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

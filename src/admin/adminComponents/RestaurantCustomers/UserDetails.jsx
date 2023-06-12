import React from 'react';
import { Box, Container, Grid, Text } from '@chakra-ui/react';
import Vector from '../../../assets/svg/Vector';
import { Link } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import RecentOrders from './RecentOrders';

export default function UserDetails() {
  return (
    <Box>
      <Container maxW='1132px' pb='50px'>
        <Box paddingBottom='30px' display='flex'>
          <Link
            to='/admin/restaurant/customers'
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <Vector w='8px' h='12px' />
            <Text marginLeft='12px' color='neutral.grayDark' fontWeight='bold' fontSize='2.5xs'>
              Restaurant customers
            </Text>
          </Link>
        </Box>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(12, 1fr)' }} gap={6}>
          <Box gridColumn={{ base: 'span 1', md: 'span 4' }}>
            <CustomerProfile />
          </Box>
          <Box gridColumn={{ base: 'span 1', md: 'span 8' }}>
            <RecentOrders />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

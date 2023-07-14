import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Text } from '@chakra-ui/react';
import Vector from '../../../assets/svg/Vector';
import { Link, useNavigate } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import RecentOrders from './RecentOrders';
import { TOKEN_KEY } from '../../../services/apiServices';
import jwtDecode from 'jwt-decode';

export default function UserDetails() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate, token]);


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
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(12, 1fr)' }} gap={6}>
          <Box gridColumn={{ base: 'span 1', lg: 'span 4' }} order={{ base: '0', lg: '0' }}>
            <CustomerProfile />
          </Box>
          <Box gridColumn={{ base: 'span 1', lg: 'span 8' }} order={{ base: '1', lg: '1' }}>
            <RecentOrders />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

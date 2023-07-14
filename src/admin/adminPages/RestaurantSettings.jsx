import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SettingsMenu from '../adminComponents/RestaurantSettings/SettingsMenu';
import AccountSettings from '../adminComponents/RestaurantSettings/AccountSettings';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Administrators from '../adminComponents/RestaurantSettings/Administrators';
import Security from '../adminComponents/RestaurantSettings/Security';
import { useCheckToken } from '../../services/token';
import { TOKEN_KEY } from '../../services/apiServices';
import jwtDecode from 'jwt-decode';

export default function RestaurantSettings() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <Box py={5}>
      <Container maxW='1110px'>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 2fr ' }} gap={6}>
          <GridItem w='100%'>
            {' '}
            <SettingsMenu />{' '}
          </GridItem>
          <GridItem w='100%'>
            <Routes>
              <Route path='/' element={<AccountSettings />} />
              <Route path='/administrators' element={<Administrators />} />
              <Route path='/security' element={<Security />} />
            </Routes>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

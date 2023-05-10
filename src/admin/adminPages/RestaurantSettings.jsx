import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import SettingsMenu from '../adminComponents/RestaurantSettings/SettingsMenu';
import AccountSettings from '../adminComponents/RestaurantSettings/AccountSettings';
import { Route, Routes } from 'react-router-dom';
import Administrators from '../adminComponents/RestaurantSettings/Administrators';
import Security from '../adminComponents/RestaurantSettings/Security';

export default function RestaurantSettings() {
  return (
    <>
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
    </>
  );
}

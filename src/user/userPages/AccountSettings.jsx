import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import SettingsMenu from '../../user/userComponents/AccountSettingsPage/SettingsMenu';

import { Route, Routes } from 'react-router-dom';
import Address from '../userComponents/AccountSettingsPage/Address';
import Account from '../userComponents/AccountSettingsPage/Account';
import PaymentMethod from '../userComponents/AccountSettingsPage/PaymentMethod';
import Security from '../userComponents/AccountSettingsPage/Security';
import { Helmet } from 'react-helmet-async';

export default function AccountSettings() {
  return (
    <Box py={5}>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <Container maxW='1110px'>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 2fr ' }} gap={6}>
          <GridItem w='100%'>
            {' '}
            <SettingsMenu data-aos='fade-up' />
          </GridItem>
          <GridItem w='100%'>
            <Routes>
              <Route path='/' element={<Account />} />
              <Route path='/address' element={<Address />} />
              <Route path='/payment' element={<PaymentMethod />} />
              <Route path='/security' element={<Security />} />
            </Routes>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

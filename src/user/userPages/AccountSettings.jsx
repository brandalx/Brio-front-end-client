import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import SettingsMenu from '../../user/userComponents/AccountSettingsPage/SettingsMenu';

import { Route, Routes } from 'react-router-dom';

export default function AccountSettings() {
  return (
    <Box py={5}>
      <Container maxW='1110px'>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 2fr ' }} gap={6}>
          <GridItem w='100%'>
            {' '}
            <SettingsMenu />
          </GridItem>
          <GridItem w='100%'>
            <Routes>
              <Route path='/' element={<div>elements 1</div>} />
              <Route path='/address' element={<div>elements 2</div>} />
              <Route path='/payment' element={<div>elements 3</div>} />
              <Route path='/security' element={<div>elements 4</div>} />
            </Routes>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

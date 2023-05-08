import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import SettingsMenu from '../adminComponents/RestaurantSettings/SettingsMenu';
import AccountSettings from '../adminComponents/RestaurantSettings/AccountSettings';

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
              <AccountSettings />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

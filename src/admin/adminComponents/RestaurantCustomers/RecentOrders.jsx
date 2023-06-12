import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
import Vector from '../../../assets/svg/Vector';
import { Link } from 'react-router-dom';

export default function RecentOrders() {
  return (
    <Box>
      <Container maxW='1132px' pb='50px' paddingLeft={0}>
        <Link
          to='/admin/restaurant/customers'
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <Vector w='8px' h='12px' />
          <Text marginLeft='12px' color='neutral.grayDark' fontWeight='bold' fontSize='2.5xs'>
            Restaurant customers
          </Text>
        </Link>
      </Container>
    </Box>
  );
}

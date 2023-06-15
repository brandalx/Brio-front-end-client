import { Container, Table, TableContainer, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import CustomersTable from './CustomersTable';

export default function RestaurantCustomersList() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');

  return (
    <Container maxW='1132px' pb='50px'>
      <TableContainer overflowX='hidden' borderWidth='1px' borderRadius='lg' borderColor='gray.200'>
        <Table size='sm' variant='simple' colorScheme='gray' borderRadius='md' borderColor='gray.200'>
          <Thead bg='neutral.background'>
            <Tr borderBottom='1.8px solid #C7C8D2' height='56px'>
              <Th color='neutral.gray' fontSize='2.5xs' fontWeight='bold' textTransform='none'>
                Customer
              </Th>
              <Th
                display={isMobile ? 'none' : ''}
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
              >
                Phone number
              </Th>
              <Th
                display={isTablet ? 'none' : ''}
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
              >
                Email address
              </Th>
              <Th
                display={isMobile ? 'none' : ''}
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
              >
                Last ordered date
              </Th>
              <Th
                display={isTablet ? 'none' : ''}
                pl={isMobile ? '5px' : ''}
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
              >
                Total orders
              </Th>
              <Th
                pl={isMobile ? '0' : ''}
                pr={isMobile ? '0' : ''}
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
                textAlign='center'
              >
                Total spent
              </Th>
              <Th color='neutral.gray' fontSize='2.5xs' fontWeight='bold' isNumeric></Th>
            </Tr>
          </Thead>
          <CustomersTable />
        </Table>
      </TableContainer>
    </Container>
  );
}

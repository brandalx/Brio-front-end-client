import { Container, Table, TableContainer, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import CustomerTableBody from './CustomerTableBody';

export default function CustomerOrdersList() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [isDekstop] = useMediaQuery('(min-width: 1200px)');

  return (
    <Container maxW='1132px' pb='50px'>
      <TableContainer overflowX='hidden' borderWidth='1px' borderRadius='lg' borderColor='gray.200'>
        <Table size='sm' variant='simple' colorScheme='gray' borderRadius='md' borderColor='gray.200'>
          <Thead bg='neutral.background'>
            <Tr borderBottom='1.8px solid #C7C8D2'>
              <Th
                pl={isMobile ? '10px' : ''}
                pt='19.5px'
                pb='19.5px'
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
              >
                Order ID
              </Th>
              <Th
                display={{ base: 'none', sm: 'table-cell' }}
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
              >
                Creation date
              </Th>
              <Th
                display={{ base: 'none', md: 'table-cell' }}
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
              >
                Creation time
              </Th>
              <Th
                pl={isMobile ? '5px' : ''}
                color='neutral.gray'
                fontSize='2.5xs'
                fontWeight='bold'
                textTransform='none'
              >
                Status
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
                Total amount
              </Th>
              <Th color='neutral.gray' fontSize='2.5xs' fontWeight='bold' isNumeric></Th>
            </Tr>
          </Thead>
          <CustomerTableBody />
        </Table>
      </TableContainer>
    </Container>
  );
}

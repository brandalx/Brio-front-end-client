import { Box, Container, Text, Table, TableContainer, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import OrdersTableBody from '../userComponents/UserOrdrs/OrdersTableBody';

export default function UserOrders() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  return (
    <>
      <Container maxW='1110px' my={10}>
        <Box>
          <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
            My orders
          </Text>

          <TableContainer borderWidth='1px' borderRadius='lg' borderColor='gray.200'>
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
                  <Th color='neutral.gray' fontSize='2.5xs' fontWeight='bold' textTransform='none'>
                    Restaurant
                  </Th>
                  <Th color='neutral.gray' fontSize='2.5xs' fontWeight='bold' textTransform='none'>
                    Creation date
                  </Th>
                  <Th color='neutral.gray' fontSize='2.5xs' fontWeight='bold' textTransform='none'>
                    Creation time
                  </Th>
                  <Th color='neutral.gray' fontSize='2.5xs' fontWeight='bold' textTransform='none'>
                    Status
                  </Th>
                  <Th
                    pl={isMobile ? '5px' : ''}
                    color='neutral.gray'
                    fontSize='2.5xs'
                    fontWeight='bold'
                    textTransform='none'
                  >
                    Total amount
                  </Th>

                  <Th color='neutral.gray' fontSize='2.5xs' fontWeight='bold' isNumeric></Th>
                </Tr>
              </Thead>
              <OrdersTableBody />
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

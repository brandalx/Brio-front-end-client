import {
    Container,
    Table,
    TableContainer,
    Th,
    Thead,
    Tr,
    useMediaQuery
} from '@chakra-ui/react';
import React from 'react';
import OrdersTableBody from './OrdersTableBody';

export default function RestaurantOrdersList() {
    const [isTablet] = useMediaQuery('(max-width: 1199px)');
    const [isMobile] = useMediaQuery('(max-width: 575px)');

    return (
        <Container maxW="1132px" pb="50px">
            <TableContainer overflowX="hidden" borderWidth="1px" borderRadius="lg" borderColor="gray.200">
                <Table size="sm" variant="simple" colorScheme="gray" borderRadius="md" borderColor="gray.200">
                    <Thead bg="neutral.background">
                        <Tr borderBottom="1.8px solid #C7C8D2">
                            <Th pl={isMobile ? '10px' : ''} pt="19.5px" pb="19.5px" color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Order ID
                            </Th>
                            <Th display={isTablet ? 'none' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Customer
                            </Th>
                            <Th display={isMobile ? 'none' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Address
                            </Th>
                            <Th display={isTablet ? 'none' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Creation date
                            </Th>
                            <Th display={isTablet ? 'none' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Creation time
                            </Th>
                            <Th pl={isMobile ? '5px' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Status
                            </Th>
                            <Th pl={isMobile ? '0' : ''} pr={isMobile ? '0' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none" textAlign="center">
                                Total amount
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" isNumeric></Th>
                        </Tr>
                    </Thead>
                    <OrdersTableBody />
                </Table>
            </TableContainer>
        </Container>
    );
}

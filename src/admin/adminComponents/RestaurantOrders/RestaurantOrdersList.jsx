import { Box, Container, Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import Status from '../../../assets/svg/Status';
import { arrUsers } from '../../adminJSON/adminListOfUsers';

export default function RestaurantOrdersList() {
    return (
        <Container maxW="1100px" pb="50px">
            <TableContainer overflowX="hidden">
                <Table colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold">
                                Order ID
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold">
                                Customer
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" isNumeric>
                                Address
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" isNumeric>
                                Creation date
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" isNumeric>
                                Creation time
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" isNumeric>
                                Status
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" isNumeric>
                                Total amount
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {arrUsers.map((item) => {
                            return (
                                <Tr
                                    key={item.name}
                                    transition="all 0.2s"
                                    _hover={{ bg: 'bg', transition: 'all 0.2s', cursor: 'pointer' }}
                                >
                                    <Td fontSize="2xs" color="neutral.grayDark">
                                        {item.orderId}
                                    </Td>
                                    <Td fontSize="2xs" color="neutral.grayDark" fontWeight="semibold">
                                        {item.name}
                                    </Td>
                                    <Td fontSize="2xs" color="neutral.grayDark" isNumeric>
                                        {item.address}
                                    </Td>
                                    <Td fontSize="2xs" color="neutral.grayDark" isNumeric>
                                        {item.creationDate}
                                    </Td>
                                    <Td fontSize="2xs" color="neutral.grayDark" isNumeric>
                                        {item.creationTime}
                                    </Td>
                                    <Td fontSize="2.5xs" color="neutral.black" fontWeight="semibold">
                                        <Flex alignItems="center">
                                            <Box as="span" me={2}>
                                                <Status
                                                    color={
                                                        item.status === 'Online'
                                                            ? '#1ABF70'
                                                            : item.status === 'Inactive'
                                                                ? '#4E60FF'
                                                                : item.status === 'Suspended'
                                                                    ? '#FF5C60'
                                                                    : item.status === 'Tag large'
                                                                        ? '#4E60FF'
                                                                        : 'yellow'
                                                    }
                                                />
                                            </Box>
                                            {item.status}
                                        </Flex>
                                    </Td>
                                    <Td fontSize="2xs" fontWeight="bold" color="neutral.black" isNumeric>
                                        {item.totalAmount}
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

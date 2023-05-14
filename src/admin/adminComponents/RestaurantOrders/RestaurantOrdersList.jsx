import { Box, Container, Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import Status from '../../../assets/svg/Status';
import { arrUsers } from '../../adminJSON/adminListOfUsers';
import ThreeDots from '../../../assets/svg/ThreeDots';

export default function RestaurantOrdersList() {
    return (
        <Container maxW="1132px" pb="50px">
            <TableContainer overflowX="hidden" borderWidth="1px" borderRadius="md" borderColor="gray.200">
                <Table size='sm' variant='simple' colorScheme="gray" borderWidth="1px" borderRadius="md" borderColor="gray.200">
                    <Thead>
                        <Tr>
                            <Th pt='19.5px' pb='19.5px' color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Order ID
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Customer
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Address
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Creation date
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Creation time
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none">
                                Status
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" textTransform="none" isNumeric>
                                Total amount
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" isNumeric></Th>
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
                                    <Td pt='19.5px' pb='19.5px' fontSize="2xs" color="neutral.grayDark">
                                        {item.orderId}
                                    </Td>
                                    <Td pt='19.5px' pb='19.5px' fontSize="2xs" color="neutral.grayDark" fontWeight="semibold">
                                        {item.name}
                                    </Td>
                                    <Td pt='19.5px' pb='19.5px' fontSize="2xs" color="neutral.grayDark" >
                                        {item.address}
                                    </Td>
                                    <Td pt='19.5px' pb='19.5px' fontSize="2xs" color="neutral.grayDark" >
                                        {item.creationDate}
                                    </Td>
                                    <Td pt='19.5px' pb='19.5px' fontSize="2xs" color="neutral.grayDark" >
                                        {item.creationTime}
                                    </Td>
                                    <Td pt='10px' pb='10px' fontSize="2.5xs" color="neutral.black" fontWeight="semibold">
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
                                    <Td textAlign="center" pt='10px' pb='10px' fontSize="2xs" fontWeight="bold" color
                                        ="neutral.black" >
                                        {item.totalAmount}
                                    </Td>
                                    <Td pl={0} pr={0} pt='10px' pb='10px' fontSize="2xs" fontWeight="bold" color="neutral.black">
                                        <ThreeDots />
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
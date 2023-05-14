import {
    Box,
    Container,
    Flex,
    Image,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr, useBreakpointValue, useMediaQuery
} from '@chakra-ui/react';
import React from 'react';
import Status from '../../../assets/svg/Status';
import {arrUsers} from '../../adminJSON/adminListOfUsers';
import ThreeDots from '../../../assets/svg/ThreeDots';

export default function RestaurantOrdersList() {
    const [isTablet] = useMediaQuery('(max-width: 1199px)');
    const [isMobile] = useMediaQuery('(max-width: 575px)');

    return (
        <Container maxW="1132px" pb="50px">
            <TableContainer overflowX="hidden" borderWidth="1px" borderRadius="lg" borderColor="gray.200">
                <Table size='sm' variant='simple' colorScheme="gray" borderRadius="md" borderColor="gray.200">
                    <Thead bg='neutral.background'>
                        <Tr borderBottom='1.8px solid #C7C8D2'>
                            <Th pl={isMobile ? '10px' : ''} pt='19.5px' pb='19.5px' color="neutral.gray"
                                fontSize="2.5xs" fontWeight="bold"
                                textTransform="none">
                                Order ID
                            </Th>
                            <Th display={isTablet ? 'none' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold"
                                textTransform="none">
                                Customer
                            </Th>
                            <Th display={isMobile ? 'none' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold"
                                textTransform="none">
                                Address
                            </Th>
                            <Th display={isTablet ? 'none' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold"
                                textTransform="none">
                                Creation date
                            </Th>
                            <Th display={isTablet ? 'none' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold"
                                textTransform="none">
                                Creation time
                            </Th>
                            <Th pl={isMobile ? '5px' : ''} color="neutral.gray" fontSize="2.5xs" fontWeight="bold"
                                textTransform="none">
                                Status
                            </Th>
                            <Th pl={isMobile ? '0' : ''} pr={isMobile ? '0' : ''} color="neutral.gray" fontSize="2.5xs"
                                fontWeight="bold" textTransform="none" textAlign='center'>
                                Total amount
                            </Th>
                            <Th color="neutral.gray" fontSize="2.5xs" fontWeight="bold" isNumeric></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {arrUsers.map((item) => {
                            return (
                                <Tr
                                    key={item.orderId}
                                    transition="all 0.2s"
                                    _hover={{bg: 'bg', transition: 'all 0.2s', cursor: 'pointer'}}
                                >
                                    <Td pt='19.5px' pb='19.5px' fontSize="2xs" color="neutral.grayDark">
                                        {item.orderId}
                                    </Td>
                                    <Td justifyContent='start' flexDirection='row-reverse'
                                        display={isTablet ? 'none' : 'flex'} alignItems='center' pt='19.5px' pb='19.5px'
                                        fontSize="2xs" color="neutral.grayDark"
                                        fontWeight="semibold"
                                    >
                                        {item.name}
                                        <Box
                                            mr='12px' w='36px' h='36px'>
                                            <Image
                                                w='100%'
                                                h='100%'
                                                borderRadius='full'
                                                src='https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
                                        </Box>
                                    </Td>
                                    <Td display={isMobile ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize="2xs"
                                        color="neutral.grayDark">
                                        {item.address}
                                    </Td>
                                    <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize="2xs"
                                        color="neutral.grayDark">
                                        {item.creationDate}
                                    </Td>
                                    <Td display={isTablet ? 'none' : ''} pt='19.5px' pb='19.5px' fontSize="2xs"
                                        color="neutral.grayDark">
                                        {item.creationTime}
                                    </Td>
                                    <Td pr={isMobile ? '0' : ''} pl={isMobile ? '5px' : ''} pt='10px' pb='10px'
                                        fontSize="2.5xs" color="neutral.black"
                                        fontWeight="semibold">
                                        <Flex alignItems="center">
                                            <Box as="span" me={2}>
                                                <Status
                                                    color={
                                                        item.status === 'Completed'
                                                            ? '#1ABF70'
                                                            : item.status === 'In progress'
                                                                ? '#4E60FF'
                                                                : item.status === 'Canceled'
                                                                    ? '#FF5C60'
                                                                    : item.status === 'Suspended'
                                                                        ? '#FF5C60'
                                                                        : 'yellow'
                                                    }
                                                />
                                            </Box>
                                            {item.status}
                                        </Flex>
                                    </Td>
                                    <Td pl={isMobile ? '0' : ''} pr={isMobile ? '0' : ''} textAlign="center" pt='10px'
                                        pb='10px' fontSize="2xs" fontWeight="bold" color
                                            ="neutral.black">
                                        {item.totalAmount}
                                    </Td>
                                    <Td position={isMobile ? 'relative' : ''}
                                        right={isMobile ? '10px' : '0'} pl={0} pr={0} pt='10px' pb='10px' fontSize="2xs"
                                        fontWeight="bold"
                                        color="neutral.black">
                                        <ThreeDots/>
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
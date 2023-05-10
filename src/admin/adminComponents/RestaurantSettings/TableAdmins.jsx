import { Box, Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import Status from '../../../assets/svg/Status';

export default function TableAdmins() {
  const arr = [
    { name: 'Albert Flores', status: 'Online', time: `05:51 pm 21 Apr, 2021` },
    { name: 'Floyd Miles', status: 'Online', time: `07:38 am 20 Apr, 2021` },
    { name: 'Kristin Watson', status: 'Inactive', time: `04:02 am 20 Apr, 2021` },
    { name: 'Darrell Steward', status: 'Suspended', time: `01:09 am 19 Apr, 2021` },
    { name: 'Jane Cooper', status: 'Tag large', time: `01:09 am 19 Apr, 2021` }
  ];

  return (
    <TableContainer>
      <Table colorScheme='gray'>
        <Thead>
          <Tr>
            <Th color='neutral.gray' fontSize='2xs' fontWeight='bold'>
              Admin name
            </Th>
            <Th color='neutral.gray' fontSize='2xs' fontWeight='bold'>
              Status
            </Th>
            <Th color='neutral.gray' fontSize='2xs' fontWeight='bold' isNumeric>
              Last activity
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {arr.map((item) => {
            return (
              <Tr
                key={item.name}
                transition='all 0.2s'
                _hover={{ bg: 'bg', transition: 'all 0.2s', cursor: 'pointer' }}
              >
                <Td fontSize='2xs' color='neutral.grayDark'>
                  {item.name}
                </Td>
                <Td fontSize='2xs' color='neutral.black' fontWeight='semibold'>
                  <Flex alignItems='center'>
                    <Box as='span' me={2}>
                      {' '}
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
                <Td fontSize='2xs' color='neutral.black' isNumeric>
                  {item.time}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

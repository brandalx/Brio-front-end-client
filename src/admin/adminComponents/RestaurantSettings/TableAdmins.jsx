import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

export default function TableAdmins() {
  const arr = [{ name: 'Albert Flores', status: 'Online', time: `05:51 pm 21 Apr, 2021` }];

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
                  {item.status}
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

import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Status from '../../../assets/svg/Status';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { API_URL } from '../../../services/apiServices';

export default function TableAdmins() {
  const [userId, setUserId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [admins, setAdmins] = useState([]);

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token // Это где вы устанавливаете заголовок с токеном
        }
      });

      // Устанавливаем ID ресторана и пользователя
      setRestaurantId(response.data.restaurant);
      setUserId(userId);

      console.log(response.data); // Выводим данные о пользователе и ресторане
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const response = await axios.get(`${API_URL}/users/getAllUsers`, {
        headers: {
          'x-api-key': token // Setting header with token
        }
      });

      // Filtering only admins who have userId equal to current user's ID
      const filteredAdmins = response.data.filter((admin) => admin._id === userId);
      setAdmins(filteredAdmins);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchAdmins();
  }, [userId]);

  return (
    <TableContainer overflowX='hidden'>
      <Table colorScheme='gray'>
        <Thead>
          <Tr>
            <Th color='neutral.gray' fontSize='2xs' fontWeight='bold'>
              Admin name
            </Th>
            <Th color='neutral.gray' fontSize='2xs' fontWeight='bold'>
              Role
            </Th>
            <Th color='neutral.gray' fontSize='2xs' fontWeight='bold' isNumeric>
              Date Created
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {admins.map((admin) => {
            return (
              <Tr
                key={admin._id}
                transition='all 0.2s'
                _hover={{ bg: 'bg', transition: 'all 0.2s', cursor: 'pointer' }}
              >
                <Td fontSize='2xs' color='neutral.grayDark'>
                  {admin.firstname} {admin.lastname}
                </Td>
                <Td fontSize='2xs' color='neutral.black' fontWeight='semibold'>
                  <Flex alignItems='center'>
                    <Box as='span' me={2}>
                      {' '}
                      <Status color={admin.role === 'ADMIN' ? '#1ABF70' : 'yellow'} />
                    </Box>
                    {admin.role}
                  </Flex>
                </Td>
                <Td fontSize='2xs' color='neutral.black' isNumeric>
                  {new Date(admin.date_created).toLocaleString()}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

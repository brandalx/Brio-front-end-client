import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Status from '../../../assets/svg/Status';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { API_URL } from '../../../services/apiServices';

export default function TableAdmins() {
  const [userId, setUserId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token
        }
      });

      setRestaurantId(response.data.restaurant);
      setUserId(userId);

    } catch (error) {
      console.error('Error fetching user:', error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
      const filteredAdmins = response.data.filter((admin) => admin.restaurant === restaurantId);
      setAdmins(filteredAdmins);
      setIsLoading(false); // Set isLoading to false after data is fetched
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchAdmins();
  }, [userId]);

  if (isLoading) {
    // If isLoading is true, display skeleton
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>
              <Skeleton height='20px' borderRadius='8px' />
            </Th>
            <Th>
              <Skeleton height='20px' borderRadius='8px' />
            </Th>
            <Th display={['none', 'none', 'none', 'table-cell']}>
              <Skeleton borderRadius='8px' height='20px' />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(5)].map((_, i) => (
            <Tr key={i}>
              <Td>
                <SkeletonText mt='4' noOfLines={1} spacing='4' />
              </Td>
              <Td>
                <Flex alignItems='center'>
                  <SkeletonText ml='4' width='80px' noOfLines={1} />
                </Flex>
              </Td>
              <Td display={['none', 'none', 'none', 'table-cell']}>
                <SkeletonText mt='4' noOfLines={1} spacing='4' />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }

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
            <Th
              color='neutral.gray'
              fontSize='2xs'
              fontWeight='bold'
              isNumeric
              display={['none', 'none', 'none', 'table-cell']}
            >
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
                <Td fontSize='2xs' color='neutral.black' isNumeric display={['none', 'none', 'none', 'table-cell']}>
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

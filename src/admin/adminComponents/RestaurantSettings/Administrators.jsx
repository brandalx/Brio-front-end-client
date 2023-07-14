import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Grid,
  Textarea,
  Divider,
  Checkbox,
  Stack,
  Container,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal,
  useDisclosure
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TableAdmins from './TableAdmins';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../../../services/apiServices';
import { useNavigate } from 'react-router-dom';
import { useCheckToken } from '../../../services/token';

export default function Administrators() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // New state variable
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    } else {
      setIsAdmin(true); // Only set to true if user is admin
    }
  }, [navigate, token]);

  // Don't render rest of the component until we've confirmed the user's role
  if (isAdmin === null) {
    return null;
  }

  const [restaurantId, setRestaurantId] = useState(null);
  const [users, setUsers] = useState([]);
  const [newAdminId, setNewAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [myPassword, setMyPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const token = localStorage.getItem('x-api-key');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;

        const adminResponse = await axios.get(`${API_URL}/users/${userId}`, {
          headers: {
            'x-api-key': token
          }
        });

        setRestaurantId(adminResponse.data.restaurant);
        setPassword(adminResponse.data.password);
        console.log('Fetched restaurant data: ', adminResponse.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, []);
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('x-api-key');

      const adminResponse = await axios.get(`${API_URL}/users/getAllUsers}`, {
        headers: {
          'x-api-key': token
        }
      });

      setUsers(adminResponse.data);
      console.log('Fetched restaurant data: ', adminResponse.data);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addAdmin = async (userId) => {
    try {
      const token = localStorage.getItem('x-api-key');

      const adminResponse = await axios.post(
        `${API_URL}/users/${userId}/addAdmin`,
        {
          restaurant: restaurantId,
          role: 'ADMIN'
        },
        {
          headers: {
            'x-api-key': token
          }
        }
      );
      setPassword('');
      setNewAdminId('');
      onClose();

      console.log('Added new admin: ', adminResponse.data);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error adding new admin:', error);
    }
  };

  const handleInviteClick = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const response = await axios.post(
        `${API_URL}/users/verifyPassword`,
        {
          password: myPassword,
          hash: password
        },
        {
          headers: {
            'x-api-key': token
          }
        }
      );

      if (response.data.match) {
        addAdmin(newAdminId);
      } else {
        alert('Неверный пароль');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
    }
  };

  return (
    <Box>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Administrators
      </Text>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Flex justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }}>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Invite and manage admins
          </Text>
          <Button
            mt={{ base: '10px', md: '0px' }}
            w={['100%', '100%', '50%', '25%', 'initial']}
            maxW={['100%', '100%', '50%', '25%', 'initial']}
            background='primary.default'
            fontWeight='bold'
            variant='solid'
            color='neutral.white'
            borderWidth='1px'
            borderColor='neutral.white'
            _hover={{
              background: 'neutral.white',
              color: 'primary.default',
              borderWidth: '1px',
              borderColor: 'primary.default'
            }}
            py={5}
            onClick={onOpen}
          >
            Invite new admin
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} size={['xs', 'sm', 'md', 'lg', 'xl']}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Invite New Admin</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id='admin-id' isRequired>
                  <FormLabel>Admin ID</FormLabel>
                  <Input type='text' value={newAdminId} onChange={(e) => setNewAdminId(e.target.value)} />
                </FormControl>
                <FormControl id='password' isRequired>
                  <FormLabel>Your Password</FormLabel>
                  <Input type='password' value={myPassword} onChange={(e) => setMyPassword(e.target.value)} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleInviteClick}>
                  Invite
                </Button>
                <Button variant='ghost' onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        <Box pt={5}>
          <TableAdmins users={users} /> {/* Pass the users array as a prop */}
        </Box>
      </Box>
    </Box>
  );
}

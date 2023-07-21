import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TableAdmins from './TableAdmins';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../../../services/apiServices';
import { useNavigate } from 'react-router-dom';

export default function Administrators() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate, token]);

  const [restaurantId, setRestaurantId] = useState(null);
  const [users, setUsers] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [myPassword, setMyPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addAdmin = async () => {
    try {
      const token = localStorage.getItem('x-api-key');

      const adminResponse = await axios.post(
        `${API_URL}/users/addAdminByEmail`,
        {
          email: newAdminEmail,
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
      setNewAdminEmail('');
      onClose();

      fetchUsers();
      toast({
        title: 'Admin added',
        description: 'New admin was successfully added.',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: 'Error adding admin',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
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
        addAdmin(newAdminEmail);
      } else {
        toast({
          title: 'Wrong password',
          description: 'The password you have entered is incorrect.',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
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
                  <FormLabel>Admin Email</FormLabel>
                  <Input type='text' value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} />
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

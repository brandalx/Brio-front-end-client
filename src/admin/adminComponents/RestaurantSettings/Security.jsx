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
  Stack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../../../services/apiServices';
import { useNavigate } from 'react-router-dom';
export default function Security() {
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

  const [userId, setUserId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      console.error('New password and confirm password do not match');
      return;
    }

    try {
      const token = localStorage.getItem('x-api-key');
      await axios.put(
        `${API_URL}/users/security`,
        {
          previouspassword: currentPassword,
          password: newPassword,
          confirmpassword: confirmPassword // Add this line
        },
        {
          headers: {
            'x-api-key': token // Setting header with token
          }
        }
      );

      console.log('Password changed successfully');
      // You may want to clear the password fields here
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

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

  const updatePhoneNumber = async (newPhone) => {
    try {
      const token = localStorage.getItem('x-api-key');
      const response = await axios.put(
        `${API_URL}/users/${userId}`,
        {
          phone: newPhone
        },
        {
          headers: {
            'x-api-key': token // Setting header with token
          }
        }
      );
      console.log(response.data); // Выводим обновленные данные
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };
  const [phoneNumber, setPhoneNumber] = useState(''); // Состояние для номера телефона

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value); // Обновляем значение номера телефона при изменении поля ввода
  };

  const handleTurnOn = () => {
    updatePhoneNumber(phoneNumber); // Вызываем функцию обновления номера телефона при клике на кнопку
  };
  useEffect(() => {
    fetchAdmin();
    fetchAdmins();
  }, [userId]);
  return (
    <>
      <Box>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Security
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          {/*<Text fontSize='xs' fontWeight='bold' color='neutral.black'>*/}
          {/*  2 factor authentication*/}
          {/*</Text>*/}
          <Box pt={5}>
            <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'normal', md: 'flex-end' }}>
              {/*<FormControl id='phone'>*/}
              {/*  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>*/}
              {/*    Phone number*/}
              {/*  </FormLabel>*/}

              {/*  <Input*/}
              {/*    onChange={handlePhoneChange} // Добавляем обработчик изменения*/}
              {/*    w={{ base: '100%', md: 'fit-content' }}*/}
              {/*    type='phone'*/}
              {/*    background='neutral.white'*/}
              {/*    _placeholder={{ color: 'neutral.gray' }}*/}
              {/*    borderRadius='8px'*/}
              {/*    fontSize='2xs'*/}
              {/*    placeholder='   Phone number'*/}
              {/*  />*/}
              {/*</FormControl>*/}

              {/*<Button*/}
              {/*  onClick={handleTurnOn} // Добавляем обработчик клика*/}
              {/*  mt={{ base: 5, md: 0 }}*/}
              {/*  w={{ base: '100%', md: 'initial' }}*/}
              {/*  background='primary.default'*/}
              {/*  fontWeight='bold'*/}
              {/*  variant='solid'*/}
              {/*  color='neutral.white'*/}
              {/*  borderWidth='1px'*/}
              {/*  borderColor='neutral.white'*/}
              {/*  _hover={{*/}
              {/*    background: 'neutral.white',*/}
              {/*    color: 'primary.default',*/}
              {/*    borderWidth: '1px',*/}
              {/*    borderColor: 'primary.default'*/}
              {/*  }}*/}
              {/*  py={5}*/}
              {/*>*/}
              {/*  Turn on*/}
              {/*</Button>*/}
            </Flex>
          </Box>
          <Text pt='40px' fontSize='xs' fontWeight='bold' color='neutral.black'>
            Change password
          </Text>
          <Box pt={5}>
            <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'normal', md: 'flex-end' }}>
              <FormControl id='curpassword' mt={{ base: 5, md: 0 }}>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Current password
                </FormLabel>
                <Input
                  w={{ base: '100%', md: '90%' }}
                  type='password'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Enter current password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id='newpassword' mt={{ base: 5, md: 0 }}>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  New password
                </FormLabel>
                <Input
                  w={{ base: '100%', md: '90%' }}
                  type='password'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Enter new password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id='conpassword' mt={{ base: 5, md: 0 }}>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Confirm new password
                </FormLabel>
                <Input
                  w={{ base: '100%', md: '90%' }}
                  type='password'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            </Flex>
          </Box>

          <Box pt={5}>
            <Flex justifyContent='flex-end'>
              <Button
                mt={{ base: 5, md: 0 }}
                w={{ base: '100%', md: 'initial' }}
                background='bg'
                fontWeight='bold'
                variant='solid'
                color='neutral.grayLight'
                borderWidth='1px'
                borderColor='bg'
                _hover={{
                  background: 'neutral.white',
                  color: 'primary.default',
                  borderWidth: '1px',
                  borderColor: 'primary.default'
                }}
                onClick={handleChangePassword}
                py={5}
              >
                Change password
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}

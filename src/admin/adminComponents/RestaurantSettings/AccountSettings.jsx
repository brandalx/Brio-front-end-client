import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  GridItem,
  Input,
  FormLabel,
  FormControl,
  Grid,
  Textarea,
  Stack,
  Checkbox,
  Divider,
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import EmailNotification from './EmailNotification';
import Badges from './Badges';

export default function AccountSettings() {
  const [restaurant, setRestaurant] = useState([]);
  const { id } = useParams();
  const [restaurantId, setRestaurantId] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    phoneNumber: '',
    address: '',
    description: ''
  });
  const [user, setUser] = useState(null);

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
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
      const restaurantId2 = response.data.restaurant;
      setRestaurantId(restaurantId2);

      await fetchRestaurant(restaurantId2);

      if (response.data.success) {
        // Проверка успешности запроса
        localStorage.setItem('token', response.data.token); // Сохранение токена в хранилище
      }
      if (response.data && response.data.restaurant) {
        console.log(token); // Это должно выводить ваш токен, если он присутствует в localStorage
      }
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedRestaurantData = {
        ...restaurant, // Keep existing fields from the restaurant data
        ...formData // Update fields with new form data
      };

      const token = localStorage.getItem('x-api-key'); // получение токена из локального хранилища

      const response = await axios.patch(`${API_URL}/admin/restaurants/${restaurantId}`, updatedRestaurantData, {
        headers: {
          'x-api-key': token // добавление токена в заголовки
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating restaurant information:', error);
      // Display an error message to the user
      alert("There was a problem updating the restaurant's information. Please try again later.");
    }
  };

  const fetchRestaurant = async (restaurantId) => {
    try {
      const response = await handleApiGet(API_URL + `/admin/restaurants/${restaurantId}`);
      setRestaurant(response.data); // if the response comes wrapped in a data object
      console.log(response.data);
      console.log(response);
      const { title, email, phoneNumber = '', address, description } = response.restaurant;
      setFormData({ name: title, email, phoneNumber, address, description });
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    }
  };
  const toast = useToast();
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem('x-api-key');
    navigate('/login');
    toast({
      title: 'Logging out.',
      description: 'Successfully logged out!',
      status: 'success',
      duration: 9000,
      isClosable: true
    });
  };

  useEffect(() => {
    fetchAdmin();
  }, []);
  useEffect(() => {
    console.log(restaurant);
  }, [restaurant]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Box>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Account
      </Text>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Restaurant information
        </Text>
        <Box pt={5}>
          <Flex alignItems='center'>
            <Box borderWidth='2px' borderColor='primary.default' me='20px' borderRadius='12px'>
              <Image
                borderRadius='10px'
                boxSize='80px'
                objectFit='cover'
                src={
                  image ||
                  (restaurant
                    ? restaurant.image
                    : 'https://cdn.pixabay.com/photo/2023/04/26/16/57/flower-7952897_960_720.jpg')
                }
                alt='Avatar'
              />
            </Box>
            <label htmlFor='imageUpload' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button
                cursor='pointer'
                _hover={{
                  background: 'primary.default',
                  color: 'neutral.white',
                  borderWidth: '1px',
                  borderColor: 'primary.default'
                }}
                w='84px'
                h='44px'
                border='1px'
                borderColor='primary.default'
                color='primary.default'
                as='span'
                mr='10px'
              >
                Change
              </Button>
              <Input
                id='imageUpload'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            <Button
              borderColor='neutral.white'
              borderWidth='1px'
              _hover={{
                background: 'error.default',
                color: 'neutral.white',
                borderWidth: '1px',
                borderColor: 'error.default'
              }}
              fontSize='2xs'
              color='neutral.gray'
              fontWeight='bold'
              variant='ghost'
              py={5}
              me='20px'
            >
              Remove
            </Button>
          </Flex>
        </Box>
        <Box pt={5}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={6}>
            <GridItem w='100%'>
              <FormControl id='title'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Restaurant name
                </FormLabel>

                <Input
                  type='text'
                  background='neutral.white'
                  defaultValue={formData.name}
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </FormControl>
            </GridItem>
            <GridItem w='100%'>
              <FormControl id='email'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Email
                </FormLabel>

                <Input
                  type='email'
                  defaultValue={formData.email}
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </FormControl>
            </GridItem>
            <GridItem w='100%'>
              <FormControl id='phone'>
                <FormLabel fontWeight='semibold' placeholder='+1(217) 555-0113' fontSize='3xs' color='neutral.grayDark'>
                  Phone number
                </FormLabel>

                <Input
                  type='phone'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  defaultValue={formData.phoneNumber} // <-- Изменено с 'phone' на 'phoneNumber'
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
        <Box pt={5}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={6}>
            <GridItem w='100%'>
              <FormControl id='address'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Address
                </FormLabel>

                <Textarea
                  type='text'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  defaultValue={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </FormControl>
            </GridItem>

            <GridItem w='100%'>
              <FormControl id='description'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Description
                </FormLabel>

                <Textarea
                  type='text'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  defaultValue={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
        {/*<Box pt={5}>*/}
        {/*  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>*/}
        {/*    Email notifications*/}
        {/*  </Text>*/}
        {/*  <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={{ base: 4, md: 6 }}>*/}
        {/*    <EmailNotification />*/}
        {/*    <GridItem w='100%'>*/}
        {/*      <Stack*/}
        {/*        mt={{ base: '0px', md: 4 }}*/}
        {/*        direction={{ base: 'column', sm: 'row' }}*/}
        {/*        align={'start'}*/}
        {/*        justify={'space-between'}*/}
        {/*      >*/}
        {/*        <Flex alignItems='center'>*/}
        {/*          <Checkbox mr='2'>*/}
        {/*            <Text color='neutral.black' fontSize='2xs'>*/}
        {/*              Password changes*/}
        {/*            </Text>*/}
        {/*          </Checkbox>*/}
        {/*        </Flex>*/}
        {/*      </Stack>*/}
        {/*    </GridItem>*/}
        {/*    <Badges />*/}
        {/*  </Grid>*/}
        {/*</Box>*/}
        <Divider pt={8} />
        <Box pt={5}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={6}>
            <GridItem w='100%'>
              <Button
                w={{ base: '100%', md: 'initial' }}
                background='neutral.white'
                fontSize='2xs'
                fontWeight='bold'
                variant='solid'
                color='error.default'
                borderWidth='1px'
                borderColor='error.default'
                _hover={{
                  background: 'error.default',
                  color: 'neutral.white',
                  borderWidth: '1px',
                  borderColor: 'error.default'
                }}
                py={5}
                me='20px'
                onClick={onLogOut}
              >
                Log out
              </Button>
            </GridItem>

            <GridItem w='100%'>
              <Flex flexDirection={{ base: 'row' }}>
                <Button
                  w={{ base: '50%', md: 'initial' }}
                  background='neutral.white'
                  fontSize='2xs'
                  fontWeight='bold'
                  variant='solid'
                  color='neutral.gray'
                  borderWidth='1px'
                  borderColor='neutral.gray'
                  _hover={{
                    background: 'error.default',
                    color: 'neutral.white',
                    borderWidth: '1px',
                    borderColor: 'error.default'
                  }}
                  py={5}
                  me='20px'
                >
                  Discard changes
                </Button>
                <Button
                  w={{ base: '50%', md: 'initial' }}
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
                  onClick={onSubmit}
                >
                  Save changes
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

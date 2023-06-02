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
  Divider
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import axios from 'axios';

export default function AccountSettings() {
  const [restaurant, setRestaurant] = useState([]);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    description: ''
  });

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedRestaurantData = {
        ...restaurant[0], // Keep existing fields from the restaurant data
        ...formData // Update fields with new form data
      };

      const response = await axios.patch(`${API_URL}/admin/restaurants/${restaurant[0]._id}`, updatedRestaurantData);
      console.log(response.data);
      // Perform any additional actions, such as showing a success message or refreshing the data
    } catch (error) {
      console.error('Error updating restaurant information:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await handleApiGet(API_URL + '/admin/restaurants');
      setRestaurant(response);
      if (response.length > 0) {
        const { title, email, phoneNumber, address, description } = response[0];
        setFormData({ name: title, email, phoneNumber: phoneNumber, address, description }); // <-- Изменено с 'phone' на 'phoneNumber'
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

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
                  (restaurant.length > 0
                    ? restaurant[0].image
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
              <FormControl id='name'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Restaurant name
                </FormLabel>

                <Input
                  type='name'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  defaultValue={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
        <Box pt={5}>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Email notifications
          </Text>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={{ base: 4, md: 6 }}>
            <GridItem w='100%'>
              <Stack mt={2} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Flex alignItems='center'>
                  <Checkbox mr='2'>
                    <Text color='neutral.black' fontSize='2xs'>
                      Order updates
                    </Text>
                  </Checkbox>
                </Flex>
              </Stack>
              <Stack mt={4} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Flex alignItems='center'>
                  <Checkbox iconColor='neutral.white' mr='2'>
                    <Text color='neutral.black' fontSize='2xs'>
                      Admin actions
                    </Text>
                  </Checkbox>
                </Flex>
              </Stack>
            </GridItem>

            <GridItem w='100%'>
              <Stack
                mt={{ base: '0px', md: 4 }}
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Flex alignItems='center'>
                  <Checkbox mr='2'>
                    <Text color='neutral.black' fontSize='2xs'>
                      Password changes
                    </Text>
                  </Checkbox>
                </Flex>
              </Stack>
            </GridItem>
          </Grid>
        </Box>
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

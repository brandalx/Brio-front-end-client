import { Button, Flex, Text, GridItem, Checkbox, Stack, Box, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { API_URL } from '../../../services/apiServices';

export default function Badges() {
  const [restaurantId, setRestaurantId] = useState(null);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const toast = useToast();

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
      // console.log('Restaurant Id has been fetched: ', adminResponse.data.restaurant);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  const updateRestaurantData = async () => {
    if (restaurantId) {
      try {
        const token = localStorage.getItem('x-api-key');

        for (let badge of selectedBadges) {
          await axios.put(
            `${API_URL}/admin/restaurants/${restaurantId}/badge/add`,
            {
              badgeTitle: badge.badgeTitle,
              badgeEmoji: badge.badgeEmoji
            },
            {
              headers: {
                'x-api-key': token
              }
            }
          );
        }
        setSelectedBadges([]); // Reset selected badges
        toast({
          title: 'Badges updated',
          description: 'Badges were successfully updated.',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      } catch (error) {
        toast({
          title: 'Error updating badges',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    } else {
      console.error('Restaurant id is not available');
    }
  };

  const addBadge = async (badgeTitle, badgeEmoji) => {
    try {
      const token = localStorage.getItem('x-api-key');

      const response = await axios.get(`${API_URL}/admin/restaurants/${restaurantId}`, {
        headers: {
          'x-api-key': token
        }
      });

      const existingBadges = response.data.restaurant.tags;

      const badgeExists = existingBadges && existingBadges.find((badge) => badge.badgeTitle === badgeTitle);
      if (badgeExists) {
        toast({
          title: 'Error updating badges',
          description: 'This tag is already exists',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else {
        setSelectedBadges((oldBadges) => [...oldBadges, { badgeTitle, badgeEmoji }]);
      }
    } catch (error) {
      console.error('Error while entering tag:', error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  return (
    <GridItem w='100%'>
      <Stack mt={2} direction={{ base: 'column', md: 'row' }} align={'start'} justify={'space-between'}>
        <Box>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black' mb='8px'>
            Add tags:
          </Text>
          <Box display='flex' flexDirection={{ base: 'column', md: 'row' }}>
            <Box display='flex' mt='16px'>
              <Box
                minW={{ base: '80px', sm: '100px', md: '65px' }} // Update this line
                ml={{ base: '3px', sm: '10px' }} // Adjust margins for smaller screens
                mr={{ base: '3px', sm: '10px' }}
                padding={{ base: '6px 0', sm: '12px 3px 3px 3px' }} // Adjust padding for smaller screens
                border='1px solid'
                borderColor='neutral.grayLight'
                borderRadius='8px'
                display='flex'
                alignItems='center'
                flexDirection='column'
                cursor='pointer'
                onClick={() => addBadge('Pizza', 'pizza')}
                _hover={{
                  backgroundColor: 'primary.light'
                }}
                transition='400ms'
              >
                <Box
                  role='img'
                  aria-label='pizza'
                  className='react-emojis'
                  style={{ fontSize: '30px', lineHeight: '1' }}
                >
                  🍕
                </Box>
                <Text fontSize='s' fontWeight='semibold'>
                  Pizza
                </Text>
              </Box>

              <Box
                minW={{ base: '80px', sm: '100px', md: '65px' }} // Update this line
                ml={{ base: '3px', sm: '10px' }} // Adjust margins for smaller screens
                mr={{ base: '3px', sm: '10px' }}
                padding={{ base: '6px 0', sm: '12px 3px 3px 3px' }} // Adjust padding for smaller screens
                border='1px solid'
                borderColor='neutral.grayLight'
                borderRadius='8px'
                display='flex'
                alignItems='center'
                flexDirection='column'
                cursor='pointer'
                onClick={() => addBadge('Burger', 'hamburger')}
                _hover={{
                  backgroundColor: 'primary.light'
                }}
                transition='400ms'
              >
                <Box
                  role='img'
                  aria-label='hamburger'
                  className='react-emojis'
                  style={{ fontSize: '30px', lineHeight: '1' }}
                >
                  🍔
                </Box>
                <Text fontSize='s' fontWeight='semibold'>
                  Burger
                </Text>
              </Box>
              <Box
                minW={{ base: '80px', sm: '100px', md: '65px' }} // Update this line
                ml={{ base: '3px', sm: '10px' }} // Adjust margins for smaller screens
                mr={{ base: '3px', sm: '10px' }}
                padding={{ base: '6px 0', sm: '12px 3px 3px 3px' }} // Adjust padding for smaller screens
                border='1px solid'
                borderColor='neutral.grayLight'
                borderRadius='8px'
                display='flex'
                alignItems='center'
                flexDirection='column'
                cursor='pointer'
                onClick={() => addBadge('Beef', 'cut-of-meat')}
                _hover={{
                  backgroundColor: 'primary.light'
                }}
                transition='400ms'
              >
                <Box
                  role='img'
                  aria-label='cut of meat'
                  className='react-emojis'
                  style={{ fontSize: '30px', lineHeight: '1' }}
                >
                  🥩
                </Box>
                <Text fontSize='s' fontWeight='semibold'>
                  Meat
                </Text>
              </Box>
            </Box>
            <Box display='flex' mt='16px'>
              <Box
                minW={{ base: '80px', sm: '100px', md: '65px' }} // Update this line
                ml={{ base: '3px', sm: '10px' }} // Adjust margins for smaller screens
                mr={{ base: '3px', sm: '10px' }}
                padding={{ base: '6px 0', sm: '12px 3px 3px 3px' }} // Adjust padding for smaller screens
                border='1px solid'
                borderColor='neutral.grayLight'
                borderRadius='8px'
                display='flex'
                alignItems='center'
                flexDirection='column'
                cursor='pointer'
                onClick={() => addBadge('Sushi', 'sushi')}
                _hover={{
                  backgroundColor: 'primary.light'
                }}
                transition='400ms'
              >
                <Box
                  role='img'
                  aria-label='sushi'
                  className='react-emojis'
                  style={{ fontSize: '30px', lineHeight: '1' }}
                >
                  🍣
                </Box>
                <Text fontSize='s' fontWeight='semibold'>
                  Sushi
                </Text>
              </Box>
              <Box
                minW={{ base: '80px', sm: '100px', md: '65px' }} // Update this line
                ml={{ base: '3px', sm: '10px' }} // Adjust margins for smaller screens
                mr={{ base: '3px', sm: '10px' }}
                padding={{ base: '6px 0', sm: '12px 3px 3px 3px' }} // Adjust padding for smaller screens
                border='1px solid'
                borderColor='neutral.grayLight'
                borderRadius='8px'
                display='flex'
                alignItems='center'
                flexDirection='column'
                cursor='pointer'
                onClick={() => addBadge('Vegan', 'broccoli')}
                _hover={{
                  backgroundColor: 'primary.light'
                }}
                transition='400ms'
              >
                <Box
                  role='img'
                  aria-label='broccoli'
                  className='react-emojis'
                  style={{ fontSize: '30px', lineHeight: '1' }}
                >
                  🥦
                </Box>
                <Text fontSize='s' fontWeight='semibold'>
                  Vegan
                </Text>
              </Box>
              <Box
                minW={{ base: '80px', sm: '100px', md: '65px' }} // Update this line
                ml={{ base: '3px', sm: '10px' }} // Adjust margins for smaller screens
                mr={{ base: '3px', sm: '10px' }}
                padding={{ base: '6px 0', sm: '12px 3px 3px 3px' }} // Adjust padding for smaller screens                  border='1px solid'
                border='1px solid'
                borderColor='neutral.grayLight'
                borderRadius='8px'
                display='flex'
                alignItems='center'
                flexDirection='column'
                cursor='pointer'
                onClick={() => addBadge('Desserts', 'cupcake')}
                _hover={{
                  backgroundColor: 'primary.light'
                }}
                transition='400ms'
              >
                <Box
                  role='img'
                  aria-label='cupcake'
                  className='react-emojis'
                  style={{ fontSize: '30px', lineHeight: '1' }}
                >
                  🧁
                </Box>
                <Text fontSize='s' fontWeight='semibold'>
                  Desserts
                </Text>
              </Box>
            </Box>
          </Box>
          <Button
            w={{ base: '50%', md: 'initial' }}
            background='primary.default'
            fontWeight='bold'
            mt='12px'
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
            onClick={updateRestaurantData}
          >
            Apply
          </Button>
        </Box>
      </Stack>
    </GridItem>
  );
}

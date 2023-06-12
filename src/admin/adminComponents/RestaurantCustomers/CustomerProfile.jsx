import React, { useEffect, useState } from 'react';
import { Box, Container, Image, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { API_URL, handleApiGet } from '../../../services/apiServices';

export default function CustomerProfile() {
  const [user, setUser] = useState(null);
  const fullUrl = window.location.href;
  const splitUrl = fullUrl.split('/');
  const userId = splitUrl[splitUrl.length - 1];
  const fetchUser = async () => {
    try {
      const response = await handleApiGet(API_URL + '/users/' + userId);
      setUser(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <Box>
      <Container maxW='1132px' pb='50px' paddingLeft={0}>
        <Box paddingBottom='16px'>
          <Text color='neutral.black' fontWeight='semibold' fontSize='sm'>
            Customer profile
          </Text>
        </Box>
        {user && (
          <Box
            display='flex'
            border='1px'
            borderRadius='6px'
            padding='16px 16px 20px 16px'
            borderColor='neutral.grayLightest'
          >
            <Box>
              <Image
                width='88px'
                height='88px'
                borderRadius='16px'
                src={user.avatar}
                objectFit='cover'
                objectPosition='center'
              />
            </Box>
            <Box marginLeft='16px'>
              <Text color='neutral.black' fontWeight='bold' fontSize='xs'>
                {user.firstname + ' ' + user.lastname}
              </Text>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

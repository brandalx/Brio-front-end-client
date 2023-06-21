import { Box, Text, Stack, Button, Flex, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { API_URL, handleApiMethod } from '../../../../services/apiServices';

export default function RestaurantConfirmation({ mainBody }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(mainBody);
  }, []);
  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };

  const toast = useToast();
  const handlePostUser = async (_bodyData) => {
    const restaurantData = {
      title: _bodyData.title,
      address: _bodyData.address,
      location: _bodyData.location,
      email: _bodyData.email,
      description: _bodyData.description,
      company: _bodyData.company
    };
    const adminData = {
      firstname: _bodyData.firstname,
      lastname: _bodyData.lastname,
      email: _bodyData.email,
      phone: _bodyData.phone,
      password: _bodyData.password,
      nickname: Math.random().toString(36).substring(2, 15),
      role: 'ADMIN'
    };

    const payload = {
      restaurant: restaurantData,
      admin: adminData
    };

    const createUrl = API_URL + '/createRestaurantAndAdmin';

    try {
      console.log('Creating restaurant and admin with data:', payload);
      const response = await handleApiMethod(createUrl, 'POST', payload);
      console.log('Creation result:', response);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <>
      <Flex h='100%' w='100' justifyContent='center'>
        <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
          <Box>
            <Box>
              <Text fontSize='xl' fontWeight='bold' color='neutral.black'>
                Confirmation
              </Text>
              <Text fontSize='2xs' color='neutral.grayDark'>
                {/* Enter your security code that we sent to your phone */}
                Click approve to finish registration
              </Text>
            </Box>
            <Box mt='20px'>
              <Stack spacing={4}>
                {/* <FormControl id='phone'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Confirmation code
                  </FormLabel>

                  <Input
                    type='number'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='XXX - XXX - XXX'
                  />
                </FormControl> */}

                <Stack spacing={10}>
                  {/* <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                    <Flex alignItems='center'>
                      <Checkbox mr='2'>
                        <Text color='neutral.black' fontSize='2xs'>
                          Remember this device
                        </Text>
                      </Checkbox>
                    </Flex>
                  </Stack> */}
                  <Box>
                    <Link to='/login'>
                      <Button
                        isDisabled={false}
                        onClick={() => handlePostUser(mainBody)}
                        w='100%'
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
                      >
                        Complete
                      </Button>
                    </Link>

                    <Button
                      onClick={handleGoBack}
                      w='100%'
                      fontWeight='bold'
                      color='neutral.gray'
                      _hover={{
                        color: 'primary.default'
                      }}
                      py={5}
                    >
                      Back
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Box textAlign='center'></Box>
        </Flex>
      </Flex>
    </>
  );
}

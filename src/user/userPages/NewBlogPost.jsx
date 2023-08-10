import { Box, Button, Container, Icon, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import BlogEditor from '../userComponents/Blog/BlogEditor';

import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';

export default function NewBlogPost() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box pb='30px' bg={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.white' : 'neutral.white')}>
      <Container maxW='1110px' pt={15}>
        <Box my={4}>
          <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
            <Flex alignItems='center'>
              <Icon
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                as={FaChevronLeft}
                mr={1}
                boxSize={4}
              />
              <Text onClick={() => handleGoBack()} color='neutral.black' fontSize='xs'>
                Back
              </Text>
            </Flex>
          </Button>
        </Box>
        <Box w='100%' data-aos='fade-up' borderRadius='16px' py={5} bg='primary.default'>
          <Box textAlign='center'>
            <Text
              backgroundColor='none'
              mt={5}
              ms={5}
              fontSize={{ base: 'xl', md: '2xl' }}
              lineHeight={{ base: '20px', md: '45px' }}
              color={() => (localStorage.getItem('colormode') === 'dark' ? 'black' : 'white')}
              fontWeight='black'
            >
              New Blog Post
            </Text>

            <Text
              mt={{ base: '25px', md: '30px' }}
              ms={5}
              fontSize={{ base: 'sm', md: 'dm' }}
              lineHeight={{ base: '25px', md: '20px' }}
              color={() => (localStorage.getItem('colormode') === 'dark' ? 'black' : 'white')}
              fontWeight='black'
            >
              Begin creating and sharing your thoughts and experiences in Brio today!
            </Text>
          </Box>
        </Box>

        <Box pt='20px'>
          <Box minH='300px'>
            <BlogEditor />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

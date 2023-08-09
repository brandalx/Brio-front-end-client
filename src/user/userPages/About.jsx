import React from 'react';
import { Box, Button, Container, Text, Flex, Icon } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

export default function About() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box py='60px' bg='neutral.white'>
      <Container maxW='1110px' pt={15}>
        <Box my={4}>
          <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
            <Flex alignItems='center'>
              <Icon color='neutral.black' as={FaChevronLeft} mr={1} boxSize={4} />
              <Text onClick={handleGoBack} color='neutral.black' fontSize='xs'>
                Back
              </Text>
            </Flex>
          </Button>
        </Box>
        <Box w='100%' data-aos='fade-up' borderRadius='16px' py={5} bg='primary.default'>
          <Box textAlign='center'>
            <Text
              mt={5}
              ms={5}
              fontSize={{ base: 'xl', md: '2xl' }}
              lineHeight={{ base: '20px', md: '45px' }}
              color={() => (localStorage.getItem('colormode') === 'dark' ? 'black' : 'white')}
              fontWeight='black'
            >
              About Us
            </Text>

            <Text
              mt={{ base: '25px', md: '30px' }}
              ms={5}
              fontSize={{ base: 'sm', md: 'dm' }}
              lineHeight={{ base: '25px', md: '20px' }}
              color={() => (localStorage.getItem('colormode') === 'dark' ? 'black' : 'white')}
              fontWeight='black'
            >
              Learn more about our mission, vision, and values.
            </Text>
          </Box>
        </Box>

        <Box pt='20px'>
          <Text fontSize={{ base: 'sm', md: 'dm' }} color='neutral.black'>
            We started this company with a passion for creating the best online experiences. Our team is dedicated to
            ensuring that our products and services exceed your expectations. With a foundation built on trust,
            innovation, and customer satisfaction, we aim to become the leaders in our industry. Thank you for being a
            part of our journey.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

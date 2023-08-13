import React from 'react';
import { Box, Container, SimpleGrid, Stack, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../../assets/svg/Logo';
import { TOKEN_KEY } from '../../services/apiServices';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='page-footer'>
      <Box bg={() => (localStorage.getItem('colormode') === 'light' ? 'neutral.black' : '#363654')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }} spacing={8}>
            <Stack spacing={6}>
              <Link _hover={{ textDecoration: 'none' }} textDecoration='none' to='/'>
                <Box display='flex'>
                  <Logo />
                  <Text
                    textDecoration='none'
                    _hover={{ textDecoration: 'none' }}
                    fontSize='sm'
                    fontWeight='extrabold'
                    color='primary.default'
                    ml='2'
                  >
                    Brio
                  </Text>
                </Box>
              </Link>
              <Text color='neutral.gray' fontSize='3xs'>
                © {new Date().getFullYear()} Brio - Bringing food really on-time
              </Text>
              <Stack direction={'row'} spacing={6} color='neutral.white'>
                <FaTwitter color='white' />

                <FaYoutube color='white' />

                <FaInstagram color='white' />
              </Stack>
            </Stack>
            <Stack align={'flex-start'} color='neutral.grayLight'>
              <Heading fontSize='2xs' color='whiteAlpha.900'>
                Responses
              </Heading>
              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  How it works
                </Text>
              </a>
              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  Guarantee
                </Text>
              </a>
              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  Security
                </Text>
              </a>
              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  Pricing
                </Text>
              </a>
            </Stack>
            <Stack align={'flex-start'} color='neutral.grayLight'>
              <Heading fontSize='2xs' color='whiteAlpha.900'>
                Company
              </Heading>
              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  About us
                </Text>
              </a>

              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  Prices
                </Text>
              </a>
              <Link to={'/blog'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  Blog
                </Text>
              </Link>
              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  License
                </Text>
              </a>
            </Stack>
            <Stack align={'flex-start'} color='neutral.grayLight'>
              <Heading color='whiteAlpha.900' fontSize='2xs'>
                Support
              </Heading>
              {!localStorage[TOKEN_KEY] && (
                <a fontSize='2xs' href={'/signup'}>
                  <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                    Getting started
                  </Text>
                </a>
              )}

              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  Help Center
                </Text>
              </a>
              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  Report a bug
                </Text>
              </a>
              <a href={'/about'}>
                <Text _hover={{ textDecor: 'underline' }} fontSize='2xs'>
                  Contact us
                </Text>
              </a>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </footer>
  );
}

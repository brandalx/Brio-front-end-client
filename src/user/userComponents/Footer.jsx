import React from 'react';
import { Box, Container, Link, SimpleGrid, Stack, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../../assets/svg/Logo';
import { TOKEN_KEY } from '../../services/apiServices';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='page-footer'>
      <Box bg={() => (localStorage.getItem('colormode') === 'light' ? 'neutral.black' : '#363654')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }} spacing={8}>
            <Stack spacing={6}>
              <Box display='flex'>
                <Logo />
                <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                  Brio
                </Text>
              </Box>
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
              <Link fontSize='2xs' h to={'/about'}>
                How it works
              </Link>
              <Link fontSize='2xs' to={'/about'}>
                Guarantee
              </Link>
              <Link fontSize='2xs' to={'/about'}>
                Security
              </Link>
              <Link fontSize='2xs' to={'/about'}>
                Pricing
              </Link>
            </Stack>
            <Stack align={'flex-start'} color='neutral.grayLight'>
              <Heading fontSize='2xs' color='whiteAlpha.900'>
                Company
              </Heading>
              <Link fontSize='2xs' to={'/about'}>
                About us
              </Link>

              <Link fontSize='2xs' to={'/about'}>
                Prices
              </Link>
              <Link fontSize='2xs' to={'/about'}>
                Blog
              </Link>
              <Link fontSize='2xs' to={'/about'}>
                License
              </Link>
            </Stack>
            <Stack align={'flex-start'} color='neutral.grayLight'>
              <Heading color='whiteAlpha.900' fontSize='2xs'>
                Support
              </Heading>
              {!localStorage[TOKEN_KEY] && (
                <Link fontSize='2xs' to={'/signup'}>
                  Getting started
                </Link>
              )}

              <Link fontSize='2xs' to={'/about'}>
                Help Center
              </Link>
              <Link fontSize='2xs' to={'/about'}>
                Report a bug
              </Link>
              <Link fontSize='2xs' to={'/about'}>
                Contact us
              </Link>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </footer>
  );
}

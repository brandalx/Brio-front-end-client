import theme from '../../utils/theme';

import { Box, Container, Link, SimpleGrid, Stack, Text, useColorModeValue, Heading } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../../assets/svg/logo';

export default function Footer() {
  return (
    <footer className='page-header' style={{ background: theme.colors.neutral.black }}>
      <Box>
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
                © 2022 Brio - Bringing food really on-time
              </Text>
              <Stack direction={'row'} spacing={6} color='neutral.white'>
                <FaTwitter />

                <FaYoutube />

                <FaInstagram />
              </Stack>
            </Stack>
            <Stack align={'flex-start'} color='neutral.grayLight'>
              <Heading fontSize='2xs' color='neutral.white'>
                Responses
              </Heading>
              <Link fontSize='2xs' href={'#'}>
                How it works
              </Link>
              <Link fontSize='2xs' href={'#'}>
                Guarantee
              </Link>
              <Link fontSize='2xs' href={'#'}>
                Security
              </Link>
              <Link fontSize='2xs' href={'#'}>
                Pricing
              </Link>
            </Stack>
            <Stack align={'flex-start'} color='neutral.grayLight'>
              <Heading fontSize='2xs' color='neutral.white'>
                Company
              </Heading>
              <Link fontSize='2xs' href={'#'}>
                About us
              </Link>

              <Link fontSize='2xs' href={'#'}>
                Prices
              </Link>
              <Link fontSize='2xs' href={'#'}>
                Blog
              </Link>
              <Link fontSize='2xs' href={'#'}>
                License
              </Link>
            </Stack>
            <Stack align={'flex-start'} color='neutral.grayLight'>
              <Heading color='neutral.white' fontSize='2xs'>
                Support
              </Heading>

              <Link fontSize='2xs' href={'#'}>
                Getting started
              </Link>
              <Link fontSize='2xs' href={'#'}>
                Help Center
              </Link>
              <Link fontSize='2xs' href={'#'}>
                Report a bug
              </Link>
              <Link fontSize='2xs' href={'#'}>
                Contact us
              </Link>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </footer>
  );
}

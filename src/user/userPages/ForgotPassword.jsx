import {
  Box,
  Center,
  Container,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Checkbox,
  Button,
  Flex,
  chakra,
  VisuallyHidden,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
  Icon
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaChevronLeft } from 'react-icons/fa';

export default function ForgotPassword() {
  return (
    <>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={0}>
        <Container maxW='550px'>
          <GridItem w='100%' h='100vh'>
            <Flex h='100%' w='100' justifyContent='center'>
              <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
                <Box py={6}>
                  <Flex>
                    <Box title='Homepage' display='flex' alignItems='center'>
                      <Link to='/'>
                        {' '}
                        <Logo />
                      </Link>
                      <VisuallyHidden>Brio</VisuallyHidden>
                    </Box>
                    <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                      <Link to='/'> Brio</Link>
                    </Text>
                  </Flex>
                </Box>

                <Box>
                  <Box pb={10} w='100%' display='flex' justifyItems='flex-startx'>
                    <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
                      <Flex alignItems='center'>
                        <Icon as={FaChevronLeft} mr={1} boxSize={4} />
                        <Text color='neutral.black' fontSize='xs'>
                          <Link to='/login'> Back to login</Link>
                        </Text>
                      </Flex>
                    </Button>
                  </Box>
                  <Box>
                    <Text fontSize='xl' fontWeight='extrabold' color='neutral.black'>
                      Forgot Password
                    </Text>
                    <Text fontSize='2xs' color='neutral.grayDark'>
                      Enter the email associated with your account and we’ll send an email with instructions to reset
                      your password.
                    </Text>
                  </Box>
                  <Box mt='20px'>
                    <Stack spacing={4}>
                      <FormControl id='email'>
                        <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                          Email
                        </FormLabel>

                        <Input
                          type='email'
                          background='neutral.white'
                          _placeholder={{ color: 'neutral.gray' }}
                          borderRadius='8px'
                          fontSize='2xs'
                          placeholder='name@example.com'
                        />
                      </FormControl>

                      <Stack spacing={10}>
                        <Link to='/'>
                          <Button
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
                            Send instructions
                          </Button>
                        </Link>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>

                <Box textAlign='center' py={6}>
                  <Text>
                    Do you have any questions?
                    <Link to='/#'>
                      {' '}
                      <Text
                        fontSize='2xs'
                        fontWeight='bold'
                        as='span'
                        color='primary.default'
                        _hover={{ textDecor: 'underline' }}
                      >
                        FAQ
                      </Text>{' '}
                    </Link>
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
        </Container>
        <GridItem
          display={{ base: 'none', md: 'inline-flex' }}
          w='100%'
          bg='linear-gradient(to right, #B2D1FF, #697BFF)'
          h='100vh'
        ></GridItem>
      </Grid>
    </>
  );
}

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
  GridItem
} from '@chakra-ui/react';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Logo from '../../assets/svg/Logo';
import { AiOutlineSearch } from 'react-icons/ai';
import SignUpOptionsArr from '../userComponents/SignUp/SignUpOptions';
import SignUpMain from '../userComponents/SignUp/SignUpMain';

export default function SignUp() {
  return (
    <>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={0}>
        <GridItem
          maxW='550px'
          display={{ base: 'none', md: 'inline-flex' }}
          w='100%'
          bg='linear-gradient(to right, #B2D1FF, #697BFF)'
          h='100vh'
        >
          <Box mx='auto' py={6}>
            <Flex>
              <Box title='Homepage' display='flex' alignItems='center'>
                <Link to='/'>
                  {' '}
                  <Logo color='white' />
                </Link>
                <VisuallyHidden>Brio</VisuallyHidden>
              </Box>
              <Text fontSize='sm' fontWeight='extrabold' color='neutral.white' ml='2'>
                <Link to='/'> Brio</Link>
              </Text>
            </Flex>
          </Box>
        </GridItem>
        <GridItem w='100%' h='100vh'>
          <Flex h='100%' w='100' justifyContent='center'>
            <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
              <Box py={6}></Box>

              <Box>
                <Routes>
                  <Route path='/' element={<SignUpMain />} />
                  <Route path='/restaurant/*' element={<div> restauran options </div>} />
                  <Route path='/personal/*' element={<div> users options </div>} />
                </Routes>
              </Box>

              <Box textAlign='center' py={6}>
                <Text>
                  Already have an account?
                  <Link to='/login'>
                    {' '}
                    <Text
                      fontSize='2xs'
                      fontWeight='bold'
                      as='span'
                      color='primary.default'
                      _hover={{ textDecor: 'underline' }}
                    >
                      Sign in
                    </Text>{' '}
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}

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
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/svg/Logo';
import { AiOutlineSearch } from 'react-icons/ai';

export default function PersonalDetails({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValid = () =>
    email.length > 5 && password.length > 5 && confirmPassword.length > 5 && password === confirmPassword;

  return (
    <>
      <Flex h='100%' w='100' justifyContent='center'>
        <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
          <Box></Box>

          <Box>
            <Box>
              <Text fontSize='xl' fontWeight='bold' color='neutral.black'>
                Personal details
              </Text>
              <Text fontSize='2xs' color='neutral.grayDark'>
                Enter your data that you will use for entering.
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl id='passwordconfirm'>
                  <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                    Password
                  </FormLabel>

                  <Input
                    id='password'
                    type='password'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='min. 8 characters'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl id='passwordconfirm'>
                  <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                    Confirm Password
                  </FormLabel>

                  <Input
                    id='passwordconfirm'
                    type='password'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='min. 8 characters'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Box>
                    <Link to='/signup/personal'>
                      <Button
                        isDisabled={!isValid()}
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
                        Continue
                      </Button>
                    </Link>
                    <Link to='/signup'>
                      <Button
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
                    </Link>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Box></Box>
        </Flex>
      </Flex>
    </>
  );
}

import {
  Box,
  FormErrorMessage,
  Button,
  FormLabel,
  FormControl,
  Input,
  Stack,
  Flex,
  Icon,
  Text
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

export default function RecoverPassword({ handleUserSendRecoverChange, recoverData, setRecoverData }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const isValid = () => password.length > 5 && confirmPassword.length > 5 && password === confirmPassword;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    let finalBody = {
      token: recoverData,
      password: _bodyData.password,
      confirmpassword: _bodyData.confirmpassword
    };
    handleUserSendRecoverChange(finalBody);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubForm)}>
        <Box data-aos='fade-up'>
          <Box pb={10} w='100%' display='flex' justifyItems='flex-startx'>
            <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
              <Flex alignItems='center'>
                <Icon as={FaChevronLeft} mr={1} boxSize={4} />
                <Text color='neutral.black' fontSize='xs'>
                  <Link to='/recoverpassword'> Back</Link>
                </Text>
              </Flex>
            </Button>
          </Box>
          <Box>
            <Text fontSize='xl' fontWeight='extrabold' color='neutral.black'>
              New password
            </Text>
            <Text fontSize='2xs' color='neutral.grayDark'>
              Enter the new password for your account
            </Text>
          </Box>
          <FormControl mt={4} id='password' isInvalid={errors.password}>
            <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
              Password
            </FormLabel>

            <Input
              id='password'
              {...register('password', {
                required: { value: true, message: 'This field is required' },
                minLength: { value: 2, message: 'Minimum length should be 2' }
              })}
              type='password'
              background='neutral.white'
              _placeholder={{ color: 'neutral.gray' }}
              borderRadius='8px'
              fontSize='2xs'
              placeholder='min. 8 characters'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage p={0} mt={2} fontSize='3xs'>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={4} id='confirmpassword' isInvalid={errors.confirmpassword}>
            <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
              Confirm Password
            </FormLabel>

            <Input
              id='confirmpassword'
              {...register('confirmpassword', {
                required: { value: true, message: 'This field is required' },
                minLength: { value: 2, message: 'Minimum length should be 2' }
              })}
              type='password'
              background='neutral.white'
              _placeholder={{ color: 'neutral.gray' }}
              borderRadius='8px'
              fontSize='2xs'
              placeholder='min. 8 characters'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormErrorMessage p={0} mt={2} fontSize='3xs'>
              {errors.confirmpassword && errors.confirmpassword.message}
            </FormErrorMessage>
          </FormControl>

          <Stack mt={4} spacing={10}>
            <Box>
              <Button
                type='submit'
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
                Submit
              </Button>

              <Link to='/recoverpassword'>
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
        </Box>
      </form>
    </Box>
  );
}

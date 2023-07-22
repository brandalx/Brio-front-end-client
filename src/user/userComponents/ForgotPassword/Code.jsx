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
  Text,
  PinInputField,
  HStack,
  PinInput
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

export default function Code({ handleUserSendRecoverCode, codeData, setCodeData }) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm();

  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    handleUserSendRecoverCode(_bodyData);
  };

  const codeWatch = watch('code', '');

  const isValid = () => codeWatch.length === 6;
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
              Verification code
            </Text>
            <Text fontSize='2xs' color='neutral.grayDark'>
              Enter the verification code we've just sent you
            </Text>
          </Box>
          <FormControl my={5} id='password' isInvalid={errors.code}>
            <Box display='flex' justifyContent='center'>
              <HStack>
                <PinInput
                  mask
                  id='code'
                  type='text'
                  onChange={(value) => {
                    setValue('code', value);
                    setCodeData(value);
                  }}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Box>

            <FormErrorMessage p={0} mt={2} fontSize='3xs'>
              {errors.code && errors.code.message}
            </FormErrorMessage>

            <FormErrorMessage p={0} mt={2} fontSize='3xs'>
              {errors.code && errors.code.message}
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
          <Text my={4} fontSize='3xs' color='neutral.grayDark' textAlign='center'>
            Don't see the verification code? Make sure to check your 'spam' folder.
          </Text>
        </Box>
      </form>
    </Box>
  );
}

import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Checkbox,
  Button,
  Flex,
  FormErrorMessage
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function AdditionalInfo({ mainBody, setMainBody }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (_bodyData) => {
    setMainBody((prevState) => ({
      ...prevState,
      phone: _bodyData.phone
    }));
    navigate('/signup/personal/info/confirmation');
  };

  return (
    <>
      <Flex h='100%' w='100' justifyContent='center' data-aos='fade-left'>
        <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
          <Box></Box>
          <form onSubmit={handleSubmit(onSubForm)}>
            <Box>
              <Box>
                <Text fontSize='xl' fontWeight='bold' color='neutral.black'>
                  Additional info
                </Text>
                <Text fontSize='2xs' color='neutral.grayDark'>
                  Enter your additional information
                </Text>
              </Box>
              <Box mt='20px'>
                <Stack spacing={4}>
                  <FormControl id='phone' isInvalid={errors.phone}>
                    <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                      Phone number
                    </FormLabel>

                    <Input
                      id='phone'
                      type='number'
                      {...register('phone', {
                        required: true,
                        minLength: { value: 2, message: 'Minimum length should be 2' }
                      })}
                      background='neutral.white'
                      _placeholder={{ color: 'neutral.gray' }}
                      borderRadius='8px'
                      fontSize='2xs'
                      placeholder='(217) 555-0113'
                    />
                    <FormErrorMessage p={0} m={0} fontSize='3xs'>
                      {errors.phone && errors.phone.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Stack spacing={10}>
                    <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                      <Flex alignItems='center'>
                        <Checkbox mr='2'>
                          <Text color='neutral.black' fontSize='2xs'>
                            Turn on 2 factor authentication
                          </Text>
                        </Checkbox>
                      </Flex>
                    </Stack>
                    <Box>
                      <Button
                        type='submit'
                        isDisabled={false}
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

                      <Button
                        onClick={handleGoBack}
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
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </form>
          <Box textAlign='center'></Box>
        </Flex>
      </Flex>
    </>
  );
}

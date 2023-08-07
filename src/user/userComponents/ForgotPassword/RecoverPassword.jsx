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
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

export default function RecoverPassword({ handleUserSendRecoverChange, recoverData, setRecoverData }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [show, setShow] = useState(false);
  const handleClickShow = () => setShow(!show);

  const [show2, setShow2] = useState(false);
  const handleClickShow2 = () => setShow2(!show2);

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
                <Icon color='neutral.black' as={FaChevronLeft} mr={1} boxSize={4} />
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

            <InputGroup>
              <Input
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                type={show ? 'text' : 'password'}
                id='password'
                {...register('password', {
                  required: { value: true, message: 'This field is required' },
                  minLength: { value: 2, message: 'Minimum length should be 2' }
                })}
                background='neutral.white'
                _placeholder={{ color: 'neutral.gray' }}
                borderRadius='8px'
                fontSize='2xs'
                placeholder='min. 8 characters'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {password.length > 0 && (
                <InputRightElement me={2}>
                  <Button h='1.75rem' size='2xs' onClick={handleClickShow}>
                    {show ? (
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-eye'
                          width={18}
                          height={18}
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='#4E60FF'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                          <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
                        </svg>
                      </span>
                    ) : (
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-eye-off'
                          width={18}
                          height={18}
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='#C7C8D2'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M10.585 10.587a2 2 0 0 0 2.829 2.828' />
                          <path d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87' />
                          <path d='M3 3l18 18' />
                        </svg>
                      </span>
                    )}
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>

            <FormErrorMessage p={0} mt={2} fontSize='3xs'>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={4} id='confirmpassword' isInvalid={errors.confirmpassword}>
            <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
              Confirm Password
            </FormLabel>

            <InputGroup>
              <Input
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                id='confirmpassword'
                {...register('confirmpassword', {
                  required: { value: true, message: 'This field is required' },
                  minLength: { value: 2, message: 'Minimum length should be 2' }
                })}
                type={show2 ? 'text' : 'password'}
                background='neutral.white'
                _placeholder={{ color: 'neutral.gray' }}
                borderRadius='8px'
                fontSize='2xs'
                placeholder='min. 8 characters'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {confirmPassword.length > 0 && (
                <InputRightElement me={2}>
                  <Button h='1.75rem' size='2xs' onClick={handleClickShow2}>
                    {show2 ? (
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-eye'
                          width={18}
                          height={18}
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='#4E60FF'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                          <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
                        </svg>
                      </span>
                    ) : (
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-eye-off'
                          width={18}
                          height={18}
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='#C7C8D2'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M10.585 10.587a2 2 0 0 0 2.829 2.828' />
                          <path d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87' />
                          <path d='M3 3l18 18' />
                        </svg>
                      </span>
                    )}
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
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

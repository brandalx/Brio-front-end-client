import React, { useState } from 'react';
import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
  Text,
  Input,
  Stack
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function BlogEditor() {
  // const _contentState = ContentState.createFromText('Blog editor of brio!');
  // const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(''); // ContentState JSON

  const onSubmit = () => {
    console.log(JSON.stringify(contentState, null, 2));
  };

  const [mainBody, setMainBody] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [show, setShow] = useState(false);
  const handleClickShow = () => setShow(!show);

  const [show2, setShow2] = useState(false);
  const handleClickShow2 = () => setShow2(!show2);
  const navigate = useNavigate();
  const isValid = () =>
    email.length > 5 && password.length > 5 && confirmPassword.length > 5 && password === confirmPassword;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    setMainBody((prevState) => ({
      ...prevState,
      firstname: _bodyData.firstname,
      lastname: _bodyData.lastname,
      email: _bodyData.email,
      password: _bodyData.password,
      confirmpassword: _bodyData.confirmpassword
    }));
    navigate('/signup/personal/info');
  };
  return (
    <Box p={4} mb={10} border='1px' borderColor='neutral.gray' borderRadius='16px'>
      <form onSubmit={handleSubmit(onSubForm)}>
        {/* //todo:  coverImg input required
        //todo:  title input required
        //todo:  desc input required
        //todo:  tags input required
        //todo:  tags input required */}

        <Box>
          <Flex h='100%' w='100' justifyContent='center' data-aos='fade-left'>
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
                    <FormControl id='firstname' isInvalid={errors.firstname}>
                      <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                        First name
                      </FormLabel>

                      <Input
                        id='firstname'
                        {...register('firstname', {
                          required: { value: true, message: 'This field is required' },
                          minLength: { value: 2, message: 'Minimum length should be 2' },
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: 'This field should only contain alphabetic characters'
                          }
                        })}
                        required
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='John'
                      />
                      <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                        {errors.firstname && errors.firstname.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl id='lastname' isInvalid={errors.lastname}>
                      <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                        Last name
                      </FormLabel>

                      <Input
                        {...register('lastname', {
                          required: { value: true, message: 'This field is required' },
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: 'This field should only contain alphabetic characters'
                          },
                          minLength: { value: 2, message: 'Minimum length should be 2' }
                        })}
                        required
                        type='text'
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='Doe'
                      />
                      <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                        {errors.lastname && errors.lastname.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl id='email' isInvalid={errors.email}>
                      <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                        Email
                      </FormLabel>

                      <Input
                        {...register('email', {
                          required: { value: true, message: 'This field is required' },
                          minLength: { value: 6, message: 'Minimum length should be 6' }
                        })}
                        type='email'
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='name@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                        {errors.email && errors.email.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl id='password' isInvalid={errors.password}>
                      <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                        Password
                      </FormLabel>

                      <InputGroup>
                        <Input
                          id='password'
                          {...register('password', {
                            required: { value: true, message: 'This field is required' },
                            minLength: { value: 2, message: 'Minimum length should be 2' }
                          })}
                          type={show ? 'text' : 'password'}
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
                    <FormControl id='confirmpassword' isInvalid={errors.confirmpassword}>
                      <FormLabel color='neutral.grayDark' fontWeight='semibold' fontSize='3xs'>
                        Confirm Password
                      </FormLabel>

                      <InputGroup>
                        <Input
                          type={show2 ? 'text' : 'password'}
                          id='confirmpassword'
                          {...register('confirmpassword', {
                            required: { value: true, message: 'This field is required' },
                            minLength: { value: 2, message: 'Minimum length should be 2' }
                          })}
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
                    <Stack spacing={10}></Stack>
                  </Stack>
                </Box>
              </Box>

              <Box></Box>
            </Flex>
          </Flex>
        </Box>

        <Box lineHeight='0.5'>
          <Editor
            placeholder='Start typing and create amazing content in Brio!'
            editorStyle={{
              border: '1px solid gray',
              borderRadius: '16px',
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '5px',
              paddingBottom: '15px',
              height: '300px',

              overflow: 'scroll'
            }}
            defaultContentState={contentState}
            onContentStateChange={setContentState}
            wrapperClassName='wrapper-class'
            editorClassName='editor-class grayPlaceholder'
            toolbarClassName='toolbar-class'
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'emoji'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough']
              }
            }}
          />
        </Box>
        <Button my={2} color='white' bg='primary.default' borderRadius='16px' type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  );
}

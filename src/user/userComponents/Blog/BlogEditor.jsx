import React, { useRef, useState } from 'react';
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
  Stack,
  useToast
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_URL, TOKEN_KEY } from '../../../services/apiServices';
import axios from 'axios';
export default function BlogEditor() {
  // const _contentState = ContentState.createFromText('Blog editor of brio!');
  // const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(''); // ContentState JSON

  const onSubmit = () => {
    console.log(JSON.stringify(contentState, null, 2));
  };

  const [mainBody, setMainBody] = useState();

  const [email, setEmail] = useState('');

  const [show, setShow] = useState(false);
  const handleClickShow = () => setShow(!show);

  const [show2, setShow2] = useState(false);
  const handleClickShow2 = () => setShow2(!show2);
  const navigate = useNavigate();
  const isValid = () => email.length > 5;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (e, _bodyData) => {
    // console.log(_bodyData);
    setMainBody(() => ({
      title: _bodyData.title,
      desc: _bodyData.desc,
      tags: _bodyData.tags,
      userRef: _bodyData.userRef,
      content: contentState
    }));

    handleUploadCover();
  };

  const uploadRef = useRef();

  const toast = useToast();
  const handleUploadCover = async () => {
    console.log(uploadRef.current.files);
    if (uploadRef.current.files[0]) {
      try {
        const fdata = new FormData();

        fdata.append('myFile', uploadRef.current.files[0]);
        const url = API_URL + '/users/user/avatar';
        setMainBody((prevState) => ({
          ...(prevState.cover = fdata)
        }));
        const resp = await axios({
          method: 'POST',
          url: url,
          data: fdata,
          headers: {
            'x-api-key': localStorage[TOKEN_KEY]
          }
        });
        // console.log(resp.data);
        if (resp.data.excludedPath) {
          toast({
            title: 'Cover uploaded',
            description: 'Post cover uploaded successfuly!',
            status: 'success',
            duration: 9000,
            isClosable: true
          });
        }
      } catch (err) {
        console.log(err);
        toast({
          title: 'Error when uploading your cover image',
          description: 'Error when uploading cover image. Try upload different file',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
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

                    <FormControl>
                      <Input ref={uploadRef} type='file' onClick={handleUploadCover} />
                      {/* <Button
                        onClick={handleClick}
                        background='neutral.white'
                        fontSize='2xs'
                        fontWeight='bold'
                        variant='solid'
                        color='primary.default'
                        borderWidth='1px'
                        borderColor='primary.default'
                        _hover={{
                          background: 'primary.default',
                          color: 'neutral.white',
                          borderWidth: '1px',
                          borderColor: 'primary.default'
                        }}
                        py={5}
                        me='20px'
                      >
                        {!loading && arr.avatar != '' ? 'Change' : 'Upload'}
                      </Button> */}
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

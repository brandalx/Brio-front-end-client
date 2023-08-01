import React, { useEffect, useRef, useState } from 'react';
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
  useToast,
  Container
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_URL, TOKEN_KEY } from '../../../services/apiServices';
import axios from 'axios';
export default function BlogEditor() {
  // const _contentState = ContentState.createFromText('Blog editor of brio!');
  // const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(''); // ContentState JSON

  const [mainBody, setMainBody] = useState();
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],

        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],

        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],

        [{ align: [] }],
        ['image', 'link'] // only image and link options, no video option
      ]
    },
    theme: 'snow'
  });

  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [textUpload, setTextUpload] = useState('Select file to upload');
  // const isValid = () => mainBody && mainBody.content && mainBody.cover;
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  const onSubForm = (_bodyData) => {
    console.log(_bodyData);

    let PreMainBody;
    if (quill) {
      PreMainBody = {
        title: _bodyData.title,
        desc: _bodyData.desc,
        tags: _bodyData.tags.split(/[\s,]+/),
        userRef: _bodyData.userRef,
        content: quill.getContents()
      };
    } else {
      return; // If Quill is not loaded, exit the function.
    }

    handleUploadCover(PreMainBody);
  };

  const uploadRef = useRef();
  useEffect(() => {
    if (uploadRef.current && uploadRef.current.files[0]) {
      setTextUpload(uploadRef.current.files[0].name);
    }
  }, [uploadRef.current]);

  useEffect(() => {
    if (file) {
      setTextUpload(file.name);
    }
  }, [file]);

  const toast = useToast();
  const handleUploadCover = async (PreMainBody) => {
    console.log(uploadRef.current.files);
    if (uploadRef.current.files[0]) {
      try {
        const fdata = new FormData();

        fdata.append('myFile', uploadRef.current.files[0]);
        fdata.append('title', PreMainBody.title);
        fdata.append('desc', PreMainBody.desc);
        fdata.append('tags', JSON.stringify(PreMainBody.tags));
        fdata.append('userRef', PreMainBody.userRef);
        fdata.append('content', JSON.stringify(PreMainBody.content));

        const url = API_URL + '/blogs/post/new';

        console.log(PreMainBody);
        setMainBody(PreMainBody);

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
            title: 'Post created',
            description: 'Post created successfully!',
            status: 'success',
            duration: 9000,
            isClosable: true
          });
          navigate('/blog/');
        }
      } catch (err) {
        console.log(err);
        toast({
          title: 'Error when creating your post',
          description: 'Error when creating your post. Try again',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  return (
    <Box p={4} mb={10} border='1px' borderColor='neutral.gray' borderRadius='16px'>
      <form onSubmit={handleSubmit((data) => onSubForm(data))}>
        <Box>
          <Flex h='100%' w='100' justifyContent='center' data-aos='fade-left'>
            <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
              <Box></Box>

              <Box>
                <Box>
                  <Text fontSize='xl' fontWeight='bold' color='neutral.black'>
                    Post details
                  </Text>
                  <Text fontSize='2xs' color='neutral.grayDark'>
                    Provide needed information
                  </Text>
                </Box>

                <Box mt='20px'>
                  <Stack spacing={4}>
                    <FormControl id='title' isInvalid={errors.title}>
                      <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                        Post title
                      </FormLabel>

                      <Input
                        id='title'
                        {...register('title', {
                          required: { value: true, message: 'This field is required' },
                          minLength: { value: 6, message: 'Minimum length should be 6' },
                          maxLength: { value: 40, message: 'Minimum length should be 40' }
                        })}
                        required
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='Amazing food in Amsterdam'
                      />
                      <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                        {errors.title && errors.title.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl id='desc' isInvalid={errors.desc}>
                      <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                        Post description
                      </FormLabel>

                      <Input
                        {...register('desc', {
                          required: { value: true, message: 'This field is required' },

                          minLength: { value: 15, message: 'Minimum length should be 15' },
                          maxLength: { value: 150, message: 'Minimum length should be 150' }
                        })}
                        required
                        type='text'
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='Some amazing description of your post'
                      />
                      <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                        {errors.desc && errors.desc.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl id='tags' isInvalid={errors.tags}>
                      <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                        Post hashtags
                      </FormLabel>

                      <Input
                        {...register('tags', {
                          required: { value: true, message: 'This field is required' },
                          validate: (value) => value.split(/[\s,]+/).length > 1 || 'Enter at least one tag'
                        })}
                        required
                        type='text'
                        background='neutral.white'
                        _placeholder={{ color: 'neutral.gray' }}
                        borderRadius='8px'
                        fontSize='2xs'
                        placeholder='Add tags to reach out same people!'
                      />
                      <FormErrorMessage p={0} mt={2} fontSize='3xs'>
                        {errors.tags && errors.tags.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <Input onChange={(e) => setFile(e.target.files[0])} hidden required ref={uploadRef} type='file' />
                      <Button
                        onClick={() => uploadRef.current.click()}
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
                        {textUpload}
                      </Button>
                    </FormControl>
                    Now when you click the button, it will open the file upload dialog, and when you select a file, it
                    will trigger the handleUploadCover function.
                    <Stack spacing={10}></Stack>
                  </Stack>
                </Box>
              </Box>

              <Box></Box>
            </Flex>
          </Flex>
        </Box>

        <Box>
          {' '}
          <Container maxW='1110px'>
            <Box
              style={{
                width: '100%',
                minHeight: 300,
                border: '1px solid gray',
                borderRadius: '16px',
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '5px',
                paddingBottom: '15px'

                // overflow: 'scroll'
              }}
            >
              <div style={{ border: 'none' }} ref={quillRef} />
            </Box>
          </Container>
        </Box>
        <Button my={2} color='white' bg='primary.default' borderRadius='16px' type='submit'>
          Submit
        </Button>
        {/* 
        <Button isDisabled={!isValid()} my={2} color='white' bg='primary.default' borderRadius='16px' type='submit'>
          Submit
        </Button> */}
      </form>
    </Box>
  );
}

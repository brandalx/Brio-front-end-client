import { Box, Button, Container, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import BlogEditor from '../userComponents/Blog/BlogEditor';

import { useForm, Controller } from 'react-hook-form';

export default function NewBlogPost() {
  return (
    <Box>
      <Container maxW='1110px'>
        <Box>
          <Text textAlign='center' ms={6} fontWeight='black' color='neutral.black' fontSize='xl'>
            Begin create!
          </Text>
        </Box>

        <Box py='80px'>
          <Box minH='300px'>
            <BlogEditor />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

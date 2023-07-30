import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import BlogEditor from '../userComponents/Blog/BlogEditor';

export default function NewBlogPost() {
  return (
    <Box>
      <Container maxW='1110px'>
        <Box lineHeight='0.5'>
          <BlogEditor />
        </Box>
      </Container>
    </Box>
  );
}

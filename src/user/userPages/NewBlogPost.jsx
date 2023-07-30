import { Box, Container, Text } from '@chakra-ui/react';
import React from 'react';
import BlogEditor from '../userComponents/Blog/BlogEditor';

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

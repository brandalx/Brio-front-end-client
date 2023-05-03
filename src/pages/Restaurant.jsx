import { Box, Container, Flex, GridItem, Text, Image, Grid } from '@chakra-ui/react';
import React from 'react';

export default function Restaurant() {
  return (
    <>
      <Container maxW='1110px'>
        <Box>
          <Box>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1.3fr 1fr' }} gap={2}>
              <GridItem w='100%' h='auto' bg='primary.light' borderRadius={20}>
                <Flex alignItems='center'>
                  <Box w='50%'>
                    <Text fontSize='sm' color='neutral.black' fontWeight='medium'>
                      here text
                    </Text>
                  </Box>
                </Flex>
              </GridItem>
              <GridItem w='100%' h='auto' bg='primary.light' borderRadius={20}>
                <Flex alignItems='center'>
                  <Box w='50%'>
                    <Text fontSize='sm' color='neutral.black' fontWeight='medium'>
                      here text
                    </Text>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

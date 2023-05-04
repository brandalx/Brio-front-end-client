import { Box, GridItem, Image, Text, Button, Flex, Stack } from '@chakra-ui/react';
import React from 'react';

export default function ProductCard({ img, title, info, price }) {
  return (
    <>
      <GridItem w='100%' bg='neutral.white'>
        <Box p={2} bg='neutral.white' border='1px' borderColor='neutral.grayLightest' borderRadius='16px'>
          <Box>
            <Image borderRadius='16px' w='100%' src={img} />
          </Box>
          <Stack>
            <Text mt={2} color='neutral.black' fontSize='xs' fontWeight='bold'>
              {title}
            </Text>
            <Text color='neutral.gray' fontSize='3xs'>
              {info}
            </Text>
            <Flex justifyContent='space-between' alignItems='center'>
              <Text fontWeight='extrabold' color='neutral.black' fontSize='md'>
                $ {price}
              </Text>
              <Button
                background='primary.light'
                borderRadius='100px'
                py='10px'
                px='10px'
                fontSize='md'
                color='primary.default'
              >
                +
              </Button>
            </Flex>
          </Stack>
        </Box>
      </GridItem>
    </>
  );
}

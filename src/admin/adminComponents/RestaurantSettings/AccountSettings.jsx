import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import React from 'react';

export default function AccountSettings() {
  return (
    <Box>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Account
      </Text>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Restaurant information
        </Text>
        <Box>
          <Flex alignItems='center'>
            <Box borderWidth='2px' borderColor='primary.default' me='20px' borderRadius='12px'>
              <Image
                borderRadius='10px'
                boxSize='80px'
                objectFit='cover'
                src='https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                alt='Avatar'
              />
            </Box>
            <Button
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
              Change
            </Button>
            <Button
              borderColor='neutral.white'
              borderWidth='1px'
              _hover={{
                background: 'error.default',
                color: 'neutral.white',
                borderWidth: '1px',
                borderColor: 'error.default'
              }}
              fontSize='2xs'
              color='neutral.gray'
              fontWeight='bold'
              variant='ghost'
              py={5}
              me='20px'
            >
              Remove
            </Button>
          </Flex>
        </Box>
        <Box>Restaurant input here</Box>
        <Box>Notifications here</Box>
        <Box>Buttons log out etc here</Box>
      </Box>
    </Box>
  );
}

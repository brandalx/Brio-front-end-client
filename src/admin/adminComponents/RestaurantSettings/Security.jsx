import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Grid,
  Textarea,
  Divider,
  Checkbox,
  Stack
} from '@chakra-ui/react';
import React from 'react';

export default function Security() {
  return (
    <>
      <Box>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Security
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            2 factor authentication
          </Text>
          <Box pt={5}>
            <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'normal', md: 'flex-end' }}>
              <FormControl id='phone'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Phone number
                </FormLabel>

                <Input
                  w={{ base: '100%', md: 'fit-content' }}
                  type='phone'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='   Phone number'
                />
              </FormControl>

              <Button
                mt={{ base: 5, md: 0 }}
                w={{ base: '100%', md: 'initial' }}
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
                Turn on
              </Button>
            </Flex>
          </Box>
          <Text pt='40px' fontSize='xs' fontWeight='bold' color='neutral.black'>
            Change password
          </Text>
          <Box pt={5}>
            <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'normal', md: 'flex-end' }}>
              <FormControl id='curpassword' mt={{ base: 5, md: 0 }}>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Current password
                </FormLabel>

                <Input
                  w={{ base: '100%', md: '90%' }}
                  type='password'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Enter current password'
                />
              </FormControl>

              <FormControl id='newpassword' mt={{ base: 5, md: 0 }}>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  New password
                </FormLabel>

                <Input
                  w={{ base: '100%', md: '90%' }}
                  type='password'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Enter new password'
                />
              </FormControl>
              <FormControl id='conpassword' mt={{ base: 5, md: 0 }}>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Confirm new password
                </FormLabel>

                <Input
                  w={{ base: '100%', md: '90%' }}
                  type='password'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Confirm new password'
                />
              </FormControl>
            </Flex>
          </Box>

          <Box pt={5}>
            <Flex justifyContent='flex-end'>
              <Button
                mt={{ base: 5, md: 0 }}
                w={{ base: '100%', md: 'initial' }}
                background='bg'
                fontWeight='bold'
                variant='solid'
                color='neutral.grayLight'
                borderWidth='1px'
                borderColor='bg'
                _hover={{
                  background: 'neutral.white',
                  color: 'primary.default',
                  borderWidth: '1px',
                  borderColor: 'primary.default'
                }}
                py={5}
              >
                Change password
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}

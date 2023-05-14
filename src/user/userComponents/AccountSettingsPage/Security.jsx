import React from 'react';
import { Box, Text, Flex, Button, Grid, GridItem, FormControl, FormLabel, Input } from '@chakra-ui/react';
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
            <Flex justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} alignItems='flex-end'>
              <Box w={{ base: '100%', md: 'initial' }}>
                <FormControl id='number'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Phone number
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='(217) 555-0113'
                  />
                </FormControl>
              </Box>

              <Button
                mt={{ base: '10px', md: '0px' }}
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
          <Box pt={10}>
            <Text mb='16px' fontSize='xs' fontWeight='bold' color='neutral.black'>
              Change password
            </Text>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={6}>
              <GridItem w='100%'>
                <FormControl id='current'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Current password
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Enter current password'
                  />
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl id='new'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    New password
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Enter new password'
                  />
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl id='confirm'>
                  <FormLabel
                    fontWeight='semibold'
                    placeholder='+1(217) 555-0113'
                    fontSize='3xs'
                    color='neutral.grayDark'
                  >
                    Confirm new password
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Confirm new password'
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
          <Box pt={5} display='flex' justifyContent='flex-end'>
            <Button
              w={{ base: '100%', md: 'initial' }}
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
              Change password
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

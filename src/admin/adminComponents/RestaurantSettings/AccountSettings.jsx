import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  GridItem,
  Input,
  FormLabel,
  FormControl,
  Grid,
  Textarea,
  Stack,
  Checkbox,
  Divider
} from '@chakra-ui/react';
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
        <Box pt={5}>
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
        <Box pt={5}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={6}>
            <GridItem w='100%'>
              <FormControl id='name'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Restaurant name
                </FormLabel>

                <Input
                  type='name'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Restaurant Name'
                />
              </FormControl>
            </GridItem>
            <GridItem w='100%'>
              <FormControl id='email'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Email
                </FormLabel>

                <Input
                  type='email'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='example@gmail.com'
                />
              </FormControl>
            </GridItem>
            <GridItem w='100%'>
              <FormControl id='phone'>
                <FormLabel fontWeight='semibold' placeholder='+1(217) 555-0113' fontSize='3xs' color='neutral.grayDark'>
                  Phone number
                </FormLabel>

                <Input
                  type='phone'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='name@example.com'
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
        <Box pt={5}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={6}>
            <GridItem w='100%'>
              <FormControl id='name'>
                <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                  Restaurant name
                </FormLabel>

                <Textarea
                  type='text'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='Restaurant Adress'
                />
              </FormControl>
            </GridItem>

            <GridItem w='100%'>
              <FormControl id='phone'>
                <FormLabel
                  fontWeight='semibold'
                  placeholder='Restaurant desciption'
                  fontSize='3xs'
                  color='neutral.grayDark'
                >
                  Description
                </FormLabel>

                <Textarea
                  type='text'
                  background='neutral.white'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius='8px'
                  fontSize='2xs'
                  placeholder='name@example.com'
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
        <Box pt={5}>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Email notifications
          </Text>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={6}>
            <GridItem w='100%'>
              <Stack mt={2} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Flex alignItems='center'>
                  <Checkbox mr='2'>
                    <Text color='neutral.black' fontSize='2xs'>
                      Order updates
                    </Text>
                  </Checkbox>
                </Flex>
              </Stack>
              <Stack mt={4} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Flex alignItems='center'>
                  <Checkbox iconColor='neutral.white' mr='2'>
                    <Text color='neutral.black' fontSize='2xs'>
                      Admin actions
                    </Text>
                  </Checkbox>
                </Flex>
              </Stack>
            </GridItem>

            <GridItem w='100%'>
              <Stack mt={2} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Flex alignItems='center'>
                  <Checkbox mr='2'>
                    <Text color='neutral.black' fontSize='2xs'>
                      Password changes
                    </Text>
                  </Checkbox>
                </Flex>
              </Stack>
            </GridItem>
          </Grid>
        </Box>
        <Divider pt={8} />
        <Box pt={5}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr  ' }} gap={6}>
            <GridItem w='100%'>
              <Button
                background='neutral.white'
                fontSize='2xs'
                fontWeight='bold'
                variant='solid'
                color='error.default'
                borderWidth='1px'
                borderColor='error.default'
                _hover={{
                  background: 'error.default',
                  color: 'neutral.white',
                  borderWidth: '1px',
                  borderColor: 'error.default'
                }}
                py={5}
                me='20px'
              >
                Log out
              </Button>
              ;
            </GridItem>

            <GridItem w='100%'>
              <Button
                background='neutral.white'
                fontSize='2xs'
                fontWeight='bold'
                variant='solid'
                color='neutral.gray'
                borderWidth='1px'
                borderColor='neutral.gray'
                _hover={{
                  background: 'error.default',
                  color: 'neutral.white',
                  borderWidth: '1px',
                  borderColor: 'error.default'
                }}
                py={5}
                me='20px'
              >
                Discard changes
              </Button>
              <Button
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
                Save changes
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

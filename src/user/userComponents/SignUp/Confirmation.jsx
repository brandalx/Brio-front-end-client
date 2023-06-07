import {
  Box,
  Center,
  Container,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Checkbox,
  Button,
  Flex,
  chakra,
  VisuallyHidden,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/svg/Logo';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history
  };
  return (
    <>
      <Flex h='100%' w='100' justifyContent='center'>
        <Flex flexDir='column' justifyContent='space-between' h='100%' maxWidth='350px'>
          <Box></Box>

          <Box>
            <Box>
              <Text fontSize='xl' fontWeight='bold' color='neutral.black'>
                Confirmation
              </Text>
              <Text fontSize='2xs' color='neutral.grayDark'>
                Enter your security code that we sent to your phone
              </Text>
            </Box>
            <Box mt='20px'>
              <Stack spacing={4}>
                <FormControl id='phone'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Confirmation code
                  </FormLabel>

                  <Input
                    type='number'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='XXX - XXX - XXX'
                  />
                </FormControl>

                <Stack spacing={10}>
                  <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                    <Flex alignItems='center'>
                      <Checkbox mr='2'>
                        <Text color='neutral.black' fontSize='2xs'>
                          Remember this device
                        </Text>
                      </Checkbox>
                    </Flex>
                  </Stack>
                  <Box>
                    <Link to='/login'>
                      <Button
                        isDisabled={false}
                        w='100%'
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
                        Complete
                      </Button>
                    </Link>

                    <Button
                      onClick={handleGoBack}
                      w='100%'
                      fontWeight='bold'
                      color='neutral.gray'
                      _hover={{
                        color: 'primary.default'
                      }}
                      py={5}
                    >
                      Back
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Box textAlign='center'></Box>
        </Flex>
      </Flex>
    </>
  );
}

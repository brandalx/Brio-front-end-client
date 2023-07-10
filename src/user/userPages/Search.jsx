import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  InputGroup,
  InputRightElement,
  Text,
  VisuallyHidden,
  chakra
} from '@chakra-ui/react';
import Logo from '../../assets/svg/Logo';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';

export default function Search() {
  const location = useLocation();
  const [searchString, setSearchString] = useState(location.state.searchinfo || '');

  useEffect(() => {
    console.log(searchString);
  });
  return (
    <Container maxW='1110px'>
      <Box>
        <Box data-aos='zoom-in' display='flex' justifyContent='center' alignItems='center' height='90vh'>
          <Box
            textAlign='center'
            w='100%' // set width to 50%
          >
            <Box>
              <Box>
                <Flex alignItems='center' justifyContent='center'>
                  {' '}
                  <Logo />
                  <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='1'>
                    Brio
                  </Text>
                </Flex>
              </Box>{' '}
            </Box>

            <Text fontSize='2xl' fontWeight='extrabold' color='primary.default'>
              Search
            </Text>
            {/* <Text fontSize='sm' fontWeight='BOLD' color='neutral.grayDark'>
            Search
          </Text> */}

            <Box display='flex' justifyContent='center'>
              <Box display='flex' justifyItems='center' w='90%'>
                <InputGroup size='md' fontSize='md' mx='auto'>
                  <InputRightElement>
                    <Button>
                      <AiOutlineSearch color='#828282' size={14} />
                    </Button>
                  </InputRightElement>
                  <Input
                    defaultValue={searchString}
                    background='neutral.grayLightest'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius={100}
                    fontSize='2xs'
                    type='text'
                    placeholder='Search...'
                  />
                </InputGroup>
              </Box>
              <Box mx={2}>
                <Button
                  px={4}
                  borderRadius={100}
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
                  <Icon as={AiOutlineSearch} mr={1} boxSize={4} />
                  Search
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

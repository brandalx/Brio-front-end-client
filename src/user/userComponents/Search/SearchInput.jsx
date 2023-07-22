import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  GridItem,
  InputGroup,
  InputRightElement,
  Skeleton,
  Text,
  VisuallyHidden,
  chakra
} from '@chakra-ui/react';

import Logo from '../../../assets/svg/Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import { Grid } from '@chakra-ui/react';
import ProductCard from '../RestaurantPage/ProductCard';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(searchTerm);

    if (searchTerm.length > 0) {
      navigate('/search', { state: { searchinfo: searchTerm } });
    }
  };
  return (
    <Box>
      <Container maxW='1110px'>
        <Box>
          <Box
            textAlign='center'
            w='100%' // set width to 50%
          >
            <Text fontSize='2xl' fontWeight='extrabold' color='primary.default'>
              Search
              {/* <Box as='span' fontSize='sm' fontWeight='extrabold' color='primary.default'>
                {' '}
                in Brio
              </Box> */}
            </Text>

            <form style={{ width: '100%' }} onSubmit={handleSearch}>
              <Box display={{ base: 'initial', md: 'flex' }} justifyContent='center'>
                <Box display='flex' justifyItems='center' w={{ base: '100%', md: '90%' }}>
                  <InputGroup size='md' fontSize='md' mx='auto'>
                    <Input
                      defaultValue={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                    type='submit'
                    w={{ base: '100%', md: 'initial' }}
                    mt={{ base: 5, md: 0 }}
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
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

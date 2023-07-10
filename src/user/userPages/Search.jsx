import React, { useEffect, useRef, useState } from 'react';
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
import Logo from '../../assets/svg/Logo';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import { API_URL, handleApiGet } from '../../services/apiServices';
import { Grid } from '@chakra-ui/react';

export default function Search() {
  const location = useLocation();
  const [searchString, setSearchString] = useState((location.state && location.state.searchinfo) || '');
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInSearch, setIsInSearch] = useState(false);

  useEffect(() => {
    console.log(searchString);
    if (location.state && location.state.searchinfo) {
      handleApiSearch(searchString);
    }
  }, []);

  const handleApiSearch = async (_searchQuery) => {
    setIsInSearch(true);
    setLoading(true);
    const url = API_URL + `/products/single/search?s=${_searchQuery}`;
    try {
      const data = await handleApiGet(url);
      setArr(data);

      console.log(data);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timeout);
    } catch (error) {
      setIsInSearch(false);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <Container maxW='1110px'>
      <Box>
        <Box
          //   data-aos='zoom-in'
          display='flex'
          justifyContent='center'
          alignItems='center'
          transition='all 0.3s'
          height={isInSearch ? '40vh' : '90vh'}
        >
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

            <Box display={{ base: 'initial', md: 'flex' }} justifyContent='center'>
              <Box display='flex' justifyItems='center' w={{ base: '100%', md: '90%' }}>
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
            {location.state && location.state.searchinfo && (
              <Text mt={2} fontSize='2xs' fontWeight='medium' color='neutral.grayDark'>
                Showing results by request{' '}
                <Box color='primary.default' as='span'>
                  {' '}
                  {searchString}
                </Box>
              </Text>
            )}
          </Box>
        </Box>
        {loading && (
          <Box mb='150px'>
            <Grid
              mt={4}
              templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
              gap={4}
            >
              <GridItem minH='350px'>
                <Skeleton minH='350px' borderRadius='16px' isLoaded={!loading} />
              </GridItem>
              <GridItem minH='350px'>
                <Skeleton minH='350px' borderRadius='16px' isLoaded={!loading} />
              </GridItem>
              <GridItem minH='350px'>
                <Skeleton minH='350px' borderRadius='16px' isLoaded={!loading} />
              </GridItem>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}

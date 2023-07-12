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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';
import { API_URL, handleApiGet } from '../../services/apiServices';
import { Grid } from '@chakra-ui/react';
import ProductCard from '../userComponents/RestaurantPage/ProductCard';

export default function Search() {
  const [restaurantData, setRestaurantData] = useState([]);

  const location = useLocation();
  const [searchString, setSearchString] = useState((location.state && location.state.searchinfo) || '');
  const [arr, setArr] = useState([]);
  const [staticSearch, setStaticSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInSearch, setIsInSearch] = useState(false);
  const [isFirst, setIsFirst] = useState(0);

  useEffect(() => {
    console.log(searchString);
    if (location.state && location.state.searchinfo) {
      handleApiSearch(searchString);
    }
  }, []);

  const handleApiSearch = async (_searchQuery) => {
    setIsFirst(1);
    setIsInSearch(true);
    setLoading(true);
    setStaticSearch(_searchQuery);
    const url = API_URL + `/products/single/search?s=${_searchQuery}`;
    try {
      const data = await handleApiGet(url);
      setArr(data);

      console.log(data);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    } catch (error) {
      setIsInSearch(false);
      setLoading(false);
      console.log(error);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(searchTerm);

    if (searchString.length > 0) {
      handleApiSearch(searchString);
    }
  };
  const getRestaurantInfo = async (_id) => {
    try {
      let url = API_URL + '/restaurants/' + _id;
      const data = await handleApiGet(url);
      if (data._id) {
        return data.title || '';
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchRestaurantData = async () => {
      const newData = await Promise.all(
        arr.map(async (item) => {
          const name = await getRestaurantInfo(item.restaurantRef);
          return { ...item, restaurantName: name };
        })
      );
      setRestaurantData(newData);
    };

    fetchRestaurantData();
  }, [arr]);
  return (
    <Container maxW='1110px'>
      <Button
        data-aos='fade-right'
        onClick={() => handleGoBack()}
        mt={5}
        _hover={{ transform: 'scale(1.010)' }}
        transition='transform 0.2s ease-in-out'
      >
        <Flex transition={'all 0.1s'} _hover={{ color: 'neutral.gray', transition: 'all 0.1s' }} alignItems='center'>
          <Icon as={FaChevronLeft} mr={1} boxSize={4} />
          <Text color='neutral.black' fontSize='xs'>
            Back
          </Text>
        </Flex>
      </Button>
      <Box>
        <Box
          //   data-aos='zoom-in'
          display='flex'
          justifyContent='center'
          alignItems='center'
          transition='all 0.3s'
          height={isInSearch ? '40vh' : '80vh'}
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

            <form style={{ width: '100%' }} onSubmit={handleSearch}>
              <Box display={{ base: 'initial', md: 'flex' }} justifyContent='center'>
                <Box display='flex' justifyItems='center' w={{ base: '100%', md: '90%' }}>
                  <InputGroup size='md' fontSize='md' mx='auto'>
                    <Input
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
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

            {arr.length > 0 && (
              <Text mt={2} fontSize='2xs' fontWeight='medium' color='neutral.grayDark'>
                Showing results by request{' '}
                <Box color='primary.default' as='span'>
                  {' '}
                  {staticSearch}
                </Box>
              </Text>
            )}
            {arr.length === 0 && isFirst > 0 && (
              <Text mt={2} fontSize='2xs' fontWeight='medium' color='neutral.grayDark'>
                We didn't find anything by your request
                <Box color='primary.default' as='span'>
                  {' '}
                  {staticSearch}
                </Box>
              </Text>
            )}
          </Box>
        </Box>
        {loading && (
          <Box mb='150px'>
            <Grid
              mt={4}
              templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
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
              <GridItem minH='350px'>
                <Skeleton minH='350px' borderRadius='16px' isLoaded={!loading} />
              </GridItem>
            </Grid>
          </Box>
        )}
        <Box mb='150px'>
          <Grid
            gridAutoColumns='1fr'
            gridAutoRows='1fr'
            templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={2}
          >
            {!loading &&
              restaurantData.length > 0 &&
              restaurantData.map((item, index) => (
                <Box key={index}>
                  <Box
                    transition='all 0.3s'
                    cursor='pointer'
                    bg='neutral.white'
                    _hover={{ bg: 'primary.light', transition: 'all 0.3s' }}
                    border='1px'
                    borderColor='neutral.grayLightest'
                    borderRadius='16px'
                  >
                    <Text py={2} textAlign='center' color='primary.default' fontSize='xs' fontWeight='black'>
                      <Link to={'/restaurant/' + item.restaurantRef}>{item.restaurantName}</Link>
                    </Text>

                    <Skeleton borderRadius='16px' isLoaded={!loading}>
                      <ProductCard
                        _id={item._id}
                        img={item.image}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                      />
                    </Skeleton>
                  </Box>
                </Box>
              ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

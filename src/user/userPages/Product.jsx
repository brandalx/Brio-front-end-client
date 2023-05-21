import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  CSSReset,
  Text,
  GridItem,
  VStack,
  Image,
  useMediaQuery,
  Stack,
  Divider,
  Icon,
  Skeleton
} from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaChevronLeft } from 'react-icons/fa';

import ImageGallery from 'react-image-gallery';
import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link } from 'react-router-dom';
import { API_URL, handelApiGet } from '../../services/apiServices';
export default function Product() {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const thumbnailPosition = isLargerThanMd ? 'left' : 'bottom';
  const [arr, setAr] = useState([]);
  const [productsArr, setProductsAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageArr, setImageArr] = useState([]);
  const handleAProductApi = async () => {
    const url = API_URL + '/products';
    try {
      const data = await handelApiGet(url);
      setProductsAr(data);
      let productdata = data[0];
      setAr(productdata);

      const images = productdata.image.map((item) => ({
        original: item,
        thumbnail: item
      }));

      setImageArr(images);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleAProductApi();
  }, []);

  return (
    <>
      <Box>
        <Container maxW='1110px' py={10}>
          <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
            <Flex alignItems='center'>
              <Icon as={FaChevronLeft} mr={1} boxSize={4} />
              <Text color='neutral.black' fontSize='xs'>
                <Link to='/restaurant'> Back to Restaurant Page</Link>
              </Text>
            </Flex>
          </Button>

          <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: ' 5fr 3fr' }} gap={6}>
            <Skeleton borderRadius='16px' minH='350px' isLoaded={!loading}>
              <GridItem w='100%' h='auto'>
                {!loading && (
                  <ImageGallery
                    items={imageArr}
                    infinite={true}
                    showThumbnails={true}
                    showNav={true}
                    thumbnailPosition={thumbnailPosition}
                    showFullscreenButton={false}
                    useBrowserFullscreen={false}
                    showPlayButton={false}
                    disableThumbnailScroll={false}
                    disableKeyDown={false}
                    disableSwipe={false}
                    disableThumbnailSwipe={false}
                  />
                )}
              </GridItem>
            </Skeleton>
            <GridItem w='100%' h='auto'>
              <Box>
                <Stack>
                  <Skeleton borderRadius='16px' isLoaded={!loading} minH='40px'>
                    <Text mt={2} color='neutral.black' fontSize='md' fontWeight='bold'>
                      {!loading && <>{arr.title}</>}
                    </Text>
                  </Skeleton>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Text color='neutral.gray' fontSize='2xs'>
                      {!loading && <>{arr.description}</>}
                    </Text>
                  </Skeleton>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Text fontWeight='extrabold' color='neutral.black' fontSize='md'>
                        {!loading && <>$ {arr.price}</>}
                      </Text>
                      <Box display='flex' alignItems='center'>
                        <Button
                          background='neutral.grayLightest'
                          borderRadius='100px'
                          py='10px'
                          px='10px'
                          fontSize='md'
                          color='neutral.gray'
                        >
                          -
                        </Button>

                        <Text color='neutral.gray' fontWeight='bold' px={3}>
                          1
                        </Text>
                        <Button
                          background='neutral.grayLightest'
                          borderRadius='100px'
                          py='10px'
                          px='10px'
                          fontSize='md'
                          color='primary.black'
                        >
                          +
                        </Button>
                      </Box>
                      <Button
                        rightIcon={<Text fontSize='md'>+</Text>}
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
                        Add to cart
                      </Button>
                    </Flex>
                  </Skeleton>
                </Stack>
                <Divider py={3} />
                <Box py={5}>
                  <Skeleton borderRadius='16px' isLoaded={!loading} my={2} minH='40px'>
                    <Box py={3}>
                      <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                        {' '}
                        Ingredients
                      </Text>
                      <Text fontSize='2xs' color='neutral.gray'>
                        {!loading &&
                          arr.ingredients.map((item) => {
                            return (
                              <React.Fragment key={item}>
                                {item} <br></br>{' '}
                              </React.Fragment>
                            );
                          })}
                      </Text>
                    </Box>
                  </Skeleton>
                  <Skeleton minH='40px' borderRadius='16px' isLoaded={!loading} my={2}>
                    <Box py={1}>
                      <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                        {' '}
                        Nutritional value
                      </Text>
                      <Text fontSize='2xs' color='neutral.gray'>
                        {!loading &&
                          arr.nutritionals.map((item) => {
                            return (
                              <React.Fragment key={item}>
                                {item} <br></br>{' '}
                              </React.Fragment>
                            );
                          })}
                      </Text>
                    </Box>
                  </Skeleton>
                </Box>
              </Box>
            </GridItem>
          </Grid>
          <Box py='30px'>
            <Text color='neutral.black' fontWeight='semibold' fontSize='sm'>
              Recommended with
            </Text>
            <Box>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                {!loading &&
                  productsArr.map((item, index) => {
                    return (
                      <Box key={index}>
                        <Link to='/restaurant/product'>
                          <Skeleton borderRadius='16px' isLoaded={!loading}>
                            <ProductCard
                              img={item.image}
                              title={item.title}
                              info={item.description}
                              price={item.price}
                            />
                          </Skeleton>
                        </Link>
                      </Box>
                    );
                  })}
              </Grid>
              {loading && (
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
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

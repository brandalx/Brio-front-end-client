import { Box, GridItem, Image, Text, Button, Flex, Stack, border, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';

import noimage from '../../../assets/images/noimage.jpg';

import { cartContext } from '../../../context/globalContext';
import { useCheckToken } from '../../../services/token.js';
export default function ProductCard({ img, title, description, price, _id }) {
  const { cartLen, setCartLen } = useContext(cartContext);
  const toast = useToast();
  const [userar, setUserAr] = useState([]);
  const [priceCount, setPriceCount] = useState(1);
  const handleApi = async () => {
    const url = API_URL + '/users/info/user';
    try {
      const data = await handleApiGet(url);
      setUserAr(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleApi();
  }, []);
  const handlePriceAdd = () => {
    setPriceCount(priceCount + 1);
  };

  const handlePriceMinus = () => {
    if (priceCount > 1) {
      setPriceCount(priceCount - 1);
    }
  };

  const cutInfo = (description) => {
    const words = description.split(' ');

    if (words.length <= 10) {
      return description;
    } else {
      return words.slice(0, 6).join(' ') + '...';
    }
  };

  const cutInfoText = cutInfo(description);
  let postToCart = async () => {
    try {
      let cartObject = {
        productId: _id,
        productAmount: priceCount
      };
      const url = API_URL + `/users/${userar._id}/posttocart`;
      const data = await handleApiMethod(url, 'POST', cartObject);
      if (data.msg === true) {
        toast({
          title: 'Product added.',
          description: "We've added this product into your cart.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });

        const url2 = API_URL + '/users/info/user';
        const data2 = await handleApiGet(url2);
        setUserAr(data2);
        console.log(data2);

        let isContains = data2.cart.some((item) => {
          return item._id === _id;
        });

        if (!isContains) {
          setCartLen(data2.cart.length);
        }
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error when adding new product',
        description: 'Error when adding new product into your cart',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };
  const isTokenExpired = useCheckToken();

  return (
    <GridItem w='100%' maxH={!isTokenExpired ? '420px' : '450px'} bg='neutral.white'>
      <Box
        w='100%'
        p={2}
        bg='neutral.white'
        border='1px'
        borderColor='neutral.grayLightest'
        borderRadius='16px'
        h='100%'
        data-aos='fade-up'
      >
        <Link to={`/restaurant/product/${_id}`}>
          <Box>
            <Image borderRadius='16px' w='100%' src={img.length > 0 ? img : noimage} h='230px' objectFit='cover' />
          </Box>
        </Link>
        <Stack>
          <Text mt={2} color='neutral.black' fontSize='xs' fontWeight='bold'>
            {title}
          </Text>
          <Text color='neutral.gray' fontSize='3xs'>
            {description.length > 0 && cutInfoText}
          </Text>
          <Box w='100%'>
            {isTokenExpired ? (
              <Box>
                <Text my={4} fontWeight='extrabold' color='neutral.black' fontSize='md'>
                  $ {price}
                </Text>
                <Link to='/signup'>
                  <Button
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
                    Login or Signup to add product
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box w='100%'>
                {priceCount === 1 ? (
                  <>
                    <Flex w='100%' justifyContent='space-between' alignItems='center'>
                      <Text fontWeight='extrabold' color='neutral.black' fontSize='md'>
                        $ {price}
                      </Text>
                      <Button
                        onClick={handlePriceAdd}
                        background='primary.light'
                        _hover={{ background: 'primary.default', color: 'neutral.white', cursor: 'pointer' }}
                        borderRadius='100px'
                        py='10px'
                        px='10px'
                        fontSize='md'
                        color='primary.default'
                      >
                        +
                      </Button>
                    </Flex>

                    <Button
                      mt={2}
                      w='100%'
                      onClick={postToCart}
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
                  </>
                ) : (
                  <Box w='100%'>
                    <Stack w='100%'>
                      <Flex w='100%' justifyContent='space-between' alignItems='center'>
                        <Text fontWeight='extrabold' color='neutral.black' fontSize='md'>
                          $ {(price * priceCount).toFixed(2)}
                        </Text>
                        <Box display='flex' alignItems='center'>
                          <Button
                            onClick={handlePriceMinus}
                            background='neutral.grayLightest'
                            borderRadius='100px'
                            py='10px'
                            px='10px'
                            fontSize='md'
                            border='1px'
                            borderColor='neutral.white'
                            color='neutral.gray'
                            _hover={{ color: 'primary.default', border: '1px', borderColor: 'primary.default' }}
                          >
                            -
                          </Button>

                          <Text color='neutral.gray' fontWeight='bold' px={3}>
                            {priceCount}
                          </Text>
                          <Button
                            onClick={handlePriceAdd}
                            background='primary.light'
                            _hover={{ background: 'primary.default', color: 'neutral.white', cursor: 'pointer' }}
                            borderRadius='100px'
                            py='10px'
                            px='10px'
                            fontSize='md'
                            color='primary.default'
                          >
                            +
                          </Button>
                        </Box>
                      </Flex>
                      <Button
                        w='100%'
                        onClick={postToCart}
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
                    </Stack>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </GridItem>
  );
}

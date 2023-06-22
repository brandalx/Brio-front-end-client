import { Box, GridItem, Image, Text, Button, Flex, Stack, border, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';

export default function ProductCard({ img, title, description, price, _id }) {
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

  return (
    <GridItem w='100%' h='420px' bg='neutral.white'>
      <Box
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
            <Image borderRadius='16px' w='100%' src={img} h='230px' objectFit='cover' />
          </Box>
        </Link>
        <Stack>
          <Text mt={2} color='neutral.black' fontSize='xs' fontWeight='bold'>
            {title}
          </Text>
          <Text color='neutral.gray' fontSize='3xs'>
            {description.length > 0 && cutInfoText}
          </Text>

          {priceCount === 1 ? (
            <>
              <Flex justifyContent='space-between' alignItems='center'>
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
            <Stack w='100%'>
              <Flex justifyContent='space-between' alignItems='center' w='100%'>
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
          )}
        </Stack>
      </Box>
    </GridItem>
  );
}

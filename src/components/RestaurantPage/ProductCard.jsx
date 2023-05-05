import { Box, GridItem, Image, Text, Button, Flex, Stack, border } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ img, title, info, price }) {
  const [priceCount, setPriceCount] = useState(1);

  const handlePriceAdd = () => {
    setPriceCount(priceCount + 1);
  };

  const handlePriceMinus = () => {
    if (priceCount > 1) {
      setPriceCount(priceCount - 1);
    }
  };

  return (
    <>
      <Link to='/restaurant/product'>
        <GridItem w='100%' bg='neutral.white'>
          <Box p={2} bg='neutral.white' border='1px' borderColor='neutral.grayLightest' borderRadius='16px'>
            <Box>
              <Image borderRadius='16px' w='100%' src={img} />
            </Box>
            <Stack>
              <Text mt={2} color='neutral.black' fontSize='xs' fontWeight='bold'>
                {title}
              </Text>
              <Text color='neutral.gray' fontSize='3xs'>
                {info}
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
      </Link>
    </>
  );
}

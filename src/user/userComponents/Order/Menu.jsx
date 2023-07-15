import { Box, Button, Grid, GridItem, Text, Image, Divider, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TrashBox from '../../../assets/svg/TrashBox';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import { Link } from 'react-router-dom';
import noimage from '../../../assets/images/noimage.jpg';
export default function Menu({ item }) {
  const [producAr, setProductAr] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleApi = async () => {
    const url = API_URL + '/products/' + item.productId;
    console.log(url);
    try {
      // const data = await handleApiGet(userurl);
      const product = await handleApiGet(url);

      setProductAr(product);

      console.log(product);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);
  return (
    <>
      <Link to={`/restaurant/product/${item.productId}`}>
        <Box
          cursor='pointer'
          borderRadius='12px'
          p={2}
          data-aos='fade-up'
          transition='all 0.3s'
          _hover={{ bg: 'neutral.grayLightest', transition: 'all 0.3s' }}
        >
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr ' }} gap={4}>
            <GridItem w='100%'>
              <Skeleton borderRadius='16px' isLoaded={!loading}>
                <Box display='flex' alignItems='center'>
                  <Box me={2}>
                    {!loading && (
                      <Image
                        borderRadius='12px'
                        maxH='72px'
                        maxW='72px'
                        src={producAr.image[0] ? producAr.image[0] : noimage}
                        alt='image'
                      />
                    )}
                  </Box>
                  <Box>
                    <Box>
                      <Text fontWeight='bold' color='neutral.grayDark' fontSize='2xs'>
                        {!loading && producAr.title}
                      </Text>
                    </Box>
                    <Box>
                      <Text color='neutral.grayDark' fontSize='2xs'>
                        {!loading && producAr.description.split(' ').slice(0, 10).join(' ')}...
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Skeleton>
            </GridItem>
            <GridItem w='100%'>
              <Box
                h='100%'
                display='flex'
                alignItems={{ base: 'flex-end', md: 'center' }}
                alignContent='flex-end'
                justifyContent={{ base: 'center', md: 'flex-end' }}
              >
                <Grid templateColumns='1fr 1fr ' gap={4}>
                  <GridItem w='100%'>
                    {' '}
                    <Box display='flex' alignItems='center'>
                      <Skeleton borderRadius='16px' isLoaded={!loading}>
                        <Text fontSize='2xs' color='neutral.gray' fontWeight='bold' px={3} mt={1}>
                          x {item.amount}
                        </Text>
                      </Skeleton>
                    </Box>
                  </GridItem>
                  <GridItem w='100%' h='100%'>
                    <Box w='100%' display='flex' justifyContent='center'>
                      {' '}
                      <Skeleton borderRadius='16px' isLoaded={!loading}>
                        <Text fontWeight='extrabold' color='neutral.black' fontSize='xs' p={0} m={0}>
                          {!loading && '$ ' + producAr.price * item.amount}
                        </Text>
                      </Skeleton>
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Link>
      <Divider pt={4} />
    </>
  );
}

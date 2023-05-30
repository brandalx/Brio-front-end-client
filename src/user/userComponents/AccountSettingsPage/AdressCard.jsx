import {
  Box,
  Flex,
  GridItem,
  Image,
  Heading,
  Menu,
  Text,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  Skeleton
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import imagemap from '../../../assets/images/defaultmap.png';
import ThreeDots from '../../../assets/svg/ThreeDots';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import addressError from '../../../assets/images/addressError.jpg';
import axios from 'axios';

export default function AdressCard({ item, index }) {
  const REACT_APP_API_URL = import.meta.env.VITE_APIURL;
  const REACT_APP_opencagedata = import.meta.env.VITE_OPENCAGEDATA;
  const REACT_APP_MAPBOX = import.meta.env.VITE_MAPBOX;
  const REACT_APP_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOXTOKEN;

  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [userData, setUserData] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [isAddress, setIsAddress] = useState(true);

  const handleUserApi = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';

    try {
      const data = await handleApiGet(url);
      setUserData(data);
      console.log(data);
      handleMapApi(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserApi();
  }, []);

  const handleMapApi = async (data) => {
    try {
      const placeUrl = `${data.address[index].country}%20${data.address[index].state}%20${data.address[index].city}%20${data.address[index].address1}%20${data.address[index].address2}`;
      let encodelUrl = encodeURIComponent(placeUrl);
      let finalUrl = `${REACT_APP_opencagedata}${encodelUrl}&pretty=1`;
      console.log(finalUrl);
      const resp = await axios.get(finalUrl);
      const responseData = resp.data;
      setAddress(responseData);

      if (responseData.results.length === 0) {
        setIsAddress(false);
      }
      console.log(responseData);

      console.log(isAddress);
      setAddressLoading(false);
    } catch (error) {
      console.log(error);
      setIsAddress(false);
      console.log(isAddress);
      setAddressLoading(false);
    }
  };
  return (
    <GridItem w='100%'>
      <Skeleton my={2} minH='100px' borderRadius='16px' isLoaded={!addressLoading}>
        <Box
          _hover={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: isAddress ? 'primary.light' : 'error.hover',
            borderColor: 'primary.light'
          }}
          _active={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: isAddress ? 'primary.light' : 'error.default',
            borderColor: 'primary.default'
          }}
          borderRadius='16px'
          mb='12px'
          p='0px'
          transition='all 0.3s'
          borderWidth='1px'
          bg={isAddress ? 'neutral.white' : 'error.default'}
        >
          {/* Content */}

          <Flex justifyContent='space-between'>
            <Flex alignItems='center'>
              <Box maxW={{ base: '50%', md: '40%' }} py={2} px={2} borderRadius={12}>
                {!addressLoading && (
                  <Box ml='4px' py={'7.5px'} position='relative'>
                    <Image
                      width='100%'
                      src={
                        address &&
                        address.results[0] &&
                        address.results[0].bounds &&
                        address.results[0].bounds.northeast &&
                        address.results[0].bounds.northeast.lng
                          ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${address.results[0].bounds.northeast.lng},${address.results[0].bounds.northeast.lat},13/250x250@2x${REACT_APP_MAPBOX_TOKEN}`
                          : addressError
                      }
                      title='Monochrome'
                      borderRadius='16px'
                      borderWidth='5px'
                      borderColor='white'
                      maxHeight='90px'
                      objectFit='cover'
                    />
                  </Box>
                )}
              </Box>

              <Box color={isAddress ? 'initial' : 'neutral.white'}>
                {!isAddress && (
                  <Heading color={isAddress ? 'initial' : 'neutral.white'} fontSize='2xs' fontWeight='black'>
                    This address cannot be used
                  </Heading>
                )}
                <Heading color={isAddress ? 'initial' : 'neutral.white'} fontSize='2xs' fontWeight='bold'>
                  {item.city}
                </Heading>
                <Text color={isAddress ? 'initial' : 'neutral.white'} fontSize='3xs' fontWeight='semibold'>
                  {item.state} State, {item.country}
                </Text>
                <Text color={isAddress ? 'initial' : 'neutral.white'} fontSize='3xs'>
                  {item.address1} {item.address2}
                </Text>
              </Box>
            </Flex>
            <Box>
              <Menu>
                <MenuButton
                  mt={4}
                  me={3}
                  _hover={{
                    color: 'neutral.black',
                    borderColor: 'neutral.lightest'
                  }}
                  fontSize='2xs'
                  color='neutral.gray'
                  fontWeight='bold'
                >
                  <ThreeDots />
                </MenuButton>

                <MenuList>
                  <MenuItem fontWeight='medium'>Edit</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    m={0}
                    background='neutral.white'
                    variant='solid'
                    color='error.default'
                    _hover={{
                      background: 'error.default',
                      color: 'neutral.white'
                    }}
                    fontWeight='medium'
                  >
                    {' '}
                    Remove
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Box>
      </Skeleton>
    </GridItem>
  );
}

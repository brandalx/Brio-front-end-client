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
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Link } from 'react-router-dom';

export default function AdressCard({
  onitemselected,
  selectCard,
  disabledOptions = false,
  item,
  index,
  handleUserAddressDelete,
  setIsEditTrue,
  setTargetIndex
}) {
  const REACT_APP_API_URL = import.meta.env.VITE_APIURL;
  const REACT_APP_opencagedata = import.meta.env.VITE_OPENCAGEDATA;
  const REACT_APP_MAPBOX = import.meta.env.VITE_MAPBOX;
  const REACT_APP_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOXTOKEN;
  const [key, setKey] = useState(2222);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [userData, setUserData] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [isAddress, setIsAddress] = useState(true);
  const streetProvider = new OpenStreetMapProvider();
  const handleUserApi = async () => {
    const url = API_URL + '/users/info/user';

    try {
      const data = await handleApiGet(url);
      setUserData(data);
      // console.log(data);
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

  const handleMapApi = async (datasearch) => {
    try {
      const placeUrl = `${datasearch.address[index].country} ${datasearch.address[index].state} ${datasearch.address[index].city} ${datasearch.address[index].address1} ${datasearch.address[index].address2}`;

      const data = await streetProvider.search({ query: placeUrl });

      setAddress([data[0].y, data[0].x]);

      // if (responseData.results.length === 0) {
      //   setIsAddress(false);
      // }
      // console.log(responseData);

      // setPosAr([data[0].y, data[0].x]);
      // setKey(Date.now());
      // console.log(isAddress);
      setAddressLoading(false);
    } catch (error) {
      console.log(error);
      setIsAddress(false);

      if (isAddress) {
        let warning = true;
        handleUserAddressDelete(item._id, warning);
      }
      // console.log(isAddress);
      setAddressLoading(false);
    }
  };
  return (
    <GridItem zIndex={index} w='100%' data-aos='fade-up'>
      <Skeleton minH='100px' borderRadius='16px' isLoaded={!addressLoading}>
        <Box
          _hover={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: () => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.light'),
            borderColor: onitemselected ? 'primary.default' : 'primary.light'
          }}
          _active={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            bg: () => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.lightest'),
            borderColor: 'primary.default'
          }}
          borderColor={onitemselected ? 'primary.default' : 'BlackAlpha 200'}
          borderRadius='16px'
          p='0px'
          transition='all 0.3s'
          borderWidth='1px'
          bg={isAddress ? 'neutral.white' : 'error.default'}
          onClick={() => {
            selectCard(item._id);
          }}
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
                        address
                          ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${address[1]},${address[0]},13/250x250@2x${REACT_APP_MAPBOX_TOKEN}`
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
                  <Heading
                    color={localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black'}
                    fontSize='2xs'
                    fontWeight='black'
                  >
                    This address cannot be used
                  </Heading>
                )}
                <Heading
                  color={localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black'}
                  fontSize='2xs'
                  fontWeight='bold'
                >
                  {item.city || ''}
                </Heading>
                <Text
                  color={localStorage.getItem('colormode') === 'dark' ? 'neutral.gray' : 'neutral.black'}
                  fontSize='3xs'
                  fontWeight='semibold'
                >
                  {item.state} State, {item.country}
                </Text>
                <Text
                  color={localStorage.getItem('colormode') === 'dark' ? 'neutral.gray' : 'neutral.black'}
                  fontSize='3xs'
                >
                  {item.address1} {item.address2}
                </Text>
              </Box>
            </Flex>
            <Box>
              {!disabledOptions && (
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
                    <MenuItem
                      onClick={() => {
                        setIsEditTrue(true);
                        setTargetIndex(item._id);
                      }}
                      fontWeight='medium'
                    >
                      Edit
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => handleUserAddressDelete(item._id)}
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
              )}
            </Box>
          </Flex>
        </Box>
      </Skeleton>
    </GridItem>
  );
}

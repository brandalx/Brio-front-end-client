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
  MenuButton
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import imagemap from '../../../assets/images/defaultmap.png';
import ThreeDots from '../../../assets/svg/ThreeDots';
import { API_URL, handelApiGet } from '../../../services/apiServices';
import axios from 'axios';
import { REACT_API_opencagedata, REACT_APP_MAPBOX, REACT_APP_MAPBOX_TOKEN } from '../../../../env';
export default function AdressCard({ item, index }) {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [userData, setUserData] = useState([]);
  const [addressLoading, setAddressLoading] = useState(true);

  const handleUserApi = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';

    try {
      const data = await handelApiGet(url);
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
      let finalUrl = `${REACT_API_opencagedata}${encodelUrl}&pretty=1`;
      console.log(finalUrl);
      const resp = await axios.get(finalUrl);
      const responseData = resp.data;
      setAddress(responseData);
      setAddressLoading(false);
    } catch (error) {
      console.log(error);
      setAddressLoading(false);
    }
  };
  return (
    <GridItem w='100%'>
      <Box
        _hover={{
          cursor: 'pointer',
          transition: 'all 0.3s',
          bg: 'primary.light',
          borderColor: 'primary.light'
        }}
        _active={{
          cursor: 'pointer',
          transition: 'all 0.3s',
          bg: 'primary.light',
          borderColor: 'primary.default'
        }}
        borderRadius='16px'
        mb='12px'
        p='0px'
        transition='all 0.3s'
        borderWidth='1px'
        bg='neutral.white'
      >
        <Flex justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box maxW={{ base: '50%', md: '30%' }} py={2} px={2} borderRadius={12}>
              {!addressLoading && (
                <Box ml='4px' py={'7.5px'} position='relative'>
                  <iframe
                    width='100%'
                    src={`  https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${
                      address && address.results[0].bounds.northeast.lng
                    },${address && address.results[0].bounds.northeast.lat},11/110x105@2x${REACT_APP_MAPBOX_TOKEN}`}
                    title='Monochrome'
                    style={{ borderRadius: '16px', borderWidth: '5px', borderColor: 'white', maxHeight: '90px' }}
                  />
                </Box>
              )}
            </Box>
            <Box>
              <Heading fontSize='2xs' fontWeight='bold'>
                {item.city}
              </Heading>
              <Text fontSize='3xs' fontWeight='semibold' color='neutral.grayDark'>
                {item.state} State, {item.country}
              </Text>
              <Text fontSize='3xs' color='neutral.grayDark'>
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
    </GridItem>
  );
}

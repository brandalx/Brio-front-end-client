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
import { DotLoader } from 'react-spinners';
import imagemap from '../../../assets/images/defaultmap.png';
import axios from 'axios';

export default function AdressCard({ item }) {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeUrl = `https://api.opencagedata.com/geocode/v1/json?key=3987c7ecd6704855ac9b1ece1a771146&q=${item.country}%20${item.city}&pretty=1`;
        const resp = await axios.get(placeUrl);
        const data = resp.data;
        setAddress(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Skeleton isLoaded={!loading}>
      <GridItem w='100%'>
        <Box>
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
                <Box py={2} px={2} borderRadius={12}>
                  <Box w='300px' ml='4px' py={'7.5px'} position='relative'>
                    {address && (
                      <iframe
                        width='100%'
                        src={`https://api.mapbox.com/styles/v1/brndalx/clhqc9b4e01up01quavc00iq7.html?title=false&access_token=pk.eyJ1IjoiYnJuZGFseCIsImEiOiJjbGhxYzYzbDYyOGZxM2xveDd1dHFyMHEwIn0.5R7wGRA6qn4PC7Gw8_hWIA&zoomwheel=false#6/${address.results[0].bounds.northeast.lat}/${address.results[0].bounds.northeast.lng}`}
                        title='Monochrome'
                        style={{ border: 'none', borderRadius: '1' }}
                      />
                    )}
                  </Box>
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
                    _hover={{
                      color: 'neutral.black',
                      borderColor: 'neutral.lightest'
                    }}
                    fontSize='2xs'
                    color='neutral.gray'
                    fontWeight='bold'
                    py={5}
                    me='20px'
                  >
                    •••
                  </MenuButton>

                  <MenuList>
                    <MenuItem fontWeight='medium'>Edit</MenuItem>
                    <MenuDivider />
                    <MenuItem
                      m={0}
                      h='100%'
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
        </Box>
      </GridItem>
    </Skeleton>
  );
}

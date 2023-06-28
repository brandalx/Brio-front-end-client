import React, { useContext } from 'react';
import { geolocationContext } from '../../../context/globalContext';
import Geolocation from '../../../assets/svg/Geolocation';
import { Box, MenuButton, Button, MenuItem, MenuList, Menu, Skeleton } from '@chakra-ui/react';
export default function GeolocationDefinder({ loading, isInCart }) {
  const { city, setCity } = useContext(geolocationContext);

  return (
    <Box>
      <div>
        {city && (
          <div>
            <p>Is your current location {city}?</p>
            <button onClick={() => setCity(city)}>Yes</button>
            <button onClick={() => setCity('New York')}>No</button>
          </div>
        )}
      </div>

      <Skeleton borderRadius='16px' isLoaded={!loading}>
        <Box
          borderColor={isInCart ? 'primary.default' : 'neutral.white'}
          borderWidth='1px'
          ml='4px'
          bg='primary.lightest'
          _hover={{ bg: 'primary.light' }}
          color='black'
          px={'8px'}
          py={'7.5px'}
          borderRadius='16px'
          position='relative'
        >
          <Menu>
            <MenuButton as={Button} p='6px' rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Geolocation />
            </MenuButton>

            <MenuList>
              <a href='/user/cart'>
                {/* //because it should refresh to update user logged in */}

                <MenuItem fontWeight='medium'>My cart</MenuItem>
              </a>
            </MenuList>
          </Menu>
        </Box>
      </Skeleton>
    </Box>
  );
}

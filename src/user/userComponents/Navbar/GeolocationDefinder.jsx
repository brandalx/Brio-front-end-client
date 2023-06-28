import React, { useContext, useEffect } from 'react';
import { geolocationContext } from '../../../context/globalContext';
import Geolocation from '../../../assets/svg/Geolocation';
import {
  Box,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  Menu,
  Skeleton,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverFooter,
  PopoverBody,
  ButtonGroup,
  Popover
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

export default function GeolocationDefinder({ loading, isInCart }) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { city, setCity } = useContext(geolocationContext);
  useEffect(() => {
    if (!loading) {
      onToggle();
    }
  }, [loading]);
  return (
    <Box>
      <Skeleton borderRadius='16px' isLoaded={!loading && city}>
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
          <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement='right' closeOnBlur={false}>
            <Menu>
              <PopoverTrigger>
                <MenuButton
                  onClick={() => {
                    onToggle();
                  }}
                  as={Button}
                  p='6px'
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Geolocation />
                </MenuButton>
              </PopoverTrigger>

              <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Let us know restaurants nearby</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>Is your location {city}?</PopoverBody>
                <PopoverFooter display='flex' justifyContent='flex-end'>
                  <ButtonGroup size='2xs'>
                    <Button
                      background='neutral.white'
                      fontSize='2xs'
                      fontWeight='bold'
                      variant='solid'
                      color='primary.default'
                      borderWidth='1px'
                      borderColor='primary.default'
                      _hover={{
                        background: 'primary.default',
                        color: 'neutral.white',
                        borderWidth: '1px',
                        borderColor: 'primary.default'
                      }}
                      me='2px'
                      onClick={() => {
                        onClose();
                        setCity('New York');
                      }}
                    >
                      No
                    </Button>
                    <Button
                      w={{ base: '50%', md: 'initial' }}
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
                      onClick={() => {
                        onClose();
                        setCity(city);
                      }}
                    >
                      Yes
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Menu>
          </Popover>
        </Box>
      </Skeleton>
    </Box>
  );
}

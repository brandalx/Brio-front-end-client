import React, { useContext, useEffect, useState } from 'react';
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

export default function GeolocationDefinder({ loading, isInCart, pos = 'bottom', pxx = '8px', pyy = '8px' }) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { city, setCity, update, setUpdate, isTrue, setIsTrue, setTimes, times } = useContext(geolocationContext);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    if (!loading && !sessionStorage['location'] && !sessionStorage['isTrue'] && times < 3) {
      onToggle();
    }
  }, [loading]);

  return (
    <Box>
      {!sessionStorage['location'] ? (
        <Box>
          {/* <Skeleton borderRadius='16px' isLoaded={!loading && city}> */}
          <Box
            borderColor={'neutral.white'}
            borderWidth='1px'
            ml='4px'
            bg='prtimary.lighest'
            _hover={{ bg: 'primary.light' }}
            color='black'
            px={pxx}
            py={pyy}
            borderRadius='16px'
            position='relative'
          >
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              placement='bottom'
              closeOnBlur={false}
            >
              <Menu>
                <PopoverTrigger>
                  <MenuButton
                    onClick={() => {
                      onToggle();
                      setUpdate(update + 1);
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
                  <PopoverHeader fontWeight='semibold'>Help us show restaurants nearby</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <Skeleton isLoaded={city} borderRadius='16px' px={2} mx={2}>
                    <PopoverBody>Is your location {city}?</PopoverBody>
                  </Skeleton>

                  <PopoverFooter display='flex' justifyContent='flex-end'>
                    <Skeleton isLoaded={city} borderRadius='16px' mx={2}>
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
                            setCity(null);
                            setIsTrue(false);
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
                            sessionStorage.setItem('location', city);
                            sessionStorage.setItem('isTrue', isTrue);
                            onClose();
                            setCity(city);
                            setIsTrue(true);
                          }}
                        >
                          Yes
                        </Button>
                      </ButtonGroup>
                    </Skeleton>
                  </PopoverFooter>
                </PopoverContent>
              </Menu>
            </Popover>
          </Box>
          {/* </Skeleton> */}
        </Box>
      ) : (
        <Box>
          {/* <Skeleton borderRadius='16px' isLoaded={!loading}> */}
          <Box
            borderColor={'neutral.white'}
            borderWidth='1px'
            ml='4px'
            bg='primary.lightest'
            _hover={{ bg: 'primary.light' }}
            color='black'
            px={pxx}
            py={pyy}
            borderRadius={pxx === '8px' ? '16px' : '12px'}
            position='relative'
          >
            <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement={pos} closeOnBlur={false}>
              <Menu>
                <PopoverTrigger>
                  <MenuButton
                    onClick={() => onToggle()}
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
                  <PopoverHeader fontWeight='semibold'>We will show restaurants nearby</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>Your location is {city}</PopoverBody>
                  <PopoverFooter display='flex' justifyContent='flex-end'>
                    <ButtonGroup size='2xs'>
                      <Button
                        w={{ base: '100%', md: 'initial' }}
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
                          sessionStorage.removeItem('location');
                          sessionStorage.removeItem('isTrue', isTrue);
                          setCity(null);
                          setIsTrue(false);
                          onClose();
                        }}
                      >
                        Change
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Menu>
            </Popover>
          </Box>
          {/* </Skeleton> */}
        </Box>
      )}
    </Box>
  );
}

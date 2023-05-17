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
import React from 'react';
import imagemap from '../../../assets/images/defaultmap.png';
import ThreeDots from '../../../assets/svg/ThreeDots';
export default function AdressCard({ item }) {
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
            <Box py={2} px={2} borderRadius={12}>
              <Box ml='4px' py={'7.5px'} position='relative'>
                <Box>
                  <Image maxH='82px' maxW='96px' borderRadius='12px' src={imagemap} />
                </Box>
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

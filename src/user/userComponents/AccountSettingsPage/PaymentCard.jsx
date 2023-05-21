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
import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
import React from 'react';
import ThreeDots from '../../../assets/svg/ThreeDots';

export default function PaymentCard({ item }) {
  let image;
  if (item.cardtype === 'visa') {
    image = visa;
  } else {
    image = mastercard;
  }
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
        p='30px'
        transition='all 0.3s'
        borderWidth='1px'
        bg='neutral.white'
      >
        <Flex justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box>
              <Heading fontSize='2xs' fontWeight='bold'>
                {item.number}
              </Heading>
              <Text fontSize='3xs' fontWeight='semibold' color='neutral.grayDark'>
                {item.expiration}
              </Text>
              <Text fontSize='3xs' color='neutral.grayDark'>
                {item.cardholder}
              </Text>
            </Box>
          </Flex>
          <Box display='flex' flexDir='column' justifyContent='space-between' alignItems='flex-end'>
            <Menu>
              <MenuButton
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
            <Image w='auto' h='25px' src={image} />
          </Box>
        </Flex>
      </Box>
    </GridItem>
  );
}

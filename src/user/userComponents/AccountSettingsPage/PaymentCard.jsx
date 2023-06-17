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
import React, { useEffect } from 'react';
import ThreeDots from '../../../assets/svg/ThreeDots';

export default function PaymentCard({
  item,
  disabledOptions = false,
  handleUserAddressDelete,
  setIsEditTrue,
  setTargetIndex
}) {
  return (
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
              {item.cardNumber}
            </Heading>
            <Text fontSize='3xs' fontWeight='semibold' color='neutral.grayDark'>
              {item.expirationDate}
            </Text>
            <Text fontSize='3xs' color='neutral.grayDark'>
              {item.cardholder}
            </Text>
          </Box>
        </Flex>
        <Box display='flex' flexDir='column' justifyContent='space-between' alignItems='flex-end'>
          {!disabledOptions && (
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
                {/* <MenuItem
                  fontWeight='medium'
                  onClick={() => {
                    setIsEditTrue(true);
                    setTargetIndex(item._id);
                  }}
                >
                  Edit
                </MenuItem> */}
                {/* <MenuDivider /> */}
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

          <Image w='auto' h='25px' src={item.cardType === 'visa' ? visa : mastercard} />
          {console.log(item)}
        </Box>
      </Flex>
    </Box>
  );
}

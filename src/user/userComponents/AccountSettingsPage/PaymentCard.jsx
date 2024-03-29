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
// import visa from '../../../assets/images/visa.png';
// import mastercard from '../../../assets/images/mastercard.png';
import MasterCard from '../../../assets/svg/MasterCard';
import Visa from '../../../assets/svg/Visa';
import React, { useEffect } from 'react';
import ThreeDots from '../../../assets/svg/ThreeDots';

export default function PaymentCard({
  onitemselected,
  selectCard,
  item,
  disabledOptions = false,
  handleUserAddressDelete,
  setIsEditTrue,
  setTargetIndex,
  index
}) {
  return (
    <Box zIndex={index + 1} data-aos='fade-up' h='100%'>
      <Box
        h='100%'
        onClick={() => {
          selectCard(item._id);
        }}
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
        p='30px'
        transition='all 0.3s'
        borderWidth='1px'
        bg='neutral.white'
      >
        <Flex justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box>
              <Heading
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                fontSize='2xs'
                fontWeight='bold'
              >
                {item.cardNumber}
              </Heading>
              <Text fontSize='3xs' fontWeight='semibold' color='neutral.gray'>
                {item.expirationDate}
              </Text>
              <Text fontSize='3xs' color='neutral.gray'>
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

            <Box style={{ transform: 'scale(2.5)' }}>{item.cardType === 'visa' ? <Visa /> : <MasterCard />}</Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

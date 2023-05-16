import { useState, useCallback, useEffect } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import UserAccount from '../../../assets/svg/UserAccount';
import Address from '../../../assets/svg/Address';
import Security from '../../../assets/svg/Security';
import theme from '../../../utils/theme';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import PaymentMethod from '../../../assets/svg/PaymentMethod';
function SettingItem({ element, isSelected, onItemSelected }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = element.icon;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    onItemSelected(element.id);
  }, [onItemSelected, element.id]);

  let location = useLocation();
  function normalizePath(path) {
    return path.replace(/\/{2,}/g, '/').replace(/\/$/, '');
  }
  useEffect(() => {
    const normalizedPath = normalizePath(location.pathname);
    if (normalizedPath === '/user/account') {
      onItemSelected(1);
    } else if (normalizedPath === '/user/account/address') {
      onItemSelected(2);
    } else if (normalizedPath === '/user/account/payment') {
      onItemSelected(3);
    } else if (normalizedPath === '/user/account/security') {
      onItemSelected(4);
    }
  }, [location.pathname]);

  const borderColor = isSelected ? 'primary.default' : isHovered ? 'primary.default' : 'neutral.grayLightest';
  const bgColor = isSelected ? 'primary.default' : isHovered ? 'primary.lightest' : 'neutral.white';
  const textColor = isSelected ? 'primary.default' : 'neutral.black';
  const iconColor = isSelected ? theme.colors.neutral.white : theme.colors.neutral.black;

  return (
    <Box
      _hover={{ cursor: 'pointer', transition: 'all 0.3s' }}
      key={element.id}
      borderRadius='16px'
      mb='12px'
      p='10px'
      transition='all 0.3s'
      borderWidth='2px'
      borderColor={borderColor}
      bg='neutral.white'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Flex alignItems='center'>
        <Box me={4} p={3} bg={bgColor} borderRadius={12}>
          <Icon color={iconColor} />
        </Box>
        <Box>
          <Heading fontSize='2xs' fontWeight='bold' color={textColor}>
            {element.title}
          </Heading>
          <Text fontSize='3xs' color='neutral.grayDark'>
            {element.description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default function SettingsMenu() {
  const arr = [
    {
      id: 1,
      title: 'Account',
      description: 'Personal information',
      icon: UserAccount,
      link: ''
    },
    {
      id: 2,
      title: 'Address',
      description: 'Shippings addresses',
      icon: Address,
      link: 'address'
    },
    {
      id: 3,
      title: 'Payment method',
      description: 'Connected credit cards',
      icon: PaymentMethod,
      link: 'payment'
    },
    {
      id: 4,
      title: 'Security',
      description: 'Password, 2FA',
      icon: Security,
      link: 'security'
    }
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelected = useCallback((itemId) => {
    setSelectedItem(itemId);
  }, []);

  return (
    <Box>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Settings
      </Text>
      {arr.map((element) => (
        <Link to={element.link} key={element.id}>
          <SettingItem element={element} isSelected={selectedItem === element.id} onItemSelected={handleItemSelected} />
        </Link>
      ))}
    </Box>
  );
}

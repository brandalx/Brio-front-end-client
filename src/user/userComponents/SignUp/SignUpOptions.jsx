import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Users from '../../../assets/svg/Users';
import Restaurants from '../../../assets/svg/Restaurants';
import theme from '../../../utils/theme';
import { Link, useLocation } from 'react-router-dom';
function SignUpOptions({ element, isSelected, onItemSelected }) {
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
    if (normalizedPath === '/signup/restaurant') {
      onItemSelected(1);
    } else if (normalizedPath === '/signup/personal') {
      onItemSelected(2);
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

export default function SignUpOptionsArr() {
  const arr = [
    {
      id: 1,
      title: 'Restaurant',
      description: 'Manage your own restaurant',
      icon: Restaurants,
      link: 'restaurant'
    },
    {
      id: 2,
      title: 'Personal',
      description: 'Keep your orders in one place',
      icon: Users,
      link: 'personal'
    }
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelected = useCallback((itemId) => {
    setSelectedItem(itemId);
  }, []);

  return (
    <Box>
      {arr.map((element) => (
        <Link to={element.link} key={element.id}>
          <SignUpOptions
            element={element}
            isSelected={selectedItem === element.id}
            onItemSelected={handleItemSelected}
          />
        </Link>
      ))}
    </Box>
  );
}

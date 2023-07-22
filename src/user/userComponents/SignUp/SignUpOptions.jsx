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
    onItemSelected(element.type); // Pass element.link instead of element.id
  }, [onItemSelected, element.type]);

  let location = useLocation();
  function normalizePath(path) {
    return path.replace(/\/{2,}/g, '/').replace(/\/$/, '');
  }

  useEffect(() => {
    const normalizedPath = normalizePath(location.pathname);
    if (normalizedPath === '/signup/personal') {
      onItemSelected('personal'); // Pass 'restaurant' instead of 1
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

export default function SignUpOptionsArr({ setOption }) {
  const arr = [
    {
      id: 1,
      title: 'Restaurant',
      description: 'Manage your own restaurant',
      icon: Restaurants,
      type: 'restaurant'
    },
    {
      id: 2,
      title: 'Personal',
      description: 'Keep your orders in one place',
      icon: Users,
      type: 'personal'
    }
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemSelected = useCallback(
    (type) => {
      setSelectedItem(type); // Set the selected link as the selectedItem
      setOption(type);
    },
    [setOption]
  );

  return (
    <Box>
      {arr.map((element) => (
        <SignUpOptions
          key={element.id}
          element={element}
          isSelected={selectedItem === element.type}
          onItemSelected={handleItemSelected}
        />
      ))}
    </Box>
  );
}

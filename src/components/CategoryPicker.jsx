import React, { useState, useCallback } from 'react';
import { GridItem, Box, Text } from '@chakra-ui/react';
import Emoji from 'react-emojis';

const CategoryPicker = ({ emoji, label, size = '40' }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    setIsPressed(!isPressed);
  }, [isPressed]);

  const bgColor = isPressed ? 'primary.light' : isHovered ? 'primary.lightest' : 'neutral.white';
  const borderColor = isPressed ? 'primary.default' : isHovered ? 'primary.default' : 'neutral.grayLightest';
  const borderWidth = '2px';
  const textColor = isPressed ? 'primary.default' : 'primary.gray';

  return (
    <GridItem
      fontWeight='bold'
      cursor='pointer'
      w='100%'
      h='auto'
      borderRadius={16}
      bg={bgColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      p={2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Box textAlign='center'>
        <Emoji emoji={emoji} size={size} />
        <Text fontSize='2xs' fontWeight='regular' color={textColor}>
          {label}
        </Text>
      </Box>
    </GridItem>
  );
};

export default CategoryPicker;

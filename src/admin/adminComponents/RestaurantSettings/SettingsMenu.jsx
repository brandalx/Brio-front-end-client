import { useState, useCallback } from 'react';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import Account from '../../../assets/svg/Account';
import Administrators from '../../../assets/svg/Administrators';
import Security from '../../../assets/svg/Security';
import theme from '../../../utils/theme';

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
    { id: 1, title: 'Account', description: 'Restaurant information', icon: Account },
    { id: 2, title: 'Administrators', description: 'Invite and manage admins', icon: Administrators },
    { id: 3, title: 'Security', description: 'Password, 2FA', icon: Security }
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
        <SettingItem
          key={element.id}
          element={element}
          isSelected={selectedItem === element.id}
          onItemSelected={handleItemSelected}
        />
      ))}
    </Box>
  );
}

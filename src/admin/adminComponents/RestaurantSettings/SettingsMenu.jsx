import { Box, Divider, Flex, GridItem, Heading, Text, Image, MenuButton } from '@chakra-ui/react';
import React from 'react';
import Account from '../../../assets/svg/Account';
import Administrators from '../../../assets/svg/Administrators';
import Security from '../../../assets/svg/Security';
import theme from '../../../utils/theme';
export default function SettingsMenu() {
  const arr = [
    { id: 1, title: 'Account', description: 'Restaurant information', icon: Account },
    { id: 2, title: 'Administrators', description: 'Invite and manage admins', icon: Administrators },
    {
      id: 3,
      title: 'Security',
      description: 'Password, 2FA',
      icon: Security
    }
  ];
  return (
    <Box>
      <Text mb='16px' fontSize='s' fontWeight='semibold' color='neutral.black'>
        Settings
      </Text>
      {arr.map((element) => {
        const Icon = element.icon;
        return (
          <Box
            key={element.id}
            borderRadius='16px'
            mb='12px'
            p='10px'
            borderWidth='1px'
            borderColor='neutral.grayLightest'
          >
            <Flex alignItems='center'>
              <Box me={4} p={3} bg='neutral.grayLightest' borderRadius={12}>
                <Icon color={theme.colors.primary.default} />
              </Box>
              <Box>
                <Heading fontSize='2xs' fontWeight='bold' color='neutral.black'>
                  {element.title}
                </Heading>
                <Text fontSize='3xs' color='neutral.grayDark'>
                  {element.description}
                </Text>
              </Box>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
}

import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';
import defaultmap from '../../../assets/images/defaultmap.png';
export default function Pickup() {
  return (
    <Box py={4}>
      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
        Select your shipping adress
      </Text>
      <Box py={4}>
        <Image borderRadius='12px' src={defaultmap} w='100%' />
        <Box my={4}>
          <Text fontWeight='bold' fontSize='2xs' color='neutral.black'>
            San Diego
          </Text>
          <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
            California State, USA
          </Text>
          <Text fontSize='3xs' color='neutral.grayDark'>
            3891 Ranchview Dr. Richardson, 62639
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

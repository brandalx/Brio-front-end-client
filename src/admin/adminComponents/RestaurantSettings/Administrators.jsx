import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Grid,
  Textarea,
  Divider,
  Checkbox,
  Stack
} from '@chakra-ui/react';
import React from 'react';

export default function Administrators() {
  return (
    <Box>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Administrators
      </Text>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
          Invite and manage admins
        </Text>
        <Box pt={5}>box1</Box>
        <Box pt={5}>box2</Box>
      </Box>
    </Box>
  );
}

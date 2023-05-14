import React from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Checkbox,
  Divider
} from '@chakra-ui/react';
export default function PaymentMethod() {
  return (
    <>
      <Box>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Payment method
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Connected payment methods
          </Text>
          <Box pt={5}></Box>
          Payment method content
        </Box>
      </Box>
    </>
  );
}

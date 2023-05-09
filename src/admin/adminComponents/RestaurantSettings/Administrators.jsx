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
import TableAdmins from './TableAdmins';

export default function Administrators() {
  return (
    <Box>
      <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
        Administrators
      </Text>
      <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
        <Flex justifyContent='space-between' s>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Invite and manage admins
          </Text>
          <Button
            w={{ base: '50%', md: 'initial' }}
            background='primary.default'
            fontWeight='bold'
            variant='solid'
            color='neutral.white'
            borderWidth='1px'
            borderColor='neutral.white'
            _hover={{
              background: 'neutral.white',
              color: 'primary.default',
              borderWidth: '1px',
              borderColor: 'primary.default'
            }}
            py={5}
          >
            Invite new admin
          </Button>
        </Flex>

        <Box pt={5}>
          <TableAdmins />
        </Box>
        <Box pt={5}>box2</Box>
      </Box>
    </Box>
  );
}

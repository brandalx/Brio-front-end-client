import { Flex, Text, GridItem, Checkbox, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export default function EmailNotification() {
  return (
    <GridItem w='100%'>
      <Stack mt={2} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
        <Flex alignItems='center'>
          <Checkbox mr='2'>
            <Text color='neutral.black' fontSize='2xs'>
              Order updates
            </Text>
          </Checkbox>
        </Flex>
      </Stack>
      <Stack mt={4} direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
        <Flex alignItems='center'>
          <Checkbox iconColor='neutral.white' mr='2'>
            <Text color='neutral.black' fontSize='2xs'>
              Admin actions
            </Text>
          </Checkbox>
        </Flex>
      </Stack>
    </GridItem>
  );
}

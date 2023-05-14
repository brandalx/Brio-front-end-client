import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import Notification from '../../../assets/svg/Notification';
import OrdersRecived from '../../../assets/svg/OrdersRecived';
import OrdersDelivered from '../../../assets/svg/OrdersDelivered';
import Revenue from '../../../assets/svg/Revenue';

export default function OrdersData() {
  let arr = [9273, 7691, 437291];
  return (
    <Grid templateColumns={{ base: '1fr ', md: '1fr 1fr 1fr ' }} gap={{ base: 2, md: 6 }}>
      <GridItem w='100%'>
        <Box
          _hover={{ cursor: 'pointer', transition: 'all 0.3s', bg: 'secondary.light', borderColor: 'secondary.light' }}
          borderRadius='16px'
          mb='12px'
          p='0px'
          transition='all 0.3s'
          borderWidth='1px'
          bg='neutral.white'
        >
          <Flex alignItems='center'>
            <Box me={4} p={3} borderRadius={12}>
              <Box
                ml='4px'
                bg='secondary.light'
                color='black'
                px={'8px'}
                py={'7.5px'}
                borderRadius='16px'
                position='relative'
              >
                <Box p='6px'>
                  <OrdersRecived />
                </Box>
              </Box>
            </Box>
            <Box>
              <Heading fontSize='2xs' fontWeight='bold'>
                {arr[0].toLocaleString()}
              </Heading>
              <Text fontSize='3xs' color='neutral.grayDark'>
                Orders received
              </Text>
            </Box>
          </Flex>
        </Box>
      </GridItem>
      <GridItem w='100%'>
        <Box
          _hover={{ cursor: 'pointer', transition: 'all 0.3s', bg: 'tertiary.light', borderColor: 'tertiary.light' }}
          borderRadius='16px'
          mb='12px'
          p='0px'
          transition='all 0.3s'
          borderWidth='1px'
          bg='neutral.white'
        >
          <Flex alignItems='center'>
            <Box me={4} p={3} borderRadius={12}>
              <Box
                ml='4px'
                bg='tertiary.light'
                color='black'
                px={'8px'}
                py={'7.5px'}
                borderRadius='16px'
                position='relative'
              >
                <Box p='6px'>
                  <OrdersDelivered />
                </Box>
              </Box>
            </Box>
            <Box>
              <Heading fontSize='2xs' fontWeight='bold'>
                {arr[1].toLocaleString()}
              </Heading>
              <Text fontSize='3xs' color='neutral.grayDark'>
                Orders delivered
              </Text>
            </Box>
          </Flex>
        </Box>
      </GridItem>
      <GridItem w='100%'>
        <Box
          _hover={{ cursor: 'pointer', transition: 'all 0.3s', bg: 'primary.light', borderColor: 'primary.light' }}
          borderRadius='16px'
          mb='12px'
          p='0px'
          transition='all 0.3s'
          borderWidth='1px'
          bg='neutral.white'
        >
          <Flex alignItems='center'>
            <Box me={4} p={3} borderRadius={12}>
              <Box
                ml='4px'
                bg='primary.light'
                color='black'
                px={'8px'}
                py={'7.5px'}
                borderRadius='16px'
                position='relative'
              >
                <Box p='6px'>
                  <Revenue />
                </Box>
              </Box>
            </Box>
            <Box>
              <Heading fontSize='2xs' fontWeight='bold'>
                $ {arr[2].toLocaleString()}
              </Heading>
              <Text fontSize='3xs' color='neutral.grayDark'>
                Revenue today
              </Text>
            </Box>
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  );
}

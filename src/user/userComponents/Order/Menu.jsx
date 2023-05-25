import { Box, Button, Grid, GridItem, Text, Image, Divider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import TrashBox from '../../../assets/svg/TrashBox';

export default function Menu() {
  //   let info = item.description;
  //   const cutInfo = (info) => {
  //     const words = info.split(' ');

  //     if (words.length <= 10) {
  //       return info;
  //     } else {
  //       return words.slice(0, 10).join(' ') + '...';
  //     }
  //   };
  //   useEffect(() => {
  //     console.log(amount);
  //   }, []);
  //   const cutInfoText = cutInfo(info);
  return (
    <>
      <Box pt={4}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr ' }} gap={4}>
          <GridItem w='100%'>
            <Box display='flex' alignItems='center'>
              <Box me={2}>
                <Image
                  borderRadius='12px'
                  maxH='72px'
                  maxW='72px'
                  src='https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  alt='image'
                />
              </Box>
              <Box>
                <Box>
                  <Text fontWeight='bold' color='neutral.grayDark' fontSize='2xs'>
                    Burger Big Smoke
                  </Text>
                </Box>
                <Box>
                  <Text color='neutral.grayDark' fontSize='2xs'>
                    Introducing the sizzling Burger Big Smoke! Sink your teeth into this...
                  </Text>
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%'>
            <Box
              h='100%'
              display='flex'
              alignItems={{ base: 'flex-end', md: 'center' }}
              alignContent='flex-end'
              justifyContent={{ base: 'center', md: 'flex-end' }}
            >
              <Grid templateColumns='1fr 1fr ' gap={4}>
                <GridItem w='100%'>
                  {' '}
                  <Box display='flex' alignItems='center'>
                    <Text fontSize='2xs' color='neutral.gray' fontWeight='bold' px={3} mt={1}>
                      x 2
                    </Text>
                  </Box>
                </GridItem>
                <GridItem w='100%' h='100%'>
                  <Box w='100%' display='flex' justifyContent='center'>
                    {' '}
                    <Text fontWeight='extrabold' color='neutral.black' fontSize='xs' p={0} m={0}>
                      $12.40
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
        <Divider pt={4} />
      </Box>
    </>
  );
}

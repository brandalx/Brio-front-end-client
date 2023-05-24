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
      <Box>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr ' }} gap={4}>
          <GridItem w='100%'>
            <Box display='flex' alignItems='center'>
              <Box me={2}>
                <Image borderRadius='12px' maxH='72px' maxW='72px' src='' alt='image' />
              </Box>
              <Box>
                <Box>
                  <Text fontWeight='bold' color='neutral.grayDark' fontSize='2xs'>
                    title
                  </Text>
                </Box>
                <Box>
                  <Text color='neutral.grayDark' fontSize='2xs'>
                    desc
                  </Text>
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%'>
            <Box
              h='100%'
              display='flex'
              alignItems='center'
              alignContent='center'
              justifyContent={{ base: 'center', md: 'flex-end' }}
            >
              <Grid templateColumns='0.8fr 0.8fr 0.4fr' gap={4}>
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
                <GridItem w='100%' mt={1}>
                  <TrashBox color='#C7C8D2' />
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

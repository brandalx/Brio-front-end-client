import { Box, Button, Grid, GridItem, Text, Image, Divider } from '@chakra-ui/react';
import React from 'react';
import TrashBox from '../../../assets/svg/TrashBox';

export default function MenuMeal({ item }) {
  return (
    <>
      <Box>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr ' }} gap={4}>
          <GridItem w='100%'>
            <Box display='flex' alignItems='center'>
              <Box me={2}>
                <Image borderRadius='12px' maxH='72px' maxW='72px' src={item.image} />
              </Box>
              <Box>
                <Box>
                  <Text fontWeight='bold' color='neutral.grayDark' fontSize='2xs'>
                    {item.title}
                  </Text>
                </Box>
                <Box>
                  <Text color='neutral.grayDark' fontSize='2xs'>
                    {item.desc}
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
                    <Button
                      background='neutral.grayLightest'
                      borderRadius='100px'
                      py='10px'
                      px='10px'
                      fontSize='sm'
                      color='neutral.gray'
                    >
                      -
                    </Button>

                    <Text fontSize='2xs' color='neutral.gray' fontWeight='bold' px={3}>
                      1
                    </Text>
                    <Button
                      background='neutral.grayLightest'
                      borderRadius='100px'
                      py='10px'
                      px='10px'
                      fontSize='sm'
                      color='primary.black'
                    >
                      +
                    </Button>
                  </Box>
                </GridItem>
                <GridItem w='100%' h='100%'>
                  <Box w='100%' display='flex' justifyContent='center'>
                    {' '}
                    <Text fontWeight='extrabold' color='neutral.black' fontSize='xs' p={0} m={0}>
                      $ {item.price}
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

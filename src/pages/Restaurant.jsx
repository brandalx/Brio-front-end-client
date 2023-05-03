import { Box, Container, Flex, GridItem, Text, Image, Grid } from '@chakra-ui/react';
import React from 'react';
import img1 from '../assets/images/salad.jpg';
import { AiOutlineClockCircle } from 'react-icons/ai';

export default function Restaurant() {
  return (
    <>
      <Box background='bg' py='50px'>
        <Container maxW='1110px'>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1.3fr 1fr' }} gap={2}>
            <GridItem w='100%'>
              <Flex>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '0.5fr 1fr' }} gap={2}>
                  <Flex alignItems='center'>
                    <GridItem w='100%'>
                      <Image borderWidth='15px' borderColor='neutral.white' borderRadius='16px' src={img1} />
                    </GridItem>
                  </Flex>
                  <GridItem w='100%'>
                    {' '}
                    <Flex flexDirection='column'>
                      <Text fontSize='xl' fontWeight='extrabold'>
                        Royal Sushi House
                      </Text>
                      <Text fontSize='2xs'>
                        Veri lobortis contentiones sed ad, duo eu clita dissentiet. Nam primis eligendi salutandi eu, an
                        deseruisse ullamcorper vis.
                      </Text>

                      <Box display='flex'>
                        <Box display='flex' alignItems='center' me={2}>
                          {' '}
                          <AiOutlineClockCircle color='#828282' />
                        </Box>
                        <Text color='neutral.gray' fontSize='3xs'>
                          40-60 min * $24 min sum
                        </Text>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>
              </Flex>
            </GridItem>
            <GridItem w='100%' h='auto'>
              <Flex alignItems='center' h='100%'>
                <Box w='100%'>
                  <iframe
                    title='map'
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10752.024000153444!2d-74.0009056026385!3d40.75063980735163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ae15b2adcb%3A0x7955420634fd7eba!2sPennsylvania%20Station!5e0!3m2!1sen!2sil!4v1683120634682!5m2!1sen!2sil'
                    width='100%'
                    style={{ borderRadius: '16px', borderWidth: '5px', borderColor: 'white', minHeight: '230px' }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  />
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

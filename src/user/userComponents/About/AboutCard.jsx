import { Box, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

export default function AboutCard({ data, index }) {
  return (
    <Box data-aos='fade-up' my={4}>
      <Box
        border='1px'
        borderColor='neutral.grayLightest'
        py={5}
        overflow='hidden'
        minH={{ base: '350px', md: '250px' }}
        bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : '#FCFCFC')}
        borderRadius='lg'
      >
        <Box w='100%'>
          <Box justifyContent={{ base: 'center', md: 'start' }} px={8} display='flex' alignItems='center'>
            <Box>
              <Image h='150px' rounded='lg' src={data.image} />
            </Box>

            <Box ps={3}>
              <Box pt='5'>
                <Text color='neutral.black' fontSize='lg' fontWeight='extrabold'>
                  {data.name}
                </Text>
                <Box
                  textAlign={index % 2 === 0 ? 'start' : 'end'}
                  fontWeight='normal'
                  color='neutral.grayLight'
                  fontSize='3xs'
                >
                  {data.age}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box width={{ base: '100%', md: '90%' }}>
            <Box px={5}>
              <Box my={2}>
                <Text fontWeight='bold' color='neutral.black' fontSize='xs'>
                  Bio:
                </Text>{' '}
                <Text mt={1} color='neutral.gray' fontSize='2xs'>
                  {data.bio}
                </Text>
              </Box>

              <Box my={4}>
                <Text fontWeight='bold' color='neutral.black' fontSize='xs'>
                  Responsible in Brio:
                </Text>{' '}
                <Text mt={1} color='neutral.gray' fontSize='2xs'>
                  {data.role}
                </Text>
              </Box>

              <Box my={4}>
                <Text fontWeight='bold' color='neutral.black' fontSize='xs'>
                  Contact information:
                </Text>{' '}
                {data.contacts.map((contact, idx) => (
                  <Box display='flex' key={idx}>
                    <Text mt={1} fontWeight='medium' color='neutral.black' fontSize='2xs'>
                      {contact.type}:
                    </Text>
                    <Link
                      _hover={{ color: 'primary.default' }}
                      ms={2}
                      textDecor='underline'
                      rel='noreferrer'
                      target='_blank'
                      href={contact.link}
                      mt={1}
                      fontWeight='medium'
                      color='neutral.black'
                      fontSize='2xs'
                    >
                      {contact.displayText}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

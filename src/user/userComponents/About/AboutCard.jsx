import { Box, Grid, GridItem, Icon, Image, Link, Text } from '@chakra-ui/react';
import { IconBrandGithub, IconBrandLinkedin, IconCodeAsterix, IconMail, IconPhone } from '@tabler/icons-react';
import { IconPhoneCall } from '@tabler/icons-react';
import { IconCodeCircle } from '@tabler/icons-react';
import { IconBriefcase, IconCategory2, IconCode } from '@tabler/icons-react';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AboutCard({ data, index }) {
  const renderIcon = (contactType) => {
    switch (contactType) {
      case 'GitHub':
        return <IconBrandGithub />;
      case 'LinkedIn':
        return <IconBrandLinkedin />;
      case 'Developer Portfolio':
        return <IconCodeCircle />;
      case 'Design portfolio':
        return <IconCategory2 />;
      case 'Cell':
        return <IconPhoneCall />;
      case 'Email':
        return <IconMail />;
      default:
        return <></>;
    }
  };
  return (
    <Box h='100%' data-aos='fade-up' mb={4}>
      <Box
        h='100%'
        border='1px'
        borderColor='neutral.grayLightest'
        py={5}
        overflow='hidden'
        minH={{ base: '350px', md: '250px' }}
        bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'white')}
        borderRadius='lg'
      >
        <Box w='100%'>
          <Box justifyContent={{ base: 'center', md: 'start' }} px={8} display='flex' alignItems='center'>
            <Box>
              <LazyLoadImage style={{ height: '150px' }} effect='blur' rounded='lg' src={data.image} />
            </Box>

            <Box ps={3}>
              <Box pt='5'>
                <Text color='neutral.black' fontSize='lg' fontWeight='extrabold'>
                  {data.name}
                </Text>
                <Box fontWeight='normal' color='neutral.grayLight' fontSize='3xs'>
                  {data.age}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box width={{ base: '100%' }}>
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
                      <Icon boxSize='20px'>{renderIcon(contact.type)}</Icon> {contact.type}:
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

import { Avatar, Box, Container, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
export default function BlogCard({ data, index, getUserName, getUserAvatar, getBlogImage }) {
  return (
    <Box w='100%' my={2} data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
      <Link to={'/blog/' + data._id}>
        <Box w='100%' ps={2}>
          <Box
            borderRadius='16px'
            py={5}
            backgroundImage={`url(${
              data && data._id && data.cover.startsWith('images/') ? getBlogImage(data._id) : data.cover
            })`}
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundPosition='center'
            h='250px'
            position='relative'
            _before={{
              borderRadius: '16px',
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage:
                'linear-gradient(180deg,rgba(0,0,0,0) 7%,rgba(0,0,0,0.08) 12%,rgba(0,0,0,0.16) 17%,rgba(0,0,0,0.22) 21%,rgba(0,0,0,0.32) 26%,rgba(0,0,0,0.42) 32%,rgba(0,0,0,0.52) 38%,rgba(0,0,0,0.62) 47%,rgba(0,0,0,0.72) 57%,rgba(0,0,0,0.82) 65%)'
            }}
          >
            <Flex direction='column' justifyContent='flex-end' h='100%' p={4}>
              <Text
                backgroundColor='none'
                mt={5}
                ms={5}
                data-aos='fade-up'
                textAlign='center'
                fontSize={'xl'}
                lineHeight={{ base: '40px', md: '50px' }}
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.white')}
                fontWeight='black'
              >
                {data._id && data.title}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Box mt={2} mx='auto' display='flex' alignItems='center'>
              <Text
                backgroundColor='none'
                me={2}
                fontSize='xs'
                color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                fontWeight='bold'
              >
                By {getUserName(data.userRef)}
              </Text>
              <Avatar size='sm' name={getUserName(data.userRef)} src={getUserAvatar(data.userRef)} />
            </Box>
          </Box>
          <Box>
            <Text mt={2} backgroundColor='none' fontSize='2xs' color='neutral.gray' fontWeight='bold'>
              {data.tags.map((item, index) => {
                return (
                  <Box as='span' key={index}>
                    {' '}
                    #{item}
                  </Box>
                );
              })}
            </Text>
          </Box>
          <Box>
            <Text mt={2} backgroundColor='none' fontSize='xs' color='neutral.gray' fontWeight='medium'>
              {data._id && data.desc}
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

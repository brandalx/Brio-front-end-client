import { Box, Container, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function BlogCardMain({ data, getUserName }) {
  const params = useParams();
  return (
    <Link to={'/blog/' + data._id}>
      <Container maxW='1110px' py={30}>
        <Box
          cursor='pointer'
          py={5}
          borderRadius='16px'
          backgroundImage={`url(${data._id && data.coverImg})`}
          backgroundRepeat='no-repeat'
          backgroundSize='cover'
          backgroundPosition='center'
          data-aos='fade-left'
          maxW='1245px'
          h='700px'
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
              fontSize={{ base: 'xl', md: '2xl' }}
              lineHeight={{ base: '40px', md: '50px' }}
              color='white'
              fontWeight='black'
            >
              {data._id && data.title}
            </Text>
            <Text
              backgroundColor='none'
              mt={3}
              ms={5}
              data-aos='fade-up'
              textAlign='center'
              fontSize='xs'
              color='neutral.gray'
              fontWeight='bold'
            >
              {data.tags.map((item, index) => {
                return (
                  <Box as='span' key={index}>
                    {' '}
                    #{item}
                  </Box>
                );
              })}
            </Text>

            <Text
              backgroundColor='none'
              mt={3}
              ms={5}
              data-aos='fade-up'
              textAlign='center'
              fontSize='xs'
              color='white'
              fontWeight='bold'
            >
              {data._id && data.desc}
            </Text>
            <Text
              backgroundColor='none'
              mt={3}
              ms={5}
              data-aos='fade-up'
              textAlign='center'
              fontSize='xs'
              color='white'
              fontWeight='bold'
            >
              By {getUserName(data.userRef)}
            </Text>
          </Flex>
        </Box>
      </Container>
    </Link>
  );
}

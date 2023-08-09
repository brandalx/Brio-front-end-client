import { Box, Text, Flex, Container, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BlogCardMain from '../userComponents/Blogs/BlogCardMain';
import BlogCard from '../userComponents/Blogs/BlogCard';
import { API_URL, TOKEN_KEY, handleApiGet } from '../../services/apiServices';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function Blogs() {
  let [userArr, setUsersArr] = useState([]);
  let [blogsArr, setBlogsArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [rndIndex, setRndIndex] = useState();

  const handleBlogsApi = async () => {
    const url = API_URL + '/blogs';
    const data = await handleApiGet(url);
    setBlogsArr(data);
    const randomIndex = Math.floor(Math.random() * data.length);
    setRndIndex(randomIndex);

    await handleUsersPublicData(data);
    setLoading(false);
  };

  useEffect(() => {
    handleBlogsApi();
  }, []);

  let handleUsersPublicData = async (_data) => {
    try {
      if (_data.length > 0) {
        let allUsers = [];
        const response = await Promise.all(
          _data.map((item) => handleApiGet(`${API_URL}/users/info/public/user/${item.userRef.toString()}`))
        );
        allUsers = [...allUsers, ...response];
        setUsersArr(allUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getUserName = (userid) => {
    try {
      if (Array.isArray(userArr)) {
        const user = userArr.find((item) => item._id === userid);
        if (user) {
          return user.firstname + ' ' + user.lastname;
        }
      }
      return '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  let getUserAvatar = (userid) => {
    try {
      const user = userArr.find((item) => item._id === userid);
      if (user) {
        // check if user exists
        if (user.avatar) {
          // check if avatar exists
          let stringAvatar = API_URL + (API_URL.endsWith('/') ? '' : '/') + user.avatar;
          return stringAvatar;
        } else {
          console.log(`No avatar found for user ${userid}`);
        }
      } else {
        console.log(`No user found for ID ${userid}`);
      }
      return '';
    } catch (error) {
      console.log('Error in getUserAvatar: ', error);
      return '';
    }
  };
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  let getBlogImage = (blogid) => {
    console.log(blogsArr);
    console.log(blogid);
    try {
      const blog = blogsArr.find((item) => item._id === blogid);
      if (blog) {
        // check if blog exists
        if (blog.cover) {
          // check if cover exists
          let stringCover = API_URL + (API_URL.endsWith('/') ? '' : '/') + blog.cover;
          return stringCover;
        } else {
          console.log(`No cover found for blog ${blogid}`);
        }
      } else {
        console.log(`No cover found for ID ${blogid}`);
      }
      return '';
    } catch (error) {
      console.log('Error in getCoverImage: ', error);
      return '';
    }
  };
  return (
    <Container maxW='1110px'>
      <Box py='25px'>
        <Text ms={6} fontWeight='black' color='neutral.black' fontSize='xl'>
          Blogs
        </Text>

        {loading && (
          <>
            <Skeleton borderRadius='16px' isLoaded={!loading} minH='100px' my={2}></Skeleton>
          </>
        )}

        {!loading && localStorage[TOKEN_KEY] && (
          <Box mt={4} px={3}>
            <a href='/blog/create/new'>
              <Box
                style={{ transition: 'all 0.3s' }}
                cursor='pointer'
                borderRadius='16px'
                py={5}
                borderColor='white'
                borderWidth='1px'
                bg='primary.light'
                _hover={{ bg: 'white', borderWidth: '1px', borderColor: 'primary.default', transition: 'all 0.3s' }}
              >
                <Flex justifyContent='space-between' alignItems={{ base: 'none', md: 'center' }}>
                  <Text
                    ms={5}
                    textAlign={{ base: 'center', md: 'start' }}
                    fontSize={{ base: 'sm', md: 'dm' }}
                    color={hovered ? '#4e60ff' : '#4e60ff'}
                    fontWeight='black'
                  >
                    Write your own blog
                  </Text>
                  <Box me={5}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-arrow-big-right-filled'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                      <path
                        d='M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z'
                        strokeWidth='0'
                        fill={hovered ? '#4e60ff' : '#4e60ff'}
                      ></path>
                    </svg>
                  </Box>
                </Flex>
              </Box>
            </a>
          </Box>
        )}

        {!loading && userArr.length > 0 && (
          <Box>
            <BlogCardMain
              getBlogImage={getBlogImage}
              getUserAvatar={getUserAvatar}
              getUserName={getUserName}
              data={blogsArr[rndIndex]}
            />
          </Box>
        )}

        {loading && (
          <>
            <Skeleton borderRadius='16px' isLoaded={!loading} minH='600px' my={2}></Skeleton>
          </>
        )}
        <Box>
          {loading && (
            <>
              <Skeleton borderRadius='16px' isLoaded={!loading} minH='80px' my={2}></Skeleton>
            </>
          )}
          {!loading && (
            <Text fontWeight='extrabold' color='neutral.black' fontSize='sm' ms={6}>
              Other blogs
            </Text>
          )}

          {!loading && (
            <Grid
              w='100%'
              transition='all 0.3s'
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={2}
            >
              {blogsArr.map((item, index) => {
                if (index != 0) {
                  return (
                    <GridItem w='100%' key={index}>
                      <Container maxW={{ base: '390px', sm: '460px', md: '350px', lg: '100%' }}>
                        <BlogCard
                          getBlogImage={getBlogImage}
                          getUserAvatar={getUserAvatar}
                          getUserName={getUserName}
                          index={index}
                          key={index}
                          data={item}
                        />
                      </Container>
                    </GridItem>
                  );
                }
              })}
            </Grid>
          )}

          {loading && (
            <>
              <Grid transition='all 0.3s' templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={2}>
                <GridItem>
                  <Skeleton borderRadius='16px' isLoaded={!loading} minH='300px' my={2}></Skeleton>
                </GridItem>
                <GridItem>
                  <Skeleton borderRadius='16px' isLoaded={!loading} minH='300px' my={2}></Skeleton>
                </GridItem>
                <GridItem>
                  <Skeleton borderRadius='16px' isLoaded={!loading} minH='300px' my={2}></Skeleton>
                </GridItem>
                <GridItem>
                  <Skeleton borderRadius='16px' isLoaded={!loading} minH='300px' my={2}></Skeleton>
                </GridItem>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}

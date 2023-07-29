import { Box, Text, Flex, Container, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BlogCardMain from '../userComponents/Blogs/BlogCardMain';
import BlogCard from '../userComponents/Blogs/BlogCard';
import { API_URL, handleApiGet } from '../../services/apiServices';

export default function Blogs() {
  let [userArr, setUsersArr] = useState([]);
  let [blogsArr, setBlogsArr] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBlogsApi = async () => {
    const url = API_URL + '/blogs';
    const data = await handleApiGet(url);
    setBlogsArr(data);
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

  return (
    <Container maxW='1110px'>
      <Box py='25px'>
        <Text ms={6} fontWeight='extrabold' color='neutral.black' fontSize='sm'>
          Blogs
        </Text>

        {!loading && userArr.length > 0 && (
          <Box>
            <BlogCardMain getUserAvatar={getUserAvatar} getUserName={getUserName} data={blogsArr[0]} />
          </Box>
        )}

        {loading && (
          <>
            <Skeleton borderRadius='16px' isLoaded={!loading} minH='600px' my={2}></Skeleton>
          </>
        )}
        <Box>
          <Text fontWeight='extrabold' color='neutral.black' fontSize='sm' ms={6}>
            Other posts
          </Text>
          <Grid
            transition='all 0.3s'
            gridAutoColumns='1fr'
            gridAutoRows='1fr'
            templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            gap={2}
          >
            {!loading &&
              blogsArr.map((item, index) => {
                if (index != 0) {
                  return (
                    <GridItem key={index}>
                      <BlogCard
                        getUserAvatar={getUserAvatar}
                        getUserName={getUserName}
                        index={index}
                        key={index}
                        data={item}
                      />
                    </GridItem>
                  );
                }
              })}
            {loading && (
              <>
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
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

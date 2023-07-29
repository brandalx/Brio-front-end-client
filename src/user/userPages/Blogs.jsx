import { Box, Text, Flex, Container, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BlogCardMain from '../userComponents/Blog/BlogCardMain';
import BlogCard from '../userComponents/Blog/BlogCard';
import { API_URL, handleApiGet } from '../../services/apiServices';

export default function Blogs() {
  let [userArr, setUsersArr] = useState([]);
  const blogsArrTemp = [
    {
      _id: 1,
      title: 'Best options to choose',
      desc: 'Here we will discuss abest restaurants avible on the market',
      tags: ['food', 'important', 'coolfood'],
      userRef: '64bd10d1eadc7c7f6b71d273',
      coverImg: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 2,
      title: 'Delicious Desserts',
      desc: 'Explore a variety of mouthwatering desserts from around the world.',
      tags: ['food', 'desserts', 'sweettooth'],
      userRef: '64bd0d3d2068b9d62d45bb6d',
      coverImg: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 3,
      title: 'Tasty Street Food',
      desc: 'Discover the best street food vendors offering delectable treats on the go.',
      tags: ['food', 'streetfood', 'snacks'],
      userRef: '64bd11102068b9d62d45bc5c',
      coverImg: 'https://images.pexels.com/photos/1095555/pexels-photo-1095555.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 4,
      title: 'Savory Seafood Dishes',
      desc: 'Dive into a world of flavorful seafood delicacies that will tantalize your taste buds.',
      tags: ['food', 'seafood', 'cuisine'],
      userRef: '64bd16812068b9d62d45bed0',
      coverImg: 'https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 5,
      title: 'Exotic Fruits',
      desc: 'Learn about and savor rare and exotic fruits from different parts of the world.',
      tags: ['food', 'fruits', 'exotic'],
      userRef: '64bd239e2068b9d62d45c0ee',
      coverImg:
        'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      _id: 6,
      title: 'Healthy Salad Recipes',
      desc: 'Discover refreshing and nutritious salad recipes for a guilt-free meal.',
      tags: ['food', 'salad', 'healthyeating'],
      userRef: '64bd28672068b9d62d45c3e1',
      coverImg: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 7,
      title: 'Gourmet Cheese Selection',
      desc: 'Indulge in the world of gourmet cheese and pairings for a delightful experience.',
      tags: ['food', 'cheese', 'gourmet'],
      userRef: '64bd2bcf2068b9d62d45c685',
      coverImg: 'https://images.pexels.com/photos/956723/pexels-photo-956723.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

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

  useEffect(() => {
    handleUsersPublicData(blogsArrTemp);
  }, []);
  return (
    <Container maxW='1110px'>
      <Box py='25px'>
        <Text ms={6} fontWeight='extrabold' color='neutral.black' fontSize='sm'>
          Blogs
        </Text>

        {userArr.length > 0 && (
          <Box>
            <BlogCardMain getUserName={getUserName} data={blogsArrTemp[0]} />
          </Box>
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
            {blogsArrTemp.map((item, index) => {
              return (
                <GridItem key={index}>
                  <BlogCard getUserName={getUserName} index={index} key={index} data={item} />
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

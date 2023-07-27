import { Box, Text, Flex } from '@chakra-ui/react';
import React from 'react';

export default function Blogs() {
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
      userRef: '64bd10d1eadc7c7f6b71d273',
      coverImg: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 3,
      title: 'Tasty Street Food',
      desc: 'Discover the best street food vendors offering delectable treats on the go.',
      tags: ['food', 'streetfood', 'snacks'],
      userRef: '64bd10d1eadc7c7f6b71d273',
      coverImg: 'https://images.pexels.com/photos/1095555/pexels-photo-1095555.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 4,
      title: 'Savory Seafood Dishes',
      desc: 'Dive into a world of flavorful seafood delicacies that will tantalize your taste buds.',
      tags: ['food', 'seafood', 'cuisine'],
      userRef: '64bd10d1eadc7c7f6b71d273',
      coverImg: 'https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 5,
      title: 'Exotic Fruits',
      desc: 'Learn about and savor rare and exotic fruits from different parts of the world.',
      tags: ['food', 'fruits', 'exotic'],
      userRef: '64bd10d1eadc7c7f6b71d273',
      coverImg: 'https://images.pexels.com/photos/2352801/pexels-photo-2352801.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 6,
      title: 'Healthy Salad Recipes',
      desc: 'Discover refreshing and nutritious salad recipes for a guilt-free meal.',
      tags: ['food', 'salad', 'healthyeating'],
      userRef: '64bd10d1eadc7c7f6b71d273',
      coverImg: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      _id: 7,
      title: 'Gourmet Cheese Selection',
      desc: 'Indulge in the world of gourmet cheese and pairings for a delightful experience.',
      tags: ['food', 'cheese', 'gourmet'],
      userRef: '64bd10d1eadc7c7f6b71d273',
      coverImg: 'https://images.pexels.com/photos/956723/pexels-photo-956723.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
  return (
    <Box>
      <Text>Blogs</Text>

      <Box>main content</Box>
      <Box>default content</Box>
    </Box>
  );
}

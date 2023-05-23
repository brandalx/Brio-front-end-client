// CategoryMenu.js

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  GridItem,
  Heading,
  Text,
  useMediaQuery,
  useDisclosure,
  Skeleton
} from '@chakra-ui/react';
import '../../../css/global.css';
import AddPlus from '../../../assets/svg/AddPlus';
import theme from '../../../utils/theme';
import ModalRestaurantMenu from './ModalRestaurantMenu';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import ModalNewCategory from './ModalNewCategory';

export default function CategoryMenu({ selectedCategory, onCategoryChange, categoryCounts }) {
  const [loading, setLoading] = useState(true);
  const [isTablet] = useMediaQuery('(max-width: 992px)');
  const [isMobile] = useMediaQuery('(max-width: 576px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await handleApiGet(API_URL + '/categories');
      setCategories(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    onCategoryChange(category.categoryName);
    setSelectedItem(category._id);
  };

  return (
    <GridItem width='100%' overflow='hidden' colSpan={4}>
      <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'>
        Category menu
      </Text>
      <Skeleton minH='60px' borderRadius='16px' isLoaded={!loading}>
        <Box display='flex' flexWrap='wrap' style={{ backfaceVisibility: 'initial' }}>
          {categories.map((element) => (
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
              key={element._id}
              ml={isMobile ? 0 : isTablet ? '8px' : 0}
              mr={isMobile ? 0 : isTablet ? '8px' : 0}
              width={isMobile ? '100%' : isTablet ? '46%' : '100%'}
              mb='12px'
              p='10px'
              border='2px'
              borderRadius='16px'
              cursor='pointer'
              bg={selectedItem === element._id ? theme.colors.primary.light : 'white'}
              borderColor={
                selectedItem === element._id ? theme.colors.primary.default : theme.colors.neutral.grayLightest
              }
              _hover={{
                borderColor: theme.colors.primary.default,
                transition: '450ms',
                bg: theme.colors.primary.light
              }}
              onClick={() => handleCategoryClick(element)}
              maxH='72px'
            >
              <Heading fontSize='2xs' fontWeight='bold' color='neutral.black'>
                {element.categoryName}
              </Heading>
              <Text fontSize='13px' mt='6px' fontWeight='regular' color='neutral.grayDark'>
                {categoryCounts[element.categoryName] || 0} {/* Исправление здесь */}
              </Text>
            </Box>
          ))}
        </Box>
      </Skeleton>

      <Divider mt='21px' />
      <Box width='100%' gap='4' mt='20px' display='flex' justifyContent='space-between'>
        <Box width='100%' px='5px' border='1px solid #EDEEF2' borderRadius='16px' display='flex' flexDirection='column'>
          <ModalNewCategory
            fetchCategories={fetchCategories}
            setCategories={setCategories}
            width='100%'
            display='flex'
            flexDirection='column'
            h='70px'
          />
        </Box>
        <Box width='100%' border='1px solid #EDEEF2' borderRadius='16px'>
          <Button onClick={onOpen} width='100%' display='flex' flexDirection='column' h='70px'>
            <AddPlus />
            <Text mt='6px'>New meal item</Text>
          </Button>
        </Box>
      </Box>
      <ModalRestaurantMenu categoryName={selectedCategory} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </GridItem>
  );
}

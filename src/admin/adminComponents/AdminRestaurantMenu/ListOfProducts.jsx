import React, { useEffect, useState } from 'react';
import {
  Box,
  GridItem,
  Text,
  Image,
  Heading,
  Divider,
  Button,
  useBreakpointValue,
  useMediaQuery,
  useDisclosure
} from '@chakra-ui/react';
import theme from '../../../utils/theme';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import ModalTextRedactor from './ModalTextRedactor';
import DragAndDrop from '../../../assets/svg/DragAndDrop';
import Pen from '../../../assets/svg/Pen';
import Copy from '../../../assets/svg/Copy';
import TrashBox from '../../../assets/svg/TrashBox';

export default function ListOfProducts({ selectedCategory }) {
  const gridColumns = useBreakpointValue({ base: '1fr', md: '1fr 4fr' });
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [isTablet] = useMediaQuery('(max-width: 767px)');
  const [isDek] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await handleApiGet(API_URL + '/products?categoryName=' + selectedCategory);
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  return (
    <GridItem colSpan={8}>
      <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'>
        {selectedCategory === null ? 'Breakfast menu' : selectedCategory}
      </Text>
      {products
        .filter((catName) => catName.categoryName === selectedCategory)
        .map((item) => (
          <Box
            key={item._id}
            display='flex'
            flexDirection={isTablet ? 'column' : 'row'}
            mt='30px'
            flexWrap='wrap'
            borderRadius='16px'
            p={isTablet ? '8px' : '16px 16px 16px 12px'}
            border='1px'
            borderColor='neutral.grayLightest'
            gap='12px'
            gridTemplateColumns={gridColumns}
          >
            <Box
              gap={3}
              display='flex'
              flexDirection={isTablet ? 'row' : 'row'}
              alignItems='start'
              mb={['16px', '16px', 0]}
            >
              <Box
                flexShrink={0}
                width={isMobile ? '200px' : '72px'}
                height='72px'
                borderRadius='20px'
                overflow='hidden'
              >
                <Image width='100%' height='100%' src={item.image} objectFit='cover' objectPosition='center' />
              </Box>
              <Box flexDirection='column' display='flex' ml={[3, 3, 0]} alignItems='center'>
                <Box display='flex' alignItems='start' flexDirection='column'>
                  <Heading fontSize='2xs' lineHeight='24px' fontWeight='bold' color='neutral.black'>
                    {item.title}
                  </Heading>
                  <Box display='flex' alignItems='start'>
                    <Box fontSize='2xs'>{item.description}</Box>
                    {isDek && (
                      <Box alignItems='center' justifyContent='center' display='flex' gap={3}>
                        <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                          ${item.price}
                        </Text>
                        <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest' />
                        <Button onClick={onOpen}>
                          <Pen />
                        </Button>
                        <Copy />
                        <TrashBox />
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box w='100%' display={isMobile ? 'flex' : 'block'} flexDirection='column'>
                  <Divider mt='20px' mb='16px' />
                  <Box
                    display='flex'
                    flexDirection={isMobile ? 'row' : isTablet ? 'row' : 'row'}
                    justifyContent='space-between'
                  >
                    <Box display='flex' flexDirection='column' mb={['16px', '16px', 0]}>
                      <Heading fontSize='2xs' lineHeight='24px' fontWeight='bold' color='neutral.black'>
                        Ingredients
                      </Heading>
                      <Text fontSize='13px' color='neutral.grayDark'>
                        {item.ingredients}
                      </Text>
                    </Box>
                    <Box p='5px'>
                      <Heading fontSize='' lineHeight='24px' fontWeight='bold'>
                        Nutritional value
                      </Heading>
                      <Text fontSize='13px' color='neutral.grayDark'>
                        {item.nutritionals}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <ModalTextRedactor
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  title={item.title}
                  item={item}
                  description={item.description}
                />
              </Box>
            </Box>
            {isTablet && (
              <Box alignItems='center' justifyContent='center' display='flex' gap={3}>
                <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                  ${item.price}
                </Text>
                <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest' />
                <Button onClick={onOpen}>
                  <Pen />
                </Button>
                <Copy />
                <TrashBox />
              </Box>
            )}
          </Box>
        ))}
    </GridItem>
  );
}

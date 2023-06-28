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
  useMediaQuery
} from '@chakra-ui/react';
import theme from '../../../utils/theme';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import { handleApiDelete } from '../../../services/apiServices';
import ModalTextRedactor from './ModalTextRedactor';
import Pen from '../../../assets/svg/Pen';
import Copy from '../../../assets/svg/Copy';
import TrashBox from '../../../assets/svg/TrashBox';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function ListOfProducts({ selectedCategory, categoryCounts, setCategoryCounts }) {
  const gridColumns = useBreakpointValue({ base: '1fr', md: '1fr 4fr' });
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  const [isTablet] = useMediaQuery('(max-width: 767px)');
  const [isTabletMinMax] = useMediaQuery('(min-width: 576px) and (max-width: 767px)');
  const [isDek] = useMediaQuery('(min-width: 768px)');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initialCategory, setInitialCategory] = useState('');
  const [userId, setUserId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await handleApiGet(`${API_URL}/admin/products?categoryName=${selectedCategory}`);
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
    }
  };

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem('x-api-key');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token
        }
      });

      setRestaurantId(response.data.restaurant);
      setUserId(userId);

      console.log(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  };

  const removeProductFromRestaurant = async (productId) => {
    try {
      const token = localStorage.getItem('x-api-key');

      const response = await axios.put(`${API_URL}/restaurants/${restaurantId}/product/remove`, { productId }, {
        headers: {
          'x-api-key': token,
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        throw new Error('Ошибка при удалении продукта из ресторана');
      }

    } catch (error) {
      console.error('Ошибка при удалении продукта из ресторана:', error);
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem('x-api-key');

    try {
      await removeProductFromRestaurant(productId);

      const response = await axios.delete(`${API_URL}/admin/products/${productId}`, {
        headers: {
          'x-api-key': token,
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        throw new Error('Ошибка при удалении продукта');
      }

      await fetchProducts();
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  };


  const updateCategoryCounts = () => {
    const counts = {};

    products.forEach((item) => {
      const { categoryName } = item;
      setInitialCategory(categoryName);
      counts[categoryName] = counts[categoryName] ? counts[categoryName] + 1 : 1;
    });

    setCategoryCounts(counts);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    updateCategoryCounts();
    fetchAdmin();
  }, [products]);

  const handleTrashClick = (productId) => {
    deleteProduct(productId);
  };

  return (
    <GridItem colSpan={8}>
      <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'>
        {selectedCategory === null ? '' : selectedCategory}
      </Text>
      {products
        .filter((item) => item.categoryName === selectedCategory && item.restaurantRef === restaurantId)
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
            <Box display={isDek ? 'flex' : 'none'}>
              <Image
                width='72px'
                height='72px'
                borderRadius='16px'
                src={item.image}
                objectFit='cover'
                objectPosition='center'
              />
            </Box>
            <Box flex='1'>
              <Box flexDirection='row' display='flex' ml={[3, 3, 0]} justifyContent='space-between' alignItems='start'>
                <Box display={isMobile ? 'flex' : 'none'}>
                  <Box mr='12px'>
                    <Image
                      minW='72px'
                      minH='72px'
                      maxW='72px'
                      maxH='72px'
                      borderRadius='16px'
                      src={item.image}
                      objectFit='cover'
                      objectPosition='center'
                    />
                  </Box>
                </Box>
                <Box display='flex' alignItems='start' flexDirection={isTabletMinMax ? 'row' : 'column'}>
                  <Box display={isTabletMinMax ? 'flex' : 'none'}>
                    <Box mr='12px'>
                      <Image
                        minWidth='72px'
                        minHeight='72px'
                        maxWidth='72px'
                        maxHeight='72px'
                        borderRadius='16px'
                        src={item.image}
                        objectFit='cover'
                        objectPosition='center'
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Heading fontSize='2xs' lineHeight='24px' fontWeight='bold' color='neutral.black'>
                      {item.title}
                    </Heading>
                    <Box fontSize='2xs'>{item.description}</Box>
                  </Box>
                </Box>
                {isDek && (
                  <Box alignItems='center' justifyContent='center' display='flex' gap={3}>
                    <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                      ${item.price}
                    </Text>
                    <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest' />
                    <Button onClick={() => setSelectedProduct(item)}>
                      <Pen />
                    </Button>
                    <Copy />
                    <Button onClick={() => handleTrashClick(item._id)}>
                      <TrashBox />
                    </Button>
                  </Box>
                )}
              </Box>
              {isTablet && (
                <Box display='flex' alignItems='center' justifyContent='space-evenly' flex='1'>
                  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                    ${item.price}
                  </Text>
                  <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest' />
                  <Button onClick={() => setSelectedProduct(item)}>
                    <Pen />
                  </Button>
                  <Copy />
                  <Button onClick={() => handleTrashClick(item._id)}>
                    <TrashBox />
                  </Button>
                </Box>
              )}
              <Divider mt='20px' mb='16px' />
              {selectedProduct === item && (
                <ModalTextRedactor isOpen={true} onClose={() => setSelectedProduct(null)} item={item} />
              )}
              <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Box mb={['16px', '16px', 0]}>
                  <Heading fontSize='2xs' lineHeight='24px' fontWeight='bold' color='neutral.black'>
                    Ingredients
                  </Heading>
                  <Text fontSize='13px' color='neutral.grayDark'>
                    {item.ingredients.join(', ')}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize='' lineHeight='24px' fontWeight='bold'>
                    Nutritional value
                  </Heading>
                  <Text fontSize='13px' color='neutral.grayDark'>
                    {item.nutritionals.join(', ')}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
    </GridItem>
  );
}

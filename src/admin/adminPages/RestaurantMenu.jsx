import React, { useEffect, useState } from 'react';

import CategoryMenu from '../adminComponents/AdminRestaurantMenu/CategoryMenu';
import ListOfProducts from '../adminComponents/AdminRestaurantMenu/ListOfProducts';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { API_URL, handleApiGet, TOKEN_KEY } from '../../services/apiServices';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCheckToken } from '../../services/token';

export default function RestaurantMenu() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (decodedToken.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [navigate, token]);

  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('Choose category');
  const [categoryCounts, setCategoryCounts] = useState({});
  const [restaurantId, setRestaurantId] = useState();

  const fetchRestaurant = async () => {
    try {
      const response = await handleApiGet(API_URL + '/admin/restaurants');
      return response;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw error;
    }
  };
  const fetchRestaurantData = async () => {
    try {
      const token = localStorage.getItem('x-api-key');

      const decodedToken = jwtDecode(token);

      const userId = decodedToken._id;

      const adminResponse = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token
        }
      });

      setRestaurantId(adminResponse.data.restaurant);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const fetchCategories = async () => {
    try {
      const restaurants = await fetchRestaurant();
      let allCategories = [];
      for (let restaurant of restaurants) {
        if (
          restaurant &&
          restaurant.categories &&
          restaurant.categories.length > 0 &&
          restaurant._id === restaurantId
        ) {
          const response = await Promise.all(
            restaurant.categories.map((id) => handleApiGet(`${API_URL}/admin/categories/${id.toString()}`))
          );
          // Фильтрация категорий по restaurantRef и restaurantId
          const filteredCategories = response.filter((category) => category.restaurantRef?.$oid === restaurantId);
          allCategories = [...allCategories, ...filteredCategories];
        }
      }
      setCategories(allCategories);
      setSelectedCategory(allCategories.length > 0 ? allCategories[0].name : null);
      return allCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (categories) => {
    try {
      let productsByCategory = {};
      let newCategoryCounts = { ...categoryCounts };
      for (let category of categories) {
        if (category && category.ItemsId && category.ItemsId.length > 0) {
          const response = await Promise.all(
            category.ItemsId.map((id) => handleApiGet(`${API_URL}/admin/products/${id}`))
          );
          // Фильтрация продуктов по restaurantRef и restaurantId
          const filteredProducts = response.filter((product) => product.restaurantRef?.$oid === restaurantId);
          productsByCategory[category._id] = filteredProducts;

          // Обновляем подсчеты для этого ресторана
          newCategoryCounts[restaurantId] = newCategoryCounts[restaurantId] || {};
          newCategoryCounts[restaurantId][category._id] = filteredProducts.length;
        }
      }
      setProductsByCategory(productsByCategory);
      setCategoryCounts(newCategoryCounts);
      console.log('newCategoryCounts: ', newCategoryCounts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      await fetchProducts(categories);
    };
    fetchData();
  }, []);

  const fetchProductsForCategory = async (category) => {
    try {
      const response = await handleApiGet(`${API_URL}/admin/products?category=${category}`);
      setProductsByCategory((prevProductsByCategory) => ({ ...prevProductsByCategory, [category]: response }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Загружаем продукты, если они еще не были загружены
    if (!productsByCategory[category]) {
      fetchProductsForCategory(category);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsForCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <Container maxW='1110px' pb='50px'>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1.3fr 3fr' }} gap={6}>
        <GridItem w='100%'>
          <CategoryMenu
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categoryCounts={categoryCounts[restaurantId] || {}} // Add default value here
          />
        </GridItem>
        <GridItem w='100%'>
          <ListOfProducts
            categories={categories}
            products={productsByCategory[selectedCategory]}
            selectedCategory={selectedCategory}
            categoryCounts={categoryCounts[restaurantId] || {}} // Add default value here
            setCategoryCounts={setCategoryCounts}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}

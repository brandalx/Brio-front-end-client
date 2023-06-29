import React, { useEffect, useState } from 'react';

import CategoryMenu from '../adminComponents/AdminRestaurantMenu/CategoryMenu';
import ListOfProducts from '../adminComponents/AdminRestaurantMenu/ListOfProducts';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { API_URL, handleApiGet } from '../../services/apiServices';

export default function RestaurantMenu() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('Choose category');
  const [categoryCounts, setCategoryCounts] = useState({});

  const fetchRestaurant = async () => {
    try {
      const response = await handleApiGet(API_URL + '/admin/restaurants');
      return response;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw error;
    }
  };

  const fetchCategories = async () => {
    try {
      const restaurants = await fetchRestaurant();
      let allCategories = [];
      for (let restaurant of restaurants) {
        if (restaurant && restaurant.categories && restaurant.categories.length > 0) {
          const response = await Promise.all(
            restaurant.categories.map((id) => handleApiGet(`${API_URL}/admin/categories/${id.toString()}`))
          );
          allCategories = [...allCategories, ...response];
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
      for (let category of categories) {
        if (category && category.ItemsId && category.ItemsId.length > 0) {
          const response = await Promise.all(
            category.ItemsId.map((id) => handleApiGet(`${API_URL}/admin/products/${id}`))
          );
          productsByCategory[category._id] = response;
        }
      }
      setProductsByCategory(productsByCategory);
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

  // Загружаем продукты для первой категории, если она определена
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
            categoryCounts={categoryCounts}
          />
        </GridItem>
        <GridItem w='100%'>
          <ListOfProducts
            categories={categories}
            products={productsByCategory[selectedCategory]}
            selectedCategory={selectedCategory}
            categoryCounts={categoryCounts}
            setCategoryCounts={setCategoryCounts}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}

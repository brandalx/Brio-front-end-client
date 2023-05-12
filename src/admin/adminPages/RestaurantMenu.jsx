import React, { useState } from 'react';

import CategoryMenu from '../adminComponents/AdminRestaurantMenu/CategoryMenu';
import ListOfProducts from '../adminComponents/AdminRestaurantMenu/ListOfProducts';
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';

export default function RestaurantMenu() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <Container maxW='1110px'>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1.3fr 3fr' }} gap={6}>
                <GridItem w='100%'>
                    <CategoryMenu selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
                </GridItem>
                <GridItem w='100%'>
                    <ListOfProducts selectedCategory={selectedCategory} />
                </GridItem>
            </Grid>
        </Container>
    );
}

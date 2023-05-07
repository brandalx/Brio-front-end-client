import React from 'react';
import CategoryMenu from "../adminComponents/AdminRestaurantMenu/CategoryMenu";
import ListOfProducts from "../adminComponents/AdminRestaurantMenu/ListOfProducts";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";

export default function RestaurantMenu() {
    return (
        <Container maxW='1110px'>
            <Grid templateColumns={{ sm: 'repeat(4, 1fr)', md: 'repeat(8, 1fr)' }} gap={6}>
                <GridItem colSpan={{ sm: 4, md: 2 }}>
                    <CategoryMenu />
                </GridItem>
                <GridItem colSpan={{ sm: 4, md: 6 }}>
                    <ListOfProducts />
                </GridItem>
            </Grid>
        </Container>
    );
}

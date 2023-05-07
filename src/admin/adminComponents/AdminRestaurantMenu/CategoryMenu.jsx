import React from 'react';
import {Box, Button, Divider, GridItem, Heading, Text} from "@chakra-ui/react";
import AddPlus from "../../../assets/svg/AddPlus";
import theme from '../../../utils/theme'
export default function CategoryMenu() {
    const arr = [{tittle: 'Breakfast menu', amount: 17}, {tittle: 'Lunch menu', amount: 27}, {
        tittle: 'Dinner menu',
        amount: 12
    }, {tittle: 'Drinks menu', amount: 15}]
    return (
        <GridItem colSpan={4}>
            <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'>Category menu</Text>
                {arr.map(element => {
                    return (<Box borderRadius='16px' mb='12px' p='10px' border='1px solid #EDEEF2'>
                        <Heading fontSize='2xs' fontWeight={theme.fontWeights.bold} color={theme.colors.neutral.black}>
                            {element.tittle}
                        </Heading>
                        <Text fontSize='13px' mt='6px' fontWeight='extrabold' color='neutral.grayDark'>
                            {element.amount}
                        </Text>
                    </Box>)

                })}

            <Divider mt='21px'/>
            <Box mt='20px' display='flex' justifyContent='space-between'>
                <Box px='5px' border='1px solid #EDEEF2' borderRadius='16px' display='flex' flex-direction='column'>
                    <Button  width='95%' display='flex' flexDirection='column' h='72px'>
                        <AddPlus/>
                        <Text mt='6px'>
                            New category
                        </Text>
                    </Button>
                </Box>
                <Box border='1px solid #EDEEF2' borderRadius='16px'>
                    <Button  width='95%' display='flex' flexDirection='column' h='72px'>
                        <AddPlus/>
                        <Text mt='6px'>
                            New meal item
                        </Text>
                    </Button>
                </Box>
            </Box>
        </GridItem>
    );
}

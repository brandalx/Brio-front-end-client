import React from 'react';
import {Box, Button, Divider, GridItem, Heading, Text, useMediaQuery} from "@chakra-ui/react";
import AddPlus from "../../../assets/svg/AddPlus";
import theme from '../../../utils/theme';

export default function CategoryMenu() {
    const arr = [{id: 1, title: 'Breakfast menu', amount: 17}, {id: 2, title: 'Lunch menu', amount: 27}, {
        id: 3,
        title: 'Dinner menu',
        amount: 12
    }, {title: 'Drinks menu', amount: 15}];

    const [isTablet] = useMediaQuery("(max-width: 992px)");
    const [isMobile] = useMediaQuery("(max-width: 576px)");

    return (
        <GridItem colSpan={4}>
            <Text mb='16px' fontSize='sm' fontWeight={theme.fontWeights.semibold} color='neutral.black'>Category
                menu</Text>

            <Box display='flex' flexWrap='wrap'>
                {arr.map(element => {
                    return (
                        <Box ml={isMobile ? 0  : (isTablet ? '16px' : 0)} key={element.id} width={isMobile ? '100%' : (isTablet ? '46%' : '100%')} mb='12px' p='10px'
                             border='1px solid #EDEEF2' borderRadius='16px'>
                            <Heading fontSize='2xs' fontWeight={theme.fontWeights.bold}
                                     color={theme.colors.neutral.black}>
                                {element.title}
                            </Heading>
                            <Text fontSize='13px' mt='6px' fontWeight='extrabold' color='neutral.grayDark'>
                                {element.amount}
                            </Text>
                        </Box>
                    )
                })}
            </Box>

            <Divider mt='21px'/>
            <Box gap={isTablet ? 4 : 0} mt='20px' display='flex' justifyContent='space-between'>
                <Box width={isTablet ? '100%' : ''} px='5px' border='1px solid #EDEEF2'
                     borderRadius='16px'
                     display='flex' flex-direction='column'>
                    <Button width='95%' display='flex' flexDirection='column' h='72px'>
                        <AddPlus/>
                        <Text mt='6px'>
                            New category
                        </Text>
                    </Button>
                </Box>
                <Box width={isTablet ? '100%' : ''} border='1px solid #EDEEF2' borderRadius='16px'>
                    <Button width='95%' display='flex' flexDirection='column' h='72px'>
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

import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Image, Text, Grid, Divider} from "@chakra-ui/react";
import {API_URL, handleApiGet} from "../../../services/apiServices";
import ValidThrough from "../../../assets/svg/ValidThrough";
import Location from "../../../assets/svg/Location";

export default function PromotionBlocks() {
    const [promotions, setPromotion] = useState([]);
    const fetchPromotions = async () => {
        try {
            const response = await handleApiGet(API_URL + '/admin/promotions');
            console.log(response);
            setPromotion(response);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    return (
        <Box>
            <Container maxW='1110px'>
                <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
                    {promotions.map((promotion, index) => {
                        return (
                            <Box key={index} display='flex' justifyContent='space-between' flexDirection='column'
                                 borderRadius='16px' border='1px' borderColor='neutral.grayLight' p='16px'>
                                <Box display='flex' justifyContent='space-between'>
                                    <Box marginRight='10px'>
                                        <Box textAlign='center' border='1px' borderRadius='full' width='53px'
                                             height='24px' borderColor='success.default'>
                                            <Text color='success.default' fontWeight='semibold' p='3px'
                                                  fontSize='3xs'>Active</Text>
                                        </Box>
                                        <Text fontWeight='bold' fontSize='2xs'>
                                            {promotion.discountDetails}
                                        </Text>
                                    </Box>
                                    <Image
                                        width='112px'
                                        height='92px'
                                        borderRadius='16px'
                                        src={promotion.image}
                                        objectFit='cover'
                                        objectPosition='center'
                                    />
                                </Box>
                                <Divider mt='10px' mb='8px'/>
                                <Box display='flex' flexDirection='column'>
                                    <Box>
                                        <Box display='flex' flexDirection='row' alignItems='center' mt='4px'>
                                            <ValidThrough/>
                                            <Text marginLeft='6px' color='neutral.gray' fontSize='3xs'
                                                  fontWeight='semibold'>Valid through</Text>
                                        </Box>
                                        <Text color='neutral.black'
                                              fontSize='2.5xs'>{promotion.availableDate} {promotion.discountDays.length > 0 ? "(" + promotion.discountDays.join(', ') + " only)" : ''}</Text>
                                    </Box>
                                    <Box>
                                        <Box display='flex' flexDirection='row' alignItems='center' mt='4px'>
                                            <Location w={12} h={12}/>
                                            <Text marginLeft='6px' color='neutral.gray' fontSize='3xs'
                                                  fontWeight='semibold'>Restaurant</Text>
                                        </Box>
                                        <Text color='neutral.black'>{promotion.restaurantName}</Text>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    );
}

import React, { useState } from 'react';

import {Box, Button, Container, Text} from "@chakra-ui/react";
import ModalCreatePromotion from "./ModalCreatePromotion";

export default function PromotionsHeader({modal}) {
    const [active, setActive] = useState('active');

    return (
        <Box>
            <Container maxW='1110px'>
                <Box display='flex' justifyContent='space-between' fontSize='sm' color='neutral.black' fontWeight='semibold'>
                    <Text>Restaurant promotions</Text>
                    <Button
                        mt={{ base: '10px', md: '0px' }}
                        w={{ base: '50%', md: 'initial' }}
                        background='primary.default'
                        fontWeight='bold'
                        variant='solid'
                        color='neutral.white'
                        borderWidth='1px'
                        borderColor='neutral.white'
                        _hover={{
                            background: 'neutral.white',
                            color: 'primary.default',
                            borderWidth: '1px',
                            borderColor: 'primary.default'
                        }}
                        width='150px'
                        height='44px'
                        onClick={()=>{}}
                    >
                        Create promotion
                    </Button>
                    <ModalCreatePromotion isOpen={true}/>
                </Box>
                <Box backgroundColor='neutral.grayLightest' borderRadius='6px' mb='16px' mt='16px' pt='7px' pb='7px' display='flex' justifyContent='space-around'>
                    <Button fontWeight='bold' fontSize='2xs' ml='4px' p='13px' w='100%' h='100%' color={active === 'active' ? 'white' : 'neutral.grayDark'} backgroundColor={active === 'active' ? 'neutral.black' : 'primary.grayLightest'} onClick={() => setActive('active')}>Active</Button>
                    <Button fontWeight='bold' fontSize='2xs' p='13px' w='100%' h='100%' color={active === 'scheduled' ? 'white' : 'neutral.grayDark'} backgroundColor={active === 'scheduled' ? 'neutral.black' : 'primary.grayLightest'} onClick={() => setActive('scheduled')}>Scheduled</Button>
                    <Button fontWeight='bold' fontSize='2xs' mr='4px' p='13px' w='100%' h='100%' color={active === 'expired' ? 'white' : 'neutral.grayDark'} backgroundColor={active === 'expired' ? 'neutral.black' : 'primary.grayLightest'} onClick={() => setActive('expired')}>Expired</Button>
                </Box>
            </Container>
        </Box>
    );

}

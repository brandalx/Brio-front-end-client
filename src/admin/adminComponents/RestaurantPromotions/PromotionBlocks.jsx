import React, {useState} from 'react';

import {Box, Button, Container, Text} from "@chakra-ui/react";

export default function PromotionBlocks() {
    const [active, setActive] = useState(true);

    return (
        <Box>
            <Container maxW='1110px'>
                <Box display='flex' justifyContent='space-between' fontSize='sm' color='neutral.black'
                     fontWeight='semibold'>

                </Box>
            </Container>
        </Box>
    );

}

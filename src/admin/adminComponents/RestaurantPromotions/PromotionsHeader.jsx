import React, { useState } from 'react';

import { Box, Button, Container, Text, useDisclosure } from '@chakra-ui/react';
import ModalCreatePromotion from './ModalCreatePromotion';

export default function PromotionsHeader({ active, setActive }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            onClick={onOpen}
          >
            Create promotion
          </Button>
          <ModalCreatePromotion isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Box>
        <Box
          backgroundColor='neutral.grayLightest'
          borderRadius='6px'
          mb='16px'
          mt='16px'
          pt='7px'
          pb='7px'
          display='flex'
          justifyContent='space-around'
        >
          <Button
            fontWeight='bold'
            fontSize='2xs'
            ml='4px'
            p='13px'
            w='100%'
            h='100%'
            color={active === 'Active' ? 'white' : 'neutral.grayDark'}
            backgroundColor={active === 'Active' ? 'neutral.black' : 'primary.grayLightest'}
            onClick={() => setActive('Active')}
          >
            Active
          </Button>
          <Button
            fontWeight='bold'
            fontSize='2xs'
            p='13px'
            w='100%'
            h='100%'
            color={active === 'Scheduled' ? 'white' : 'neutral.grayDark'}
            backgroundColor={active === 'Scheduled' ? 'neutral.black' : 'primary.grayLightest'}
            onClick={() => setActive('Scheduled')}
          >
            Scheduled
          </Button>
          <Button
            fontWeight='bold'
            fontSize='2xs'
            mr='4px'
            p='13px'
            w='100%'
            h='100%'
            color={active === 'Expired' ? 'white' : 'neutral.grayDark'}
            backgroundColor={active === 'Expired' ? 'neutral.black' : 'primary.grayLightest'}
            onClick={() => setActive('Expired')}
          >
            Expired
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

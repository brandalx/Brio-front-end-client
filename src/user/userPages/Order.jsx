import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  CSSReset,
  Text,
  GridItem,
  VStack,
  Image,
  useMediaQuery,
  Stack,
  Divider,
  Icon,
  Skeleton
} from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaChevronLeft } from 'react-icons/fa';

import ImageGallery from 'react-image-gallery';
import ProductCard from '../userComponents/RestaurantPage/ProductCard';
import { Link } from 'react-router-dom';
import { API_URL, handelApiGet } from '../../services/apiServices';
import Menu from '../userComponents/Order/Menu';
import Pickup from '../userComponents/Cart/Pickup';
import PaymentDetails from '../userComponents/Order/PaymentDetails';
import OrderStatus from '../../assets/svg/OrderStatus';
export default function Order() {
  const [placed, setPlaces] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [delivered, setDelivered] = useState(false);

  return (
    <Box>
      <Container maxW='1110px'>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          My cart
        </Text>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '2fr 1fr' }} gap={5}>
          <GridItem w='100%'>
            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                Order status
              </Text>

              <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr 1fr' }} gap={6}>
                <GridItem w='100%' h='10' bg='blue.500'>
                  <Box>
                    <OrderStatus istrue={placed} number={1} />
                    Order placed <br /> 23:14
                  </Box>
                </GridItem>
                <GridItem w='100%' h='10' bg='blue.500'>
                  <Box>
                    <OrderStatus istrue={prepared} number={2} />
                    Order being prepared <br /> 23:23
                  </Box>
                </GridItem>
                <GridItem w='100%' h='10' bg='blue.500'>
                  <Box>
                    <OrderStatus istrue={delivery} number={3} />
                    Out for delivery <br />
                    23:39
                  </Box>
                </GridItem>
                <GridItem w='100%' h='10' bg='blue.500'>
                  <Box>
                    <OrderStatus istrue={delivered} number={4} />
                    Delivered <br />
                    23:57 approx
                  </Box>
                </GridItem>
              </Grid>
            </Box>

            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                Menu 4 meals
              </Text>

              <Box pt={5}>
                <Menu />
                <Menu />
                <Menu />
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%'>
            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                Shipping address
              </Text>
              <Pickup />
            </Box>
            <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px' my={5}>
              <PaymentDetails />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

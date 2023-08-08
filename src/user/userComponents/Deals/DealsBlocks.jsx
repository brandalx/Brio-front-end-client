import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Image, Text, Grid, Divider, Skeleton } from '@chakra-ui/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ValidThrough from '../../../assets/svg/ValidThrough.jsx';
import Location from '../../../assets/svg/Location.jsx';
import { API_URL, handleApiGet } from '../../../services/apiServices.js';
import { Link } from 'react-router-dom';

export default function DealsBlocks() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchdeals = async () => {
    setLoading(true);
    try {
      const response = await handleApiGet(API_URL + '/admin/promotions');
      console.log(response);
      setDeals(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  function getdealstatus(startDate, endDate) {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return 'Scheduled';
    } else if (now > end) {
      return 'Expired';
    } else {
      return 'Active';
    }
  }

  useEffect(() => {
    fetchdeals();
  }, []);

  function formatDate(dateString) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]}, ${year}`;
  }

  return (
    <Box>
      <Container maxW='1110px'>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
          {deals.length > 0 &&
            deals.map((promotion, index) => (
              <Box key={index} data-aos='fade-up'>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  flexDirection='column'
                  borderRadius='16px'
                  border='1px'
                  transition='all 0.3s'
                  borderColor='neutral.grayLight'
                  _hover={{
                    borderColor: 'primary.default',
                    transition: 'all 0.3s',
                    bg: () => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.light')
                  }}
                  p='16px'
                >
                  <Link to={`/restaurant/${promotion.restaurantRef}`}>
                    <Box display='flex' justifyContent='space-between'>
                      <Box marginRight='10px' maxW='50%'>
                        <Box
                          textAlign='center'
                          border='1px'
                          borderRadius='full'
                          width='53px'
                          height='24px'
                          borderColor='success.default'
                        >
                          <Text color='success.default' fontWeight='semibold' p='3px' fontSize='3xs'>
                            Active
                          </Text>
                        </Box>
                        <Text
                          color={localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.grayDark'}
                          fontWeight='bold'
                          fontSize='2xs'
                        >
                          {promotion.discountDetails}
                        </Text>
                      </Box>
                      {/* <Image
                      width='112px'
                      height='92px'
                      src={promotion.image}
                      objectFit='cover'
                      borderRadius='16px' objectPosition='center' 
                    /> */}
                      <Box minH='92px' objectFit='cover' borderRadius='16px' width='100%'>
                        <LazyLoadImage
                          style={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '16px' }}
                          width='100%'
                          height='100%'
                          alt={`Lazy loaded image number ${index}`}
                          src={promotion.image}
                          effect='blur'
                        />
                      </Box>
                    </Box>
                    <Divider mt='10px' mb='8px' />
                    <Box display='flex' flexDirection='column'>
                      <Box>
                        <Box display='flex' flexDirection='row' alignItems='center' mt='4px'>
                          <ValidThrough />
                          <Text marginLeft='6px' color='neutral.gray' fontSize='3xs' fontWeight='semibold'>
                            Valid through
                          </Text>
                        </Box>
                        <Text color='neutral.black' fontSize='2.5xs'>
                          {formatDate(promotion.startDate)} – {formatDate(promotion.endDate)}
                          {promotion.discountDays.length > 0 ? '(' + promotion.discountDays.join(', ') + ' only)' : ''}
                        </Text>
                      </Box>
                      <Box>
                        <Box display='flex' flexDirection='row' alignItems='center' mt='4px'>
                          <Location w={12} h={12} />
                          <Text marginLeft='6px' color='neutral.gray' fontSize='3xs' fontWeight='semibold'>
                            Restaurant
                          </Text>
                        </Box>
                        <Text color='neutral.black'>{promotion.restaurantName}</Text>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              </Box>
            ))}

          {/* Closing tag for the Grid component */}
        </Grid>

        {deals.length === 0 && (
          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
            <Skeleton borderRadius='16px' height='298px' width='100%' isLoaded={!loading}></Skeleton>
            <Skeleton borderRadius='16px' height='298px' width='100%' isLoaded={!loading}></Skeleton>
            <Skeleton borderRadius='16px' height='298px' width='100%' isLoaded={!loading}></Skeleton>
          </Grid>
        )}
      </Container>
    </Box>
  );
}

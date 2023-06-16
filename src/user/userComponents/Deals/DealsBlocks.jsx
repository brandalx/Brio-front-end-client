import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Image, Text, Grid, Divider } from '@chakra-ui/react';

import ValidThrough from '../../../assets/svg/ValidThrough.jsx';
import Location from '../../../assets/svg/Location.jsx';
import { API_URL, handleApiGet } from '../../../services/apiServices.js';
import { Link } from 'react-router-dom';

export default function DealsBlocks() {
  const [deals, setDeals] = useState([]);
  const fetchdeals = async () => {
    try {
      const response = await handleApiGet(API_URL + '/admin/promotions');
      console.log(response);
      setDeals(response);
    } catch (error) {
      console.error('Error fetching products:', error);
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
          {deals.map((promotion, index) => {
            return (
              <Box
                key={index}
                display='flex'
                justifyContent='space-between'
                flexDirection='column'
                borderRadius='16px'
                border='1px'
                transition='all 0.3s'
                borderColor='neutral.grayLight'
                _hover={{ borderColor: 'primary.default', transition: 'all 0.3s', bg: 'primary.light' }}
                p='16px'
              >
                <Link to={`/restaurant/${promotion.restaurantRef}`}>
                  <Box display='flex' justifyContent='space-between'>
                    <Box marginRight='10px'>
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
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

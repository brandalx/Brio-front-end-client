import React from 'react';
import { Box, Text, Container, Grid, GridItem } from '@chakra-ui/layout';
import {
  Filler,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import OrdersData from '../adminComponents/RestaurantDashboard/OrdersData';
import { Avatar } from '@chakra-ui/avatar';
import MealCard from '../adminComponents/RestaurantDashboard/MealCard';
import { Button } from '@chakra-ui/button';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Chart options
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Order revenue'
    }
  }
};

// Labels for the chart
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Chart data (temporary fake data)
export const data = {
  labels,
  datasets: [
    {
      label: 'Restaurant activity',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
      borderColor: '#8E99FF',
      backgroundColor: 'rgba(175, 183, 255, 0.21)',
      fill: 'origin',
      tension: 0.3
    }
  ]
};

export default function RestaurantDashboard() {
  return (
    <>
      <Box py={5}>
        <Container maxW='1110px'>
          <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
            Dashboard
          </Text>
          <Box>
            <OrdersData />
          </Box>

          <Box>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '2fr 1fr ' }} gap={4}>
              <GridItem w='100%'>
                <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
                  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                    Order revenue
                  </Text>

                  <Line options={options} data={data} />
                </Box>
              </GridItem>
              <GridItem w='100%'>
                <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
                  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                    Popular meals
                  </Text>
                  <Box mt={4}>
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                  </Box>
                  <Button
                    mx='auto'
                    mt={4}
                    w='100%'
                    background='neutral.white'
                    fontSize='2xs'
                    fontWeight='bold'
                    variant='solid'
                    color='neutral.gray'
                    borderWidth='1px'
                    borderColor='neutral.gray'
                    _hover={{
                      background: 'primary.default',
                      color: 'neutral.white',
                      borderWidth: '1px',
                      borderColor: 'primary.default'
                    }}
                    py={5}
                  >
                    Show all meals
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

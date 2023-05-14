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
          <Box display='flex' justifyContent='center' alignItems='center' height='90vh'>
            <Box textAlign='center' w='90%'>
              <Line options={options} data={data} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

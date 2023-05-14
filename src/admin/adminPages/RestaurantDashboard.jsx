import React, { useState } from 'react';
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

import OrdersData from '../adminComponents/RestaurantDashboard/OrdersData';

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
      display: true
    }
  }
};

// Labels for the chart
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Chart data (temporary fake data)

const mealArray = [
  {
    image: 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg',
    title: 'Nigiri set',
    amount: 362,
    price: 185
  },
  {
    image: 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg',
    title: 'Nigiri set',
    amount: 362,
    price: 185
  }
];

export default function RestaurantDashboard() {
  let orderRevenue = [
    { item: 9876 },
    { item: 5432 },
    { item: 1234 },
    { item: 5678 },
    { item: 4321 },
    { item: 8765 },
    { item: 987 }
  ];

  let ordersDelivered = [
    { item: 1357 },
    { item: 2468 },
    { item: 9753 },
    { item: 8642 },
    { item: 3141 },
    { item: 5926 },
    { item: 5358 }
  ];

  let ordersRecived = [
    { item: 2324 },
    { item: 3232 },
    { item: 2376 },
    { item: 3423 },
    { item: 8864 },
    { item: 2323 },
    { item: 6566 }
  ];
  const [currentArr, setCurrentArr] = useState(ordersDelivered);

  const data = {
    labels,
    datasets: [
      {
        label: 'Restaurant data',
        data: currentArr.map((item, index) => ({ x: index, y: item.item })),
        borderColor: '#8E99FF',
        backgroundColor: 'rgba(175, 183, 255, 0.21)',
        fill: 'origin',
        tension: 0.3
      }
    ]
  };
  return (
    <>
      <Box py={5}>
        <Container maxW='1110px'>
          <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
            Dashboard
          </Text>
          <Box>
            <OrdersData
              setCurrentArr={setCurrentArr}
              orderRevenue={orderRevenue}
              ordersDelivered={ordersDelivered}
              ordersRecived={ordersRecived}
            />
          </Box>

          <Box>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '2fr 1fr ' }} gap={4}>
              <GridItem w='100%'>
                <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
                  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                    {currentArr === orderRevenue && <>Order revenue</>}

                    {currentArr === ordersDelivered && <>Orders delivered</>}

                    {currentArr === ordersRecived && <>Orders received</>}
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
                    {mealArray.map((item, index) => {
                      return (
                        <MealCard
                          key={index}
                          image={item.image}
                          title={item.title}
                          amount={item.amount}
                          price={item.price}
                          desc={item.desc}
                        />
                      );
                    })}
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

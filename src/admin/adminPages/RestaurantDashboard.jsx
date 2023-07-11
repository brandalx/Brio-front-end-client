import React, { useEffect, useState } from 'react';
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
import _ from 'lodash';
import MealCard from '../adminComponents/RestaurantDashboard/MealCard';
import { Button } from '@chakra-ui/button';
import axios from 'axios';
import { API_URL } from '../../services/apiServices';
import jwtDecode from 'jwt-decode';
import PopularMeals from '../adminComponents/RestaurantDashboard/PopularMeals';
import { AspectRatio } from '@chakra-ui/react';

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

export default function RestaurantDashboard() {
  const [receivedOrders, setReceivedOrder] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [restaurantId, setRestaurantId] = useState();
  const [currentType, setCurrentType] = useState('ordersDelivered');

  const [orders, setOrders] = useState({
    month7: { orderCount: 0, orderReceivedCount: 0, revenueCount: 0 },
    month6: { orderCount: 0, orderReceivedCount: 0, revenueCount: 0 },
    month5: { orderCount: 0, orderReceivedCount: 0, revenueCount: 0 },
    month4: { orderCount: 0, orderReceivedCount: 0, revenueCount: 0 },
    month3: { orderCount: 0, orderReceivedCount: 0, revenueCount: 0 },
    month2: { orderCount: 0, orderReceivedCount: 0, revenueCount: 0 },
    month1: { orderCount: 0, orderReceivedCount: 0, revenueCount: 0 }
  });

  const labels = [
    '6 Months Ago',
    '5 Months Ago',
    '4 Months Ago',
    '3 Months Ago',
    '2 Months Ago',
    'Last Month',
    'This Month'
  ];

  const getCurrentData = () => {
    switch (currentType) {
      case 'ordersDelivered':
        return Object.values(orders).map((monthData) => monthData.orderCount);
      case 'ordersRecived':
        return Object.values(orders).map((monthData) => monthData.orderReceivedCount);
      case 'orderRevenue':
      default:
        return Object.values(orders).map((monthData) => monthData.revenueCount);
    }
  };

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Restaurant data',
        data: getCurrentData(),
        borderColor: '#8E99FF',
        backgroundColor: 'rgba(175, 183, 255, 0.21)',
        fill: 'origin',
        tension: 0.3
      }
    ]
  };

  useEffect(() => {
    const fetchRestaurantAndOrdersData = async () => {
      try {
        // Fetch restaurant data first
        const token = localStorage.getItem('x-api-key');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;

        const adminResponse = await axios.get(`${API_URL}/users/${userId}`, {
          headers: {
            'x-api-key': token
          }
        });

        const restaurantId = adminResponse.data.restaurant;
        setRestaurantId(restaurantId);

        // Then fetch orders
        const orderResponse = await axios.get(`${API_URL}/orders`, {
          headers: {
            'x-api-key': token
          }
        });

        if (orderResponse.status === 200) {
          const newOrders = { ...orders };

          orderResponse.data.forEach((order) => {
            const orderDate = new Date(order.creationDate);
            let orderMonth = `month${(new Date().getMonth() - orderDate.getMonth() + 1) % 7}`;

            if (order.ordersdata.restaurants.includes(restaurantId) && order.userdata.status === 'Placed') {
              newOrders[orderMonth].orderReceivedCount++;
            }

            if (order.ordersdata.restaurants.includes(restaurantId) && order.userdata.status === 'Completed') {
              newOrders[orderMonth].orderCount++;
            }

            if (order.userdata.status === 'Completed') {
              order.ordersdata.products.forEach((product) => {
                if (product.restaurantId === restaurantId) {
                  newOrders[orderMonth].revenueCount += product.priceItem;
                }
              });
            }
          });

          setOrders(newOrders);
        } else {
          console.error('Error fetching orders:', orderResponse.status);
        }
      } catch (error) {
        console.error('Error fetching restaurant and order data:', error);
      }
    };

    fetchRestaurantAndOrdersData();
  }, []);

  /////
  return (
    <>
      <Box py={5}>
        <Container maxW='1110px'>
          <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
            Dashboard
          </Text>
          <Box>
            <OrdersData
              setCurrentType={setCurrentType}
              orderRevenue={getCurrentData()}
              ordersDelivered={getCurrentData()}
              ordersRecived={getCurrentData()}
            />
          </Box>
          <Box>
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: '2fr 1fr',
                xl: '2fr 1fr'
              }}
              gap={4}
            >
              <GridItem w='100%'>
                <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
                  <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
                    {currentType === 'orderRevenue' && <>Order revenue</>}
                    {currentType === 'ordersDelivered' && <>Orders delivered</>}
                    {currentType === 'ordersRecived' && <>Orders received</>}
                  </Text>
                  <AspectRatio ratio={16 / 9}>
                    <Line options={options} data={data} />
                  </AspectRatio>
                </Box>
              </GridItem>
              <PopularMeals restaurantId={restaurantId} />
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

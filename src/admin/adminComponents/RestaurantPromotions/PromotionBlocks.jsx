import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Grid,
  Divider,
  Skeleton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal
} from '@chakra-ui/react';
import { API_URL, handleApiGet } from '../../../services/apiServices';
import ValidThrough from '../../../assets/svg/ValidThrough';
import Location from '../../../assets/svg/Location';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useDisclosure } from '@chakra-ui/react';
import TrashBox from '../../../assets/svg/TrashBox';
import { useToast } from '@chakra-ui/react';

export default function PromotionBlocks({ active }) {
  const [promotions, setPromotion] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [loadingCount, setLoadingCount] = useState(0);
  const [deletingPromotion, setDeletingPromotion] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchRestaurantData = async () => {
    setLoadingCount((count) => count + 1);
    try {
      const token = localStorage.getItem('x-api-key');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const adminResponse = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          'x-api-key': token
        }
      });

      setRestaurantId(adminResponse.data.restaurant);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    } finally {
      setLoadingCount((count) => count - 1);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const fetchPromotions = async () => {
    setLoadingCount((count) => count + 1);

    try {
      const response = await handleApiGet(API_URL + '/admin/promotions');
      setPromotion(response.filter((promotion) => promotion.restaurantRef === restaurantId));
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoadingCount((count) => count - 1);
    }
  };

  function getPromotionStatus(startDate, endDate) {
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
    fetchPromotions();
  }, [restaurantId]); // добавить restaurantId в список зависимостей useEffect

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

  const handleDeletePromotion = async () => {
    const token = localStorage.getItem('x-api-key');
    try {
      await axios.delete(`${API_URL}/admin/promotions/${deletingPromotion._id}`, {
        headers: {
          'x-api-key': token
        }
      });
      // Remove the deleted promotion from the state
      setPromotion((promotions) => promotions.filter((promotion) => promotion._id !== deletingPromotion._id));
      onClose();
      toast({
        title: 'Promotion deleted.',
        description: `The promotion "${deletingPromotion?.discountDetails}" was successfully deleted.`,
        status: 'success',
        duration: 9000,
        isClosable: true
      });
    } catch (error) {
      console.error('An error occurred while deleting the promotion:', error);
      toast({
        title: 'Error deleting promotion.',
        description: `An error occurred while trying to delete the promotion "${deletingPromotion?.discountDetails}".`,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  function shouldDisplayPromotion(promotion) {
    if (!promotion.startDate || !promotion.endDate) {
      return false;
    }

    const status = getPromotionStatus(promotion.startDate, promotion.endDate);
    return status === active;
  }

  const loading = loadingCount > 0;

  if (loading) {
    return (
      <Container maxW='1110px'>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent='space-between'
              flexDirection='column'
              borderRadius='16px'
              border='1px'
              borderColor='neutral.grayLight'
              p='16px'
            >
              <Box display='flex' justifyContent='space-between'>
                <Box marginRight='10px'>
                  <Skeleton height='20px' mb='4' />
                  <Skeleton height='20px' mb='4' />
                </Box>
                <Box>
                  <Skeleton height='92px' width='112px' borderRadius='16px' />
                </Box>
              </Box>
              <Divider mt='10px' mb='8px' />
              <Box display='flex' flexDirection='column'>
                <Box>
                  <Skeleton height='20px' mb='4' />
                </Box>
                <Box>
                  <Skeleton height='20px' />
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box>
      <Container maxW='1110px'>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6}>
          {promotions.filter(shouldDisplayPromotion).map((promotion, index) => {
            return (
              <Box
                key={index}
                display='flex'
                justifyContent='space-between'
                flexDirection='column'
                borderRadius='16px'
                border='1px'
                borderColor='neutral.grayLight'
                p='16px'
              >
                <Box display='flex' justifyContent='space-between'>
                  <Box marginRight='10px' width='100%'>
                    <Box
                      textAlign='center'
                      border='1px'
                      borderRadius='full'
                      width='70px'
                      display='flex'
                      alignItems='center'
                      justifyContent='space-around'
                      height='40px'
                      borderColor='success.default'
                    >
                      <Text textAlign='center' color='success.default' fontWeight='semibold' p='3px' fontSize='3xs'>
                        {active}
                      </Text>
                    </Box>
                    <Text
                      mt={2}
                      color={() => (localStorage.getItem('colormode') === 'dark' ? 'neutral.black' : 'neutral.black')}
                      fontWeight='bold'
                      fontSize='2xs'
                    >
                      {promotion.discountDetails}
                    </Text>
                  </Box>
                  <Box width='100%' height='100%'>
                    <Image borderRadius='16px' src={promotion.image} objectFit='cover' objectPosition='center' />
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
                    <Box>
                      <Box display='flex' flexDirection='row' alignItems='center' mt='4px'>
                        <Location w={12} h={12} />
                        <Text marginLeft='6px' color='neutral.gray' fontSize='3xs' fontWeight='semibold'>
                          Restaurant
                        </Text>
                      </Box>
                      <Box display='flex' justifyContent='space-between' alignItems='flex-end'>
                        <Text color='neutral.black'>{promotion.restaurantName}</Text>
                        <Button
                          colorScheme='red'
                          onClick={() => {
                            setDeletingPromotion(promotion);
                            onOpen();
                          }}
                        >
                          <TrashBox />
                        </Button>
                      </Box>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Delete Promotion</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            Are you sure you want to delete the promotion "{deletingPromotion?.discountDetails}"?
                          </ModalBody>
                          <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDeletePromotion}>
                              <TrashBox />
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

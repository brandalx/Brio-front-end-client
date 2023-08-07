import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  Image,
  Divider,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  transition,
  useToast,
  Badge
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import TrashBox from '../../../assets/svg/TrashBox';
import { Link } from 'react-router-dom';
import { Modal, useDisclosure } from '@chakra-ui/react';
import { API_URL, handleApiGet, handleApiMethod } from '../../../services/apiServices';
import { cartContext } from '../../../context/globalContext';
import noimage from '../../../assets/images/noimage.jpg';
export default function MenuMeal({ user, setReload2, reload2, reload, setReload, item, amount, targetId }) {
  const { cartLen, setCartLen } = useContext(cartContext);
  const [amountMeals, setAmountMeals] = useState(amount);
  const [targetIdRewrite, setTargetIdRewrite] = useState(targetId);

  const [promotions, setPromotions] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [currentPromotion, setCurrentPromotion] = useState([]);
  let lastPromotions = [];
  const handlePromotions = async () => {
    try {
      const url = API_URL + '/admin/promotions';
      const data = await handleApiGet(url);
      // console.log(data);
      setPromotions(data);

      let tempArr = [];
      // let tempArr2 = [];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let dayName = days[new Date().getDay()]; // get the day of the week
      //for both start and end dates
      // data.forEach((item) => {
      //   let startDate = new Date(item.startDate); // parse startDate into a Date object
      //   let endDate = new Date(item.endDate); // parse endDate into a Date object
      //   if (item.discountDays.includes(dayName) && new Date() >= startDate && new Date() < endDate) {
      //     tempArr.push(item);
      //   }
      // });

      //for only end date
      data.forEach((item) => {
        let startDate = new Date(item.startDate); // parse startDate into a Date object
        let endDate = new Date(item.endDate); // parse endDate into a Date object
        if (item.discountDays.includes(dayName) && new Date() < endDate) {
          tempArr.push(item);
        }
      });

      // let rnd1, rnd2;
      // do {
      //   rnd1 = Math.floor(Math.random() * tempArr.length);
      //   rnd2 = Math.floor(Math.random() * tempArr.length);
      // } while (rnd2 === rnd1 || lastPromotions.includes(rnd1) || lastPromotions.includes(rnd2));

      // tempArr2.push(data[rnd1]);
      // tempArr2.push(data[rnd2]);

      // console.log(tempArr);
      setActivePromotions(tempArr);
      let promotion = tempArr.find((promo) => promo.discountProducts.includes(item._id));
      setCurrentPromotion(promotion || null);

      // lastPromotions = [rnd1, rnd2]; // remember the last promotions
    } catch (error) {
      console.log(error);
    }
  };
  let info = item.description;
  const cutInfo = (info) => {
    const words = info.split(' ');

    if (words.length <= 10) {
      return info;
    } else {
      return words.slice(0, 10).join(' ') + '...';
    }
  };
  useEffect(() => {
    handlePromotions();
    // console.log(amount);
  }, []);
  const cutInfoText = cutInfo(info);
  const OverlayOne = () => <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const toast = useToast();
  const handleItemDelete = async (_bodyData) => {
    const urltodelete = API_URL + '/users/cart/delete';

    const _bodyDataFinal = {
      itemToDelete: _bodyData
    };

    // console.log(_bodyDataFinal);
    try {
      const data = await handleApiMethod(urltodelete, 'DELETE', _bodyDataFinal);
      // console.log(data);
      if (data.msg === true) {
        toast({
          title: 'Meal was removed.',
          description: "We've removed this meal.",
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        setCartLen(cartLen - 1);
        handlePromotions();
      }
      setReload(reload + 1);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        if (error.response.data.err === 'Meal does not exist') {
          toast({
            title: 'Meal does not exist',
            description: `Error when removing meal - such meal does not exist.`,
            status: 'warning',
            duration: 9000,
            isClosable: true
          });
        } else {
          toast({
            title: 'Error when removing meal',
            description: 'Error when removing selected meal',
            status: 'error',
            duration: 9000,
            isClosable: true
          });
        }
      } else {
        toast({
          title: 'Unexpected error',
          description: 'An unexpected error has occurred.',
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  let postToCart = async (_data) => {
    try {
      let cartObject = {
        productId: item._id,
        productAmount: _data
      };
      const url = API_URL + `/users/${user._id}/posttocart`;
      const data = await handleApiMethod(url, 'POST', cartObject);

      setTargetIdRewrite(data._id);
      setReload2(reload2 + 1);

      // if (data.msg === true) {
      //   toast({
      //     title: 'Product updated.',
      //     description: "We've updated this product amount.",
      //     status: 'success',
      //     duration: 9000,
      //     isClosable: true
      //   });
      // }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Error when adding changing item amount',
        description: 'Error when changing item amount',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
  };

  const addMealAmount = () => {
    setAmountMeals(amountMeals + 1);
    postToCart(amountMeals + 1);
  };

  const reduceMealAmount = () => {
    if (amountMeals - 1 != 0) {
      setAmountMeals(amountMeals - 1);
      postToCart(amountMeals - 1);
    }
  };

  return (
    <>
      <Box
        my={2}
        pt={5}
        px={4}
        borderRadius='12px'
        data-aos='fade-up'
        transition='all 0.3s'
        _hover={{ bg: 'neutral.grayLightest', transition: 'all 0.3s' }}
      >
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr ' }} gap={4}>
          <GridItem w='100%'>
            <Link to={`/restaurant/product/${item._id}`}>
              <Box display='flex' alignItems='center'>
                <Box me={2}>
                  <Image
                    borderRadius='12px'
                    maxH='72px'
                    maxW='72px'
                    src={item.image.length > 0 ? item.image : noimage}
                  />
                </Box>
                <Box>
                  <Box>
                    <Text
                      fontWeight='bold'
                      color={localStorage.getItem('colorMode') === 'dark' ? 'neutral.black' : 'neutral.black'}
                      fontSize='2xs'
                    >
                      {item.title}{' '}
                      {currentPromotion && (
                        <Badge bg='primary.default' color='white' fontSize='3xs'>
                          {currentPromotion.discountPercent}% off
                        </Badge>
                      )}{' '}
                    </Text>
                  </Box>
                  <Box>
                    <Text color='neutral.grayDark' fontSize='2xs'>
                      {cutInfoText}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Link>
          </GridItem>
          <GridItem w='100%'>
            <Box
              h='100%'
              display='flex'
              alignItems='center'
              alignContent='center'
              justifyContent={{ base: 'center', md: 'flex-end' }}
            >
              <Grid templateColumns='0.8fr 0.8fr 0.4fr' gap={4}>
                <GridItem w='100%'>
                  {' '}
                  <Box display='flex' alignItems='center'>
                    <Button
                      isDisabled={amountMeals - 1 === 0 ? true : false}
                      onClick={() => reduceMealAmount()}
                      background='neutral.grayLightest'
                      borderRadius='100px'
                      py='10px'
                      px='10px'
                      fontSize='sm'
                      color='neutral.gray'
                      _hover={{ bg: 'red', color: 'white' }}
                    >
                      -
                    </Button>

                    <Text fontSize='2xs' color='neutral.gray' fontWeight='bold' px={3}>
                      {amountMeals}
                    </Text>
                    <Button
                      onClick={() => addMealAmount()}
                      _hover={{ bg: 'primary.default', color: 'white' }}
                      background='neutral.grayLightest'
                      borderRadius='100px'
                      py='10px'
                      px='10px'
                      fontSize='sm'
                      color='primary.black'
                    >
                      +
                    </Button>
                  </Box>
                </GridItem>
                <GridItem w='100%' h='100%'>
                  <Box w='100%' display='flex' justifyContent='center'>
                    {' '}
                    {currentPromotion ? (
                      <Box display='flex'>
                        <Text fontWeight='extrabold' color='neutral.black' fontSize='xs' p={0} m={0}>
                          $ {(item.price * (1 - currentPromotion.discountPercent / 100) * amountMeals).toFixed(2)}
                        </Text>
                      </Box>
                    ) : (
                      <Text fontWeight='extrabold' color='neutral.black' fontSize='xs' p={0} m={0}>
                        $ {(item.price * amountMeals).toFixed(2)}
                      </Text>
                    )}
                  </Box>
                </GridItem>
                <GridItem w='100%' mt={1}>
                  <Button
                    style={{ transform: 'translateY(-5px)' }}
                    m={0}
                    p={1}
                    h='100%'
                    w='100%'
                    onClick={() => {
                      setOverlay(<OverlayOne />);
                      onOpen();
                    }}
                  >
                    <TrashBox color='#C7C8D2' />
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
        <Divider pt={4} />
      </Box>
      <Box>
        <Modal size='xl' isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton />
              <Text mt={{ base: 8, md: 0 }} fontSize='xs' fontWeight='bold' color='neutral.black' textAlign={'center'}>
                Are you sure you want to delete this item?
              </Text>
            </ModalHeader>

            <ModalBody>
              <Link to={`/restaurant/product/${item._id}`}>
                <Box
                  transition='all 0.3s'
                  _hover={{ bg: 'neutral.grayLightest', transition: 'all 0.3s' }}
                  borderRadius='12px'
                  p={2}
                >
                  <Box display='flex' alignItems='center'>
                    <Box me={2}>
                      <Image
                        borderRadius='12px'
                        maxH='72px'
                        maxW='72px'
                        src={item.image.length > 0 ? item.image : noimage}
                      />
                    </Box>
                    <Box>
                      <Box>
                        <Text
                          fontWeight='bold'
                          color={localStorage.getItem('colorMode') === 'dark' ? 'neutral.black' : 'neutral.black'}
                          fontSize='2xs'
                        >
                          {item.title}
                        </Text>
                      </Box>
                      <Box>
                        <Text color='neutral.grayDark' fontSize='2xs'>
                          {cutInfoText}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </ModalBody>
            <ModalFooter>
              <Button
                me={2}
                onClick={onClose}
                type='submit'
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
                py={5}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  handleItemDelete(targetIdRewrite);
                }}
                w={{ base: '50%', md: 'initial' }}
                fontSize='2xs'
                fontWeight='bold'
                variant='solid'
                borderWidth='1px'
                borderColor='error.default'
                background='error.default'
                color='neutral.white'
                _hover={{
                  background: 'neutral.white',
                  color: 'error.default',
                  borderWidth: '1px',
                  borderColor: 'error.default'
                }}
                py={5}
                me='20px'
              >
                Remove item
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

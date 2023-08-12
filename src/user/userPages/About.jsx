import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Text, Flex, Grid, Icon, Image, GridItem } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Spline from '@splinetool/react-spline';
import Preloader from '../../components/Loaders/preloader';
import AboutCard from '../userComponents/About/AboutCard';
import dataJson from '../userComponents/About/about.json';
import Revenue from '../../assets/svg/Revenue';
import { Heading } from '@chakra-ui/react';

export default function About() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const [heightchange, setheightchange] = useState(1);
  const [loading, setLoading] = useState(true);

  const onload = () => {
    setheightchange(250);
    setLoading(false);
  };
  const [numbers, setNumbers] = useState([]);

  const generateNumbers = () => {
    const firstNumber = Math.round(Math.random()); // This will give either 0 or 1.
    let secondNumber;
    do {
      secondNumber = Math.round(Math.random());
    } while (secondNumber === firstNumber); // Keep generating until different from firstNumber

    setNumbers([firstNumber, secondNumber]);
  };
  useEffect(() => {
    generateNumbers();
  }, []);
  return (
    <Box py='60px' bg='neutral.white'>
      <Preloader colorss={localStorage.getItem('colormode') === 'dark' ? '#2B2B43' : 'white'} loading={loading} />
      <Container maxW='960px' pt={15}>
        <Box my={4}>
          <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
            <Flex alignItems='center'>
              <Icon color='neutral.black' as={FaChevronLeft} mr={1} boxSize={4} />
              <Text onClick={handleGoBack} color='neutral.black' fontSize='xs'>
                Back
              </Text>
            </Flex>
          </Button>
        </Box>
        <Box w='100%' data-aos='fade-up' borderRadius='16px' py={5} bg='primary.default'>
          <Box textAlign='center'>
            <Text
              mt={5}
              ms={5}
              fontSize={{ base: 'xl', md: '2xl' }}
              lineHeight={{ base: '20px', md: '45px' }}
              color={() => (localStorage.getItem('colormode') === 'dark' ? 'black' : 'white')}
              fontWeight='black'
            >
              About Brio
            </Text>

            <Text
              mt={{ base: '25px', md: '30px' }}
              ms={5}
              fontSize={{ base: 'sm', md: 'dm' }}
              lineHeight={{ base: '25px', md: '20px' }}
              color={() => (localStorage.getItem('colormode') === 'dark' ? 'black' : 'white')}
              fontWeight='black'
            >
              Learn more about our mission, vision, and values.
            </Text>

            <Box borderRadius='16px' h={`${heightchange}px`} w='100%'>
              <Spline scene='https://draft.spline.design/wzcQPaZUf8Lx1H2y/scene.splinecode' onLoad={onload} />
            </Box>
          </Box>
        </Box>

        <Box pt='20px'>
          <Text textAlign='center' fontSize='xl' color='primary.default' fontWeight='extrabold'>
            Meet Brio Developers!
          </Text>
        </Box>
        <Box my={5}>
          {numbers.map((randomIndex, index) => {
            const item = dataJson[randomIndex];
            return (
              <Box key={randomIndex}>
                <AboutCard index={index} data={item} />
              </Box>
            );
          })}
        </Box>
        <Box data-aos='fade-up'>
          <Box my={4}>
            <Box
              border='1px'
              borderColor='neutral.grayLightest'
              py={5}
              overflow='hidden'
              minH={{ base: '350px', md: '250px' }}
              bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : '#FCFCFC')}
              borderRadius='lg'
            >
              <Box px={8}>
                <Image src='http://cdn.mcauto-images-production.sendgrid.net/27548861a3bba7f7/960bec92-ae6e-4946-99af-34de5bcd508b/4393x3391.png' />
                <Box>
                  <Text color='neutral.black' fontSize='60px' textAlign='center' fontWeight='extrabold'>
                    Brio Sources
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 2fr 1fr' }} gap={6}>
          <GridItem w='100%' ata-aos='fade-up'>
            <Box my={4}>
              <Box>
                <Box
                  py={5}
                  minH={{ base: '350px', md: '250px' }}
                  bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'white')}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  _hover={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bg: 'primary.light',
                    borderColor: 'primary.light'
                  }}
                  _active={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bg: 'primary.light',
                    borderColor: 'primary.default'
                  }}
                  borderRadius='16px'
                  transition='all 0.3s'
                  borderWidth='1px'
                >
                  <Flex alignItems='center'>
                    <Box p={4}>
                      <Box p={5} borderRadius={12}>
                        <Box
                          mx='auto'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.light')}
                          color='black'
                          px={'8px'}
                          py={'8px'}
                          borderRadius='16px'
                        >
                          <Box mx='auto' display='flex' alignItems='center' justifyContent='center' p='8px'>
                            <Revenue />
                          </Box>
                        </Box>
                      </Box>
                      <Box textAlign='center' px={2}>
                        <Heading
                          color={() =>
                            localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark'
                          }
                          fontSize='2xs'
                          fontWeight='bold'
                        >
                          Front end repo
                        </Heading>
                        <Text
                          fontSize='3xs'
                          color={() =>
                            localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark'
                          }
                        >
                          link
                        </Text>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%' ata-aos='fade-up'>
            <Box my={4}>
              <Box>
                <Box
                  py={5}
                  minH={{ base: '350px', md: '250px' }}
                  bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'white')}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  _hover={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bg: 'primary.light',
                    borderColor: 'primary.light'
                  }}
                  _active={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bg: 'primary.light',
                    borderColor: 'primary.default'
                  }}
                  borderRadius='16px'
                  transition='all 0.3s'
                  borderWidth='1px'
                >
                  <Flex alignItems='center'>
                    <Box p={4}>
                      <Box p={5} borderRadius={12}>
                        <Box
                          mx='auto'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.light')}
                          color='black'
                          px={'8px'}
                          py={'8px'}
                          borderRadius='16px'
                        >
                          <Box mx='auto' display='flex' alignItems='center' justifyContent='center' p='8px'>
                            <Revenue />
                          </Box>
                        </Box>
                      </Box>
                      <Box textAlign='center' px={2}>
                        <Heading
                          color={() =>
                            localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark'
                          }
                          fontSize='2xs'
                          fontWeight='bold'
                        >
                          Brio architecture link
                        </Heading>
                        <Text
                          fontSize='3xs'
                          color={() =>
                            localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark'
                          }
                        >
                          FigJam
                        </Text>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem w='100%' ata-aos='fade-up'>
            <Box my={4}>
              <Box>
                <Box
                  py={5}
                  minH={{ base: '350px', md: '250px' }}
                  bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'white')}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  _hover={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bg: 'primary.light',
                    borderColor: 'primary.light'
                  }}
                  _active={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bg: 'primary.light',
                    borderColor: 'primary.default'
                  }}
                  borderRadius='16px'
                  transition='all 0.3s'
                  borderWidth='1px'
                >
                  <Flex alignItems='center'>
                    <Box p={4}>
                      <Box p={5} borderRadius={12}>
                        <Box
                          mx='auto'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          bg={() => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.light')}
                          color='black'
                          px={'8px'}
                          py={'8px'}
                          borderRadius='16px'
                        >
                          <Box mx='auto' display='flex' alignItems='center' justifyContent='center' p='8px'>
                            <Revenue />
                          </Box>
                        </Box>
                      </Box>
                      <Box textAlign='center' px={2}>
                        <Heading
                          color={() =>
                            localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark'
                          }
                          fontSize='2xs'
                          fontWeight='bold'
                        >
                          Back-end repo
                        </Heading>
                        <Text
                          fontSize='3xs'
                          color={() =>
                            localStorage.getItem('colormode') === 'dark' ? 'primary.default' : 'neutral.grayDark'
                          }
                        >
                          link
                        </Text>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

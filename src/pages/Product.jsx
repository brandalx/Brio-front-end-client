import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
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
  Icon
} from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaChevronLeft } from 'react-icons/fa';

import ImageGallery from 'react-image-gallery';
import ProductCard from '../components/RestaurantPage/ProductCard';
import { Link } from 'react-router-dom';
export default function Product() {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const thumbnailPosition = isLargerThanMd ? 'left' : 'bottom';
  const images = [
    {
      original:
        'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2%27',
      thumbnail:
        'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2%27'
    },
    {
      original:
        'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      thumbnail:
        'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      original:
        'https://images.pexels.com/photos/858508/pexels-photo-858508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      thumbnail:
        'https://images.pexels.com/photos/858508/pexels-photo-858508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  return (
    <>
      <Box>
        <Container maxW='1110px' py={10}>
          <Button _hover={{ transform: 'scale(1.010)' }} transition='transform 0.2s ease-in-out'>
            <Flex alignItems='center'>
              <Icon as={FaChevronLeft} mr={1} boxSize={4} />
              <Text color='neutral.black' fontSize='xs'>
                <Link to='/restaurant'> Back to Restaurant Page</Link>
              </Text>
            </Flex>
          </Button>

          <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: ' 5fr 3fr' }} gap={6}>
            <GridItem w='100%' h='auto'>
              <ImageGallery
                items={images}
                infinite={true}
                showThumbnails={true}
                showNav={true}
                thumbnailPosition={thumbnailPosition}
                showFullscreenButton={false}
                useBrowserFullscreen={false}
                showPlayButton={false}
                disableThumbnailScroll={false}
                disableKeyDown={false}
                disableSwipe={false}
                disableThumbnailSwipe={false}
              />
            </GridItem>

            <GridItem w='100%' h='auto'>
              <Box>
                <Stack>
                  <Text mt={2} color='neutral.black' fontSize='md' fontWeight='bold'>
                    Nigiri set
                  </Text>
                  <Text color='neutral.gray' fontSize='2xs'>
                    Ea his sensibus eleifend, mollis iudicabit omittantur id mel. Et cum ignota euismod corpora, et
                    saepe. No malis harum saperet eum, eu minim perfecto salutandi cum, usu at constituto mnesarchum.
                  </Text>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Text fontWeight='extrabold' color='neutral.black' fontSize='md'>
                      $ 16.80
                    </Text>
                    <Box display='flex' alignItems='center'>
                      <Button
                        background='neutral.grayLightest'
                        borderRadius='100px'
                        py='10px'
                        px='10px'
                        fontSize='md'
                        color='neutral.gray'
                      >
                        -
                      </Button>

                      <Text color='neutral.gray' fontWeight='bold' px={3}>
                        1
                      </Text>
                      <Button
                        background='neutral.grayLightest'
                        borderRadius='100px'
                        py='10px'
                        px='10px'
                        fontSize='md'
                        color='primary.black'
                      >
                        +
                      </Button>
                    </Box>
                    <Button
                      rightIcon={<Text fontSize='md'>+</Text>}
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
                      Add to cart
                    </Button>
                  </Flex>
                </Stack>
                <Divider py={3} />
                <Box py={5}>
                  <Box py={3}>
                    <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                      {' '}
                      Ingredients
                    </Text>
                    <Text fontSize='2xs' color='neutral.gray'>
                      {' '}
                      Lorem ipsum dolor sit amet, pri atqui facete evertitur an, ea assum solet invidunt vim.
                    </Text>
                  </Box>
                  <Box py={1}>
                    <Text fontSize='2xs' color='neutral.black' fontWeight='bold'>
                      {' '}
                      Nutritional value
                    </Text>
                    <Text fontSize='2xs' color='neutral.gray'>
                      {' '}
                      Proteins - 7.11, Fats - 5.17, Carbohydrates - 18.40, 146 kkal. (for 100 g.)
                    </Text>
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </Grid>
          <Box py='30px'>
            <Text color='neutral.black' fontWeight='semibold' fontSize='sm'>
              Recommended with
            </Text>
            <Box>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                <ProductCard
                  img='https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  title='Nigiri set'
                  info='    Ea his sensibus eleifend, mollis iudicabit omittantur id mel. Et cum ignota euismod corpora,
                            et saepe.'
                  price='16.80'
                />

                <ProductCard
                  img='https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  title='Nigiri set'
                  info='    Ea his sensibus eleifend, mollis iudicabit omittantur id mel. Et cum ignota euismod corpora,
                            et saepe.'
                  price='16.80'
                />
                <ProductCard
                  img='https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  title='Nigiri set'
                  info='    Ea his sensibus eleifend, mollis iudicabit omittantur id mel. Et cum ignota euismod corpora,
                            et saepe.'
                  price='16.80'
                />
                <ProductCard
                  img='https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  title='Nigiri set'
                  info='    Ea his sensibus eleifend, mollis iudicabit omittantur id mel. Et cum ignota euismod corpora,
                            et saepe.'
                  price='16.80'
                />
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  CSSReset,
  GridItem,
  VStack,
  Image,
  useMediaQuery
} from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImageGallery from 'react-image-gallery';
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
        'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      thumbnail:
        'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  return (
    <>
      <Box>
        <Container maxW='1110px'>
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

            <GridItem w='100%' h='auto' bg='blue.500'>
              Here is info
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

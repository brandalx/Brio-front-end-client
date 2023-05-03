import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Container, Flex, Grid, CSSReset, GridItem, VStack, Image } from '@chakra-ui/react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImageGallery from 'react-image-gallery';
export default function Product() {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/'
    }
  ];
  return (
    <>
      <Box>
        <Container maxW='1110px'>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: ' 5fr 5fr' }} gap={6}>
            <GridItem w='100%' h='auto' bg='blue.500'>
              <ImageGallery
                items={images}
                infinite={true}
                showThumbnails={true}
                showNav={true}
                thumbnailPosition='left'
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

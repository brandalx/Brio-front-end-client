import { Badge, Box, Text, Image, GridItem } from '@chakra-ui/react';
import React from 'react';
import Emoji from 'react-emojis';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import noimagerest from '../../../assets/images/noimagerest.jpg';

export default function RestaurantCard({ img, title, time, price, badgeData, _id }) {
  return (
    <>
      {title && (
        <Link to={_id ? `/restaurant/${_id}` : '#'}>

          <GridItem h='100%' w='100%' bg='neutral.white' data-aos='fade-up'>
            <Box
            h='100%'
              transition='all 0.3s'
              _hover={{
                bg: () => (localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.light'),
                border: 'primary.default',
                transition: 'all 0.3s'
              }}
              bg='neutral.white'
              border='1px'
              borderColor='neutral.grayLightest'
              borderRadius='lg'
            >

              <Image src={img ? img : noimagerest} roundedTop='lg' h='230px' objectFit='cover' w='100%' />

              <Box p='6'>
                <Box>
                  {title && (
                    <Text color='neutral.black' fontSize='xs' fontWeight='bold'>
                      {title}
                    </Text>
                  )}
                  {time && price && (
                    <Box display='flex'>
                      <Box display='flex' alignItems='center' me={2}>
                        <AiOutlineClockCircle color='#828282' />
                      </Box>
                      <Text color='neutral.gray' fontSize='3xs'>
                        {time || '10-30'} min • ${price} min price
                      </Text>
                    </Box>
                  )}
                  {badgeData &&
                    badgeData.map((item) => (
                      <Badge key={item.badgeTitle} mt={2} bg='neutral.grayLightest' rounded='full' p={1} px={3} mx={1}>
                        <Box display='flex'>
                          <Box as='span' display='flex' alignItems='center' me={2}>
                            <Emoji emoji={item.badgeEmoji} size='20' />
                          </Box>
                          <Text color='neutral.grayDark' fontSize='3xs'>
                            {item.badgeTitle}
                          </Text>
                        </Box>
                      </Badge>
                    ))}
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Link>
      )}
    </>
  );
}

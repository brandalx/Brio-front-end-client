import { Badge, Box, Text, Image, GridItem } from '@chakra-ui/react';
import React from 'react';
import Emoji from 'react-emojis';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function RestaurantCard({ img, title, time, price, badgeData }) {
  return (
    <>
      <Link to='/restaurant'>
        <GridItem w='100%' bg='neutral.white'>
          <Box bg='neutral.white' border='1px' borderColor='neutral.grayLightest' borderRadius='lg'>
            <Image src={img} roundedTop='lg' h='230px' objectFit='cover' />

            <Box p='6'>
              <Box>
                <Text color='neutral.black' fontSize='xs' fontWeight='bold'>
                  {title}
                </Text>
                <Box display='flex'>
                  <Box display='flex' alignItems='center' me={2}>
                    <AiOutlineClockCircle color='#828282' />
                  </Box>
                  <Text color='neutral.gray' fontSize='3xs'>
                    {time} min • ${price} min price
                  </Text>
                </Box>
                {badgeData.map((item) => (
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
    </>
  );
}

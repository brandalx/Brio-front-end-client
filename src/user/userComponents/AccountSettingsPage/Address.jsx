import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Grid, GridItem, FormControl, FormLabel, Input, Skeleton } from '@chakra-ui/react';
import AdressCard from './AdressCard';
import { API_URL, handelApiGet } from '../../../services/apiServices';

export default function Adress() {
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [addressArr, setAddressArr] = useState([]);

  const handleApi = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';
    try {
      const data = await handelApiGet(url);
      setArr(data);
      console.log(data);
      const address = {
        country: data.address.country,
        state: data.address.state,
        city: data.address.city,
        address1: data.address.address1,
        address2: data.address.address2
      };
      setAddressArr([address]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  return (
    <>
      <Box>
        <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
          Address
        </Text>
        <Box borderRadius='16px' borderWidth='1px' py='20px' px='10px'>
          <Text fontSize='xs' fontWeight='bold' color='neutral.black'>
            Existing shipping addresses
          </Text>
          <Skeleton minH='40px' borderRadius='16px' isLoaded={!loading}>
            <Box pt={5}>
              <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr ' }} gap={6}>
                {!loading &&
                  addressArr.map((item, index) => {
                    return <AdressCard key={index} item={item} />;
                  })}
              </Grid>
            </Box>
          </Skeleton>
          <Box pt={5}>
            <Text mb='16px' fontSize='sm' fontWeight='semibold' color='neutral.black'>
              New shipping address
            </Text>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 1fr ' }} gap={6}>
              <GridItem w='100%'>
                <FormControl id='country'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Country
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Enter country'
                  />
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl id='state'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    State
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Enter state'
                  />
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl id='city'>
                  <FormLabel
                    fontWeight='semibold'
                    placeholder='+1(217) 555-0113'
                    fontSize='3xs'
                    color='neutral.grayDark'
                  >
                    City
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Enter city'
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
          <Box pt={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr ' }} gap={6}>
              <GridItem w='100%'>
                <FormControl id='adress1'>
                  <FormLabel fontWeight='semibold' fontSize='3xs' color='neutral.grayDark'>
                    Address line 1
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Enter address'
                  />
                </FormControl>
              </GridItem>
              <GridItem w='100%'>
                <FormControl id='adress2'>
                  <FormLabel
                    fontWeight='semibold'
                    placeholder='+1(217) 555-0113'
                    fontSize='3xs'
                    color='neutral.grayDark'
                  >
                    Address line 2
                  </FormLabel>

                  <Input
                    type='text'
                    background='neutral.white'
                    _placeholder={{ color: 'neutral.gray' }}
                    borderRadius='8px'
                    fontSize='2xs'
                    placeholder='Enter address (optional)'
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
          <Box pt={5} display='flex' justifyContent='flex-end'>
            <Button
              background='neutral.white'
              fontSize='2xs'
              fontWeight='bold'
              variant='solid'
              color='primary.default'
              borderWidth='1px'
              borderColor='primary.default'
              _hover={{
                background: 'primary.default',
                color: 'neutral.white',
                borderWidth: '1px',
                borderColor: 'primary.default'
              }}
              py={5}
              me='20px'
            >
              Add new address
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

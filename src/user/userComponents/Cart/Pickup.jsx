import { Box, Text, Image, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import defaultmap from '../../../assets/images/defaultmap.png';
import { REACT_API_opencagedata, REACT_APP_MAPBOX } from '../../../../env';
import axios from 'axios';
export default function Pickup({ item }) {
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);

  const handleMapApi = async () => {
    try {
      const placeUrl = `${REACT_API_opencagedata}${item.location}%20${item.address}&pretty=1`;
      const resp = await axios.get(placeUrl);
      const data = resp.data;
      setAddress(data);
      setAddressLoading(false);
    } catch (error) {
      console.log(error);
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    handleMapApi();
  }, []);

  return (
    <Box pt={4}>
      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
        Restaurant address
      </Text>
      <Skeleton minHeight='320px' my={4} borderRadius='16px' isLoaded={!addressLoading}>
        <Box pt={4}>
          {!addressLoading && (
            <iframe
              width='100%'
              src={`${REACT_APP_MAPBOX}&zoomwheel=false#8/${address.results[0].bounds.northeast.lat}/${address.results[0].bounds.northeast.lng}`}
              title='Monochrome'
              style={{ borderRadius: '16px', borderWidth: '5px', borderColor: 'white', minHeight: '320px' }}
            />
          )}

          <Box mt={4}>
            <Text fontWeight='bold' fontSize='2xs' color='neutral.black'>
              {item.location} {item.address}
            </Text>
            {/* <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
            California State, USA
          </Text>
          <Text fontSize='3xs' color='neutral.grayDark'>
            3891 Ranchview Dr. Richardson, 62639
          </Text> */}
            {/* todo: change adress mdoel and validation */}
          </Box>
        </Box>
      </Skeleton>
    </Box>
  );
}

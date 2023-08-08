import { Box, Text, Image, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import defaultmap from '../../../assets/images/defaultmap.png';

import axios from 'axios';
import { Checkbox, Flex, Radio } from '@chakra-ui/react';
import MapComponent from '../Order/MapComponent';

export default function Pickup({ item, pickupLocation, setPickupLocation, setCheckoutBody }) {
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const REACT_APP_API_URL = import.meta.env.VITE_APIURL;
  const REACT_APP_opencagedata = import.meta.env.VITE_OPENCAGEDATA;
  const REACT_APP_MAPBOX = import.meta.env.VITE_MAPBOX;
  const REACT_APP_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOXTOKEN;

  const handleMapApi = async () => {
    try {
      const placeUrl = `${REACT_APP_opencagedata}${item.location}%20${item.address}&pretty=1`;
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

  useEffect(() => {
    if (pickupLocation) {
      setCheckoutBody((prevState) => ({
        ...prevState,
        userdata: {
          ...prevState.userdata,
          selectedAddress: item._id
        }
      }));
    }

    if (!pickupLocation) {
      setCheckoutBody((prevState) => ({
        ...prevState,
        userdata: {
          ...prevState.userdata,
          selectedAddress: null
        }
      }));
    }
  }, [pickupLocation]);

  return (
    <Box pt={4} data-aos='fade-up'>
      <Text fontWeight='semibold' fontSize='3xs' color='neutral.gray'>
        Restaurant address
      </Text>
      <Skeleton minHeight='320px' my={4} borderRadius='16px' isLoaded={!addressLoading}>
        <Box pt={4}>
          {address ? (
            <>
              {!addressLoading &&
                address.results &&
                address.results[0] &&
                address.results[0].bounds &&
                address.results[0].bounds.northeast &&
                address.results[0].bounds.northeast.lat && (
                  <MapComponent
                    styleInsert={{
                      borderRadius: '16px',
                      borderWidth: '5px',
                      borderColor: 'white',
                      minHeight: '320px'
                    }}
                    lng={address.results[0].bounds.northeast.lng}
                    lat={address.results[0].bounds.northeast.lat}
                    zoom={16}
                  />
                )}{' '}
            </>
          ) : (
            <>No address specified</>
          )}

          <Box mt={4}>
            <Text fontWeight='bold' fontSize='2xs' color='neutral.black'>
              {/* prettier-igonre */}

              {item ? (
                <>
                  {' '}
                  {item.location} {item.address}
                </>
              ) : (
                <>No pickup locations!</>
              )}
            </Text>

            <Box>
              {address && (
                <Flex alignItems='center'>
                  <Radio
                    onClick={() => setPickupLocation(!pickupLocation)}
                    isChecked={pickupLocation}
                    iconcolor='neutral.white'
                    mr='2'
                  >
                    <Text onClick={() => setPickupLocation(!pickupLocation)} color='neutral.black' fontSize='2xs'>
                      Choose this location
                    </Text>
                  </Radio>
                </Flex>
              )}
            </Box>
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

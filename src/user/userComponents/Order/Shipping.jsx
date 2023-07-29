import { Box, Text, Image, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import defaultmap from '../../../assets/images/defaultmap.png';

import axios from 'axios';
import { Checkbox, Flex, Radio } from '@chakra-ui/react';
import MapComponent from './MapComponent';

export default function Shipping({ item, userArr, restaurantArr }) {
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [addressString, setAddressString] = useState();
  const [addressStringToPrint, setAddressStringToPrint] = useState();
  const [isSelf, setIsSelf] = useState(false);
  const REACT_APP_API_URL = import.meta.env.VITE_APIURL;
  const REACT_APP_opencagedata = import.meta.env.VITE_OPENCAGEDATA;
  const REACT_APP_MAPBOX = import.meta.env.VITE_MAPBOX;
  const REACT_APP_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOXTOKEN;

  const handleMapApi = async (finaladdressobj) => {
    try {
      const placeUrl = `${REACT_APP_opencagedata}${finaladdressobj}&pretty=1`;
      const resp = await axios.get(placeUrl);
      const data = resp.data;
      setAddress(data);
      setAddressLoading(false);
    } catch (error) {
      console.log(error);
      setAddressLoading(false);
    }
  };
  const handleDefineAddress = () => {
    let finaladdress = item;

    let finaladdressobj = userArr.address.find((address) => address._id === finaladdress);
    if (finaladdressobj) {
      finaladdressobj =
        finaladdressobj.country +
        '%20' +
        finaladdressobj.state +
        '%20' +
        finaladdressobj.city +
        '%20' +
        finaladdressobj.address1 +
        '%20' +
        finaladdressobj.address2;
    }

    const restaurantObj = restaurantArr.find((restaurant) => restaurant._id === finaladdress);
    if (restaurantObj) {
      finaladdressobj = restaurantObj.location + ' ' + restaurantObj.address;
      setIsSelf(true);
    }

    let finalstr;

    if (finaladdressobj && finaladdressobj.address && finaladdressobj.address.length > 10) {
      setAddressString(finaladdressobj.address);
      setAddressStringToPrint(finaladdressobj.replace(/%20/g, ' '));
    } else {
      finalstr = finaladdressobj.address;
      setAddressStringToPrint(finaladdressobj.replace(/%20/g, ' '));
      setAddressString(finalstr);
    }
    handleMapApi(finaladdressobj);
  };

  useEffect(() => {
    handleDefineAddress();
  }, []);

  return (
    <Box pt={4} data-aos='fade-up'>
      <Text fontWeight='semibold' fontSize={{ base: '14px', md: '3xs' }} color='neutral.gray'>
        {isSelf ? 'Pickup' : 'Delivery'} address
      </Text>
      <Box fontSize={{ base: '14px', md: 'xs' }} fontWeight='bold'>
        {addressStringToPrint}
      </Box>
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
                    styleInsert={{ borderRadius: '16px', borderWidth: '5px', borderColor: 'white', minHeight: '320px' }}
                    lng={address.results[0].bounds.northeast.lng}
                    lat={address.results[0].bounds.northeast.lat}
                    zoom={8}
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
          </Box>
        </Box>
      </Skeleton>
    </Box>
  );
}

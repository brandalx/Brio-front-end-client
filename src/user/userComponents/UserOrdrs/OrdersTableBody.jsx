import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tbody,
  Td,
  Tr,
  useMediaQuery
} from '@chakra-ui/react';
import React from 'react';
import Status from '../../../assets/svg/Status';
import { arrUsers } from '../../userJSON/ordersList';
import ThreeDots from '../../../assets/svg/ThreeDots';

export default function OrdersTableBody() {
  const [isTablet] = useMediaQuery('(max-width: 1199px)');
  const [isMobile] = useMediaQuery('(max-width: 575px)');
  return (
    <Tbody>
      {arrUsers.map((item) => {
        return (
          <Tr key={item.orderId} transition='all 0.2s' _hover={{ bg: 'bg', transition: 'all 0.2s', cursor: 'pointer' }}>
            <Td pl={isMobile ? '10px' : ''} pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {item.orderId}
            </Td>
            <Td
              justifyContent='start'
              flexDirection='row-reverse'
              display='flex'
              alignItems='center'
              pt='19.5px'
              pb='19.5px'
              fontSize='2xs'
              color='neutral.grayDark'
              fontWeight='semibold'
            >
              <Box bg='neutral.grayLightest' borderRadius='100px' px={4} py={1}>
                {item.restaurant}
              </Box>
            </Td>
            <Td pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {item.creationdate}
            </Td>
            <Td pt='19.5px' pb='19.5px' fontSize='2xs' color='neutral.grayDark'>
              {item.creationtime}
            </Td>
            <Td
              pr={isMobile ? '0' : ''}
              pl={isMobile ? '5px' : ''}
              pt='10px'
              pb='10px'
              fontSize='2.5xs'
              color='neutral.black'
              fontWeight='semibold'
            >
              <Flex alignItems='center'>
                <Box as='span' me={2}>
                  <Status
                    color={
                      item.status === 'Completed'
                        ? '#1ABF70'
                        : item.status === 'In progress'
                        ? '#4E60FF'
                        : item.status === 'Canceled'
                        ? '#FF5C60'
                        : item.status === 'Suspended'
                        ? '#FF5C60'
                        : 'yellow'
                    }
                  />
                </Box>
                {item.status}
              </Flex>
            </Td>

            <Td
              transition='all 0.3s'
              _hover={{ color: 'primary.default', transition: 'all 0.3s' }}
              pl={isMobile ? '0' : ''}
              pr={isMobile ? '0' : ''}
              textAlign='center'
              pt='10px'
              pb='10px'
              fontSize='2xs'
              fontWeight='bold'
              color='neutral.black'
            >
              ${item.total}
            </Td>
            <Td
              position={isMobile ? 'relative' : ''}
              right={isMobile ? '10px' : '0'}
              pl={0}
              pr={0}
              pt='10px'
              pb='10px'
              fontSize='2xs'
              fontWeight='bold'
              color='neutral.black'
            >
              <Menu>
                <MenuButton
                  _hover={{
                    color: 'neutral.black',
                    borderColor: 'neutral.lightest'
                  }}
                  fontSize='2xs'
                  color='neutral.gray'
                  fontWeight='bold'
                >
                  <ThreeDots />
                </MenuButton>

                <MenuList>
                  <MenuItem fontWeight='medium'>More info</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    m={0}
                    background='neutral.white'
                    variant='solid'
                    color='error.default'
                    _hover={{
                      background: 'error.default',
                      color: 'neutral.white'
                    }}
                    fontWeight='medium'
                  >
                    {' '}
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
}

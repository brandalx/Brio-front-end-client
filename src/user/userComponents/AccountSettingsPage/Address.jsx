import React from 'react';
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Checkbox,
  Divider,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react';
import imagemap from '../../../assets/images/defaultmap.png';
import { Link } from 'react-router-dom';
export default function Adress() {
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
          <Box pt={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: '1fr 1fr ' }} gap={6}>
              <GridItem w='100%'>
                <Box
                  _hover={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bg: 'primary.light',
                    borderColor: 'primary.light'
                  }}
                  _active={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bg: 'primary.light',
                    borderColor: 'primary.default'
                  }}
                  borderRadius='16px'
                  mb='12px'
                  p='0px'
                  transition='all 0.3s'
                  borderWidth='1px'
                  bg='neutral.white'
                >
                  <Flex justifyContent='space-between'>
                    <Flex alignItems='center'>
                      <Box py={2} px={2} borderRadius={12}>
                        <Box ml='4px' py={'7.5px'} position='relative'>
                          <Box>
                            <Image maxH='82px' maxW='96px' borderRadius='12px' src={imagemap} />
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Heading fontSize='2xs' fontWeight='bold'>
                          New York
                        </Heading>
                        <Text fontSize='3xs' fontWeight='semibold' color='neutral.grayDark'>
                          New York State, USA
                        </Text>
                        <Text fontSize='3xs' color='neutral.grayDark'>
                          4517 Washington Ave. Manchester, 11004
                        </Text>
                      </Box>
                    </Flex>
                    <Box>
                      <Menu>
                        <MenuButton
                          _hover={{
                            color: 'neutral.black',

                            borderColor: 'neutral.lightest'
                          }}
                          fontSize='2xs'
                          color='neutral.gray'
                          fontWeight='bold'
                          py={5}
                          me='20px'
                        >
                          •••
                        </MenuButton>

                        <MenuList>
                          <Link to='/user/account'>
                            {' '}
                            <MenuItem fontWeight='medium'>Edit</MenuItem>
                          </Link>

                          <MenuDivider />
                          <MenuItem
                            m={0}
                            h='100%'
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
                            Remove
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Flex>
                </Box>
              </GridItem>
              <GridItem w='100%'>2</GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

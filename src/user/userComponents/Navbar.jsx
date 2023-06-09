import React, { useEffect, useState } from 'react';

import {
  chakra,
  Text,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  Input,
  InputRightElement,
  Avatar,
  Container,
  MenuItem,
  MenuDivider,
  MenuList,
  Menu,
  MenuButton,
  Skeleton
} from '@chakra-ui/react';
import { IconShoppingBag } from '@tabler/icons-react';

import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Logo from '../../assets/svg/Logo';
import { Link, useLocation } from 'react-router-dom';
import { API_URL, handleApiGet } from '../../services/apiServices';

export default function Navbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const location = useLocation();
  const isInCart = location.pathname.startsWith('/user/cart');

  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [cartLen, setCartLen] = useState(0);
  const handleApi = async () => {
    const url = API_URL + '/users/6464085ed67f7b944b642799';
    try {
      const data = await handleApiGet(url);
      setArr(data);
      console.log(data);

      setCartLen(data.cart.length);
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
      <Container maxW='1110px'>
        <chakra.header w='full' px={{ base: 2, sm: 4 }} py={4}>
          <Flex alignItems='center' justifyContent='space-between' mx='auto'>
            <Flex alignItems='center'>
              <Link to='/'>
                <Box title='Homepage' display='flex' alignItems='center'>
                  <Logo />
                </Box>
                <VisuallyHidden>Brio</VisuallyHidden>
              </Link>

              <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                <Link to='/' title='Homepage'>
                  Brio
                </Link>
              </Text>

              <InputGroup display={{ base: 'none', md: 'inline-flex' }} size='md' fontSize='md' mx='10px'>
                <InputRightElement pointerEvents='none'>
                  <AiOutlineSearch color='#828282' size={18} />
                </InputRightElement>
                <Input
                  background='neutral.grayLightest'
                  _placeholder={{ color: 'neutral.gray' }}
                  borderRadius={100}
                  fontSize='2xs'
                  type='tel'
                  placeholder='Search...'
                />
              </InputGroup>
            </Flex>
            <HStack display='flex' alignItems='center' spacing={1}>
              <HStack spacing={2} mr={1} display={{ base: 'none', md: 'inline-flex' }}>
                <Button
                  color='neutral.black'
                  fontWeight='bold'
                  fontSize='2xs'
                  _hover={{
                    textDecoration: 'none',
                    color: 'primary.default'
                  }}
                >
                  <Link fontSize='fontSizes.2xs' to='/restaurant'>
                    Restaurants
                  </Link>
                </Button>
                <Button
                  color='neutral.black'
                  fontWeight='bold'
                  fontSize='2xs'
                  _hover={{
                    textDecoration: 'none',
                    color: 'primary.default'
                  }}
                >
                  Deals
                </Button>
                <Box ml='13px' mr='12px' h='20px' w='1px' mx='4' bg='neutral.grayLightest' />
                <Button
                  color='neutral.black'
                  fontWeight='bold'
                  fontSize='2xs'
                  _hover={{
                    textDecoration: 'none',
                    color: 'primary.default'
                  }}
                >
                  <Link fontSize='fontSizes.2xs' to='/user/orders'>
                    My orders
                  </Link>
                </Button>

                <HStack spacing={6} display={{ base: 'none', md: 'inline-flex' }}>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Box
                      borderColor={isInCart ? 'primary.default' : 'neutral.white'}
                      borderWidth='1px'
                      ml='4px'
                      bg='primary.lightest'
                      _hover={{ bg: 'primary.light' }}
                      color='black'
                      px={'8px'}
                      py={'7.5px'}
                      borderRadius='16px'
                      position='relative'
                    >
                      <Box
                        position='absolute'
                        top='-2px'
                        right='-4px'
                        bg='primary.default'
                        h='20px'
                        w='20px'
                        borderRadius='8px'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        fontSize='xs'
                        fontWeight='semibold'
                        color='white'
                        textAlign='center'
                        minWidth='20px'
                      >
                        {!loading && cartLen}
                      </Box>
                      <Menu>
                        <MenuButton as={Button} p='6px' rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                          <IconShoppingBag color='#4E60FF' />
                        </MenuButton>

                        <MenuList>
                          <Link to='user/cart'>
                            {' '}
                            <MenuItem fontWeight='medium'>My cart</MenuItem>
                          </Link>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Skeleton>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Menu>
                      <Box
                        borderWidth='2px'
                        borderColor='neutral.white'
                        transition='all 0.3s'
                        _hover={{ borderWidth: '2px', borderColor: 'primary.default', transition: 'all 0.3s' }}
                        borderRadius='2xl'
                        display='flex'
                        alignItems='center'
                      >
                        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                          <Avatar
                            py='2px'
                            borderRadius='xl'
                            size='md'
                            name={!loading && arr.firstname + ' ' + arr.lastname}
                            src={(!loading && arr.avatar) || null}
                          />{' '}
                        </MenuButton>
                      </Box>
                      <MenuList>
                        <Link to='/user/account'>
                          {' '}
                          <MenuItem fontWeight='medium'>Settings</MenuItem>
                        </Link>
                        <MenuDivider />
                        <Link to='/login'>
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
                            Log Out
                          </MenuItem>
                        </Link>
                      </MenuList>
                    </Menu>
                  </Skeleton>
                </HStack>
              </HStack>

              <Box display={{ base: 'inline-flex', md: 'none' }}>
                <HStack display='flex' alignItems='center' spacing={4}>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Box
                      borderColor={isInCart ? 'primary.default' : 'neutral.white'}
                      borderWidth='1px'
                      ml='4px'
                      bg='neutral.grayLightest'
                      color='black'
                      px={'8px'}
                      py={'8px'}
                      borderRadius='16px'
                      position='relative'
                    >
                      <Box
                        position='absolute'
                        top='-2px'
                        right='-4px'
                        bg='primary.default'
                        h='18px'
                        w='18px'
                        borderRadius='8px'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        fontSize='xs'
                        fontWeight='semibold'
                        color='white'
                        textAlign='center'
                      >
                        {!loading && cartLen}
                      </Box>
                      <Menu>
                        <MenuButton as={Button} p='6px' rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                          <IconShoppingBag color='#4E60FF' />
                        </MenuButton>
                        <MenuList>
                          <Link to='user/cart'>
                            {' '}
                            <MenuItem fontWeight='medium'>My cart</MenuItem>
                          </Link>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Skeleton>
                  <Skeleton borderRadius='16px' isLoaded={!loading}>
                    <Menu>
                      <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                        <Avatar
                          py='2px'
                          borderRadius='xl'
                          size='md'
                          name={!loading && arr.firstname + ' ' + arr.lastname}
                          src={(!loading && arr.avatar) || null}
                        />{' '}
                      </MenuButton>

                      <MenuList>
                        <Link to='/user/account'>
                          {' '}
                          <MenuItem fontWeight='medium'>Settings</MenuItem>
                        </Link>

                        <MenuDivider />
                        <Link to='/login'>
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
                            Log Out
                          </MenuItem>
                        </Link>
                      </MenuList>
                    </Menu>
                  </Skeleton>
                  <Box ml='13px' mr='12px' h='32px' w='1px' mx='4' bg='neutral.grayLightest' />
                  <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    aria-label='Open menu'
                    fontSize='20px'
                    color='neutral.gray'
                    _dark={{ color: 'inherit' }}
                    variant='ghost'
                    h='48px'
                    w='48px'
                    borderRadius='16px'
                    bg='neutral.grayLightest'
                    icon={<AiOutlineMenu />}
                    onClick={mobileNav.onOpen}
                  />
                </HStack>
                <VStack
                  transition='all 0.2s'
                  flexDir='column-reverse'
                  alignItems='start'
                  pos='absolute'
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? 'flex' : 'none'}
                  flexDirection='column'
                  p={2}
                  pb={4}
                  m={2}
                  mt={2}
                  bg={bg}
                  spacing={4}
                  borderRadius='15px'
                  border='light.neutral.light'
                  borderWidth={1}
                  shadow='lg'
                >
                  <Flex w='100%' direction='column' justifyContent='space-between'>
                    <Box display='flex' justifyContent='center' w='100%' mx='auto' my={4}>
                      <Link to='/'>
                        <Box title='Homepage' display='flex' alignItems='center'>
                          <Logo />
                        </Box>
                        <VisuallyHidden>Brio</VisuallyHidden>
                      </Link>

                      <Text fontSize='sm' fontWeight='extrabold' color='primary.default' ml='2'>
                        <Link to='/' title='Homepage'>
                          Brio
                        </Link>
                      </Text>
                    </Box>
                    <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                      <Link to='/restaurant'>Restaurants</Link>
                    </Button>
                    <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                      <Link to='#'>Deals </Link>
                    </Button>
                    <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                      <Link to='/user/orders'>My orders</Link>
                    </Button>
                    <Box my='8px' display='flex' justifyItems='center'>
                      <InputGroup size='sm' fontSize='md' w='60%' mx='auto'>
                        <InputRightElement pointerEvents='none'>
                          <AiOutlineSearch color='#828282' size={14} />
                        </InputRightElement>
                        <Input
                          background='neutral.grayLightest'
                          _placeholder={{ color: 'neutral.gray' }}
                          borderRadius={100}
                          fontSize='2xs'
                          type='text'
                          placeholder='Search...'
                        />
                      </InputGroup>
                    </Box>
                  </Flex>
                  <Flex w='100%' justifyContent='space-between' px='16px'>
                    <Flex justifyContent='flex-end'></Flex>
                    <CloseButton aria-label='Close menu' onClick={mobileNav.onClose} />
                  </Flex>
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </chakra.header>
      </Container>
    </>
  );
}

import React from 'react';

import {
  Avatar,
  Box,
  Button,
  chakra,
  CloseButton,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VisuallyHidden,
  VStack
} from '@chakra-ui/react';
import Moon from '../../assets/svg/Moon';
import Sun from '../../assets/svg/Sun';
import Logo from '../../assets/svg/Logo';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import Notification from '../../assets/svg/Notification';
import { AiOutlineMenu } from 'react-icons/ai';
import '../../css/global.css';
import { TOKEN_KEY } from '../../services/apiServices';
import { useColorModeContext } from '../../context/globalContext';

export default function AdminNavbar() {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const onLogOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem('location');

    navigate('/login');
    toast({
      title: 'Loggin out.',
      description: 'Successfuly logged out!',
      status: 'success',
      duration: 9000,
      isClosable: true
    });
  };
  const { colorMode, setColorMode } = useColorModeContext();
  return (
    <>
      <Container overflow-x='hidden' zIndex='9999999' maxW='none' borderBottom='1px solid #EDEEF2' p={0} width='100%'>
        <Container maxW='1110px'>
          <chakra.header
            w='100%'
            pl={0}
            pr={0}
            py={3.5}
            position='relative'
            css={{
              width: '100%',
              marginLeft: 0,
              marginRight: 0
            }}
          >
            {' '}
            <Flex display='flex' alignItems='center' justifyContent='space-between' mx='auto'>
              <Link to='/admin' _hover={{ textDecoration: 'none' }}>
                <Box display='flex' alignItems='center'>
                  <Logo />
                  <VisuallyHidden>Brio</VisuallyHidden>
                  <Box ml='10px' mt='5px'>
                    <Box to='/admin' display='flex' flexDirection='column' alignItems='start'>
                      <Text fontSize='sm' fontWeight='extrabold' color='primary.default'>
                        Brio
                      </Text>
                      <Text fontSize='3xs' fontWeight='extrabold' color='neutral.gray' mt=''>
                        for owners
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Link>

              <HStack display='flex' alignItems='center' spacing={1}>
                {/* Deckstop Navbar */}
                <HStack spacing={3} mr={0} display={{ base: 'none', md: 'inline-flex' }}>
                  <Button
                    bg={localStorage.getItem('colormode') === 'dark' ? '#363654' : 'primary.lightest'}
                    variant={'link'}
                    size='xs'
                    py='8px'
                    px='8px'
                    color='primary.default'
                    onClick={() => {
                      const newColorMode = colorMode === 'light' ? 'dark' : 'light';
                      localStorage.setItem('colormode', newColorMode);
                      setColorMode(newColorMode);
                    }}
                  >
                    {localStorage.getItem('colormode') === 'dark' ? (
                      <Box>
                        <Moon />
                      </Box>
                    ) : (
                      <Box>
                        <Sun />
                      </Box>
                    )}
                  </Button>
                  <Box
                    as={Button}
                    color='neutral.black'
                    fontWeight='bold'
                    fontSize='2xs'
                    _hover={{
                      textDecoration: 'none',
                      color: 'primary.default'
                    }}
                  >
                    <Link className='header-links-organize' fontSize='fontSizes.2xs' to='/admin/restaurant/dashboard'>
                      Dashboard
                    </Link>
                  </Box>
                  <Box
                    as={Button}
                    color='neutral.black'
                    fontWeight='bold'
                    fontSize='2xs'
                    _hover={{
                      textDecoration: 'none',
                      color: 'primary.default'
                    }}
                  >
                    <Link className='header-links-organize' fontSize='fontSizes.2xs' to='/admin/restaurant/orders'>
                      Orders
                    </Link>
                  </Box>
                  <Box
                    as={Button}
                    color='neutral.black'
                    fontWeight='bold'
                    fontSize='2xs'
                    _hover={{
                      textDecoration: 'none',
                      color: 'primary.default'
                    }}
                  >
                    <Link className='header-links-organize' to='/admin/restaurant/customers'>
                      Customers
                    </Link>
                  </Box>
                  <Box
                    as={Button}
                    color='neutral.black'
                    fontWeight='bold'
                    fontSize='2xs'
                    _hover={{
                      textDecoration: 'none',
                      color: 'primary.default'
                    }}
                  >
                    <Link className='header-links-organize' fontSize='fontSizes.2xs' to='/admin/restaurant/menu'>
                      Menu
                    </Link>
                  </Box>
                  <Box
                    as={Button}
                    color='neutral.black'
                    fontWeight='bold'
                    fontSize='2xs'
                    _hover={{
                      textDecoration: 'none',
                      color: 'primary.default'
                    }}
                  >
                    <Link className='header-links-organize' to='/admin/restaurant/promotions'>
                      Promotions
                    </Link>
                  </Box>

                  <Box ml='13px' mr='12px' h='32px' w='1px' mx='4' bg='neutral.grayLightest' />
                  <Flex spacing={6} display={{ base: 'none', md: 'inline-flex' }}>
                    {/*<Box*/}
                    {/*  ml='4px'*/}
                    {/*  bg='neutral.grayLightest'*/}
                    {/*  color='black'*/}
                    {/*  px={'8px'}*/}
                    {/*  py={'7.5px'}*/}
                    {/*  borderRadius='16px'*/}
                    {/*  position='relative'*/}
                    {/*>*/}
                    {/*<Box*/}
                    {/*  position='absolute'*/}
                    {/*  top='-3px'*/}
                    {/*  right='-4px'*/}
                    {/*  bg='primary.default'*/}
                    {/*  h='20px'*/}
                    {/*  w='20px'*/}
                    {/*  fontSize='10px'*/}
                    {/*  borderRadius='8px'*/}
                    {/*  display='flex'*/}
                    {/*  alignItems='center'*/}
                    {/*  justifyContent='center'*/}
                    {/*  fontWeight='semibold'*/}
                    {/*  color='white'*/}
                    {/*  textAlign='center'*/}
                    {/*  minWidth='20px'*/}
                    {/*>*/}
                    {/*  7*/}
                    {/*</Box>*/}
                    {/*  <Menu>*/}
                    {/*    /!*<MenuButton as={Button} p='6px' rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>*!/*/}
                    {/*    /!*  <Notification />*!/*/}
                    {/*    /!*</MenuButton>*!/*/}
                    {/*    <MenuList>*/}
                    {/*      <MenuItem fontWeight='medium'>Event</MenuItem>*/}
                    {/*    </MenuList>*/}
                    {/*  </Menu>*/}
                    {/*</Box>*/}

                    <Menu>
                      <MenuButton ml='15px' as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                        <Avatar
                          py='2px'
                          borderRadius='xl'
                          size='md'
                          name='Prosper Otemuyiwa'
                          src='https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg'
                        />{' '}
                      </MenuButton>
                      <MenuList>
                        <MenuItem as={RouterLink} to='/admin/restaurant/settings' fontWeight='medium'>
                          Settings
                        </MenuItem>
                        <MenuItem as={RouterLink} to='/' fontWeight='medium'>
                          Client side menu
                        </MenuItem>
                        <MenuDivider />

                        <MenuItem
                          onClick={onLogOut}
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
                      </MenuList>
                    </Menu>
                  </Flex>
                </HStack>
                {/* Mobile navbar */}
                <Box display={{ base: 'inline-flex', md: 'none' }}>
                  <HStack display='flex' alignItems='center' spacing={4}>
                    <Box
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
                        0
                      </Box>
                      <Menu>
                        <MenuButton as={Button} p='6px' rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                          <Notification />
                        </MenuButton>
                        <MenuList></MenuList>
                      </Menu>
                    </Box>
                    <Menu>
                      <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                        <Avatar
                          py='2px'
                          borderRadius='xl'
                          size='md'
                          name='Prosper Otemuyiwa'
                          src='https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg'
                        />{' '}
                      </MenuButton>
                      <MenuList>
                        <MenuItem as={RouterLink} to='/admin/restaurant/settings' fontWeight='medium'>
                          Settings
                        </MenuItem>
                        <MenuItem as={RouterLink} to='/' fontWeight='medium'>
                          Client side menu
                        </MenuItem>
                        <MenuDivider />

                        <MenuItem
                          onClick={onLogOut}
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
                      </MenuList>
                    </Menu>
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
                      <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                        <Link to='/admin/restaurant/orders'>Orders</Link>
                      </Button>
                      <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                        <Link to='/admin/restaurant/customers'>Customers</Link>
                      </Button>
                      <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                        <Link to='/admin/restaurant/menu'>Menu</Link>
                      </Button>
                      <Button fontWeight='extrabold' fontSize='xs' variant='ghost' mb='24px'>
                        <Link to='/admin/restaurant/promotions'>Promotions</Link>
                      </Button>
                      <Button fontWeight='extrabold' fontSize='xs' variant='ghost'>
                        <Link to='/admin/restaurant/dashboard'>Dashboard</Link>
                      </Button>
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
      </Container>
    </>
  );
}
